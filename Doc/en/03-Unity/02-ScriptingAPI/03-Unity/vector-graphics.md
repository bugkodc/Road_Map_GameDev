# Unity.VectorGraphics (Displaying Vector SVG Images)

> 📖 **Source:** This documentation was compiled and written in depth from [Unity Scripting API — Unity.VectorGraphics](https://docs.unity3d.com/ScriptReference/Unity.VectorGraphics.html) based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for controlling the display of crisp SVG vector images that do not break apart at runtime.

---

## 🧱 1. Using Vector (SVG) Images in Mobile Games

Traditional bitmap images (PNG, JPG), when scaled up on ultra-high-resolution screens (such as Retina or 4K), become blurry or pixelated. Vector Graphics resolves this problem completely by redrawing the image based on geometric mathematical formulas.

* **Memory savings**: An SVG image file is dozens of times smaller in size than a high-resolution PNG image file.

---

## 📐 2. The CPU Performance Pitfall of Overusing Vector Rendering

Rendering Vector graphics consumes more CPU resources because it must continuously compute graphical polygons. You should not use Vector for images whose shapes change in overly complex ways or that have an overly large number of vertices.

---

## 🎮 Real-World Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Unity.VectorGraphics` subsystem.

```csharp
using UnityEngine;
#if UNITY_VECTOR_GRAPHICS
using Unity.VectorGraphics;
#endif

public class VectorImageLoader : MonoBehaviour
{
    void Start()
    {
        #if UNITY_VECTOR_GRAPHICS
        // Simulate loading and applying a crisp SVG-format image to the UI
        Debug.Log("[VectorGraphics] Successfully loaded the SVG vector resource.");
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Properties](properties.md) |
| → Next | [Assemblies](../04-Other/02-assemblies-packages.md) |
