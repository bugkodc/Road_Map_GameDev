# UnityEditor.EditorTools (Công cụ tương tác Scene)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.EditorTools](https://docs.unity3d.com/ScriptReference/UnityEditor.EditorTools.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Thiết kế các công cụ tương tác trực quan (Custom Editor Tools) hiển thị trên thanh công cụ chính để thao tác trực tiếp với vật thể ở Scene View.

---

## 🧱 1. Viết công cụ tương tác trực quan tùy biến

Bằng cách kế thừa lớp `UnityEditor.EditorTools.EditorTool`, lập trình viên có thể tạo ra các công cụ chỉnh sửa bản đồ hoặc sắp xếp đối tượng cực kỳ trực quan ngay trong cửa sổ làm việc 3D (Scene View).

* **Tay cầm điều hướng (Handles)**: Cho phép vẽ thêm các đường tròn, mũi tên điều khiển tùy biến để kéo thả thay đổi thuộc tính của GameObject.

---

## 📐 2. Tích hợp thanh công cụ chính

Các công cụ tự thiết kế sẽ xuất hiện trực tiếp trên thanh công cụ di chuyển/xoay mặc định của Unity Editor để họa sĩ dễ dàng kích hoạt.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.EditorTools`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.EditorTools;

[EditorTool("Platform Spacing Tool", typeof(Transform))]
public class CustomPlatformTool : EditorTool
{
    public override void OnToolGUI(EditorWindow window)
    {
        // Vẽ tay cầm tùy biến hiển thị trong Scene View
        Transform targetTransform = (Transform)target;
        
        EditorGUI.BeginChangeCheck();
        Vector3 newPos = Handles.PositionHandle(targetTransform.position, Quaternion.identity);
        
        if (EditorGUI.EndChangeCheck())
        {
            // Cho phép người dùng undo thao tác kéo thả vừa rồi
            Undo.RecordObject(targetTransform, "Move Platform via Custom Tool");
            targetTransform.position = newPos;
        }
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.DeviceSimulation](device-simulation.md) |
| → Tiếp theo | [UnityEditor.Embree](embree.md) |
