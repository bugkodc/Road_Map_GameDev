# UnityEngine.Assemblies

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Assemblies](https://docs.unity3d.com/ScriptReference/UnityEngine.Assemblies.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A class for managing and querying information about all compiled code assemblies that are loaded and running in RAM at runtime.

---

## 🧱 1. Querying and Reflecting Assemblies at Runtime

This class lets you access information about the structure of code that has been packaged into `.dll` files (Assemblies). It is useful for detecting modding, dynamically loaded plugins, or checking a library's version.

* **Reflection Is Expensive**: Reflection lookups over an Assembly consume CPU and memory (GC Alloc), so they should be done only once when the game starts (Awake/Start).

---

## 📐 2. Performance Pitfalls

Avoid scanning every Type across all Assemblies at runtime. Use an attribute-tagging mechanism (Attribute) to mark the classes you want to find, which speeds up the scan.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Assemblies` subsystem.

```csharp
using System;
using UnityEngine;

public class AssemblyInspector : MonoBehaviour
{
    void Start()
    {
        // Get the list of Assemblies running in the AppDomain
        var assemblies = AppDomain.CurrentDomain.GetAssemblies();
        Debug.Log($"[Assemblies] Total assemblies running: {assemblies.Length}");
        
        foreach (var assembly in assemblies)
        {
            if (assembly.FullName.Contains("Assembly-CSharp"))
            {
                Debug.Log($"[Assemblies] Found the main assembly: {assembly.FullName}");
                break;
            }
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Apple](apple.md) |
| → Next | [UnityEngine.Assertions](assertions.md) |
