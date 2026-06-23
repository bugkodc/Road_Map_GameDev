# UnityEngine.Identifiers

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Identifiers](https://docs.unity3d.com/ScriptReference/UnityEngine.Identifiers.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for managing and identifying objects through a GUID (Global Unique Identifier) mechanism within the game world.

---

## 🧱 1. Consistent Object Identification

In large-scale or multiplayer games, managing a unique identifier (GUID) for each entity (Entity) is extremely important for synchronizing save data (Save Game) and network state.

* **Avoiding Duplicate IDs**: Managing IDs yourself with integers is prone to collisions when merging data. Using a string GUID guarantees global uniqueness.

---

## 📐 2. Pitfalls When Duplicating

When you duplicate a GameObject in the Editor or at Runtime, the old identifier is usually copied verbatim. You need to write code that automatically generates a new ID when an object is created or respawned.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Identifiers` subsystem.

```csharp
using System;
using UnityEngine;

public class EntityIdentifier : MonoBehaviour
{
    [SerializeField] private string entityGUID;

    public string EntityGUID => entityGUID;

    void Awake()
    {
        // If the object doesn't have a GUID yet, generate a new one automatically
        if (string.IsNullOrEmpty(entityGUID))
        {
            entityGUID = Guid.NewGuid().ToString();
            Debug.Log($"[Identifiers] Generated a new GUID for {gameObject.name}: {entityGUID}");
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Experimental](experimental.md) |
| → Next | [UnityEngine.iOS](ios.md) |
