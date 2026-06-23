# Primitive Obsession

> 📖 **Source:** [Refactoring.Guru — Primitive Obsession](https://refactoring.guru/smells/primitive-obsession) | Author: Alexander Shvets

## 📋 Signs & Symptoms

Using **primitive types** (int, float, string, bool...) instead of creating **small objects** for meaningful concepts. For example:

- Using `string` for phone numbers, emails, and addresses
- Using `int` for money or health
- Using `string` constants for type codes instead of an enum/class
- Using arrays or dictionaries instead of creating an appropriate data structure

How to spot it:
- Many related **primitive fields** within a class
- **Validation** code for primitive values repeated in many places
- Use of **magic numbers** or **magic strings** in the code
- Data-handling logic is **scattered** instead of centralized

## ❓ Reasons for the Problem

Primitive types are **easy to use**, so developers are reluctant to create new classes for "simple" concepts. The mindset: *"It's just a string — why bother creating a separate class?"*

Specific causes:
- **"Just one more field"** — Each primitive you add accumulates over time
- **Reluctance to create a new class** — Creating a class for a small piece of data feels like overhead
- **Lack of OOP experience** — Not recognizing when something should be modeled as an object
- **Starting from a prototype** — Early code uses primitives, and the refactor is forgotten later

## 💊 Treatment

Refactoring techniques that help:

- **[Replace Data Value with Object](../../03-Refactoring-Techniques/)** — Replace a primitive with a meaningful object
- **[Replace Type Code with Class](../../03-Refactoring-Techniques/)** — Replace a type code with a class/enum
- **[Replace Type Code with Subclasses](../../03-Refactoring-Techniques/)** — When the type code affects behavior
- **[Replace Type Code with State/Strategy](../../03-Refactoring-Techniques/)** — When you need to change behavior dynamically
- **[Extract Class](../../03-Refactoring-Techniques/)** — Group related primitives into a new class
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Group primitive parameters into an object

## ✅ Payoff

- 🔄 **More flexible code** — Easier to add behavior to a new object
- 📐 **Better type safety** — The compiler helps catch errors earlier
- 🧩 **Easier to extend** — Add new features without affecting old code
- 📖 **Self-explanatory code** — `Money amount` is clearer than `int amount`
- 🧹 **Less duplication** — Validation logic is centralized in one place

## 🎮 In Game Dev

### Common examples:
- **Using `int` for every stat** instead of creating a `Stat` class with min/max/modifiers
- **Using `string` for item IDs** instead of an `ItemID` struct with validation
- **Using `int` for currency** instead of a `Currency` class that handles conversion
- **Using magic numbers** — `if (state == 3)` instead of `if (state == GameState.Combat)`

### Improvement:

```
❌ Before:
class Player {
    int health;       // Current health
    int maxHealth;     // Max health
    int attack;        // Attack power
    int defense;       // Defense power
    // Calculation logic scattered everywhere
}

✅ After:
class Player {
    Stat health;    // The Stat class holds current, max, modifiers
    Stat attack;
    Stat defense;
    // Logic lives inside the Stat class
}

class Stat {
    int baseValue;
    int maxValue;
    List<Modifier> modifiers;
    int GetFinalValue() { ... }
}
```

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Bloaters](./00-bloaters-overview.md) | ⬅️ [Previous: Large Class](./02-large-class.md) | ➡️ [Next: Long Parameter List](./04-long-parameter-list.md)
