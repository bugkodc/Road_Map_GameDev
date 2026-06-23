# UnityEngine.Assertions

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Assertions](https://docs.unity3d.com/ScriptReference/UnityEngine.Assertions.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Provides assertion functions (Assert) that help developers catch game logic errors at runtime during testing (for example, enforcing that a Player object is not null when spawned).

---

## 🧱 1. Using Assert to Catch Logic Bugs Early

Assertions (Assert) are an excellent technique for catching faulty logic assumptions early during game development.

* **`Assert.IsNotNull`**: Ensures that a required object exists.
* **`Assert.AreApproximatelyEqual`**: Compares two floating-point numbers while accounting for rounding error.
* **Stripped from Builds**: Assert statements are automatically stripped entirely from the Release Build so they don't affect game performance.

---

## 📐 2. An Important Pitfall

Because Asserts are removed in the Release Build, never put code that changes game state (for example, `Assert.IsTrue(ApplyDamage())`) inside an Assert.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Assertions` subsystem.

```csharp
using UnityEngine;
using UnityEngine.Assertions;

public class PlayerSpawner : MonoBehaviour
{
    public GameObject playerPrefab;

    void Start()
    {
        // Assert that the player prefab must not be null before spawning
        Assert.IsNotNull(playerPrefab, "The Player prefab has not been assigned in the Inspector!");
        
        GameObject player = Instantiate(playerPrefab);
        
        // Assert that the Player's initial health is within a valid range
        int initialHealth = 100;
        Assert.IsTrue(initialHealth > 0, "The Player's initial health must be greater than 0!");
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Assemblies](assemblies.md) |
| → Next | [UnityEngine.Categorization](categorization.md) |
