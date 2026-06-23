# Duplicate Code

> 📖 **Source:** [Refactoring.Guru — Duplicate Code](https://refactoring.guru/smells/duplicate-code) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Duplicate Code** is the "king" of code smells. It occurs when two or more pieces of code with **nearly identical** structure, logic, and functionality appear in multiple places throughout the project.

> [!WARNING]
> This is the most dangerous smell, because when you find a bug in that duplicated code, you have to track it down and fix it in every single place — and chances are very high that you will miss at least one.

## ❓ Reasons for the Problem

- **The almighty Copy-Paste**: A programmer wants to build a feature quickly by copying working code from another file into the current one and tweaking it slightly.
- **Lack of communication within the team**: Two programmers tackle a similar problem (for example, parsing a data string) and each writes a separate function that does the same thing.

## 💊 Treatment

Depending on where the duplicated code lives, we have different solutions:

1. **Extract Method**: If the duplication is within methods of the **same class**, extract the duplicated code into a shared method and call it wherever needed.
2. **Pull Up Method**: If the duplication is in **subclasses** at the same level, move the shared method up into the **superclass**.
3. **Form Template Method**: If subclasses follow a similar algorithm in their steps but differ slightly in a few small details, define the algorithm's skeleton in the parent class and let subclasses override those details.
4. **Substitute Algorithm**: Replace a complex, duplicated algorithm with a simpler, cleaner, and more efficient one.

## ✅ Payoff

- **Adheres to the DRY principle (Don't Repeat Yourself)**: Data and logic exist in only one place.
- **Easier to find and kill bugs**: When you find a flaw in the logic, you only need to fix it in a single file.
- **Leaner codebase**: Reduces the size of code files and improves compile efficiency.

## 🎮 In Game Dev

Duplicate code often arises when writing game entities with similar behavior:

### ❌ Example before refactoring:
The `Player` and `Enemy` classes have identical physics-based evasion logic:
```csharp
public class Player : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        // Complex evasion formula
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}

public class Enemy : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        // Player's exact formula copied over here!
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}
```
**The problem:** If a designer wants to change the evasion formula (for example, changing the 0.5f factor to 0.4f), the programmer must remember to update both the `Player` and `Enemy` classes.

### ✅ Solution after refactoring:
Create a base class `Character` or a utility class to share the logic:
```csharp
public abstract class Character : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}

// Now Player and Enemy just inherit from Character:
public class Player : Character { }
public class Enemy : Character { }
```
If a special monster has a slightly different evasion calculation, you can make this method `virtual` to allow a specific `override`.

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Comments](./01-comments.md) |
| → Next | [Lazy Class](./03-lazy-class.md) |
