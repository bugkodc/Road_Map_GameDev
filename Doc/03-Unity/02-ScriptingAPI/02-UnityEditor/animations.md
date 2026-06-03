# UnityEditor.Animations (Chỉnh sửa Animator qua code)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Animations](https://docs.unity3d.com/ScriptReference/UnityEditor.Animations.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API cho phép chỉnh sửa, tạo mới và cấu hình Animator Controllers, Blend Trees, State Machine Transitions hoàn toàn bằng code C# Editor.

---

## 🧱 1. Tự động hóa sinh cấu trúc Hoạt ảnh

Với các nhân vật có hàng trăm hoạt ảnh khác nhau (ví dụ: game đối kháng hoặc game thể thao), việc kéo thả thủ công từng hoạt ảnh vào cửa sổ Animator rất dễ nhầm lẫn. Lớp `UnityEditor.Animations.AnimatorController` cho phép xây dựng cây trạng thái hoạt ảnh (State Machine) bằng code.

---

## 📐 2. Cấu hình chuyển cảnh tự động (Transitions)

Tự động thiết lập thời gian hòa trộn hoạt ảnh (Transition Duration) và các điều kiện chuyển đổi (Parameters) của Animator.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Animations`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Animations;

public class AnimatorGenerator
{
    [MenuItem("Tools/Create Custom Animator")]
    public static void CreateAnimator()
    {
        // Tạo mới file Animator Controller trên ổ đĩa
        var controller = AnimatorController.CreateAnimatorControllerAtPath("Assets/PlayerAnimator.controller");
        
        // Thêm tham số điều khiển loại Float
        controller.AddParameter("Speed", AnimatorControllerParameterType.Float);
        
        // Lấy State Machine gốc và thêm trạng thái "Idle"
        var rootStateMachine = controller.layers[0].stateMachine;
        var idleState = rootStateMachine.AddState("Idle");
        
        Debug.Log($"[Animations.Editor] Đã tạo Animator Controller tự động tại: {AssetDatabase.GetAssetPath(controller)}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.AnimatedValues](animated-values.md) |
| → Tiếp theo | [UnityEditor.AppleTV](apple-tv.md) |
