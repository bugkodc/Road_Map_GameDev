# Unity.Mathematics API (Toán học Hiệu năng cao)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Mathematics Package Documentation](https://docs.unity3d.com/Packages/com.unity.mathematics@1.3/manual/index.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Thư viện **`Unity.Mathematics`** là một gói tính năng của Unity cung cấp các kiểu dữ liệu và hàm toán học có cấu trúc tương tự ngôn ngữ đổ bóng Shader **HLSL**. Thư viện này được thiết kế tối ưu hóa cho hệ thống lập trình đa luồng (C# Job System) và trình biên dịch Burst Compiler, cho phép thực thi tính toán toán học trên các thanh ghi vector của CPU (công nghệ SIMD - Single Instruction Multiple Data) để đạt hiệu năng xử lý cực hạn.

---

## 🧮 1. Bản chất: UnityEngine.Vector3 vs Unity.Mathematics.float3

Mặc dù cả hai đều biểu diễn vector 3 chiều, bản chất kiến trúc và cách thức lưu trữ trên RAM của chúng hoàn toàn khác nhau:

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

### Chi tiết khác biệt:
1.  **UnityEngine.Vector3:** Thiết kế theo lập trình hướng đối tượng (OOP). Chứa nhiều mã lệnh phụ để tương tác với Editor và các component native C++. Không thể tối ưu hóa sâu bởi Burst Compiler.
2.  **`Unity.Mathematics.float3`:** Thiết kế theo cấu trúc dữ liệu thuần túy (Data-Oriented). Dữ liệu của 3 số thực được xếp liền kề nhau trên bộ nhớ, giúp CPU dễ dàng tải chúng vào thanh ghi SIMD để thực hiện cộng/nhân cả 3 trục cùng lúc chỉ trong 1 chu kỳ máy.

### Các kiểu dữ liệu tương đương:
*   `Vector2` ➔ **`float2`**
*   `Vector3` ➔ **`float3`**
*   `Vector4` ➔ **`float4`**
*   `Quaternion` ➔ **`quaternion`**
*   `Matrix4x4` ➔ **`float4x4`**
*   `int` ➔ **`int`** (hoặc Vector số nguyên: **`int3`**)

---

## ⚙️ 2. Hệ hàm toán học tĩnh (math class)

Thay vì dùng lớp `Mathf` hay `System.Math`, thư viện sử dụng lớp tĩnh **`math`** chứa tất cả các thuật toán tính toán tối ưu:
*   `Mathf.Lerp` ➔ **`math.lerp`**
*   `Mathf.Clamp` ➔ **`math.clamp`**
*   `Mathf.Sin` ➔ **`math.sin`**
*   **`math.mad(a, b, c)`** (Multiply-Add): Tính toán `a * b + c` chỉ trong 1 lệnh phần cứng, cực kỳ nhanh.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là mã nguồn C# thực chiến so sánh hiệu năng khi thực hiện tính toán khoảng cách của 10.000 điểm bằng cách dùng kiểu Vector3 truyền thống vs sử dụng thư viện `Unity.Mathematics` được tối ưu hóa bằng Burst Compiler.

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
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [AssetDatabase & Importer (Quản lý Tài nguyên)](../02-UnityEditor/03-asset-database.md) |
| → Tiếp theo | [Unity.Collections API (Native memory)](./02-collections.md) |
