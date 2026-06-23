# Refused Bequest

> 📖 **Source:** [Refactoring.Guru — Refused Bequest](https://refactoring.guru/smells/refused-bequest) | Author: Alexander Shvets

## 📋 Signs & Symptoms

A subclass uses only **a few methods and properties** from its parent class. Most of the inherited methods are either **unused**, **overridden to do something completely different**, or **throw an exception**.

How to recognize it:
- The subclass **overrides** many of the parent's methods to do nothing or to throw an exception
- The subclass only uses **1-2 methods** from the parent but inherits everything
- The inheritance hierarchy feels **forced** and unnatural
- The subclass and parent class don't truly have an **"is-a"** relationship

## ❓ Reasons for the Problem

- **Inheritance just to reuse code** — Using inheritance because you want to "borrow" a few methods, not because of a real IS-A relationship
- **A poorly designed hierarchy** — The parent class is too generic or too specific
- **Changing requirements** — The hierarchy was correct at first, but the requirements changed

> [!WARNING]
> Refused Bequest is a sign that **inheritance is being misused**. Composition/delegation is often a better solution.

## 💊 Treatment

Refactoring techniques that help:

- **[Replace Inheritance with Delegation](../../03-Refactoring-Techniques/)** *(primary technique)* — Replace inheritance with composition: keep a reference to the other class and delegate the methods you need
- **[Extract Superclass](../../03-Refactoring-Techniques/)** — Create a new superclass that contains only what is genuinely shared

## ✅ Payoff

- 🏗️ **Clearer hierarchy** — Each class inherits only what it actually needs
- 📐 **Correct principles** — Honors the Liskov Substitution Principle
- 🔄 **More flexible** — Delegation makes it easy to change behavior
- 🧹 **Less unnecessary code** — No carrying around baggage you don't need

## 🎮 In Game Dev

### Common examples:
- **FlyingEnemy extends GroundEnemy** — But overrides all the movement methods because a flying enemy doesn't travel on the ground. The inheritance exists only to reuse `health` and `attack` → composition or a base `Enemy` class should be used instead
- **UIButton extends UIPanel** — Only to borrow rendering code, but a button is not a panel
- **Projectile extends Character** — Only because it needs transform and collision, but a projectile is not a character

### Improvement:

```
❌ Before:
class GroundEnemy {
    void Walk() { ... }
    void TakeDamage() { ... }
    void Attack() { ... }
    void PlayFootstepSound() { ... }
}

class FlyingEnemy : GroundEnemy {
    override void Walk() { /* EMPTY or throw! */ }
    override void PlayFootstepSound() { /* EMPTY */ }
    void Fly() { ... }
}
```

```
✅ After:
abstract class Enemy {
    void TakeDamage() { ... }
    void Attack() { ... }
    abstract void Move();
}

class GroundEnemy : Enemy {
    override void Move() { Walk(); }
}

class FlyingEnemy : Enemy {
    override void Move() { Fly(); }
}
```

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Previous: Temporary Field](./02-temporary-field.md) | ➡️ [Next: Alternative Classes](./04-alternative-classes.md)
