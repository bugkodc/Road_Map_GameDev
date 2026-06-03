# UnityEditor Core API (Lập trình Công cụ Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEditor](https://docs.unity3d.com/ScriptReference/Editor.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Phân hệ **UnityEditor Core API** cho phép nhà phát triển xây dựng các công cụ tùy biến (Custom Tooling) trực tiếp bên trong Unity Editor để tăng tốc độ phát triển dự án. Lập trình Editor yêu cầu hiểu rõ cơ chế biên dịch loại trừ (Editor-only), cách viết lại giao diện hiển thị component ở Inspector (`CustomEditor`), tạo cửa sổ chức năng độc lập (`EditorWindow`), và tích hợp phím tắt menu (`MenuItem`).

---

## ⚠️ 1. Nguyên tắc cốt lõi: Tách biệt Editor và Runtime

Các lớp trong namespace `UnityEditor` chỉ tồn tại trong quá trình bạn thiết kế game bên trong phần mềm Unity Editor. Khi đóng gói game thành sản phẩm cuối (Build), toàn bộ thư viện `UnityEditor` sẽ bị **loại bỏ hoàn toàn**.

### Cảnh báo lỗi Build:
Nếu bạn đặt code sử dụng lớp `Editor` bên trong một file script thông thường chạy trong game, bạn sẽ nhận được lỗi biên dịch **"The type or namespace name 'UnityEditor' could not be found"** khi tiến hành build game.

### Cách phòng tránh:
1.  **Sử dụng Thư mục `Editor/`:** Bất kỳ file script nào đặt trong một thư mục có tên chính xác là `Editor` (ở bất kỳ vị trí nào trong dự án) đều được Unity ngầm hiểu là mã Editor-only. Unity sẽ không bao giờ đóng gói các file này vào bản build chính thức.
2.  **Sử dụng cờ tiền xử lý `#if UNITY_EDITOR`:** Bao quanh các hàm gọi API Editor trong các Script Runtime bình thường để tránh lỗi biên dịch lúc build.

---

## 🛠️ 2. Custom Inspectors & Editor Windows

1.  **Custom Inspector (Tùy biến bảng thuộc tính):** Cho phép thay đổi cách một Component MonoBehaviour hiển thị dữ liệu trong bảng Inspector. Thường được sử dụng để vẽ thêm nút bấm kích hoạt tính năng trực tiếp trong Editor.
2.  **Editor Window (Cửa sổ chức năng):** Tạo một cửa sổ nổi độc lập giống như Project, Console hay Hierarchy để quản lý hệ thống dữ liệu toàn cục (ví dụ: cửa sổ quản lý chỉ số Item, Level Designer Editor).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là hai file script hoàn chỉnh thể hiện cách lập trình Custom Inspector hiển thị nút bấm tương tác và một Custom Editor Window độc lập có hỗ trợ Undo/Redo.

### Script 1: Script Runtime thông thường (Đặt trong `Assets/Scripts/PlayerController.cs`)
```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public int health = 100;
    public int ammo = 30;

    public void ResetStats()
    {
        health = 100;
        ammo = 30;
        Debug.Log("[Player] Đã hồi phục các chỉ số mặc định!");
    }
}
```

### Script 2: Script Custom Inspector (Bắt buộc đặt trong thư mục `Editor/PlayerControllerEditor.cs`)
```csharp
using UnityEngine;
using UnityEditor; // Namespace Editor-only

// Chỉ định class này là trình tùy biến hiển thị cho PlayerController
[CustomEditor(typeof(PlayerController))]
public class PlayerControllerEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // 1. Vẽ giao diện mặc định ban đầu của đối tượng
        DrawDefaultInspector();

        // Lấy tham chiếu đến đối tượng đang hiển thị ở Inspector
        PlayerController player = (PlayerController)target;

        // Vẽ một khoảng trống phân cách
        EditorGUILayout.Space();
        
        // Vẽ tiêu đề nhóm công cụ
        EditorGUILayout.LabelField("CÔNG CỤ EDITOR TÙY BIẾN", EditorStyles.boldLabel);

        // 2. Tạo một nút bấm ở Inspector kích hoạt hàm trong Script
        if (GUILayout.Button("Đặt lại chỉ số người chơi"))
        {
            // Đăng ký sự kiện với hệ thống Undo của Unity trước khi thay đổi dữ liệu
            Undo.RecordObject(player, "Reset Player Stats");
            
            player.ResetStats();
            
            // Ép Unity Editor cập nhật giao diện hiển thị ngay lập tức
            EditorUtility.SetDirty(player);
        }
    }
}
```

### Script 3: Custom Editor Window (Bắt buộc đặt trong thư mục `Editor/CustomToolWindow.cs`)
```csharp
using UnityEngine;
using UnityEditor;

public class CustomToolWindow : EditorWindow
{
    private string spawnName = "Kẻ địch ngẫu nhiên";
    private GameObject prefabToSpawn;

    // Đăng ký mục MenuItem tạo phím tắt mở cửa sổ từ thanh công cụ Unity
    [MenuItem("Tools/Bộ Tạo Vật Thể Nhanh")]
    public static void ShowWindow()
    {
        // Tạo hoặc lấy cửa sổ đang có sẵn trên màn hình
        GetWindow<CustomToolWindow>("Tạo Vật Thể");
    }

    // Vẽ giao diện bên trong Window
    private void OnGUI()
    {
        GUILayout.Label("Cấu hình thiết lập tạo vật thể", EditorStyles.boldLabel);

        spawnName = EditorGUILayout.TextField("Tên đối tượng:", spawnName);
        prefabToSpawn = (GameObject)EditorGUILayout.ObjectField("Prefab nguồn:", prefabToSpawn, typeof(GameObject), false);

        if (GUILayout.Button("Tạo vật thể vào Scene"))
        {
            if (prefabToSpawn == null)
            {
                EditorUtility.DisplayDialog("Lỗi", "Vui lòng kéo thả Prefab trước khi tạo!", "Đóng");
                return;
            }

            // 1. Tạo đối tượng mới trong Scene
            GameObject newObj = (GameObject)PrefabUtility.InstantiatePrefab(prefabToSpawn);
            newObj.name = spawnName;
            
            // Cho đối tượng xuất hiện trước Camera Editor đang nhìn
            if (SceneView.lastActiveSceneView != null)
            {
                newObj.transform.position = SceneView.lastActiveSceneView.pivot;
            }

            // 2. Đăng ký đối tượng mới tạo vào danh sách Undo
            Undo.RegisterCreatedObjectUndo(newObj, "Spawn Object from Window");

            // Tự động chọn đối tượng mới tạo ở Hierarchy
            Selection.activeGameObject = newObj;
            
            Debug.Log($"[EditorTool] Đã tạo thành công đối tượng: {newObj.name}");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Device & Platforms API (Thiết bị & Nền tảng)](../01-UnityEngine/12-device-platforms-api.md) |
| → Tiếp theo | [Editor Scene Management (Quản lý cảnh ở Editor)](./02-editor-scene-management.md) |
