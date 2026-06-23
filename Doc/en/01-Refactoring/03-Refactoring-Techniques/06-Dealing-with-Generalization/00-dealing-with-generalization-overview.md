# 🏗️ Dealing with Generalization

> 📖 **Source:** [Refactoring.Guru — Dealing with Generalization](https://refactoring.guru/refactoring/techniques/dealing-with-generalization) | Author: Alexander Shvets

## Introduction

Inheritance is one of the most powerful pillars of object-oriented programming. However, it is also the one most easily abused. Inheritance hierarchies designed the wrong way turn a codebase into a rigid trap that is extremely hard to change and extend.

The **Dealing with Generalization** group of techniques focuses on reorganizing the inheritance tree, pushing attributes and behaviors up or down, extracting interfaces, and — most importantly — switching from inheritance to delegation (**Composition over Inheritance**) when needed.

---

## 📋 Key techniques and when to use them

### 1. Pull Up Field / Pull Up Method
- **Problem:** Several subclasses share an identical attribute or method.
- **Solution:** Pull that shared attribute or method up to the superclass to eliminate duplicate code.

### 2. Push Down Field / Push Down Method
- **Problem:** An attribute or method on the superclass is used by only **a few** specific subclasses, while other subclasses don't use it at all (violating Interface Segregation).
- **Solution:** Push that attribute or method down to the subclasses that actually use it.

### 3. Extract Interface
- **Problem:** Several classes that have no inheritance relationship nonetheless share some common behavior (for example, all can be attacked, all can be saved).
- **Solution:** Extract those behaviors into a common interface and have the classes implement it.

### 4. Collapse Hierarchy
- **Problem:** The inheritance tree is overly complex, and the superclass and subclass have almost no real difference in data or behavior.
- **Solution:** Merge the superclass and subclass into a single class to simplify the system.

### 5. Replace Inheritance with Delegation
- **Problem:** A subclass inherits from a superclass only to reuse code, but the subclass is not actually a "kind of" the superclass (violating the Liskov Substitution Principle - LSP).
- **Solution:** Turn the superclass into a field of the subclass and delegate execution instead of inheriting directly.

---

## 🎮 In Game Dev

Inheritance versus Composition is the classic debate in game development. Modern game dev (such as Unity ECS or Unreal Components) strongly favors **Composition over Inheritance**:

- **Extract Interface**:
  - ❌ *Poor example:* Create a `DestructibleObject` class that inherits from `Actor`. But you also want `Player` and `Enemy` to be destructible/attackable. You can't have all of them inherit from `DestructibleObject` because multiple inheritance isn't supported in C#.
  - ✅ *Better solution:* Extract an `IDamageable` interface. Now `Player`, `Enemy`, and `ExplosiveBarrel` can all implement the `IDamageable` interface and define how they take damage themselves.

- **Replace Inheritance with Delegation (Composition)**:
  - ❌ *Poor example:* Create a `FlyingPlayer` class that inherits from `PlayerController` just to reuse the Player's movement logic and add wings to fly.
  - ✅ *Better solution:* Create a separate `MovementBehaviour` component. The Player holds this component. When you want flight, you simply swap in/assign a `FlyingMovement` component to the Player.

---

## 🔗 Links

- ⬆️ [Refactoring Techniques — Overview](../00-techniques-overview.md)
- ⬅️ [Simplifying Method Calls](../05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md)
- 🦨 [Back to: Code Smells List](../../02-Code-Smells/00-code-smells-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
