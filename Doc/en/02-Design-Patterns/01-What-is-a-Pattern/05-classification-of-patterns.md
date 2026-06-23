# Classification of patterns

> **Source:** Compiled and referenced from [Refactoring.Guru — Classification of Patterns](https://refactoring.guru/design-patterns/classification)
> Author: **Alexander Shvets** · Illustrations: **Dmitry Zhart**
> This is a summary document for learning purposes; all rights belong to the original author.

## 📊 The Design Patterns Classification System

Design Patterns are extremely diverse and address many different aspects of software design. To help programmers easily search and apply them, the GoF systematized and classified the patterns based on 3 main criteria: **Intent**, **Scope**, and **Complexity**.

Among these, classification by **Intent** is the most common and is divided into **3 large groups**:

---

## 📂 The 3 Main Groups by Intent

### 1. 🏭 Creational Patterns
This group focuses on **how objects are created**. It helps hide the complex instantiation details and increases flexibility by separating the object creation logic from the object usage logic.
- **Purpose:** Reduce rigid hardcoding to specific classes when calling `new`.
- **5 representative patterns:** *Factory Method*, *Abstract Factory*, *Builder*, *Prototype*, *Singleton*.

### 2. 🏗️ Structural Patterns
This group solves the problem of **connecting and assembling classes and objects** together to form larger, more complex structures while still ensuring flexibility, loose coupling, and efficiency.
- **Purpose:** Help classes with incompatible interfaces work smoothly together, or wrap in new behavior.
- **7 representative patterns:** *Adapter*, *Bridge*, *Composite*, *Decorator*, *Facade*, *Flyweight*, *Proxy*.

### 3. 🔄 Behavioral Patterns
This group focuses on the **interaction, message passing, and distribution of responsibilities** between classes and objects.
- **Purpose:** Manage complex control flows, helping objects coordinate their actions smoothly without depending directly on one another.
- **10 representative patterns:** *Chain of Responsibility*, *Command*, *Iterator*, *Mediator*, *Memento*, *Observer*, *State*, *Strategy*, *Template Method*, *Visitor*.

---

## 📐 Classification by Scope

*   **Class Patterns:** Based primarily on **inheritance relationships**. The computation is configured rigidly at compile-time through parent and child classes (for example, *Factory Method*, the class-based form of *Adapter*).
*   **Object Patterns:** Based on **composition / aggregation relationships**. The computation can be changed flexibly at runtime while the game is running by assigning different instances to an object's properties (for example, most of the remaining patterns).

---

## 🎮 In Game Dev

For game programmers, mastering this classification helps you choose the right "tool" for each problem:
- When you need to spawn monsters automatically: Think immediately of **Creational Patterns** (for example, a *Factory Method* Spawner).
- When you need to draw the Scene Hierarchy tree (parent-child hierarchy) in the Unity Editor: That is the classic application of **Structural Patterns** (for example, *Composite*).
- When you need to change AI behavior or write a character skill system (activating Buffs, Cooldowns, Healing): Look for the answer in the **Behavioral Patterns** group (for example, *Strategy* or *State*).

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| ← Back | [Criticism of Patterns](./04-criticism-of-patterns.md) |
| 🧩 Overview | [Design Patterns Catalog](../00-design-patterns-overview.md) |

---

> 📝 **Source:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
