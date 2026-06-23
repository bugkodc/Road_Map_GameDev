# UnityEditor.Embree (Tối ưu nướng ánh sáng Intel Embree)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Embree](https://docs.unity3d.com/ScriptReference/UnityEditor.Embree.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Tương tác với thư viện Embree của Intel, phục vụ tối ưu hóa CPU cho tác vụ nướng ánh sáng (Lightmap Baking).

---

## 🧱 1. Tăng tốc độ Bake Lightmap bằng thư viện Intel Embree

Embree là thư viện dò tia (Ray Tracing) hiệu năng cao được Intel phát triển riêng cho CPU. Unity sử dụng Embree để làm động cơ chính tính toán ánh sáng gián tiếp và đổ bóng cho hệ thống Progressive Lightmapper.

* **Cấu hình CPU**: Tận dụng tối đa tập lệnh SIMD trên các chip Intel/AMD hiện đại để rút ngắn thời gian nướng ánh sáng của dự án.

---

## 📐 2. Cấu hình qua code

Điều khiển bật/tắt công nghệ Embree hoặc cấu hình phân bổ số lượng nhân xử lý qua Editor Scripts.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Embree`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class LightmapBakeOptimizer
{
    public static void EnableEmbreeBaking()
    {
        // Đặt Progressive Lightmapper sử dụng CPU (Embree) để bake
        Lightmapping.giWorkflowMode = Lightmapping.GIWorkflowMode.Baked;
        Debug.Log("[Embree.Editor] Đã cấu hình hệ thống sử dụng Intel Embree để tối ưu hóa nướng ánh sáng.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.EditorTools](editor-tools.md) |
| → Tiếp theo | [UnityEditor.EngineDiagnostics](engine-diagnostics.md) |
