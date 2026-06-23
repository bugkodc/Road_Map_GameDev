# UnityEditor Core API (Editor Tooling Programming)

> 📖 **Source:** Material compiled and written in detail from the [Unity Scripting Reference — UnityEditor](https://docs.unity3d.com/ScriptReference/Editor.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The **UnityEditor Core API** subsystem lets developers build custom tooling directly inside the Unity Editor to speed up project development. Editor programming requires a solid understanding of the Editor-only compilation mechanism, how to override the way a component is displayed in the Inspector (`CustomEditor`), how to create standalone tool windows (`EditorWindow`), and how to integrate menu shortcuts (`MenuItem`).

---

## ⚠️ 1. Core Principle: Separating Editor and Runtime

Classes in the `UnityEditor` namespace exist only while you are designing your game inside the Unity Editor software. When you package the game into the final product (Build), the entire `UnityEditor` library is **removed completely**.

### Build Error Warning:
If you place code that uses the `Editor` class inside a regular script that runs in the game, you will get the compile error **"The type or namespace name 'UnityEditor' could not be found"** when you build the game.

### How to Avoid It:
1.  **Use the `Editor/` Folder:** Any script file placed inside a folder named exactly `Editor` (anywhere in the project) is implicitly treated by Unity as Editor-only code. Unity will never package these files into the final build.
2.  **Use the `#if UNITY_EDITOR` Preprocessor Directive:** Wrap calls to the Editor API inside normal Runtime scripts to avoid compile errors at build time.

---

## 🛠️ 2. Custom Inspectors & Editor Windows

1.  **Custom Inspector:** Lets you change how a MonoBehaviour component displays its data in the Inspector panel. It is commonly used to draw extra buttons that trigger features directly in the Editor.
2.  **Editor Window:** Creates a standalone floating window like Project, Console, or Hierarchy to manage global data systems (for example: an Item stats manager window or a Level Designer Editor).

---

## 🎮 Hands-on Source Code (Unity C#)

Below are two complete script files demonstrating how to program a Custom Inspector that shows an interactive button and a standalone Custom Editor Window with Undo/Redo support.

### Script 1: A regular Runtime script (placed in `Assets/Scripts/PlayerController.cs`)
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

### Script 2: The Custom Inspector script (must be placed in the `Editor/PlayerControllerEditor.cs` folder)
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

### Script 3: The Custom Editor Window (must be placed in the `Editor/CustomToolWindow.cs` folder)
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
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Device & Platforms API](../01-UnityEngine/12-device-platforms-api.md) |
| → Next | [Editor Scene Management](./02-editor-scene-management.md) |
