# Structs (Value-Type Structures)

> 📖 **Source:** This document is compiled and written in depth based on [Unity Scripting API — Structs](https://docs.unity3d.com/ScriptReference/Structs.html), targeting the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A consolidated catalog and reference for the mathematical and system value-type structures (Structs).

---

## 🧱 1. Optimizing Memory with Structs (Value Types)

Unlike a class (a reference type allocated on the heap and managed by the Garbage Collector), a struct is a value type allocated directly on the stack.

* **Saving GC Alloc**: Using structs for small, short-lived objects helps the game avoid stutters caused by the garbage collector (GC) constantly cleaning up memory.
* **Immutability**: It is best to design structs as immutable (ReadOnly) to avoid logic errors from unintended value assignments.

---

## 📐 2. The Data-Copying Pitfall

When you pass a struct into a function, all of the struct's data is copied. If the struct is too large (more than 16 bytes), this copying will hurt performance. Use the `ref` or `in` keyword to pass the struct by reference.

---

## 🎮 Hands-On Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Structs` subsystem.

```csharp
using UnityEngine;

public struct DamageInfo
{
    // Struct holding basic damage parameters
    public float amount;
    public bool isCritical;

    public DamageInfo(float amount, bool isCritical)
    {
        this.amount = amount;
        this.isCritical = isCritical;
    }
}

public class HealthController : MonoBehaviour
{
    public float hp = 100f;

    // Use the 'in' keyword to avoid copying large struct data
    public void TakeDamage(in DamageInfo damage)
    {
        hp -= damage.amount;
        Debug.Log($"[Structs] Took {damage.amount} damage. Remaining HP: {hp}");
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Classes](classes.md) |
| → Next | [Enumerations](enumerations.md) |
