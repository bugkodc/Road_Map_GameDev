# Unity.PlayMode (Điều khiển PlayMode trong Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.PlayMode](https://docs.unity3d.com/ScriptReference/Unity.PlayMode.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API điều khiển trạng thái PlayMode (Start, Stop, Pause) trong Editor qua code.

---

## 🧱 1. Tự động hóa quá trình chạy thử Game

Để tự động hóa kiểm thử, chúng ta có thể sử dụng các hàm điều khiển của Editor để tự chuyển trạng thái game từ chỉnh sửa sang chạy thử (`EditorApplication.isPlaying = true`).

---

## 📐 2. Cạm bẫy khi quên lưu

Trước khi kích hoạt PlayMode qua code, hãy luôn đảm bảo đã gọi lưu cảnh (`EditorSceneManager.SaveOpenScenes`) để tránh mất mát dữ liệu thiết kế.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.PlayMode`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class PlayModeAutomator
{
    public static void ForceStartGame()
    {
        if (!EditorApplication.isPlaying)
        {
            Debug.Log("[PlayMode.Editor] Đang tự động lưu cảnh và chạy thử game...");
            EditorApplication.SaveCurrentSceneIfUserWantsTo();
            EditorApplication.isPlaying = true;
        }
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Multiplayer](multiplayer.md) |
| → Tiếp theo | [Unity.Profiling](03-profiling.md) |
