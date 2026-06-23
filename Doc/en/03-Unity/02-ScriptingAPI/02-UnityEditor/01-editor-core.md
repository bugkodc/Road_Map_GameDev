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
        Debug.Log("[Player] Restored default stats!");
    }
}
```

### Script 2: The Custom Inspector script (must be placed in the `Editor/PlayerControllerEditor.cs` folder)
```csharp
using UnityEngine;
using UnityEditor; // Editor-only namespace

// Declare this class as the custom inspector for PlayerController
[CustomEditor(typeof(PlayerController))]
public class PlayerControllerEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // 1. Draw the object's original default inspector
        DrawDefaultInspector();

        // Get a reference to the object currently shown in the Inspector
        PlayerController player = (PlayerController)target;

        // Draw a separating space
        EditorGUILayout.Space();
        
        // Draw the tool group heading
        EditorGUILayout.LabelField("CUSTOM EDITOR TOOLS", EditorStyles.boldLabel);

        // 2. Create a button in the Inspector that triggers a method in the Script
        if (GUILayout.Button("Reset player stats"))
        {
            // Register the action with Unity's Undo system before changing the data
            Undo.RecordObject(player, "Reset Player Stats");
            
            player.ResetStats();
            
            // Force the Unity Editor to refresh the displayed UI immediately
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
    private string spawnName = "Random Enemy";
    private GameObject prefabToSpawn;

    // Register a MenuItem that creates a shortcut to open the window from the Unity toolbar
    [MenuItem("Tools/Quick Object Spawner")]
    public static void ShowWindow()
    {
        // Create the window or fetch the one already on screen
        GetWindow<CustomToolWindow>("Spawn Object");
    }

    // Draw the UI inside the Window
    private void OnGUI()
    {
        GUILayout.Label("Object spawn configuration", EditorStyles.boldLabel);

        spawnName = EditorGUILayout.TextField("Object name:", spawnName);
        prefabToSpawn = (GameObject)EditorGUILayout.ObjectField("Source prefab:", prefabToSpawn, typeof(GameObject), false);

        if (GUILayout.Button("Spawn object into Scene"))
        {
            if (prefabToSpawn == null)
            {
                EditorUtility.DisplayDialog("Error", "Please drag and drop a Prefab before spawning!", "Close");
                return;
            }

            // 1. Create the new object in the Scene
            GameObject newObj = (GameObject)PrefabUtility.InstantiatePrefab(prefabToSpawn);
            newObj.name = spawnName;
            
            // Make the object appear in front of the active Editor Camera view
            if (SceneView.lastActiveSceneView != null)
            {
                newObj.transform.position = SceneView.lastActiveSceneView.pivot;
            }

            // 2. Register the newly created object into the Undo list
            Undo.RegisterCreatedObjectUndo(newObj, "Spawn Object from Window");

            // Automatically select the newly created object in the Hierarchy
            Selection.activeGameObject = newObj;
            
            Debug.Log($"[EditorTool] Successfully spawned object: {newObj.name}");
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
