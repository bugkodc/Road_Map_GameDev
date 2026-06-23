# Divergent Change

> 📖 **Source:** [Refactoring.Guru — Divergent Change](https://refactoring.guru/smells/divergent-change) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Divergent Change** occurs when you find yourself having to change **many unrelated methods** of **the same class** every time there's a small change in external business logic.

*Example:* When you add a new item type to the game, you have to modify the display method of the `Inventory` class, its save method, and its weight calculation method all at once.

> 💡 **Core concept:** When a class has many reasons to change (violating the **Single Responsibility Principle - SRP**), that class is suffering from Divergent Change.

## ❓ Reasons for the Problem

This smell usually stems from class designs that lack a clear shape, which leads to "conveniently" adding behaviors and data that don't directly belong to the class's main responsibility:
- Rapid, patchwork development without taking the time to refactor.
- Cramming too many different features into a single class (often central classes like `GameManager` or `PlayerController`).

## 💊 Treatment

To resolve Divergent Change, we need to break up the bloated class based on groups of behavior:

1. **Extract Class**: Extract properties and behaviors that share a common purpose/responsibility into a new class.
2. **Extract Superclass / Extract Interface**: If the different behaviors can be abstracted, create a parent class or interface to define them.
3. **Move Method**: Move methods that aren't directly related to the current class over to more appropriate classes.

## ✅ Payoff

- **Improved modularity**: Your code has a clear structure where each class does one thing and does it well (SRP).
- **Easier to maintain**: When you need to change one piece of logic (for example, how the UI is displayed), you only need to find the right UI class to edit, without touching the data-storage class or the control logic.
- **Better code reuse**: Small, specialized classes are easy to reuse in different contexts within the game.

## 🎮 In Game Dev

In game programming, Divergent Change is extremely common in the main classes:

### ❌ Example before refactoring:
The `Player` class takes on far too many responsibilities:
```csharp
public class Player : MonoBehaviour
{
    // Player data
    public int hp;
    public float speed;

    // Movement logic
    void Update() { /* Handle movement */ }

    // Audio logic
    public void PlayFootstepSound() { /* Play footstep sound */ }

    // UI logic
    public void UpdateHealthBar() { /* Update the on-screen health bar */ }

    // Save/Load logic
    public string ExportSaveData() { /* Convert data to JSON to save */ }
}
```
**The problem:** When the Designer wants to change the health bar UI → you edit the `Player` class. When the Sound Designer wants to change how footstep sounds play → you edit the `Player` class. When a coder wants to change the save file format to binary → you edit the `Player` class. This is exactly **Divergent Change**.

### ✅ Solution after refactoring:
Separate the responsibilities using **Extract Class**:
- Create `PlayerMovement` to handle movement.
- Create `PlayerAudio` to handle audio.
- Create `PlayerUI` to handle UI updates.
- Create `PlayerSaveSystem` to handle data storage.
The `Player` class then becomes just a lightweight coordinator, or simply holds the core state data.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Change Preventers Overview](./00-change-preventers-overview.md) |
| → Next | [Shotgun Surgery](./02-shotgun-surgery.md) |
