# UnityEngine.Experimental

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Experimental](https://docs.unity3d.com/ScriptReference/UnityEngine.Experimental.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A namespace that holds Unity libraries and APIs that are still in the experimental phase (Experimental). They may be officially integrated or removed entirely in later updates.

---

## 🧱 1. Working with Experimental APIs

Unity often introduces new technologies into the `UnityEngine.Experimental` namespace. This is where you find extremely appealing features that are not yet fully optimized or whose programming interface (API) has not been finalized.

* **Stability Warning**: An API's syntax can change completely in the next Unity version, requiring developers to rewrite their code.

---

## 📐 2. A Safe Usage Strategy

Always wrap experimental code in preprocessor directives (#if) or create wrapper classes (Wrapper) so you can easily switch to the official API once it leaves the experimental phase.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Experimental` subsystem.

```csharp
using UnityEngine;
// Note: Experimental APIs may change depending on the Unity version
using UnityEngine.Experimental.Rendering;

public class ExperimentalFeatureTest : MonoBehaviour
{
    void Start()
    {
        // Example: check whether an experimental texture format is supported by the hardware
        bool isSupported = SystemInfo.IsFormatSupported(GraphicsFormat.R8G8B8A8_SRGB, FormatUsage.Sample);
        Debug.Log($"[Experimental] Is the experimental SRGB format supported: {isSupported}");
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Diagnostics](diagnostics.md) |
| → Next | [UnityEngine.Identifiers](identifiers.md) |
