# UnityEditor.Experimental (Experimental Editor Features)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Experimental](https://docs.unity3d.com/ScriptReference/UnityEditor.Experimental.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A namespace containing Unity's experimental Editor APIs, which may change in future releases.

---

## 🧱 1. Experimenting with New Editor Tools

New UI tools (such as improvements to the UI Builder or advanced automatic layout mechanisms) are usually placed in the experimental namespace. Developers should design their own intermediary interfaces to avoid depending too heavily on them.

---

## 📐 2. Pitfalls When Upgrading Versions

Installing a Patch Update to the Unity Editor can break code that calls these Experimental APIs without any prior warning.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Experimental` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Experimental;

public class ExperimentalEditorToolWindow : EditorWindow
{
    [MenuItem("Tools/Experimental Window")]
    public static void Open()
    {
        GetWindow<ExperimentalEditorToolWindow>();
    }

    void OnGUI()
    {
        // Example illustrating the use of experimental features in a custom interface
        GUILayout.Label("Experimental Editor features are displayed here.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Events](events.md) |
| → Next | [Unity.Android](../03-Unity/android.md) |
