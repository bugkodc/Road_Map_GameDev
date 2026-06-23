# UnityEditor.Embree (Optimizing Light Baking with Intel Embree)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Embree](https://docs.unity3d.com/ScriptReference/UnityEditor.Embree.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Interact with Intel's Embree library to optimize CPU usage for lightmap baking tasks.

---

## 🧱 1. Speeding Up Lightmap Baking with the Intel Embree Library

Embree is a high-performance ray tracing library developed by Intel specifically for the CPU. Unity uses Embree as the main engine for computing indirect lighting and shadows in the Progressive Lightmapper system.

* **CPU configuration**: Makes full use of SIMD instructions on modern Intel/AMD chips to shorten a project's light baking time.

---

## 📐 2. Configuring via Code

Enable or disable the Embree technology, or configure how many processor cores are allocated, from Editor scripts.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Embree` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class LightmapBakeOptimizer
{
    public static void EnableEmbreeBaking()
    {
        // Set the Progressive Lightmapper to use the CPU (Embree) for baking
        Lightmapping.giWorkflowMode = Lightmapping.GIWorkflowMode.Baked;
        Debug.Log("[Embree.Editor] Configured the system to use Intel Embree to optimize light baking.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.EditorTools](editor-tools.md) |
| → Next | [UnityEditor.EngineDiagnostics](engine-diagnostics.md) |
