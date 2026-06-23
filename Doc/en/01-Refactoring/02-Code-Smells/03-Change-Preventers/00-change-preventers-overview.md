# 🚧 Change Preventers

> 📖 **Source:** [Refactoring.Guru — Change Preventers](https://refactoring.guru/refactoring/smells/change-preventers) | Author: Alexander Shvets

![Change Preventers](../../../images/refactoring/change-preventers.png)

## What are Change Preventers?

**Change Preventers** are a group of code smells that occur when making one small change in one place in your code forces you to make changes in many other places. These smells make ongoing development very slow, time-consuming, and extremely risky, because you might miss some of the places that need updating.

> [!IMPORTANT]
> Change Preventers are the biggest nemesis of maintainability and extensibility. If you don't deal with them, adding new features to your game will take more and more time and easily cause cascading bugs.

## 📋 List of Code Smells

| # | Code Smell | Short description |
|:-:|-----------|-------------|
| 1 | [Divergent Change](./01-divergent-change.md) | You have to change many different methods of **the same class** when there's an external change. |
| 2 | [Shotgun Surgery](./02-shotgun-surgery.md) | One small change requires you to modify **many different classes** at once. |
| 3 | [Parallel Inheritance Hierarchies](./03-parallel-inheritance.md) | Whenever you create a new subclass for one class, you're forced to create another new subclass for a different class. |

## 💡 Divergent Change vs Shotgun Surgery

These two smells are easy to confuse because both involve changing code, but they're actually **opposites**:

- **Divergent Change** happens when **one class** has too many reasons to change (violating the Single Responsibility Principle). *Example:* You have to modify `GameManager` every time you add a new Enemy type, OR add a new Weapon type, OR change the UI.
- **Shotgun Surgery** happens when **one change** forces you to update many **different classes** (responsibility spread out as an error). *Example:* When you add a new stat for the Player, you have to modify 10 different classes including `PlayerHealth`, `PlayerCombat`, `PlayerUI`, `SaveSystem`, `NetworkSync`, and so on.

## 🎮 In Game Dev

This group of smells is extremely dangerous in game development as a project grows:
- **Divergent Change**: The `PlayerController` class contains movement logic, animation logic, audio logic, and shooting logic all at once. When the Designer asks to adjust the animation, you edit `PlayerController`. When the Designer wants to tweak footstep sounds, you edit `PlayerController` again.
- **Shotgun Surgery**: When you add a new item to the game, you have to manually update the `ItemID` enum, then add a case in the `Inventory` class, define a price in the `Shop` class, declare it in `SaveSystem`, and draw its icon in `UI_Inventory`.
- **Parallel Inheritance Hierarchies**: You create the subclass `MageEnemy : Enemy`. Immediately afterward, you're forced to create the subclass `MageEnemyAI : EnemyAI` and `MageEnemyAnimation : EnemyAnimation` to match it.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Code Smells Overview](../00-code-smells-overview.md)
