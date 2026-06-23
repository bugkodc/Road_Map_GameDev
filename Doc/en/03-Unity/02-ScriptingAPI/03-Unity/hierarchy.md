# Unity.Hierarchy (Customizing the Hierarchy)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.Hierarchy](https://docs.unity3d.com/ScriptReference/Unity.Hierarchy.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for customizing how objects are displayed, nested, and ordered in the Hierarchy window.

---

## 🧱 1. Decorating the Hierarchy interface professionally

As a project grows large, a Hierarchy window containing thousands of objects becomes extremely hard to track. By subscribing to the Hierarchy drawing event (`hierarchyWindowItemOnGUI`), we can draw additional colors, status icons, and quick toggle buttons for a GameObject directly in the Hierarchy window.

---

## 📐 2. Improving drawing performance

Drawing the Hierarchy interface happens continuously. Make sure the drawing code is extremely lean, avoiding garbage (GC Alloc) or repeated component lookups (`GetComponent`) on every frame.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code that shows how to program for performance optimization, error handling, and system integration through the `Unity.Hierarchy` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

[InitializeOnLoad]
public class HierarchyDecorator
{
    static HierarchyDecorator()
    {
        // Register a custom decoration drawing function for the Hierarchy window
        EditorApplication.hierarchyWindowItemOnGUI += DrawCustomItem;
    }

    private static void DrawCustomItem(int instanceID, Rect selectionRect)
    {
        GameObject obj = EditorUtility.InstanceIDToObject(instanceID) as GameObject;
        if (obj != null && obj.CompareTag("Player"))
        {
            // Draw a small red label marking the Player object in the Hierarchy
            Rect labelRect = new Rect(selectionRect.xMax - 50, selectionRect.y, 45, selectionRect.height);
            GUI.Box(labelRect, "PLAYER", EditorStyles.miniButton);
        }
    }
}
#endif
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.GraphToolkit](graph-toolkit.md) |
| → Next | [Unity.IntegerTime](integer-time.md) |
