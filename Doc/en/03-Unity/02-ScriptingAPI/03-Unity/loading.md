# Unity.Loading (Data loading stream management)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.Loading](https://docs.unity3d.com/ScriptReference/Unity.Loading.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for controlling the loading and decompression of data in RAM at runtime.

---

## 🧱 1. Optimizing Loading Screens

The `Unity.Loading` subsystem lets you control the order in which assets are decompressed and configure a CPU-bandwidth limit for scene loading, so the game keeps a smooth frame rate even while loading a new map in the background.

---

## 📐 2. Configuring buffer size

Adjust the file-loading buffer size (Background Loading Priority) to prioritize either maximum load speed or game smoothness.

---

## 🎮 Hands-on source code (Unity C#)

Below is a real code example showing how to program for performance optimization, error handling, and system integration through the `Unity.Loading` subsystem.

```csharp
using UnityEngine;

public class LoadingSpeedAdjuster : MonoBehaviour
{
    void Start()
    {
        // Set the background data loading priority to the highest level
        Application.backgroundLoadingPriority = ThreadPriority.High;
        Debug.Log("[Loading] Đã đặt mức ưu tiên nạp tài nguyên chạy nền sang High để rút ngắn thời gian load.");
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Jobs](jobs.md) |
| → Next | [Unity.Mathematics](01-mathematics.md) |
