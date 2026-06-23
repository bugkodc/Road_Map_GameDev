# UnityEngine.Categorization

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Categorization](https://docs.unity3d.com/ScriptReference/UnityEngine.Categorization.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Provides structures for classifying and organizing metadata for entities in a game.

---

## 🧱 1. Classifying Objects and Managing Metadata

This subsystem supports labeling, advanced tagging, and hierarchical metadata for both Assets and GameObjects in a game. It is well suited to RPG and open-world projects with thousands of items and pieces of equipment that need dynamic classification to power filtering, item search, or crafting mechanics.

---

## 📐 2. Data Organization Structure

Using grouped identifier structures helps your code avoid overusing string tags (`CompareTag`), improves data safety, and optimizes memory performance.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Categorization` subsystem.

```csharp
using UnityEngine;

public class ItemCategory : MonoBehaviour
{
    [SerializeField] private string itemCategory = "Weapon/Sword";

    public bool IsInGroup(string parentGroup)
    {
        // Check whether this item belongs to the parent group
        return itemCategory.StartsWith(parentGroup);
    }

    void Start()
    {
        if (IsInGroup("Weapon"))
        {
            Debug.Log($"[Categorization] {gameObject.name} is a type of weapon.");
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Assertions](assertions.md) |
| → Next | [UnityEngine.CrashReportHandler](crash-report-handler.md) |
