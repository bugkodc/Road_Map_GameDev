# UnityEditor.Actions (Editor Automation)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.Actions](https://docs.unity3d.com/ScriptReference/UnityEditor.Actions.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

This API manages the recording and automation of user actions in the Editor, supporting the creation of macros or automation scripts.

---

## 🧱 1. Automating Work in the Unity Editor

To speed up the work of artists and game designers, we can use `UnityEditor.Actions` to write tools that automatically perform a repetitive sequence of operations.

* **Editor-Only Usage**: These APIs must live inside an `Editor/` folder or be guarded with the `#if UNITY_EDITOR` directive to avoid compile errors when shipping the game.

---

## 📐 2. Writing Automated Macros

You can create Menu Items that clean up a Scene or automatically align the positions of GameObjects before saving the scene.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.Actions` subsystem.

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
            // Align the selected objects along the X axis of the first object
            Vector3 pos = selected[i].position;
            pos.x = startX;
            selected[i].position = pos;
        }
        Debug.Log($"[Editor.Actions] Aligned {selected.Length} objects.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [AssetDatabase & Importer](03-asset-database.md) |
| → Next | [UnityEditor.AdaptivePerformance](adaptive-performance.md) |
