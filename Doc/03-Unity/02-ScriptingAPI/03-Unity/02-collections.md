# Unity.Collections API (Bộ nhớ Native không quản lý)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Collections Package Documentation](https://docs.unity3d.com/Packages/com.unity.collections@2.1/manual/index.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Trong C#, các kiểu dữ liệu mảng thông thường (như `List<T>`, `T[]`) được quản lý bởi **Garbage Collector (GC)**. Khi sử dụng số lượng lớn phần tử, GC sẽ phải liên tục quét dọn bộ nhớ gây ra hiện tượng đứng game (GC spikes). 

Thư viện **`Unity.Collections`** cung cấp các cấu trúc dữ liệu hiệu năng cao nằm trực tiếp trên **vùng nhớ Native (Unmanaged Memory)** ngoài tầm kiểm soát của GC, giúp giảm thiểu rác hoàn toàn và tối ưu hóa cho C# Job System.

---

## 💾 1. Các cấu trúc dữ liệu Native Collections

Thay vì dùng các cấu trúc dữ liệu C# truyền thống, ta sử dụng các cấu trúc Native tương ứng bắt đầu bằng tiền tố `Native`:
1.  **`NativeArray<T>`**: Mảng tĩnh có độ dài cố định lưu trên vùng nhớ native.
2.  **`NativeList<T>`**: Mảng động có thể tự co giãn kích thước (tương đương `List<T>`).
3.  **`NativeHashMap<TKey, TValue>`**: Bảng băm tra cứu dữ liệu theo cặp Key-Value.
4.  **`NativeQueue<T>`**: Hàng đợi dữ liệu vào trước ra trước (FIFO).

---

## ⚡ 2. Cơ chế quản lý bộ nhớ & Vòng đời Cấp phát (Allocators)

Vì dữ liệu nằm trên vùng nhớ Native không quản lý, bạn **bắt buộc phải tự giải phóng bộ nhớ** bằng cách gọi hàm `Dispose()` khi dùng xong. Nếu không gọi `Dispose()`, game sẽ bị rò rỉ RAM (Memory leak) nghiêm trọng làm đơ máy người chơi.

Để đảm bảo hiệu năng và tính an toàn, Unity cung cấp 3 loại **Allocator (Bộ cấp phát)** xác định vòng đời của vùng nhớ:

| Loại Allocator | Vòng đời (Lifetime) | Tốc độ | Phù hợp cho |
| :--- | :--- | :--- | :--- |
| **`Allocator.Temp`** | Rất ngắn (trong vòng 1 Frame hoặc nhỏ hơn). Không được truyền vào Jobs. | Siêu nhanh (cấp phát trên stack) | Tính toán tạm thời trong 1 hàm. Không cần gọi `Dispose` (Unity tự dọn cuối frame). |
| **`Allocator.TempJob`** | Ngắn (tối đa 4 Frames). Thường dùng cho các C# Jobs. | Nhanh | Truyền dữ liệu vào Job để chạy tính toán ngầm và giải phóng ngay sau khi Job hoàn tất. |
| **`Allocator.Persistent`** | Vô hạn (tồn tại đến khi game tắt hoặc tự hủy). | Chậm hơn | Lưu trữ dữ liệu lâu dài (ví dụ: dữ liệu bản đồ, item, dữ liệu người chơi). Bắt buộc gọi `Dispose()`. |

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script mẫu C# hoàn chỉnh thể hiện cách khởi tạo, sử dụng, truyền dữ liệu NativeArray vào C# Job System chạy ngầm đa luồng tối ưu hóa hiệu năng và dọn dẹp bộ nhớ chuẩn mực.

```csharp
using UnityEngine;
using Unity.Collections; // Bắt buộc để dùng Native Collections
using Unity.Jobs; // Bắt buộc để dùng Job System
using Unity.Burst; // Bắt buộc để dùng Burst Compiler

public class NativeCollectionsDemo : MonoBehaviour
{
    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ExecuteNativeJob();
        }
    }

    private void ExecuteNativeJob()
    {
        int elementCount = 100000;

        // 1. Cấp phát NativeArray trên vùng nhớ ngoài GC sử dụng TempJob Allocator
        // Mảng này lưu kết quả tính toán bình phương của các số thực
        NativeArray<float> numbers = new NativeArray<float>(elementCount, Allocator.TempJob);
        NativeArray<float> results = new NativeArray<float>(elementCount, Allocator.TempJob);

        // Khởi tạo dữ liệu ban đầu
        for (int i = 0; i < elementCount; i++)
        {
            numbers[i] = i;
        }

        // 2. Tạo đối tượng Job và truyền dữ liệu Native vào
        SquareCalculationJob job = new SquareCalculationJob
        {
            inputData = numbers,
            outputData = results
        };

        // 3. Lên lịch chạy Job trên các luồng phụ của CPU (Multithreading)
        // ScheduleParallel chia nhỏ 100.000 phần tử thành các cụm (batch) chạy song song trên mọi nhân CPU
        JobHandle jobHandle = job.Schedule(elementCount, 64); // 64 là batch size

        // 4. Đợi Job hoàn tất tính toán (Block luồng chính nếu chưa xong)
        jobHandle.Complete();

        // Đọc thử kết quả đầu tiên sau khi tính toán đa luồng thành công
        Debug.Log($"[NativeJob] Bình phương của 5 là: {results[5]}");

        // 5. Bắt buộc: Giải phóng bộ nhớ Native sau khi sử dụng để tránh Rò rỉ RAM (Memory Leak)
        numbers.Dispose();
        results.Dispose();
        Debug.Log("[NativeJob] Đã giải phóng bộ nhớ Native Array thành công.");
    }
}

// =========================================================================
// 🦾 C# JOB SYSTEM STRUCTURE
// Định nghĩa thuật toán chạy đa luồng tối ưu bởi Burst Compiler
// =========================================================================
[BurstCompile] // Ép Burst biên dịch sang mã máy tối ưu
public struct SquareCalculationJob : IJobParallelFor
{
    // Cờ ReadOnly chỉ cho phép đọc để tăng tốc độ truy cập dữ liệu
    [ReadOnly] public NativeArray<float> inputData;
    
    // Cờ WriteOnly dùng để ghi kết quả đầu ra
    [WriteOnly] public NativeArray<float> outputData;

    // Hàm Execute chạy song song trên các luồng phụ
    public void Execute(int index)
    {
        outputData[index] = inputData[index] * inputData[index];
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Mathematics API (Toán học hiệu năng cao)](./01-mathematics.md) |
| → Tiếp theo | [Unity.Profiling API (Đo đạc hiệu năng)](./03-profiling.md) |
