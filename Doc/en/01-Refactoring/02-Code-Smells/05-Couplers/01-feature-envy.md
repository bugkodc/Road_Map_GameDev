# Feature Envy

> 📖 **Source:** [Refactoring.Guru — Feature Envy](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Feature Envy** occurs when a method of class A seems to "care about" and **uses the attributes/data of class B more than** the attributes of its own class.

*How to spot it:*
- The method continuously calls the getter methods of another class to fetch data.
- The method performs most of its calculations based on information from another object.

> 💬 **Core principle:** **Tell, Don't Ask**. You should command an object to perform a behavior, rather than fetching the object's detailed information to run the logic yourself.

## ❓ Reasons for the Problem

This smell usually appears when the data and the behavior that processes that data are placed in **two different classes**:
- The programmer accidentally separated the data class and the logic-processing class.
- A method was placed in the wrong spot during system design.

## 💊 Treatment

The treatment rule is very simple: **Behavior belongs wherever the data is.**

1. **Move Method**: Move the "feature-envious" method from its current class to the class that holds the data it uses the most.
2. **Extract Method**: If the method does several things and only part of its code suffers from Feature Envy, extract that part into a separate method, then use **Move Method** to bring it over to the class that holds the data.

## ✅ Payoff

- **High Encapsulation**: The data is hidden and protected; outside classes don't need to know the details of its internal structure.
- **Reduced Coupling**: Class A no longer depends tightly on the fields of class B. If class B changes its data structure, you only need to fix the internals of class B.

## 🎮 In Game Dev

The Combat/damage calculation system is where Feature Envy appears most often:

### ❌ Example before refactoring:
The `DamageCalculator` class queries every piece of information from `Enemy` to compute damage itself:
```csharp
public class DamageCalculator
{
    public float CalculatePhysicalDamage(Enemy enemy, float baseAttack)
    {
        // Feature Envy: This method fetches and computes entirely based on the Enemy's data!
        float netDamage = baseAttack - enemy.GetArmorValue();
        if (enemy.IsShieldActive())
        {
            netDamage *= 0.5f; // Reduce by 50% if a shield is up
        }
        return Mathf.Max(0, netDamage);
    }
}
```
**Problem:** This method relies entirely on the `Enemy`'s data (`GetArmorValue`, `IsShieldActive`). If tomorrow `Enemy` gains an evasion attribute (`evadeChance`) or magic-resist armor (`magicResist`), you'll have to modify the external `DamageCalculator` class again.

### ✅ Solution after refactoring:
Move the damage-calculation method into the `Enemy` class itself using **Move Method**:
```csharp
public class Enemy : MonoBehaviour
{
    private float armorValue;
    private bool isShieldActive;

    public float GetArmorValue() => armorValue;
    public bool IsShieldActive() => isShieldActive;

    // Move the behavior back to where the data lives
    public float TakeIncomingDamage(float baseAttack)
    {
        float netDamage = baseAttack - armorValue;
        if (isShieldActive)
        {
            netDamage *= 0.5f;
        }
        return Mathf.Max(0, netDamage);
    }
}
```
Now, any outside class that wants to deal damage simply calls: `enemy.TakeIncomingDamage(baseAttack)`. The outside class doesn't know and doesn't need to care whether the enemy has a shield or armor!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Couplers Overview](./00-couplers-overview.md) |
| → Next | [Inappropriate Intimacy](./02-inappropriate-intimacy.md) |
