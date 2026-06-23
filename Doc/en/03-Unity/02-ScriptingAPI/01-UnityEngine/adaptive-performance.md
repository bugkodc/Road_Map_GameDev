# UnityEngine.AdaptivePerformance

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.AdaptivePerformance](https://docs.unity3d.com/ScriptReference/UnityEngine.AdaptivePerformance.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for adaptive performance management that lets a game automatically detect a mobile device's thermal state and CPU/GPU overload, so it can adjust its graphics to keep FPS stable and save battery.

---

## 🧱 1. How Adaptive Performance Works

Adaptive Performance lets a game communicate directly with the mobile device's operating system (especially Samsung Android) to monitor:
* **Thermal Warning Level**: How hot the device is getting.
* **CPU/GPU Bottleneck**: Whether the bottleneck lies in the CPU or the GPU.

Based on these metrics, the game can proactively lower the resolution, reduce shadow quality, or cap the FPS at a lower value to prevent a sudden performance drop caused by the device overheating (Thermal Throttling).

---

## 📐 2. How Performance Is Adjusted Automatically

By subscribing to thermal-state change events, a developer can dynamically change graphics quality settings (`QualitySettings`) or the resolution scale (`ScalableBufferManager`) at runtime.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.AdaptivePerformance` subsystem.

```csharp
using UnityEngine;
#if UNITY_ADAPTIVEPERFORMANCE
using UnityEngine.AdaptivePerformance;
#endif

public class PerformanceAdapter : MonoBehaviour
{
#if UNITY_ADAPTIVEPERFORMANCE
    private IAdaptivePerformance ap;

    void Start()
    {
        ap = Holder.Instance;
        if (ap != null && ap.Active)
        {
            ap.ThermalStatus.ThermalEvent += OnThermalChange;
        }
    }

    private void OnThermalChange(ThermalStatusEventArgs ev)
    {
        if (ev.ThermalWarningLevel == ThermalWarningLevel.Warning)
        {
            // The device is starting to heat up -> Reduce graphics quality
            QualitySettings.SetQualityLevel(0, true); // Switch to Low
            Application.targetFrameRate = 30; // Cap the FPS
            Debug.LogWarning("[AdaptivePerformance] Device is hot! Lowered settings to Low.");
        }
    }
#endif
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Accessibility](accessibility.md) |
| → Next | [UnityEngine.AMD](amd.md) |
