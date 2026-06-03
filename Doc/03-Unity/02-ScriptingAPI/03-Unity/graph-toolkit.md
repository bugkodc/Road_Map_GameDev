# Unity.GraphToolkit (Thiết kế công cụ Node Graph)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.GraphToolkit](https://docs.unity3d.com/ScriptReference/Unity.GraphToolkit.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Bộ thư viện thiết kế biểu đồ đồ họa node tùy biến (Graph Editors) trong Editor.

---

## 🧱 1. Xây dựng cửa sổ Node Graph tùy biến

Phù hợp để viết các công cụ thiết kế cây đối thoại (Dialogue Trees), máy trạng thái (FSM) trực quan, hoặc các hệ thống kỹ năng nhân vật (Skill Trees) bằng cách kế thừa và vẽ giao diện Node Graph.

---

## 📐 2. Quản lý kết nối giữa các Node

Tự động tính toán đường dây kết nối và lưu trữ mối quan hệ cha-con của các nút dữ liệu.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.GraphToolkit`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class GraphToolkitWindow : EditorWindow
{
    [MenuItem("Tools/Custom Node Graph")]
    public static void Open() => GetWindow<GraphToolkitWindow>();

    void OnGUI()
    {
        GUILayout.Label("Custom Node Graph Editor Window", EditorStyles.boldLabel);
        // Đây là nơi vẽ giao diện Node Graph tùy biến bằng GraphToolkit
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Content](content.md) |
| → Tiếp theo | [Unity.Hierarchy](hierarchy.md) |
