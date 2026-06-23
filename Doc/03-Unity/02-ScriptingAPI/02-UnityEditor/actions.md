# UnityEditor.Actions (Tự động hóa Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Actions](https://docs.unity3d.com/ScriptReference/UnityEditor.Actions.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý việc ghi nhận và tự động hóa các hành động của người dùng trong Editor phục vụ cho việc tạo macro hoặc viết script tự động hóa.

---

## 🧱 1. Tự động hóa công việc trong Unity Editor

Để tăng tốc độ làm việc cho các họa sĩ thiết kế (Artists) và nhà thiết kế game (Game Designers), chúng ta có thể sử dụng `UnityEditor.Actions` để viết các công cụ tự động thực hiện một chuỗi thao tác lặp đi lặp lại.

* **Sử dụng trong Editor Only**: Các API này phải nằm trong thư mục `Editor/` hoặc được bảo vệ bằng chỉ thị `#if UNITY_EDITOR` để tránh lỗi biên dịch khi xuất bản game.

---

## 📐 2. Viết Macro tự động

Có thể tạo ra các Menu Item để thực hiện dọn dẹp Scene, căn chỉnh vị trí các GameObject tự động trước khi lưu cảnh.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Actions`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class EditorActionAutomation
{
    [MenuItem("Tools/Auto-Align Selected Objects")]
    public static void AlignObjects()
    {
        Transform[] selected = Selection.transforms;
        if (selected.Length < 2) return;

        float startX = selected[0].position.x;
        for (int i = 1; i < selected.Length; i++)
        {
            // Căn thẳng hàng các vật phẩm được chọn theo trục X của vật thể đầu tiên
            Vector3 pos = selected[i].position;
            pos.x = startX;
            selected[i].position = pos;
        }
        Debug.Log($"[Editor.Actions] Đã căn thẳng hàng {selected.Length} vật thể.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [AssetDatabase & Importer](03-asset-database.md) |
| → Tiếp theo | [UnityEditor.AdaptivePerformance](adaptive-performance.md) |
