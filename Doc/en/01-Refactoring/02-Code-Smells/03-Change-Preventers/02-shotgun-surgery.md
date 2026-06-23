# Shotgun Surgery

> 📖 **Source:** [Refactoring.Guru — Shotgun Surgery](https://refactoring.guru/smells/shotgun-surgery) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Shotgun Surgery** occurs when, every time you make **one small change**, you're forced to modify **many different classes** across the codebase all at once.

*The metaphor:* Like a fired shotgun blast, the small pellets lodge in many different spots and you have to go find and pick out each one.

*Example:* When you want to change how damage is calculated in the game, you have to edit code in the `Sword` class, the `Arrow` class, the `Spell` class, the `EnemyHealth` class, and the `CombatUI` class.

## ❓ Reasons for the Problem

This smell happens when a responsibility or a specific piece of logic is **split up and scattered too much** across many places in the system, instead of being centralized in a single place that manages it:
- A programmer tries to reduce coupling between classes but overdoes it, diluting the logic.
- Copy-pasting calculation logic instead of writing a shared function.

## 💊 Treatment

To gather these scattered "pellets" back into one place, we use the following techniques:

1. **Move Method** and **Move Field**: Move the scattered properties and methods into a single appropriate common class.
2. **Inline Class**: If a class is too small and handles only a tiny part of the scattered logic, merge it into the class that contains most of the related logic.
3. **Introduce Parameter Object** or **Preserve Whole Object**: Gather loose parameters into an object so they can be passed around in a more organized way.

## ✅ Payoff

- **Single Source of Truth**: When a piece of logic is defined in only one place, you only need to edit that one place when a change is requested.
- **Fewer bugs**: No more fear of "forgetting to fix class X" leading to a game crash or incorrect logic.
- **Cleaner code**: Reduces code duplication across different classes.

## 🎮 In Game Dev

In game dev, Shotgun Surgery often appears in core systems:

### ❌ Example before refactoring:
Suppose you want to add a `Defense` (armor) stat to a character. Because the damage-calculation logic is scattered all over the place, you have to do the following:
- Edit the `Player` class to add a `defense` variable.
- Edit the `Enemy` class so that it calls `player.defense` when calculating damage.
- Edit the `Projectile` class to subtract damage based on armor.
- Edit the `UI_Status` class to display armor.
- Edit the `SaveSystem` class to save and load the armor variable.
- Edit the `NetworkSync` class to synchronize the armor variable over the network.

If you forget to edit `SaveSystem` or `Projectile`, the game will run with incorrect logic or lose data when the player loads the game.

### ✅ Solution after refactoring:
Centralize all of a character's stats and calculation logic into a dedicated class like `CharacterStats`:
- The `CharacterStats` class manages all the stats such as HP, Mana, Attack, and Defense, and provides a `TakeDamage(int rawDamage)` function.
- When a projectile hits or an enemy attacks, they only need to call `targetStats.TakeDamage(damage)`.
- When you add the `Defense` stat, you only need to declare it inside the `CharacterStats` class and adjust the calculation in that class's own `TakeDamage()` function. Other classes like `Projectile` and `Enemy` don't need to change at all!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Divergent Change](./01-divergent-change.md) |
| → Next | [Parallel Inheritance Hierarchies](./03-parallel-inheritance.md) |
