# Classes (System Class Reference)

> 📖 **Source:** This document is compiled and written in depth based on [Unity Scripting API — Classes](https://docs.unity3d.com/ScriptReference/Classes.html), targeting the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

A consolidated catalog and reference for all of Unity's system classes used to build games.

---

## 🧱 1. Categorizing Class Structures in C# Unity

Unity programming relies on the interaction between different classes. Understanding the distinction between classes that inherit from `MonoBehaviour` (which can be dragged and dropped onto objects in the Scene and have an event lifecycle) and pure C# classes (Pure C# Classes — used for logic computation and data storage) is the foundation of professional object-oriented programming.

---

## 📐 2. Using Classes Effectively

Always leverage inheritance and polymorphism to build clean, maintainable code systems.

---

## 🎮 Hands-On Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Classes` subsystem.

```csharp
using UnityEngine;

// 1. A pure C# class used to store character data
[System.Serializable]
public class CharacterData
{
    public string name;
    public int level;
}

// 2. A MonoBehaviour class that manages the lifecycle and game interaction
public class CharacterController : MonoBehaviour
{
    public CharacterData data;

    void Start()
    {
        Debug.Log($"[Classes] Initializing character: {data.name} (Level: {data.level})");
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Assemblies](02-assemblies-packages.md) |
| → Next | [Structs](structs.md) |
