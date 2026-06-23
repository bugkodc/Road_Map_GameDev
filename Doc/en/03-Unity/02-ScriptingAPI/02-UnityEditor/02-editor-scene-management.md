# Editor Scene Management

> 📖 **Source:** Material compiled and written in detail from the [Unity Scripting Reference — UnityEditor.SceneManagement](https://docs.unity3d.com/ScriptReference/SceneManagement.EditorSceneManager.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

During game development, loading, editing, and saving Scene files (`.unity`) inside the Editor through automated scripts significantly boosts productivity. The **UnityEditor.SceneManagement** subsystem provides the API classes for controlling Scenes in the Editor. Programming Editor Scene Management requires a firm grasp of how to mark changed objects (`SetDirty`), how to manage save flags to prevent data loss, and how to run automated scene validation.

---

## ⚠️ 1. The Essence: Editor vs Runtime Scene Management

*   **`UnityEngine.SceneManagement` (Runtime):** Used only to manage scene transitions while the game is actually running (Load, Unload). It cannot save files, create new files, or edit scene configuration files on disk.
*   **`UnityEditor.SceneManagement` (Editor-only):** Provides the full toolset to dig deep into a Scene's file structure: creating a new empty Scene (`NewScene`), opening a Scene in the Editor (`OpenScene`), saving a Scene (`SaveScene`), and marking changes on a Scene.

---

## 💾 2. The Change-Marking Mechanism (Dirty Flag)

When you edit a property of a Component in a Scene through Editor code (for example, a tool that automatically scatters trees across the ground):
*   **The problem:** The Unity Editor does not automatically detect this change, so it does not trigger the asterisk `*` next to the file name that signals the Scene has been modified. If the user presses Ctrl+S or closes the Unity Editor, the changes made by your code are **lost completely**, because Unity considers the Scene unmodified.
*   **The solution:** You must call **`EditorSceneManager.MarkSceneDirty()`** after making changes through code, forcing Unity to mark the Scene as changed (Dirty). Only then will the system allow those changes to be saved to disk.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is a complete Editor script (which must be placed in an `Editor` folder) that automatically checks whether the Scenes in your project are missing a Main Camera object and automatically fixes the issue.

```csharp
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement; // Namespace quản lý Scene Editor

public class EditorSceneManagementDemo : MonoBehaviour
{
    // Đăng ký menu chạy công cụ tự động kiểm tra
    [MenuItem("Tools/Quản lý Cảnh/Kiểm tra lỗi Scene Hiện Tại")]
    public static void CheckActiveSceneErrors()
    {
        // 1. Lấy thông tin Scene hiện đang mở ở Editor
        UnityEngine.SceneManagement.Scene activeScene = EditorSceneManager.GetActiveScene();
        Debug.Log($"[SceneTool] Đang kiểm tra Scene: {activeScene.name} tại đường dẫn: {activeScene.path}");

        // 2. Tìm kiếm Camera chính
        GameObject mainCamera = GameObject.FindWithTag("MainCamera");

        if (mainCamera == null)
        {
            // Hiển thị hộp thoại cảnh báo người dùng và hỏi ý kiến tự sửa
            bool autoFix = EditorUtility.DisplayDialog(
                "Phát hiện lỗi Scene",
                "Scene hiện tại của bạn không có GameObject nào được gán Tag 'MainCamera'! Bạn có muốn công cụ tự động tạo mới Camera chính không?",
                "Có, Tự Động Sửa",
                "Không"
            );

            if (autoFix)
            {
                // Thực thi tạo camera mới
                GameObject cameraObj = new GameObject("Main Camera");
                Camera cam = cameraObj.AddComponent<Camera>();
                cameraObj.tag = "MainCamera";
                
                // Gán vị trí mặc định cho Camera nhìn màn chơi
                cameraObj.transform.position = new Vector3(0f, 1f, -10f);

                // 3. Bắt buộc: Đăng ký Undo hành động tạo này
                Undo.RegisterCreatedObjectUndo(cameraObj, "Auto Create Main Camera");

                // 4. Bắt buộc: Đánh dấu Scene đã bị chỉnh sửa (Dirty) để kích hoạt dấu sao * cho phép lưu
                EditorSceneManager.MarkSceneDirty(activeScene);
                
                Debug.Log("[SceneTool] Đã tự động tạo mới Main Camera và đánh dấu Dirty Scene.");

                // Hỏi người dùng xem có muốn lưu lại ngay lập tức không
                bool saveImmediately = EditorUtility.DisplayDialog(
                    "Lưu Cảnh",
                    "Bạn có muốn lưu các thay đổi vừa thực hiện vào file Scene ngay lập tức?",
                    "Lưu ngay",
                    "Không"
                );

                if (saveImmediately)
                {
                    // 5. Lưu trực tiếp cảnh đang mở
                    EditorSceneManager.SaveScene(activeScene);
                    Debug.Log("[SceneTool] Đã lưu tệp cảnh thành công lên ổ cứng.");
                }
            }
        }
        else
        {
            EditorUtility.DisplayDialog("Thông báo", "Cảnh của bạn hoàn toàn bình thường, có chứa Main Camera!", "Đóng");
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor Core API](./01-editor-core.md) |
| → Next | [AssetDatabase & Importer](./03-asset-database.md) |
