# UnityEditor.EditorTools (Scene Interaction Tools)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.EditorTools](https://docs.unity3d.com/ScriptReference/UnityEditor.EditorTools.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Design custom interactive Editor tools that appear on the main toolbar so you can manipulate objects directly in the Scene View.

---

## 🧱 1. Writing Custom Interactive Tools

By inheriting from the `UnityEditor.EditorTools.EditorTool` class, developers can create highly intuitive tools for editing maps or arranging objects right inside the 3D workspace (Scene View).

* **Handles**: Let you draw custom control circles and arrows that you can drag to change a GameObject's properties.

---

## 📐 2. Integrating with the Main Toolbar

Custom-built tools appear directly on Unity's default move/rotate toolbar so artists can activate them easily.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.EditorTools` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.EditorTools;

[EditorTool("Platform Spacing Tool", typeof(Transform))]
public class CustomPlatformTool : EditorTool
{
    public override void OnToolGUI(EditorWindow window)
    {
        // Draw a custom handle displayed in the Scene View
        Transform targetTransform = (Transform)target;
        
        EditorGUI.BeginChangeCheck();
        Vector3 newPos = Handles.PositionHandle(targetTransform.position, Quaternion.identity);
        
        if (EditorGUI.EndChangeCheck())
        {
            // Allow the user to undo the drag operation just performed
            Undo.RecordObject(targetTransform, "Move Platform via Custom Tool");
            targetTransform.position = newPos;
        }
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.DeviceSimulation](device-simulation.md) |
| → Next | [UnityEditor.Embree](embree.md) |
