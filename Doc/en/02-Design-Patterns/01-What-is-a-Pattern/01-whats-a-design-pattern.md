# What's a design pattern?

> **Source:** Compiled and referenced from [Refactoring.Guru — What is a Design Pattern](https://refactoring.guru/design-patterns/what-is-pattern)
> Author: **Alexander Shvets** · Illustrations: **Dmitry Zhart**
> This is a summary document for learning purposes; all rights belong to the original author.

## 📐 Definition of a Design Pattern

A **Design Pattern** is a typical, proven-effective solution to a commonly occurring problem in the process of designing software architecture.

They are not libraries or ready-made source code that you can download and copy directly into your project. Instead, a Design Pattern is **a blueprint or a way of thinking** that guides how to solve a specific problem across different contexts.

---

## 💡 Pattern vs Algorithm

Many people confuse these two concepts because both are solutions to problems. However, their nature is entirely different:

*   **An algorithm** is like a **detailed step-by-step recipe**: it defines a clear, sequential set of actions to achieve a specific goal (for example, an array sorting algorithm). You can write the algorithm code identically in any language.
*   **A design pattern** is like an **architectural blueprint of a house**: it shows the shape, the structure, and how the rooms interact with each other, but which bricks you build the house from, what paint color, and the exact dimensions are entirely up to you. Two programmers applying the *Observer* pattern to two different projects will write completely different code.

---

## 📦 The Components of a Pattern

Most authoritative sources define a pattern through the following core components:

1.  **Intent**: A short description of the problem the pattern solves and its basic solution.
2.  **Motivation**: A deeper explanation of the design problem and why the pattern's solution is viable.
3.  **Structure**: A diagram of the classes and how they connect and interact (usually shown as a UML class diagram).
4.  **Code Example**: An illustration of how to implement it in a specific programming language (for example, C#, C++).

---

## 🎮 In Game Dev

In game programming, designing the class structure is an extremely large challenge because a game is a combination of countless real-time loops interacting in complex ways:

- If you want the **UI** system to automatically update every time the **Player** takes damage, but you don't want the `Player` class to know about the `UIManager` class (avoiding tight coupling) -> You use the **Observer Pattern**.
- If you want players to be able to customize their key bindings, or to support an **Undo/Redo** feature (taking back a move in a board game) -> You use the **Command Pattern**.
- If you want to manage the state of monster AI (Patrol, Chase, Attack) professionally without drowning in thousands of nested `if-else` statements -> You use the **State Pattern**.

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| ← Overview | [Design Patterns Overview](../00-design-patterns-overview.md) |
| → Next | [History of Patterns](./02-history-of-patterns.md) |

---

> 📝 **Source:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
