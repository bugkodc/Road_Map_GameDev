# Unity.IntegerTime (High-Precision Integer Time)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.IntegerTime](https://docs.unity3d.com/ScriptReference/Unity.IntegerTime.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Measure and manage time using high-precision integers to synchronize animation and physics.

---

## 🧱 1. Overcoming Floating-Point Precision Loss

When a game runs continuously for a long time (for example, an MMO that runs for weeks without restarting), the `float` floating-point type loses precision (Precision Loss). This leads to physics stutter or animation desync.

* **`DiscreteTime`**: Uses an integer time structure to perform time addition and subtraction with 100% accuracy.

---

## 📐 2. Integrating animation synchronization

Applying an integer time structure helps Rhythm Games or networked attacks happen in perfect sync.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code that shows how to program for performance optimization, error handling, and system integration through the `Unity.IntegerTime` subsystem.

```csharp
using UnityEngine;

public class HighPrecisionTimer : MonoBehaviour
{
    void Update()
    {
        // Use high-precision time accumulation to avoid floating-point error
        double preciseTime = Time.timeAsDouble;
        // Perform high-precision time comparisons
        if (preciseTime > 3600.0) // Has been running for over 1 hour continuously
        {
            // Handle synchronization logic without worrying about floating-point drift
        }
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Hierarchy](hierarchy.md) |
| → Next | [Unity.IO](io.md) |
