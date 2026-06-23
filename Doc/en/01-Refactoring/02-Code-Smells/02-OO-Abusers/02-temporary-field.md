# Temporary Field

> 📖 **Source:** [Refactoring.Guru — Temporary Field](https://refactoring.guru/smells/temporary-field) | Author: Alexander Shvets

## 📋 Signs & Symptoms

A class has a **field that only holds a value in certain cases**. Outside of those cases, the field is empty or `null`. This is confusing because you expect an object to always use all of its fields.

How to recognize it:
- A field that is only **set** and **used** within certain specific methods
- Most of the time the field holds `null`, `0`, or a default value
- The code has many **null checks** for this field
- The field only makes sense in **one specific state** of the object

## ❓ Reasons for the Problem

- **Complex calculations** that need many temporary variables — Instead of passing them as parameters, the developer stores them in class fields
- **Overly long methods** that are split up, but instead of passing data through parameters, fields are used like "global variables"
- **Lack of design** — The field was added hastily without thinking about its lifecycle

## 💊 Treatment

Refactoring techniques that help:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Extract the temporary field and its related methods into a separate class
- **[Replace Method with Method Object](../../03-Refactoring-Techniques/)** — Turn the complex method into its own class, where the temporary fields become fields of the new class
- **[Introduce Null Object](../../03-Refactoring-Techniques/)** — Replace null checks with the Null Object pattern

## ✅ Payoff

- 📖 **Clearer code** — Every field has meaning and is always used
- 🐛 **Fewer bugs** — No more null reference exceptions from temporary fields
- 🧹 **Leaner class** — Drop unnecessary fields
- 🧠 **Easier to understand** — No need to guess which field is currently active

## 🎮 In Game Dev

### Common examples:
- **Combat-only fields** — `currentTarget`, `combatTimer`, `damageMultiplier` only hold values while the player is in combat, and are null while exploring
- **Quest-specific data** — Fields like `questDialog`, `questObjective` are only set when a quest is active
- **Ability cooldown data** — Many ability-related fields are only used while casting

### Improvement:

```
❌ Before:
class Player {
    // Always used
    float health;
    Vector3 position;

    // Only used in combat (null otherwise!)
    Enemy currentTarget;
    float combatTimer;
    float damageMultiplier;
    List<Buff> activeBuffs;
}
```

```
✅ After:
class Player {
    float health;
    Vector3 position;
    CombatState combatState; // null when not in combat
}

class CombatState {
    Enemy currentTarget;
    float combatTimer;
    float damageMultiplier;
    List<Buff> activeBuffs;
}
```

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Previous: Switch Statements](./01-switch-statements.md) | ➡️ [Next: Refused Bequest](./03-refused-bequest.md)
