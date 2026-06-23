# UnityEngine.Apple

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Apple](https://docs.unity3d.com/ScriptReference/UnityEngine.Apple.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A programming mechanism for deep integration with Apple's operating systems: support for Game Center, iCloud storage, Apple TV, and managing settings specific to iOS/macOS.

---

## 🧱 1. Supporting Apple Platform Features

The `UnityEngine.Apple` namespace provides access to features specific to the Apple platform to improve the gaming experience.

* **iCloud Key-Value Store**: Store compact settings or game progress synced through Apple's cloud.
* **ReplayKit**: Lets players record their gameplay directly from an iOS device and share it easily.

---

## 📐 2. Implementing ReplayKit Safely

Before starting an audio/video recording, use `ReplayKit.APIAvailable` to make sure the player's operating system and device support this feature.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Apple` subsystem.

```csharp
using UnityEngine;
#if UNITY_IOS
using UnityEngine.Apple.ReplayKit;
#endif

public class AppleReplayController : MonoBehaviour
{
    public void StartRecording()
    {
        #if UNITY_IOS
        if (ReplayKit.APIAvailable)
        {
            ReplayKit.StartRecording(true, true);
            Debug.Log("[Apple] Started screen recording via ReplayKit.");
        }
        #endif
    }

    public void StopRecording()
    {
        #if UNITY_IOS
        if (ReplayKit.isRecording)
        {
            ReplayKit.StopRecording();
            Debug.Log("[Apple] Stopped screen recording.");
        }
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Android](android.md) |
| → Next | [UnityEngine.Assemblies](assemblies.md) |
