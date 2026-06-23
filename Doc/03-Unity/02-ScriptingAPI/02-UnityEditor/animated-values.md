# UnityEditor.AnimatedValues (Hiệu ứng giao diện)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.AnimatedValues](https://docs.unity3d.com/ScriptReference/UnityEditor.AnimatedValues.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Các cấu trúc giá trị nội suy động (như AnimFloat, AnimBool) dùng để làm mượt mà các hiệu ứng chuyển đổi giao diện trong Custom Editor Windows.

---

## 🧱 1. Thiết kế Giao diện Editor mượt mà

Khi viết các Custom Editor Window phức tạp, việc các bảng tùy chọn hiển thị/ẩn đột ngột tạo cảm giác giao diện giật cục. Các lớp như `AnimBool` giúp tạo hiệu ứng trượt, mở rộng giao diện cực kỳ chuyên nghiệp thông qua cơ chế cập nhật khung hình liên tục (Repaint).

---

## 📐 2. Sử dụng sự kiện thay đổi giá trị

Đăng ký hàm vẽ lại cửa sổ (`Repaint`) mỗi khi giá trị nội suy thay đổi để đảm bảo hiệu ứng di chuyển diễn ra trơn tru.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.AnimatedValues`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.AnimatedValues;

public class AnimatedEditorWindow : EditorWindow
{
    private AnimBool showExtraSettings;

    [MenuItem("Tools/Animated Window")]
    public static void Open() => GetWindow<AnimatedEditorWindow>();

    void OnEnable()
    {
        showExtraSettings = new AnimBool(false);
        // Vẽ lại cửa sổ mỗi khi giá trị chuyển đổi thay đổi
        showExtraSettings.valueChanged.AddListener(Repaint);
    }

    void OnGUI()
    {
        showExtraSettings.target = EditorGUILayout.Toggle("Hiện tùy chọn nâng cao", showExtraSettings.target);

        // Hiển thị phần giao diện phụ với hiệu ứng trượt mượt mà
        if (EditorGUILayout.BeginFadeGroup(showExtraSettings.faded))
        {
            EditorGUILayout.LabelField("=> Cài đặt bổ sung ở đây...");
        }
        EditorGUILayout.EndFadeGroup();
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Android](android.md) |
| → Tiếp theo | [UnityEditor.Animations](animations.md) |
