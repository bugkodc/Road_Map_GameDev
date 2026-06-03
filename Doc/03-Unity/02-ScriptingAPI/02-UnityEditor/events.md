# UnityEditor.Events (Chỉnh sửa UnityEvent)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Events](https://docs.unity3d.com/ScriptReference/UnityEditor.Events.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API chỉnh sửa cấu hình các hàm sự kiện UnityEvent kéo thả trên Inspector thông qua Editor Scripts.

---

## 🧱 1. Chỉnh sửa sự kiện UnityEvent bằng Code

UnityEvent cho phép thiết lập sự kiện kéo thả cực kỳ trực quan. Tuy nhiên, nếu bạn muốn tự động liên kết các hàm xử lý nút bấm (Button Click) cho 100 màn hình UI một cách tự động, bạn phải sử dụng lớp `UnityEditor.Events.UnityEventTools`.

* **Thao tác lưu trên đĩa**: Các thay đổi cấu hình sự kiện qua mã Editor sẽ được lưu trực tiếp vào file Scene/Prefab.

---

## 📐 2. Cạm bẫy khi sửa sự kiện

Luôn sử dụng `UnityEventTools.AddPersistentListener` thay vì `AddListener` thông thường vì `AddListener` chỉ có tác dụng tạm thời lúc runtime và không được lưu lại trên Prefab.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Events`.

```csharp
using UnityEngine;
using UnityEngine.Events;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Events;
using UnityEngine.UI;

public class UIEventAutomator
{
    public static void LinkButtonEvent(Button button, MonoBehaviour targetScript)
    {
        // Xóa các sự kiện cũ đã liên kết để tránh trùng lặp
        while (button.onClick.GetPersistentEventCount() > 0)
        {
            UnityEventTools.RemovePersistentListener(button.onClick, 0);
        }

        // Tạo lời gọi hàm Action/Method tùy biến khi click nút bấm
        UnityAction methodCall = new UnityAction(targetScript.gameObject.SetActiveToggle);
        UnityEventTools.AddPersistentListener(button.onClick, methodCall);
        
        Debug.Log($"[Events.Editor] Đã tự động liên kết sự kiện Click cho nút bấm trên {button.gameObject.name}.");
    }
}

// Khai báo lớp giả định để mã nguồn biên dịch đúng cấu trúc
public static class EventExtensions
{
    public static void SetActiveToggle(this GameObject go) => go.SetActive(!go.activeSelf);
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.EngineDiagnostics](engine-diagnostics.md) |
| → Tiếp theo | [UnityEditor.Experimental](experimental.md) |
