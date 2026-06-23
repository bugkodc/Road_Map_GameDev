# Unity.Jobs (C# Job System đa luồng an toàn)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Jobs](https://docs.unity3d.com/ScriptReference/Unity.Jobs.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API điều khiển C# Job System, lập trình các Jobs tính toán đa luồng an toàn chạy song song trên CPU.

---

## 🧱 1. Lập trình đa luồng cực kỳ an toàn trên CPU

C# Job System cho phép viết mã nguồn đa luồng cực kỳ hiệu quả mà không lo xảy ra hiện tượng xung đột tài nguyên giữa các luồng (Race Conditions). Nó tự động phân bổ công việc nặng xuống các nhân CPU còn trống một cách tối ưu.

* **`IJobParallelFor`**: Chia nhỏ vòng lặp tính toán khổng lồ ra thành nhiều nhóm nhỏ hơn để xử lý song song.
* **Safety System**: Hệ thống kiểm tra an toàn của Unity sẽ ném ra lỗi ngay lập tức trong Editor nếu phát hiện bạn đang cố ghi đè dữ liệu đồng thời từ hai luồng khác nhau.

---

## 📐 2. Cạm bẫy giải phóng bộ nhớ Native

Các cấu trúc dữ liệu truyền vào Job bắt buộc phải là `NativeArray` hoặc cấu trúc bộ nhớ native của Unity. Luôn gọi `.Dispose()` sau khi Job hoàn tất để tránh rò rỉ bộ nhớ (Memory Leak).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Jobs`.

```csharp
using UnityEngine;
using Unity.Jobs;
using Unity.Collections;

public class JobSystemTest : MonoBehaviour
{
    struct SpeedMultiplyJob : IJobParallelFor
    {
        public NativeArray<float> speeds;
        public float multiplier;

        public void Execute(int index)
        {
            speeds[index] *= multiplier;
        }
    }

    void Start()
    {
        // Khởi tạo bộ nhớ native
        NativeArray<float> playerSpeeds = new NativeArray<float>(1000, Allocator.TempJob);
        for (int i = 0; i < playerSpeeds.Length; i++) playerSpeeds[i] = 5f;

        SpeedMultiplyJob job = new SpeedMultiplyJob
        {
            speeds = playerSpeeds,
            multiplier = 1.5f
        };

        // Lập lịch chạy đa luồng trên tất cả nhân CPU có sẵn
        JobHandle handle = job.Schedule(playerSpeeds.Length, 64);
        
        // Chờ Job hoàn tất ở cuối frame
        handle.Complete();

        Debug.Log($"[Jobs] Đã nhân đôi tốc độ cho 1000 thực thể. Kết quả phần tử 0: {playerSpeeds[0]}");
        
        // Bắt buộc phải giải phóng bộ nhớ native
        playerSpeeds.Dispose();
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.IO](io.md) |
| → Tiếp theo | [Unity.Loading](loading.md) |
