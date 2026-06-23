# Unity.Hierarchy (Tùy biến Hierarchy)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Hierarchy](https://docs.unity3d.com/ScriptReference/Unity.Hierarchy.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API tùy biến cách hiển thị, phân cấp và sắp xếp thứ tự đối tượng trong cửa sổ Hierarchy.

---

## 🧱 1. Trang trí giao diện Hierarchy chuyên nghiệp

Khi dự án phình to, cửa sổ Hierarchy chứa hàng ngàn vật thể trở nên cực kỳ khó theo dõi. Bằng cách đăng ký sự kiện vẽ giao diện Hierarchy (`hierarchyWindowItemOnGUI`), chúng ta có thể vẽ thêm màu sắc, icon trạng thái, phím bật/tắt nhanh cho GameObject trực tiếp trong cửa sổ Hierarchy.

---

## 📐 2. Tăng hiệu năng vẽ

Việc vẽ giao diện Hierarchy diễn ra liên tục. Đảm bảo mã nguồn vẽ giao diện cực kỳ gọn gàng, tránh tạo rác (GC Alloc) hoặc tìm kiếm component (`GetComponent`) liên tục trong mỗi frame.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Hierarchy`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

[InitializeOnLoad]
public class HierarchyDecorator
{
    static HierarchyDecorator()
    {
        // Đăng ký hàm vẽ trang trí tùy biến cho cửa sổ Hierarchy
        EditorApplication.hierarchyWindowItemOnGUI += DrawCustomItem;
    }

    private static void DrawCustomItem(int instanceID, Rect selectionRect)
    {
        GameObject obj = EditorUtility.InstanceIDToObject(instanceID) as GameObject;
        if (obj != null && obj.CompareTag("Player"))
        {
            // Vẽ một nhãn đỏ nhỏ đánh dấu đối tượng Player trên Hierarchy
            Rect labelRect = new Rect(selectionRect.xMax - 50, selectionRect.y, 45, selectionRect.height);
            GUI.Box(labelRect, "PLAYER", EditorStyles.miniButton);
        }
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.GraphToolkit](graph-toolkit.md) |
| → Tiếp theo | [Unity.IntegerTime](integer-time.md) |
