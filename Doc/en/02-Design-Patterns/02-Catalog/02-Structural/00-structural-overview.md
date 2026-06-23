# 🏗️ Structural Design Patterns

> 📖 **Source:** [Refactoring.Guru — Structural Design Patterns](https://refactoring.guru/design-patterns/structural-patterns) | Author: Alexander Shvets

## What are Structural Patterns?

**Structural Design Patterns** focus on **establishing relationships** between classes and objects. They explain how to assemble and organize these individual entities into larger, more complex structures while still keeping them flexible, easy to extend, and efficient in terms of system resources.

> [!TIP]
> The main goal of this group of patterns is to help a system achieve optimal inheritance and composition, reduce rigid dependencies (decoupling), and optimize memory/resource management.

---

## 📋 The 7 Structural Design Patterns

Click on each pattern below to see the most detailed explanation (full Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons, and C# Game Dev code in Unity):

### 1. [Adapter](./01-adapter.md)
Allows classes with incompatible interfaces to work together by wrapping the old interface of a class in a new interface that is compatible with the client.

### 2. [Bridge](./02-bridge.md)
Separates the abstraction from its implementation, allowing both components to develop and change independently without affecting each other.

### 3. [Composite](./03-composite.md)
Lets you organize objects into a tree structure and work with this structure as though individual objects and groups of objects were the same.

### 4. [Decorator](./04-decorator.md)
Lets you attach new behaviors and properties to an object dynamically (at runtime) without creating new subclasses or modifying the original class.

### 5. [Facade](./05-facade.md)
Provides a simplified, single interface that represents a complex subsystem made up of many classes and tangled processing logic inside.

### 6. [Flyweight](./06-flyweight.md)
Saves memory by sharing common parts of state (intrinsic state) between thousands of similar objects, instead of storing it independently in each instance.

### 7. [Proxy](./07-proxy.md)
Provides a substitute/placeholder object to control access, lazy loading, security, or logging before reaching the original object.

---

## 📊 Quick Comparison Table

| Pattern Name | Core Problem Solved | Concrete Game Dev Example | Common in Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Adapter** | Incompatible interfaces between systems | Integrating an old ad SDK/plugin library into a new API | ⭐⭐ |
| **Bridge** | Explosion in the number of subclasses when combining many characteristics | Separating weapon-type logic from visual/SFX effects | ⭐⭐ |
| **Composite** | Traversing and managing complex parent-child hierarchies | UI system (Canvas, Panel, Button) or Inventory | ⭐⭐⭐ (Unity hierarchy!) |
| **Decorator** | Adding features dynamically, avoiding a subclass explosion | Buff/Debuff systems or gun mods (fire, ice, poison) | ⭐⭐ |
| **Facade** | Too many complex subclasses needing to communicate | Save/Load management grouping File I/O, PlayerPrefs, Cloud, Encrypt | ⭐⭐⭐ |
| **Flyweight** | Memory overload when creating tens of thousands of instances | Storing bullet and foliage properties via ScriptableObject | ⭐⭐⭐ (RAM optimization) |
| **Proxy** | Initializing very heavy resources at startup | Lazy loading audio or large Assets from Addressables | ⭐⭐ |

---

## 🎮 Why Does Game Dev Need This Group of Patterns?

A video game is an extremely complex system with thousands of GameObjects interacting in real time. The Structural pattern group is a powerful aid in:
- **Optimizing performance**: Avoiding Out of Memory errors thanks to **Flyweight** when drawing tens of thousands of bullets or leaves, or using **Proxy** to load an asset only when the player actually encounters it.
- **Organizing inventory cleanly**: Smoothly managing containers (chests, bags) holding nested items with **Composite**.
- **Separating graphics and logic**: Using **Bridge** so programmers can focus on developing a weapon's gameplay, while a Tech Artist fine-tunes the VFX/SFX without breaking each other's code.

---

⬅️ [Back to: Design Patterns Overview](../00-design-patterns-overview.md)
