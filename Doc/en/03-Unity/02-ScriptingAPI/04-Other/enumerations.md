# Enumerations (Enums)

> 📖 **Source:** This document is compiled and written in depth based on [Unity Scripting API — Enumerations](https://docs.unity3d.com/ScriptReference/Enumerations.html), targeting the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A consolidated catalog of all the enumerated constants (Enums) defined in Unity programming.

---

## 🧱 1. Writing Explicit Code with Enums

Enums make your source code extremely readable by replacing magic numbers with meaningful, word-like keywords. For example, instead of defining `state = 0` as Idle and `state = 1` as Walk, you use `PlayerState.Idle`.

* **`[System.Flags]`**: Allows you to combine multiple enum values using bitwise logical operations (AND, OR). This is well suited for managing several status effects on a character at the same time (poisoned and slowed simultaneously).

---

## 📐 2. Avoid Converting Enums to Strings Too Often

Calling `.ToString()` on an enum generates garbage memory (GC Alloc) because C# has to use reflection to find the corresponding string name. Inside Update loops, compare enums directly as integers or cache the string beforehand.

---

## 🎮 Hands-On Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Enumerations` subsystem.

```csharp
using System;
using UnityEngine;

public class EnumStatusManager : MonoBehaviour
{
    // Define status effects using bitwise flags
    [Flags]
    public enum CharacterStatus
    {
        None = 0,
        Poisoned = 1 << 0,
        Slowed = 1 << 1,
        Stunned = 1 << 2,
        Burning = 1 << 3
    }

    public CharacterStatus currentStatus = CharacterStatus.Poisoned | CharacterStatus.Slowed;

    void Start()
    {
        // Check whether the character is slowed using a bitwise AND operation
        bool isSlowed = (currentStatus & CharacterStatus.Slowed) != 0;
        Debug.Log($"[Enums] Current status effects: {currentStatus}. Slowed: {isSlowed}");
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Structs](structs.md) |
| → Next | [Unity.VisualScripting API](01-visual-scripting.md) |
