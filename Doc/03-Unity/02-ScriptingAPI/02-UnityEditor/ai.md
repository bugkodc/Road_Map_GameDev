# UnityEditor.AI (Quản lý NavMesh Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.AI](https://docs.unity3d.com/ScriptReference/UnityEditor.AI.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Quản lý việc nướng bản đồ tìm đường (NavMesh Baking), thiết lập khu vực di chuyển (NavMesh Areas) thông qua Editor Script.

---

## 🧱 1. Tự động hóa nướng NavMesh (Baking NavMesh)

Trong các game thế giới mở được thiết kế theo dạng sinh ngẫu nhiên (Procedural Generation) trong Editor, việc bắt nhà thiết kế phải bấm nút 'Bake' thủ công rất tốn thời gian. Lớp `UnityEditor.AI.NavMeshBuilder` cho phép nướng NavMesh hoàn toàn bằng code.

---

## 📐 2. Nướng NavMesh bất đồng bộ

Sử dụng tiến trình chạy ngầm để nướng bản đồ định vị giúp Unity Editor không bị treo cứng trong quá trình tính toán hình học phức tạp.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.AI`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.AI;

public class NavMeshAutomator
{
    [MenuItem("Tools/Re-Bake Game NavMesh")]
    public static void Bake()
    {
        Debug.Log("[AI.Editor] Đang dọn dẹp NavMesh cũ...");
        NavMeshBuilder.ClearAllNavMeshes();
        
        Debug.Log("[AI.Editor] Đang tính toán nướng NavMesh mới...");
        NavMeshBuilder.BuildNavMeshAsync();
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Advertisements](advertisements.md) |
| → Tiếp theo | [UnityEditor.Analytics](analytics.md) |
