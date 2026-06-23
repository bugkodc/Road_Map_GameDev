# Lazy Class

> 📖 **Source:** [Refactoring.Guru — Lazy Class](https://refactoring.guru/refactoring/smells/lazy-class) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Lazy Class** occurs when a class in your project **does too little and is too simple** to justify the effort of maintaining it (writing tests, reading and understanding it, managing the file).

> [!NOTE]
> Maintaining every class carries a cognitive cost. If a class does not provide enough value to offset that cost, it should be deleted or merged into somewhere else.

## ❓ Reasons for the Problem

- **A consequence of refactoring**: This class used to be large, but after you moved most of its responsibilities to other classes, it was left with just a few small methods or variables.
- **Over-engineering**: A developer sketched out a complex class structure in advance for future features, but those features were never actually built.

## 💊 Treatment

The techniques for dealing with a Lazy Class are very straightforward:

1. **Inline Class**: Move all the attributes and behavior of the Lazy Class into another class that uses it most directly, then delete the Lazy Class entirely.
2. **Collapse Hierarchy**: If the Lazy Class is a subclass or superclass with no significant distinction from the other class, merge the two into a single class.

## ✅ Payoff

- **Fewer files**: A leaner codebase that is easier to manage at the directory-structure level.
- **Easier code navigation**: Newcomers reading the project won't be distracted by dozens of empty or "harmless" classes that serve no real purpose.

## 🎮 In Game Dev

In Unity or Unreal, a Lazy Class often appears as a redundant wrapper class:

### ❌ Example before refactoring:
You create an `Armor` class just to hold a single armor stat:
```csharp
public class Armor
{
    public int defenseValue;
}

public class PlayerInventory : MonoBehaviour
{
    private Armor equippedArmor;
    
    public int GetTotalDefense()
    {
        return equippedArmor != null ? equippedArmor.defenseValue : 0;
    }
}
```
**The problem:** The `Armor` class is extremely lazy. It has no other behavior or methods. Maintaining a separate `Armor.cs` file for such a simple purpose is wasteful.

### ✅ Solution after refactoring:
If the armor has no special logic of its own (such as durability or special effects), merge that attribute directly into the class that defines the Item or Player, turn it into a simple `int` variable, or fold it into a more general `Item` class using the **Inline Class** technique:
```csharp
public class Item
{
    public string itemName;
    public int defenseValue; // Integrate defense directly into the shared Item class
    public int attackValue;
}
```
We no longer need to maintain a standalone, empty `Armor` class.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Duplicate Code](./02-duplicate-code.md) |
| → Next | [Data Class](./04-data-class.md) |
