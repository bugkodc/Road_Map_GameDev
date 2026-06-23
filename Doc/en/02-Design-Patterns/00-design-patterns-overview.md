# 🧩 Design Patterns - Overview

> **Source**: [refactoring.guru/design-patterns](https://refactoring.guru/design-patterns)

## What are Design Patterns?

**Design Patterns** are typical solutions to commonly occurring problems in software design. They are blueprints that you can customize to solve a particular design problem in your code.

### Key characteristics:
- **Not ready-made code** — They are concepts, blueprints for solving a problem
- **Not algorithms** — An algorithm solves a computational problem, while a pattern solves a design problem
- **Customizable** — Applied flexibly to each specific situation

## 📖 Detailed Contents

### Learning about Design Patterns
- **What's a Design Pattern?** — Definition and structure
- **History of Patterns** — How they evolved (Gang of Four - GoF)
- **Why Should I Learn Patterns?** — Why they are worth learning
- **Criticism of Patterns** — Critical perspectives
- **Classification of Patterns** — Categorized by intent

## 📂 Classification of Design Patterns

Design Patterns are divided into **3 main groups** with a total of **22 patterns**:

### 1. 🏭 Creational Patterns — 5 patterns
Provide flexible object creation mechanisms and increase code reuse.

👉 Details: [01-creational-patterns.md](./01-creational-patterns.md)

| Pattern | Short description |
|---------|------------|
| Factory Method | Create objects through a common interface |
| Abstract Factory | Create families of related objects |
| Builder | Construct complex objects step by step |
| Prototype | Clone existing objects |
| Singleton | Ensure there is only one single instance |

### 2. 🏗️ Structural Patterns — 7 patterns
Explain how to assemble objects and classes into larger structures.

👉 Details: [02-structural-patterns.md](./02-structural-patterns.md)

| Pattern | Short description |
|---------|------------|
| Adapter | Convert incompatible interfaces |
| Bridge | Separate abstraction from implementation |
| Composite | Organize objects into a tree structure |
| Decorator | Add new behavior to objects |
| Facade | Provide a simple interface to a complex system |
| Flyweight | Share common state among many objects |
| Proxy | Provide a placeholder object |

### 3. 🔄 Behavioral Patterns — 10 patterns
Manage communication and the distribution of responsibilities among objects.

👉 Details: [03-behavioral-patterns.md](./03-behavioral-patterns.md)

| Pattern | Short description |
|---------|------------|
| Chain of Responsibility | Pass a request along a chain of handlers |
| Command | Encapsulate a request as an object |
| Iterator | Traverse a collection sequentially |
| Mediator | Reduce coupling through an intermediary |
| Memento | Save and restore state |
| Observer | Notify subscribers of changes |
| State | Change behavior based on state |
| Strategy | Swap algorithms at runtime |
| Template Method | Define a skeleton, let subclasses override specific steps |
| Visitor | Add new operations without modifying classes |

## 🎮 Why Do Game Developers Need to Know Design Patterns?

1. **Game architecture is complex** — You need patterns to organize code spanning hundreds of classes
2. **Unity uses many patterns** — Component (Composite), Event System (Observer), Coroutine (Command)...
3. **Performance critical** — Flyweight and Object Pooling help optimize memory
4. **Scalability** — Patterns make it easy to extend a game (adding enemies, weapons, levels...)
5. **Common language** — Saying "use the Observer pattern" is easier to understand than explaining the whole system

## 🎯 The Most Important Patterns for Game Dev

| Priority | Pattern | Reason |
|---------|---------|-------|
| ⭐⭐⭐ | **Singleton** | GameManager, AudioManager (but use with care!) |
| ⭐⭐⭐ | **Observer** | Event system, UI update, achievement tracking |
| ⭐⭐⭐ | **State** | Player states, Enemy AI, Game states |
| ⭐⭐⭐ | **Command** | Input system, Undo/Redo, Replay system |
| ⭐⭐⭐ | **Strategy** | AI behavior, Damage calculation, Movement types |
| ⭐⭐ | **Factory Method** | Spawning enemies, Creating projectiles |
| ⭐⭐ | **Flyweight** | Shared data for thousands of identical objects |
| ⭐⭐ | **Composite** | Scene hierarchy, UI hierarchy |
| ⭐ | **Decorator** | Power-ups, Buff/Debuff system |
| ⭐ | **Prototype** | Cloning game objects, Level templates |
