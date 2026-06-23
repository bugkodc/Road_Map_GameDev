# Unity.Burst (Trình biên dịch hiệu năng cao Burst Compiler)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Burst](https://docs.unity3d.com/ScriptReference/Unity.Burst.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API tương tác với trình biên dịch Burst Compiler, tối ưu hóa sâu mã C# IL sang mã máy hiệu năng cao.

---

## 🧱 1. Sức mạnh của Trình biên dịch Burst Compiler

Burst Compiler là một thành phần cốt lõi trong hệ thống công nghệ hiệu năng cao (DOTS) của Unity. Nó tự động dịch mã C# trung gian (IL) thành mã máy tối ưu hóa cực sâu bằng cách tận dụng kiến trúc vi xử lý đa nhân và tập lệnh SIMD (Single Instruction, Multiple Data) của chip.

* **`[BurstCompile]`**: Gán thuộc tính này lên các cấu trúc Job để thông báo cho trình biên dịch Burst tối ưu hóa chúng.

---

## 📐 2. Điều kiện biên dịch Burst thành công

Burst đòi hỏi code viết bên trong Job chỉ chứa các kiểu dữ liệu giá trị (Value Types / struct), không được chứa tham chiếu (Reference Types / class), và không được cấp phát bộ nhớ rác (GC Garbage).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Burst`.

```csharp
using UnityEngine;
using Unity.Burst;
using Unity.Jobs;
using Unity.Collections;

public class BurstCompilationTest : MonoBehaviour
{
    void Start()
    {
        NativeArray<float> numbers = new NativeArray<float>(100, Allocator.TempJob);
        
        CalculateJob job = new CalculateJob { data = numbers };
        JobHandle handle = job.Schedule();
        handle.Complete();
        
        Debug.Log($"[Burst] Tính toán thành công. Phần tử đầu tiên: {numbers[0]}");
        numbers.Dispose();
    }

    // Gán nhãn để Burst Compiler tối ưu hóa cấu trúc này sang mã máy siêu nhanh
    [BurstCompile]
    struct CalculateJob : IJob
    {
        public NativeArray<float> data;

        public void Execute()
        {
            for (int i = 0; i < data.Length; i++)
            {
                data[i] = Mathf.Sqrt(i * 12.5f);
            }
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Android](android.md) |
| → Tiếp theo | [Unity.CodeEditor](code-editor.md) |
