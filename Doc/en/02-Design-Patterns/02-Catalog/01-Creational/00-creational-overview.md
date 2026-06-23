# 🏭 Creational Design Patterns

> 📖 **Source:** [Refactoring.Guru — Creational Design Patterns](https://refactoring.guru/design-patterns/creational-patterns) | Author: Alexander Shvets

## What Are Creational Patterns?

**Creational Design Patterns** provide more flexible and efficient mechanisms for **object creation**. Instead of creating objects directly through the traditional `new` operator (which causes rigid coupling), this family of patterns hides the complex creation details, making your code more reusable and maintainable.

> [!TIP]
> The single biggest goal of this group of patterns is to completely separate the **use of an object** from the **creation of that object** (decouple creation from consumption).

---

## 📋 The 5 Creational Design Patterns

Click each pattern below for the most detailed explanation (complete with Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons, and C# game dev code):

### 1. [Factory Method](./01-factory-method.md)
Defines a common interface for creating objects in a superclass, but lets subclasses decide which type of object will be created.

### 2. [Abstract Factory](./02-abstract-factory.md)
Provides a mechanism for creating **families of closely related objects** without specifying their concrete classes explicitly.

### 3. [Builder](./03-builder.md)
Lets you construct extremely complex objects **step by step**. By using the same construction process, you can produce many different variations (configurations) of an object.

### 4. [Prototype](./04-prototype.md)
Lets you copy (clone) an existing object without making your code dependent on their concrete classes.

### 5. [Singleton](./05-singleton.md)
Ensures that a class has only **a single instance** throughout the lifetime of the application and provides a global access point to that instance.

---

## 📊 Quick Comparison Table

| Pattern Name | Core Problem Solved | Real-World Example | Popularity in Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Factory Method** | The type of entity to create is not known in advance | A spawner recruiting soldiers | ⭐⭐⭐ |
| **Abstract Factory** | Creating a consistent group of entities (theme) | Buying a warrior/mage gear set | ⭐⭐ |
| **Builder** | Creating an entity with too many attributes | Assembling a custom robot | ⭐⭐ |
| **Prototype** | Creating an expensive, memory-heavy entity | Cloning ammunition, prefabs | ⭐⭐⭐ (Prefab!) |
| **Singleton** | Ensuring a single manager | GameManager, AudioManager | ⭐⭐⭐ (Use with care!) |

---

## 🎮 Why Does Game Dev Need These Patterns?

In game development, GameObjects are created continuously every second (spawning monsters, firing projectiles, drawing particle effects). This family of patterns helps you:
- Optimize memory: Clone expensive assets through **Prototype**.
- Manage spawning cleanly: Use **Factory Method** to manage a monster wave spawner without writing cumbersome switch-case statements.
- Assemble complex character attributes: Use **Builder** to build a character with hundreds of equipment options without constructor errors.

---

⬅️ [Back to: Design Patterns Overview](../00-design-patterns-overview.md)
