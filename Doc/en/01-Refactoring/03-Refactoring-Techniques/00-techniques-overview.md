# 🛠️ Refactoring Techniques

> 📖 **Source:** [Refactoring.Guru — Refactoring Techniques](https://refactoring.guru/refactoring/techniques) | Author: Alexander Shvets

## Introduction

A catalog of **66 refactoring techniques**, organized into **6 main groups**. Each technique addresses a specific kind of problem in code, helping to improve its structure, readability, and maintainability.

These techniques are the practical "tools" you apply when you spot [Code Smells](../02-code-smells.md). Mastering them lets you refactor code with confidence, without worrying about breaking functionality.

---

## 📋 The 6 technique groups

### 1. 📝 [Composing Methods](./01-Composing-Methods/00-composing-methods-overview.md) — Reorganizing methods
> **9 techniques** — Most refactoring involves reorganizing methods. Long methods are the root of many problems.

Includes: Extract Method, Inline Method, Extract Variable, Inline Temp, Replace Temp with Query, Split Temporary Variable, Remove Assignments to Parameters, Replace Method with Method Object, Substitute Algorithm.

### 2. 🚚 [Moving Features between Objects](./02-Moving-Features/00-moving-features-overview.md) — Moving features between objects
> **8 techniques** — Help distribute responsibilities sensibly across classes, following the Single Responsibility principle.

Includes: Move Method, Move Field, Extract Class, Inline Class, Hide Delegate, Remove Middle Man, Introduce Foreign Method, Introduce Local Extension.

### 3. 📊 [Organizing Data](./03-Organizing-Data/00-organizing-data-overview.md) — Organizing data
> **15 techniques** — Improve how data is managed, encapsulated, and accessed within a class.

Includes: Self Encapsulate Field, Replace Data Value with Object, Change Value to Reference, Change Reference to Value, Replace Array with Object, Duplicate Observed Data, and many more.

### 4. 🔀 [Simplifying Conditional Expressions](./04-Simplifying-Conditional/00-simplifying-conditional-overview.md) — Simplifying conditional expressions
> **8 techniques** — Complex conditional logic is the root of many bugs and a source of maintenance difficulty.

Includes: Decompose Conditional, Consolidate Conditional Expression, Replace Nested Conditional with Guard Clauses, Replace Conditional with Polymorphism, and more.

### 5. 📞 [Simplifying Method Calls](./05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md) — Simplifying method calls
> **14 techniques** — Make method calls easier to read and understand, with clearer interfaces.

Includes: Rename Method, Add/Remove Parameter, Separate Query from Modifier, Introduce Parameter Object, Replace Constructor with Factory Method, and more.

### 6. 🏗️ [Dealing with Generalization](./06-Dealing-with-Generalization/00-dealing-with-generalization-overview.md) — Dealing with generalization
> **12 techniques** — Reorganize the inheritance hierarchy in a sensible way.

Includes: Pull Up Field/Method, Push Down Field/Method, Extract Subclass/Superclass/Interface, Replace Inheritance with Delegation, and more.

---

## 📊 Summary table

| # | Group | Techniques | Main purpose | Apply when |
|---|------|-------------|----------------|-------------|
| 1 | 📝 Composing Methods | 9 | Reorganizing methods | Methods are long and hard to read |
| 2 | 🚚 Moving Features | 8 | Distributing responsibilities | A class is too big, Feature Envy |
| 3 | 📊 Organizing Data | 15 | Managing data | Data clumps, magic numbers |
| 4 | 🔀 Simplifying Conditional | 8 | Simplifying logic | Nested if/else, complex switch |
| 5 | 📞 Simplifying Method Calls | 14 | Improving the API/interface | Long parameter list, cryptic method names |
| 6 | 🏗️ Dealing with Generalization | 12 | Organizing inheritance | Tangled inheritance hierarchy |
| | **Total** | **66** | — | — |

---

## 🎮 In Game Dev

Refactoring techniques are especially important in game development because:

- **Game code changes constantly**: Gameplay is iterated many times → frequent refactoring is needed
- **Many interacting systems**: Input, Physics, AI, Rendering, Audio → require clear organization
- **Performance-critical**: Clean code is easier to profile and optimize
- **Team collaboration**: Games are often developed by many people

### The most commonly used techniques in Game Dev:
1. **Extract Method** — Break a huge `Update()` into smaller methods
2. **Extract Class** — Split a `PlayerController` into multiple components
3. **Replace Conditional with Polymorphism** — Replace `switch(state)` with the State Pattern
4. **Replace Magic Number** — Use constants for game balance values
5. **Replace Inheritance with Delegation** — Component-based architecture (Unity style)

---

## 🔗 Links

- ⬆️ [Refactoring — Overview](../00-refactoring-overview.md)
- ⬅️ [Code Smells](../02-code-smells.md)
- ➡️ [Composing Methods](./01-Composing-Methods/00-composing-methods-overview.md) (start with the first group)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
