# Parallel Inheritance Hierarchies

> 📖 **Source:** [Refactoring.Guru — Parallel Inheritance Hierarchies](https://refactoring.guru/refactoring/smells/change-preventers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Parallel Inheritance Hierarchies** is essentially a special case of *Shotgun Surgery*. It occurs when you notice that every time you create a **new subclass for class A**, you're also forced to create a corresponding **subclass for class B**.

*Example:* If you create the class `MageEnemy` inheriting from `Enemy`, you're also forced to create the class `MageAI` inheriting from `EnemyAI` and the class `MageAnimation` inheriting from `EnemyAnimation`.

## ❓ Reasons for the Problem

This smell appears due to a flawed layered architecture design:
- The responsibilities of the two inheritance hierarchies should really have belonged to a single hierarchy.
- Overusing inheritance instead of using composition to share behavior between objects.

## 💊 Treatment

To break this parallel coupling, we need to shift the model from Inheritance to Delegation/Composition (**Composition over Inheritance**):

1. **Move Method** and **Move Field**: Move properties and behaviors from the subclasses of one hierarchy into the subclasses of the other to merge them.
2. **Replace Inheritance with Delegation**: Turn the dependent class into a property/field of the main class. Instead of building an entire parallel inheritance tree, the main class only needs to hold an instance of a strategy interface/class. (See also: **Strategy Pattern**).

## ✅ Payoff

- **Fewer classes**: Cut the number of redundant classes in the project in half.
- **Increased flexibility**: You can change behavior (for example, switching an Enemy's AI) at runtime by assigning a different AI instance, instead of being frozen by a rigid inheritance class.
- **Avoids structural duplication**: Extending the game becomes simpler because you only need to create one new subclass instead of a whole set of 3-4 accompanying subclasses.

## 🎮 In Game Dev

In game programming, Parallel Inheritance Hierarchies is the classic inheritance trap:

### ❌ Example before refactoring:
You design your Enemy system and their AI like this:
```
           [Enemy]                             [EnemyAI]
          /   |   \                           /   |   \
[Warrior]  [Mage]  [Archer]         [WarriorAI] [MageAI] [ArcherAI]
```
If you want to create another class `AssassinEnemy`, you're forced to also create `AssassinAI`. These two inheritance trees always run in parallel and depend on each other rigidly.

### ✅ Solution after refactoring:
Apply the **Strategy Pattern** or **Composition**:
- Remove the entire `EnemyAI` inheritance tree. Instead, create an interface `IAIBehaviour` or an independent `AIController` class.
- The `Enemy` class will hold a reference to `IAIBehaviour` as a component (just like Unity does with Components).
```csharp
public class Enemy : MonoBehaviour
{
    private IAIBehaviour aiBehaviour; // Component responsible for AI

    public void SetAI(IAIBehaviour newAI)
    {
        aiBehaviour = newAI;
    }

    void Update()
    {
        aiBehaviour?.ExecuteAI(this);
    }
}
```
Now, when you create a `MageEnemy` or `AssassinEnemy`, you only need to create the corresponding classes that implement `IAIBehaviour` (`MageAI`, `AssassinAI`) and inject them into the Enemy. You don't need to create new `Enemy` subclasses at all unless there's a major difference in physical structure or core data! You can even let a `WarriorEnemy` switch to using `MageAI` mid-game easily with a single line of reassignment code.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Shotgun Surgery](./02-shotgun-surgery.md) |
| 🦨 Return | [Code Smells List](../00-code-smells-overview.md) |
