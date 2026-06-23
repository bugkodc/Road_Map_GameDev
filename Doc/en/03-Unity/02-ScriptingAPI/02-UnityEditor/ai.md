# UnityEditor.AI (NavMesh Editor Management)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.AI](https://docs.unity3d.com/ScriptReference/UnityEditor.AI.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Manage NavMesh baking and set up NavMesh areas through Editor scripts.

---

## 🧱 1. Automating NavMesh Baking

In open-world games designed with procedural generation in the Editor, forcing designers to manually click the 'Bake' button is very time-consuming. The `UnityEditor.AI.NavMeshBuilder` class lets you bake a NavMesh entirely through code.

---

## 📐 2. Asynchronous NavMesh Baking

Use a background process to bake the navigation map so the Unity Editor does not freeze during complex geometry calculations.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.AI` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.AI;

public class NavMeshAutomator
{
    [MenuItem("Tools/Re-Bake Game NavMesh")]
    public static void Bake()
    {
        Debug.Log("[AI.Editor] Cleaning up the old NavMesh...");
        NavMeshBuilder.ClearAllNavMeshes();
        
        Debug.Log("[AI.Editor] Baking the new NavMesh...");
        NavMeshBuilder.BuildNavMeshAsync();
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Advertisements](advertisements.md) |
| → Next | [UnityEditor.Analytics](analytics.md) |
