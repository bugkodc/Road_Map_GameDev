# Data Clumps

> 📖 **Source:** [Refactoring.Guru — Data Clumps](https://refactoring.guru/smells/data-clumps) | Author: Alexander Shvets

## 📋 Signs & Symptoms

Groups of data that **always appear together** in many places throughout the code. For example: `(x, y, z)` for coordinates, `(host, port, database)` for a database connection, `(red, green, blue, alpha)` for colors.

How to spot it:
- The same group of **3-4 fields** appears in multiple classes
- The same group of **parameters** is passed to multiple methods
- Removing one field from the group makes the remaining fields **meaningless**
- When you change the data group, you have to edit it in **many places**

> [!TIP]
> **How to check**: Try deleting one of the values in the group. If the remaining values lose their meaning → this is a Data Clump that needs its own object.

## ❓ Reasons for the Problem

- **Copy-paste code** — Copying a group of fields/parameters from one place to another
- **Lack of awareness** — Not recognizing that a group of related data needs to be bundled together
- **Gradual growth** — It starts with just 1-2 fields and grows into a group
- **Lack of domain design** — Not modeling domain concepts as objects

## 💊 Treatment

Refactoring techniques that help:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Create a new class to hold the group of related data
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Group related parameters into an object
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Pass the whole object instead of individual fields

## ✅ Payoff

- 🧹 **Tidier code** — One object instead of many scattered fields
- 📖 **Easier to understand** — `Transform data` is clearer than `(posX, posY, posZ, rotX, rotY, rotZ)`
- 📦 **Better organization** — Behavior related to the data group lives in the same class
- 🔄 **Less duplication** — The logic that handles the data group is written only once

## 🎮 In Game Dev

### Common examples:

```
❌ Before:
// The position + rotation group always travels together in MANY places
void TeleportPlayer(float posX, float posY, float posZ,
                    float rotX, float rotY, float rotZ) { ... }

void SaveCheckpoint(float posX, float posY, float posZ,
                    float rotX, float rotY, float rotZ) { ... }

void SpawnEffect(float posX, float posY, float posZ,
                 float rotX, float rotY, float rotZ) { ... }
```

```
✅ After:
// Create a TransformData class to hold the group of related data
class TransformData {
    Vector3 position;
    Vector3 rotation;
}

void TeleportPlayer(TransformData transform) { ... }
void SaveCheckpoint(TransformData transform) { ... }
void SpawnEffect(TransformData transform) { ... }
```

### Other cases in games:
- **Damage data**: `(amount, type, isCritical, source)` → `DamageInfo` class
- **Spawn config**: `(position, rotation, prefab, delay)` → `SpawnConfig` class
- **Audio settings**: `(clip, volume, pitch, spatialBlend)` → `AudioConfig` class
- **UI layout**: `(x, y, width, height)` → `Rect` struct

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Bloaters](./00-bloaters-overview.md) | ⬅️ [Previous: Long Parameter List](./04-long-parameter-list.md)
