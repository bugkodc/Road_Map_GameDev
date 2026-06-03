# Unity.Profiling API (Đo đạc Hiệu năng)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Profiler Marker API Reference — Unity.Profiling](https://docs.unity3d.com/ScriptReference/Unity.Profiling.ProfilerMarker.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Tối ưu hóa hiệu năng game đòi hỏi lập trình viên phải xác định chính xác những đoạn mã chạy chậm (CPU bottleneck) thay vì phỏng đoán. Namespace **`Unity.Profiling`** cung cấp giải pháp lập trình để đo đạc thời gian thực thi mã nguồn, mức độ cấp phát bộ nhớ RAM trực tiếp trong code, và hiển thị kết quả đo đạc lên công cụ **Profiler** của Unity.

---

## ⏱️ 1. Lớp ProfilerMarker API

Lớp `ProfilerMarker` là công cụ tối ưu nhất để đo đạc hiệu năng của một khối mã lệnh. So với lớp `System.Diagnostics.Stopwatch`, `ProfilerMarker` hoạt động hiệu quả hơn nhiều vì:
1.  **Chi phí cực thấp (Low overhead):** Được thiết kế tối ưu hóa bằng C++ Native bên dưới, không gây ảnh hưởng đến kết quả đo đạc thực tế của CPU.
2.  **Tích hợp sâu:** Hiển thị trực quan dưới dạng biểu đồ cột thời gian (Timeline) trong cửa sổ **Profiler** của Unity Editor.
3.  **Hỗ trợ đa luồng:** Đo đạc được thời gian chạy của các đoạn code trong C# Job System.

### Cách khai báo và sử dụng:
Ta khai báo một biến `static readonly` để tránh khởi tạo lại nhiều lần:
`private static readonly ProfilerMarker marker = new ProfilerMarker("MyCustomCalculation");`

Sử dụng cấu trúc `using (marker.Auto())` để tự động bật và tắt đo đạc khi chạy qua khối mã.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script mẫu C# hoàn chỉnh thể hiện cách khai báo, sử dụng `ProfilerMarker` để giám sát một thuật toán tìm số nguyên tố phức tạp và cách đo đạc lượng RAM cấp phát rác (GC Alloc) trực tiếp từ code.

```csharp
using UnityEngine;
using Unity.Profiling; // Bắt buộc để sử dụng ProfilerMarker
using UnityEngine.Profiling; // Để sử dụng Profiler.GetMonoUsedSizeLong

public class ProfilingDemo : MonoBehaviour
{
    // Khai báo nhãn đo đạc tĩnh (static readonly) để tối ưu hóa bộ nhớ
    private static readonly ProfilerMarker primeSearchMarker = new ProfilerMarker("EnemyAI.SearchPrimeNumbers");
    private static readonly ProfilerMarker garbageAllocMarker = new ProfilerMarker("GarbageGen.StringConcatenation");

    private void Update()
    {
        // Nhấn phím P để đo đạc kiểm tra thuật toán số nguyên tố
        if (Input.GetKeyDown(KeyCode.P))
        {
            MeasurePrimeSearchPerformance();
        }

        // Nhấn phím G để đo đạc kiểm tra lượng rác do ghép chuỗi sinh ra
        if (Input.GetKeyDown(KeyCode.G))
        {
            MeasureGarbageAllocation();
        }
    }

    private void MeasurePrimeSearchPerformance()
    {
        // 1. Sử dụng mệnh đề using để tự động gọi Begin và End đo đạc
        // Khối mã này sẽ xuất hiện trong cửa sổ Window -> Analysis -> Profiler
        using (primeSearchMarker.Auto())
        {
            int primesFound = 0;
            // Thực thi thuật toán tìm kiếm số nguyên tố nặng CPU
            for (int i = 2; i < 50000; i++)
            {
                if (IsPrime(i))
                {
                    primesFound++;
                }
            }
            Debug.Log($"[Profiler] Tìm thấy {primesFound} số nguyên tố.");
        }
    }

    private void MeasureGarbageAllocation()
    {
        // Đo đạc dung lượng bộ nhớ RAM (Heap) đang được sử dụng trước khi chạy
        long memoryBefore = GC.GetTotalMemory(false);

        using (garbageAllocMarker.Auto())
        {
            string log = "";
            // Thực hiện ghép chuỗi liên tục (Lỗi tạo rác GC Alloc cực nặng vì String trong C# là unmutable)
            for (int i = 0; i < 500; i++)
            {
                log += "Lần thứ: " + i + " | ";
            }
        }

        // Đo đạc dung lượng bộ nhớ sau khi chạy
        long memoryAfter = GC.GetTotalMemory(false);
        long allocatedBytes = memoryAfter - memoryBefore;

        Debug.Log($"[Profiler] Vừa cấp phát rác: {allocatedBytes / 1024f:F2} KB lên bộ nhớ Heap RAM!");
        Debug.LogWarning("[Tối ưu] Hãy dùng System.Text.StringBuilder thay thế để tránh GC Alloc!");
    }

    private bool IsPrime(int number)
    {
        if (number <= 1) return false;
        if (number == 2) return true;
        if (number % 2 == 0) return false;

        var boundary = (int)Mathf.Floor(Mathf.Sqrt(number));

        for (int i = 3; i <= boundary; i += 2)
        {
            if (number % i == 0) return false;
        }

        return true;
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Collections API (Native memory)](./02-collections.md) |
| → Tiếp theo | [Unity.VisualScripting API (Visual Script)](../04-Other/01-visual-scripting.md) |
