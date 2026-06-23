# UnityEditor.Experimental (Tính năng Editor thử nghiệm)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Experimental](https://docs.unity3d.com/ScriptReference/UnityEditor.Experimental.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Không gian chứa các API Editor đang thử nghiệm của Unity, có thể thay đổi trong các phiên bản tương lai.

---

## 🧱 1. Thử nghiệm các công cụ Editor mới

Các công cụ giao diện UI mới (như các cải tiến của UI Builder hoặc cơ chế dựng Layout tự động nâng cao) thường được xếp vào thư mục thử nghiệm. Lập trình viên nên tự thiết kế các lớp trung gian (Interface) để tránh phụ thuộc quá sâu vào chúng.

---

## 📐 2. Cạm bẫy khi nâng cấp phiên bản

Việc nâng cấp bản vá lỗi (Patch Update) của Unity Editor có thể làm gãy các mã gọi API Experimental này mà không hề báo trước.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Experimental`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Experimental;

public class ExperimentalEditorToolWindow : EditorWindow
{
    [MenuItem("Tools/Experimental Window")]
    public static void Open()
    {
        GetWindow<ExperimentalEditorToolWindow>();
    }

    void OnGUI()
    {
        // Ví dụ minh họa sử dụng các tính năng thử nghiệm trong giao diện tùy biến
        GUILayout.Label("Tính năng Editor thử nghiệm đang được hiển thị ở đây.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Events](events.md) |
| → Tiếp theo | [Unity.Android](../03-Unity/android.md) |
