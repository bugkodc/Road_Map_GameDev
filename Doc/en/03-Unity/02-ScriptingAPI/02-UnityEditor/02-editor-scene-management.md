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
using UnityEditor.SceneManagement; // Namespace for managing the Scene Editor

public class EditorSceneManagementDemo : MonoBehaviour
{
    // Register a menu entry that runs the automatic validation tool
    [MenuItem("Tools/Scene Management/Check Current Scene Errors")]
    public static void CheckActiveSceneErrors()
    {
        // 1. Get information about the Scene currently open in the Editor
        UnityEngine.SceneManagement.Scene activeScene = EditorSceneManager.GetActiveScene();
        Debug.Log($"[SceneTool] Checking Scene: {activeScene.name} at path: {activeScene.path}");

        // 2. Search for the main Camera
        GameObject mainCamera = GameObject.FindWithTag("MainCamera");

        if (mainCamera == null)
        {
            // Show a dialog warning the user and asking for permission to auto-fix
            bool autoFix = EditorUtility.DisplayDialog(
                "Scene Error Detected",
                "Your current Scene has no GameObject assigned the 'MainCamera' Tag! Do you want the tool to automatically create a new main Camera?",
                "Yes, Auto-Fix",
                "No"
            );

            if (autoFix)
            {
                // Execute creation of the new camera
                GameObject cameraObj = new GameObject("Main Camera");
                Camera cam = cameraObj.AddComponent<Camera>();
                cameraObj.tag = "MainCamera";
                
                // Assign a default position for the Camera viewing the level
                cameraObj.transform.position = new Vector3(0f, 1f, -10f);

                // 3. Required: Register Undo for this creation action
                Undo.RegisterCreatedObjectUndo(cameraObj, "Auto Create Main Camera");

                // 4. Required: Mark the Scene as modified (Dirty) to trigger the asterisk * that allows saving
                EditorSceneManager.MarkSceneDirty(activeScene);
                
                Debug.Log("[SceneTool] Automatically created a new Main Camera and marked the Scene Dirty.");

                // Ask the user whether they want to save immediately
                bool saveImmediately = EditorUtility.DisplayDialog(
                    "Save Scene",
                    "Do you want to save the changes you just made into the Scene file immediately?",
                    "Save now",
                    "No"
                );

                if (saveImmediately)
                {
                    // 5. Directly save the currently open scene
                    EditorSceneManager.SaveScene(activeScene);
                    Debug.Log("[SceneTool] Successfully saved the scene file to disk.");
                }
            }
        }
        else
        {
            EditorUtility.DisplayDialog("Notice", "Your Scene is completely fine and contains a Main Camera!", "Close");
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
