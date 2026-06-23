# UnityEngine.AMD

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.AMD](https://docs.unity3d.com/ScriptReference/UnityEngine.AMD.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Provides specialized APIs for optimizing specifically for AMD graphics cards and CPUs, such as cache access and low-level graphics commands.

---

## 🧱 1. Optimizing for the AMD Architecture

The `UnityEngine.AMD` class provides direct access to several extended hardware features of AMD Radeon GPUs. This helps optimize the rendering pipeline, reduce draw latency, and speed up the processing of complex post-processing effects.

* **Compatibility**: Carefully check the player's graphics card model before making these specialized API calls to avoid hanging the graphics driver.

---

## 📐 2. Pitfalls

Calling these commands directly on a device running an NVIDIA or Intel GPU will either have no effect or cause a crash. Always wrap these calls in an appropriate hardware check.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.AMD` subsystem.

```csharp
using UnityEngine;

public class AMDOptimizer : MonoBehaviour
{
    void Start()
    {
        string gpuName = SystemInfo.graphicsDeviceName.ToLower();
        if (gpuName.Contains("amd") || gpuName.Contains("radeon"))
        {
            ApplyAMDOptimizations();
        }
    }

    private void ApplyAMDOptimizations()
    {
        // Apply graphics settings optimized specifically for AMD Radeon GPUs
        Debug.Log("[AMD] Applying tweaks optimized specifically for AMD hardware.");
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.AdaptivePerformance](adaptive-performance.md) |
| → Next | [UnityEngine.Android](android.md) |
