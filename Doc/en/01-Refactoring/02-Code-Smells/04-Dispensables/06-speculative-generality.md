# Speculative Generality

> 📖 **Source:** [Refactoring.Guru — Speculative Generality](https://refactoring.guru/refactoring/smells/dispensables) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Speculative Generality** occurs when you design a system too abstractly — creating interfaces, empty parent classes, or complex parameters **just because you speculate that "we'll need it in the future."**

*How to recognize it:*
- There are abstract interfaces that have only **one** subclass implementing them.
- Parent classes are created in the expectation that many subclasses will inherit from them, but currently there is only a single subclass.
- A method takes parameters that its body never actually touches.

> [!WARNING]
> This is the classic symptom of **over-engineering** and a direct violation of the **YAGNI principle — You Aren't Gonna Need It**.

## ❓ Reasons for the Problem

Programmers often want to write "perfect" and "flexible" code, so they try to anticipate every possible future change. However, 90% of this kind of speculative feature is never used, while the system has already become extremely bloated and hard to understand.

## 💊 Treatment

We need to bring the codebase back to reality:

1. **Collapse Hierarchy**: If an abstract parent class has no real purpose other than being inherited by a single subclass, merge them into one.
2. **Inline Interface / Inline Class**: If an interface or wrapper class was drawn up unnecessarily, integrate it directly into the implementing class.
3. **Remove Parameter**: Remove unused parameters from the method signature.

## ✅ Payoff

- **Simpler system architecture**: Fewer unnecessary abstraction layers, making the code flow direct and easy to follow.
- **Less maintenance time**: No effort wasted maintaining and writing tests for "useless" classes/interfaces.
- **Easier to understand**: A newcomer knows exactly which class does what, instead of getting lost in a maze of abstract interfaces.

## 🎮 In Game Dev

In game dev, rapid prototyping and validating gameplay are paramount. Speculative Generality is a huge obstacle to this process:

### ❌ Example before refactoring:
You are making a simple platformer with only one type of weapon, a pistol (`Pistol`). But you rushed to design the system like this:
```csharp
public interface IWeapon
{
    void Attack();
}

public abstract class RangedWeapon : IWeapon
{
    public abstract void Attack();
}

public class Pistol : RangedWeapon
{
    public override void Attack() { /* Fire bullets */ }
}
```
**The problem:** Right now, and even in the 6-month roadmap, your game has **only** the `Pistol`. Drawing up both the `IWeapon` interface and the `RangedWeapon` abstract class only makes configuring the GameObject in the Unity Editor more complicated (you have to cast types and it's harder to reference directly in the Inspector).

### ✅ Solution after refactoring:
Apply **Collapse Hierarchy** and **Inline Interface**, keeping only what is truly needed right now:
```csharp
public class Pistol : MonoBehaviour
{
    public void Shoot() { /* Fire bullets */ }
}
```
**Why is this better?**
- The code is extremely simple and direct.
- It's easy to drag and drop a direct reference to the `Pistol` class in Unity's Inspector.
- When the game actually needs a second weapon type (for example, a sword), that's when you refactor and create an interface. Don't do it from day one!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Dead Code](./05-dead-code.md) |
| 🦨 Return | [Code Smells List](../00-code-smells-overview.md) |
