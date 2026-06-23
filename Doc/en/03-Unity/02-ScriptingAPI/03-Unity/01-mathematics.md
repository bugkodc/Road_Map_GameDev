# Unity.Mathematics API (High-performance Math)

> 📖 **Source:** This document is compiled and written in detail from the [Unity Mathematics Package Documentation](https://docs.unity3d.com/Packages/com.unity.mathematics@1.3/manual/index.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The **`Unity.Mathematics`** library is a Unity feature package that provides math data types and functions structured similarly to the **HLSL** shader language. It is designed and optimized for the multithreaded programming system (C# Job System) and the Burst Compiler, allowing math computations to run on the CPU's vector registers (SIMD - Single Instruction Multiple Data technology) to achieve extreme processing performance.

---

## 🧮 1. The essence: UnityEngine.Vector3 vs Unity.Mathematics.float3

Although both represent a 3-dimensional vector, their architectural nature and the way they are stored in RAM are completely different:

```
┌───────────────────────────────────────┐
│        So sánh kiểu Toán học          │
├───────────────────┬───────────────────┤
│UnityEngine.Vector3│ Unity.Mathematics │
│    (Truyền thống) │  (float3 - Mới)   │
├───────────────────┼───────────────────┤
│ - OOP truyền thống│ - Thiết kế Data   │
│ - Nhiều hàm check │ - Thân thiện SIMD │
│ - Không tối ưu Job│ - Tối ưu hóa Burst│
│ - Chậm hơn        │ - Tốc độ cực nhanh│
└───────────────────┴───────────────────┘
```

### Differences in detail:
1.  **UnityEngine.Vector3:** Designed around object-oriented programming (OOP). It contains a lot of extra code to interact with the Editor and native C++ components. It cannot be deeply optimized by the Burst Compiler.
2.  **`Unity.Mathematics.float3`:** Designed around pure data-oriented structures. The data of the 3 floating-point numbers is laid out contiguously in memory, making it easy for the CPU to load them into a SIMD register and add/multiply all 3 axes at once in a single machine cycle.

### Equivalent data types:
*   `Vector2` ➔ **`float2`**
*   `Vector3` ➔ **`float3`**
*   `Vector4` ➔ **`float4`**
*   `Quaternion` ➔ **`quaternion`**
*   `Matrix4x4` ➔ **`float4x4`**
*   `int` ➔ **`int`** (or integer vector: **`int3`**)

---

## ⚙️ 2. The static math function system (math class)

Instead of using the `Mathf` or `System.Math` classes, the library uses the static **`math`** class containing all the optimized computation algorithms:
*   `Mathf.Lerp` ➔ **`math.lerp`**
*   `Mathf.Clamp` ➔ **`math.clamp`**
*   `Mathf.Sin` ➔ **`math.sin`**
*   **`math.mad(a, b, c)`** (Multiply-Add): Computes `a * b + c` in a single hardware instruction, extremely fast.

---

## 🎮 Hands-on source code (Unity C#)

Below is a real-world C# source code example that compares performance when computing the distance of 10,000 points using the traditional Vector3 type vs. using the `Unity.Mathematics` library optimized by the Burst Compiler.

```csharp
using UnityEngine;
using Unity.Mathematics; // Namespace cho toán học SIMD
using Unity.Burst; // Namespace cho Burst Compiler

public class MathematicsPerformanceDemo : MonoBehaviour
{
    private const int ArraySize = 10000;
    private float3[] mathPoints;
    private Vector3[] vectorPoints;

    private void Start()
    {
        // Khởi tạo mảng dữ liệu ngẫu nhiên
        mathPoints = new float3[ArraySize];
        vectorPoints = new Vector3[ArraySize];

        for (int i = 0; i < ArraySize; i++)
        {
            Vector3 randomVec = Random.insideUnitSphere * 100f;
            vectorPoints[i] = randomVec;
            mathPoints[i] = new float3(randomVec.x, randomVec.y, randomVec.z);
        }

        Debug.Log("[MathTest] Đã khởi tạo dữ liệu 10.000 điểm. Nhấn Space để so sánh hiệu năng!");
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            TestPerformance();
        }
    }

    private void TestPerformance()
    {
        // 1. Kiểm tra tốc độ của UnityEngine.Vector3 truyền thống
        System.Diagnostics.Stopwatch sw = new System.Diagnostics.Stopwatch();
        sw.Start();
        float totalDistLegacy = RunLegacyTest();
        sw.Stop();
        double legacyTime = sw.Elapsed.TotalMilliseconds;

        // 2. Kiểm tra tốc độ của Unity.Mathematics + Burst Compiler
        sw.Reset();
        sw.Start();
        float totalDistMathematics = RunMathematicsTest();
        sw.Stop();
        double mathTime = sw.Elapsed.TotalMilliseconds;

        Debug.Log($"[Legacy Vector3] Tổng: {totalDistLegacy:F2} - Thời gian: {legacyTime:F4} ms");
        Debug.Log($"[Unity.Mathematics] Tổng: {totalDistMathematics:F2} - Thời gian: {mathTime:F4} ms");
        Debug.Log($"[So Sánh] Thư viện mới chạy nhanh hơn gấp: {legacyTime / mathTime:F2} lần!");
    }

    private float RunLegacyTest()
    {
        float total = 0f;
        Vector3 origin = Vector3.zero;
        for (int i = 0; i < ArraySize; i++)
        {
            // Tính khoảng cách tốn phép căn bậc hai chậm
            total += Vector3.Distance(origin, vectorPoints[i]);
        }
        return total;
    }

    // Gán nhãn BurstCompile để trình biên dịch tối ưu hóa sang mã máy assembly tối tân
    [BurstCompile]
    private float RunMathematicsTest()
    {
        float total = 0f;
        float3 origin = float3.zero;
        for (int i = 0; i < ArraySize; i++)
        {
            // Sử dụng hàm math.distance tối ưu của Unity.Mathematics
            total += math.distance(origin, mathPoints[i]);
        }
        return total;
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [AssetDatabase & Importer (Asset Management)](../02-UnityEditor/03-asset-database.md) |
| → Next | [Unity.Collections API (Native memory)](./02-collections.md) |
