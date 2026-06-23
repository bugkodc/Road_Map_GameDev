# 🔀 Simplifying Conditional Expressions

> 📖 **Source:** [Refactoring.Guru — Simplifying Conditional Expressions](https://refactoring.guru/refactoring/techniques/simplifying-conditional-expressions) | Author: Alexander Shvets

## Introduction

Conditional statements (`if-else`, `switch-case`) are the most fundamental tool for programming an application's branching flow. Over time, however, conditionals tend to become deeply nested, verbose, and extremely hard to understand, turning a codebase into a "spaghetti mess".

The **Simplifying Conditional Expressions** group of techniques provides ways to restructure conditionals so the code becomes clearer, more coherent, and more direct.

---

## 📋 Key techniques and when to use them

### 1. Decompose Conditional
- **Problem:** You have a complex conditional statement containing a lot of complicated logic (`if-then-else`).
- **Solution:** Extract the complex conditions and the `then/else` bodies into small, well-named methods.
- *Example:* Turn `if (date.after(SUMMER_START) && date.before(SUMMER_END))` into `if (IsSummer(date))`.

### 2. Consolidate Conditional Expression
- **Problem:** Several conditional statements return the same result or lead to the same action.
- **Solution:** Combine them into a single conditional expression using the logical operators `&&` or `||`, then extract it into its own method.

### 3. Replace Nested Conditional with Guard Clauses
- **Problem:** You have multiple levels of nested conditionals (`if` within `if` within `if`), creating a deeply indented "arrow" shape that makes the logic very hard to follow.
- **Solution:** Invert the conditions, check the exceptional cases first, and exit the function early (with `return` or `break`). The main logic of the function then sits at the outermost level.

### 4. Replace Conditional with Polymorphism
- **Problem:** You use a `switch-case` or a long `if-else` chain to perform different behaviors based on the type of object.
- **Solution:** Create inheriting subclasses and move the specialized logic into each subclass's overridden method.

### 5. Introduce Null Object
- **Problem:** You constantly have to check `if (obj != null)` before acting on an object.
- **Solution:** Create a special class that inherits from the original class to represent the "nothing" (Null) state and define safe default behaviors for it.

---

## 🎮 In Game Dev

Guard Clauses and Polymorphism are two extremely powerful weapons in game programming:

- **Replace Nested Conditional with Guard Clauses**:
  - ❌ *Poor example:*
    ```csharp
    void PlayerAttack(Enemy target)
    {
        if (target != null)
        {
            if (player.IsAlive)
            {
                if (player.HasEnoughEnergy())
                {
                    // Perform the attack
                    player.PerformSlash(target);
                }
            }
        }
    }
    ```
  - ✅ *Better solution (using Guard Clauses):*
    ```csharp
    void PlayerAttack(Enemy target)
    {
        if (target == null) return;
        if (!player.IsAlive) return;
        if (!player.HasEnoughEnergy()) return;

        // The main logic sits flat at the outermost level, extremely easy to read!
        player.PerformSlash(target);
    }
    ```

- **Replace Conditional with Polymorphism**:
  - Avoid writing a giant `switch(weaponType)` inside the attack function. Make the `Weapon` class abstract, and let the `Sword`, `Gun`, and `Spell` classes each override their own `Fire()` method.

---

## 🔗 Links

- ⬆️ [Refactoring Techniques — Overview](../00-techniques-overview.md)
- ⬅️ [Organizing Data](../03-Organizing-Data/00-organizing-data-overview.md)
- ➡️ [Simplifying Method Calls](../05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
