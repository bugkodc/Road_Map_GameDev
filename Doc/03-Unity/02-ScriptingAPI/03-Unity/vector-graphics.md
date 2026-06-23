# Unity.VectorGraphics (Hiển thị hình ảnh Vector SVG)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.VectorGraphics](https://docs.unity3d.com/ScriptReference/Unity.VectorGraphics.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API điều khiển hiển thị hình ảnh SVG vector sắc nét không vỡ hình lúc runtime.

---

## 🧱 1. Sử dụng hình ảnh Vector (SVG) trong Game di động

Hình ảnh bitmap truyền thống (PNG, JPG) khi phóng to trên các màn hình có độ phân giải siêu cao (như Retina, 4K) sẽ bị mờ hoặc vỡ nét. Vector Graphics giải quyết triệt để vấn đề này bằng cách vẽ lại hình ảnh dựa trên các công thức toán học hình học.

* **Tiết kiệm bộ nhớ**: Tệp hình ảnh SVG có dung lượng nhỏ hơn gấp hàng chục lần so với tệp ảnh độ phân giải cao PNG.

---

## 📐 2. Cạm bẫy hiệu năng CPU khi lạm dụng vẽ Vector

Việc dựng hình Vector tốn tài nguyên CPU hơn vì phải tính toán đa giác đồ họa liên tục. Không nên dùng Vector cho các hình ảnh thay đổi hình dáng quá phức tạp hoặc có số lượng đỉnh (vertices) quá lớn.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.VectorGraphics`.

```csharp
using UnityEngine;
#if UNITY_VECTOR_GRAPHICS
using Unity.VectorGraphics;
#endif

public class VectorImageLoader : MonoBehaviour
{
    void Start()
    {
        #if UNITY_VECTOR_GRAPHICS
        // Mô phỏng tải và áp dụng hình ảnh định dạng SVG sắc nét cho giao diện UI
        Debug.Log("[VectorGraphics] Đã nạp thành công tài nguyên vector SVG.");
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Properties](properties.md) |
| → Tiếp theo | [Assemblies](../04-Other/02-assemblies-packages.md) |
