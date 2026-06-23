# 🔨 Object-Orientation Abusers

> 📖 **Source:** [Refactoring.Guru — OO Abusers](https://refactoring.guru/refactoring/smells/oo-abusers) | Author: Alexander Shvets

![OO Abusers](../../../images/refactoring/oo-abusers.png)

## What are OO Abusers?

**Object-Orientation Abusers** are code smells that appear when OOP is applied **incorrectly** or **incompletely**. The code uses classes and objects, but it fails to harness the real power of object orientation — or worse, it abuses OOP in the wrong way.

> [!NOTE]
> This group of smells is common among developers moving from **procedural programming** to OOP without changing their design mindset.

## 📋 List of Code Smells

| # | Code Smell | Short description |
|:-:|-----------|-------------|
| 1 | [Switch Statements](./01-switch-statements.md) | Complex switch/if that classifies by type |
| 2 | [Temporary Field](./02-temporary-field.md) | A field that only holds a value in certain cases |
| 3 | [Refused Bequest](./03-refused-bequest.md) | A subclass inherits but does not use everything from its parent |
| 4 | [Alternative Classes with Different Interfaces](./04-alternative-classes.md) | Two classes do the same job but have different interfaces |

## 🎮 In Game Dev

OO Abusers are especially common in game development because:
- Many game developers start from **scripting** (a procedural mindset)
- Games have many **entity types** → it's easy to use switch instead of polymorphism
- **Incorrect inheritance** between enemy, weapon, and item types is very common
- Game code is often **rapidly prototyped** → OOP is not designed carefully

## 🔑 General Principle

> OOP is strongest when you use **polymorphism** to handle different types. If you find yourself writing switch/if by type, think about inheritance and interfaces.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Code Smells Overview](../00-code-smells-overview.md)
