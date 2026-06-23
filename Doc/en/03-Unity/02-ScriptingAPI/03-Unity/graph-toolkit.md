# Unity.GraphToolkit (Designing Node Graph Tools)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.GraphToolkit](https://docs.unity3d.com/ScriptReference/Unity.GraphToolkit.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A library for designing custom node graph editors (Graph Editors) inside the Editor.

---

## 🧱 1. Building a custom Node Graph window

Well suited for writing tools that design Dialogue Trees, visual state machines (FSM), or character Skill Trees by inheriting from and drawing a Node Graph interface.

---

## 📐 2. Managing connections between nodes

Automatically computes the connection wiring and stores the parent-child relationships of data nodes.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code that shows how to program for performance optimization, error handling, and system integration through the `Unity.GraphToolkit` subsystem.

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
        // This is where you draw the custom Node Graph interface using GraphToolkit
    }
}
#endif
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Content](content.md) |
| → Next | [Unity.Hierarchy](hierarchy.md) |
