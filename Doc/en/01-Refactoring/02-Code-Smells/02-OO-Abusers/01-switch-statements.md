# Switch Statements

> 📖 **Source:** [Refactoring.Guru — Switch Statements](https://refactoring.guru/smells/switch-statements) | Author: Alexander Shvets

## 📋 Signs & Symptoms

You have a **complex switch/if** that classifies processing by type or kind of object. Worse, the same or a similar switch/if appears in **many places** in the code — every time you add a new type, you have to update all of those switches.

How to recognize it:
- A `switch` or a long `if-else if` chain that distinguishes by **type code** or **kind of object**
- The same switch/if pattern **repeated** across many methods or classes
- Every time you add a new type, you have to update **multiple switches** in multiple places
- The switch handles different behavior for each type

## ❓ Reasons for the Problem

- **Procedural habits** — The developer is used to writing sequential code and hasn't adopted an OOP mindset
- **Lack of understanding of polymorphism** — Not knowing how to use inheritance/interfaces instead
- **Rapid prototyping** — A switch is faster to write while prototyping, but the refactor gets forgotten
- **Fear of creating many classes** — Feeling that creating a class for every type is "too much"

> [!IMPORTANT]
> When you see a switch based on a **type code**, immediately think of **polymorphism**. This is the most classic case in need of refactoring.

## 💊 Treatment

Refactoring techniques that help:

- **[Replace Conditional with Polymorphism](../../03-Refactoring-Techniques/)** *(primary technique)* — Replace the switch with subclasses that each have their own behavior
- **[Extract Method](../../03-Refactoring-Techniques/)** — Extract each case into its own method before applying polymorphism
- **[Move Method](../../03-Refactoring-Techniques/)** — Move behavior to the appropriate class
- **[Replace Type Code with Subclasses](../../03-Refactoring-Techniques/)** — Create a subclass for each type
- **[Replace Type Code with State/Strategy](../../03-Refactoring-Techniques/)** — Use the State/Strategy pattern when you need more flexibility

## ✅ Payoff

- 📦 **Honors the Open/Closed Principle** — Adding a new type doesn't require changing old code
- 🧹 **Reduces duplication** — Eliminates switches repeated in many places
- 🔧 **Easy to extend** — Adding a new type only requires creating a new class
- 📖 **Better organized code** — Each type has its own behavior in its own class

## 🎮 In Game Dev

### Common example:

```
❌ Before:
void ProcessAI(Enemy enemy) {
    switch(enemy.type) {
        case EnemyType.Melee:
            // 20 lines of melee AI
            break;
        case EnemyType.Ranged:
            // 25 lines of ranged AI
            break;
        case EnemyType.Flying:
            // 30 lines of flying AI
            break;
        // Adding a new type → add a case HERE
        // AND in ProcessAnimation(), ProcessSound(), ...
    }
}
```

```
✅ After:
abstract class Enemy {
    abstract void ProcessAI();
}

class MeleeEnemy : Enemy {
    override void ProcessAI() { /* melee AI */ }
}

class RangedEnemy : Enemy {
    override void ProcessAI() { /* ranged AI */ }
}

// Adding a new type → just create a new class!
class FlyingEnemy : Enemy {
    override void ProcessAI() { /* flying AI */ }
}
```

### Other cases:
- `switch(weaponType)` to compute damage → Weapon polymorphism
- `switch(itemType)` to handle item usage → Item subclasses
- `if(powerUpType == ...)` → PowerUp hierarchy

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: OO Abusers](./00-oo-abusers-overview.md) | ➡️ [Next: Temporary Field](./02-temporary-field.md)
