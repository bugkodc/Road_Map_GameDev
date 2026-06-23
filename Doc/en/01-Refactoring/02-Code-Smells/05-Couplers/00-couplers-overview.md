# 🔗 Couplers

> 📖 **Source:** [Refactoring.Guru — Couplers](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

![Couplers](../../../images/refactoring/couplers.png)

## What are Couplers?

**Couplers** are a group of code smells related to **excessive coupling** between classes. When classes are too tightly bound to one another, you cannot change or reuse one class without dragging along changes in the related classes.

> [!IMPORTANT]
> One of the golden rules of software design is **Loose Coupling** and **High Cohesion**. The Couplers group of smells directly violates this principle, turning your system into a tangled mess of wires.

## 📋 List of Code Smells

| # | Code Smell | Short description |
|:-:|-----------|-------------|
| 1 | [Feature Envy](./01-feature-envy.md) | A method of class A uses the data of class B more than the data of class A itself. |
| 2 | [Inappropriate Intimacy](./02-inappropriate-intimacy.md) | One class accesses and meddles too deeply in the internal (private/protected) details of another class. |
| 3 | [Message Chains](./03-message-chains.md) | A series of consecutive function calls: `a.getB().getC().getD().doSomething()`. |
| 4 | [Middle Man](./04-middle-man.md) | A class that does nothing but delegate requests to another class. |
| 5 | [Incomplete Library Class](./05-incomplete-library-class.md) | A third-party library (or Engine API) lacks a feature you need, and you cannot directly modify the library's source code. |

## 🎮 In Game Dev

Couplers are the leading cause of game systems becoming impossible to separate:
- **Feature Envy**: The `CalculateDamage` method of the `Combat` class queries every small stat of `Player` and `Enemy` to compute things itself instead of letting the object do the work.
- **Inappropriate Intimacy**: The `UIManager` class accesses the private variables of `PlayerController` directly through reflection or hacky code in order to draw the interface.
- **Message Chains**: A camera script that wants to get the player's ammo info calls: `GameManager.Instance.GetPlayer().GetEquipment().GetActiveWeapon().GetAmmo()`. If any class in the middle changes its structure, the camera script breaks at compile time immediately!
- **Middle Man**: You create a `PlayerWrapper` class just to forward every call to the underlying `PlayerController` component without adding any logic of its own.
- **Incomplete Library Class**: You want to add a utility method to Unity's `Vector3` or `Transform` class, but you cannot modify Unity's source code.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back to: Code Smells Overview](../00-code-smells-overview.md)
