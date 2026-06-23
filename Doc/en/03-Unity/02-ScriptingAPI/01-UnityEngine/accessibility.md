# UnityEngine.Accessibility

> 📖 **Source:** This document was compiled and written in depth from the [Unity Scripting API — UnityEngine.Accessibility](https://docs.unity3d.com/ScriptReference/UnityEngine.Accessibility.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Provides accessibility APIs for games, integrating with screen readers and special control-key configurations for players with disabilities.

---

## 🧱 1. Integrating Screen Reader & Subtitle Support

In modern game development, accessibility is an important factor that helps reach more groups of players. Unity provides methods through the `UnityEngine.Accessibility` class to optimize the graphical interface and audio for people with disabilities.

* **`VisionUtility`**: Helps analyze interface colors to ensure clear display for color-blind users.
* **`VisionUtility.GetColorBlindSafePalette`**: Automatically generates a color-blind-safe palette (Protanopia, Deuteranopia, Tritanopia).

---

## 📐 2. Configuring Color-Blind Palettes and Subtitles

Creating high-contrast color palettes helps players easily see important interface details. At the same time, combining them with the operating system's color filters ensures the best possible gaming experience.

---

## 🎮 Practical Source Code (Unity C#)

Below is real code showing how to program for performance optimization, error handling, and system integration through the `UnityEngine.Accessibility` subsystem.

```csharp
using UnityEngine;
using UnityEngine.Accessibility;

public class AccessibilityManager : MonoBehaviour
{
    public Renderer uiElementRenderer;

    void Start()
    {
        // Get a color-blind-safe palette
        Color[] safeColors = new Color[5];
        int count = VisionUtility.GetColorBlindSafePalette(safeColors, 0.5f, 1.0f);
        
        if (count > 0 && uiElementRenderer != null)
        {
            // Apply the first safe color to the sample UI element
            uiElementRenderer.material.color = safeColors[0];
            Debug.Log($"[Accessibility] Applied {count} safe colors for the player.");
        }
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright of Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Device](12-device-platforms-api.md) |
| → Next | [UnityEngine.AdaptivePerformance](adaptive-performance.md) |
