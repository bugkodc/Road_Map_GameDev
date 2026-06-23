# Unity.Profiling API (Performance Measurement)

> 📖 **Source:** This document is compiled and written in detail from the [Unity Profiler Marker API Reference — Unity.Profiling](https://docs.unity3d.com/ScriptReference/Unity.Profiling.ProfilerMarker.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Optimizing game performance requires the programmer to precisely identify the slow-running code (CPU bottleneck) instead of guessing. The **`Unity.Profiling`** namespace provides a programmatic solution to measure code execution time and the level of RAM allocation directly in code, and to display the measurement results in Unity's **Profiler** tool.

---

## ⏱️ 1. The ProfilerMarker API class

The `ProfilerMarker` class is the best tool for measuring the performance of a block of code. Compared to the `System.Diagnostics.Stopwatch` class, `ProfilerMarker` is far more efficient because:
1.  **Low overhead:** It is designed and optimized in native C++ underneath, so it does not affect the actual CPU measurement results.
2.  **Deep integration:** It is displayed visually as a Timeline bar chart in Unity Editor's **Profiler** window.
3.  **Multithreading support:** It can measure the runtime of code running inside the C# Job System.

### How to declare and use it:
We declare a `static readonly` variable to avoid re-initializing it multiple times:
`private static readonly ProfilerMarker marker = new ProfilerMarker("MyCustomCalculation");`

Use the `using (marker.Auto())` construct to automatically turn measurement on and off as it runs through the code block.

---

## 🎮 Hands-on source code (Unity C#)

Below is a complete sample C# script that demonstrates how to declare and use `ProfilerMarker` to monitor a complex prime-number-finding algorithm, and how to measure the amount of garbage RAM allocated (GC Alloc) directly from code.

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
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Collections API (Native memory)](./02-collections.md) |
| → Next | [Unity.VisualScripting API (Visual Script)](../04-Other/01-visual-scripting.md) |
