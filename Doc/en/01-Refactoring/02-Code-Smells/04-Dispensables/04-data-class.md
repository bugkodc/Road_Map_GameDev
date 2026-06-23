# Data Class

> 📖 **Source:** [Refactoring.Guru — Data Class](https://refactoring.guru/refactoring/smells/data-class) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Data Class** occurs when a class **holds only data** (public fields, getter/setter properties, or plain data structures) and **contains no behavior or processing logic** inside it.

These classes are merely passive data containers, always reached into directly by other classes to compute or change that data.

> [!IMPORTANT]
> A true OOP class must encapsulate both **data** and the **behavior** that goes with that data. A class with data only is a sign of a procedural programming style.

## ❓ Reasons for the Problem

- The habit of creating pure data structures (C-style structs) within object-oriented projects.
- A flawed system decomposition that splits computational logic off and pushes it all into external Service or Control classes.

## 💊 Treatment

To rescue a Data Class, we need to find out what other classes are doing with its data:

1. **Move Method**: Find methods in external classes that use the Data Class's data to compute something, then move those methods into the Data Class.
2. **Extract Method**: If an external method is too large and does too much, extract the logic related to the Data Class's data into its own method, then move it into the Data Class.
3. **Encapsulate Field**: If fields are carelessly left public, make them private/protected and provide controlled properties or getter/setter methods.

## ✅ Payoff

- **High Encapsulation**: Data is protected and can only be changed through valid behaviors defined by the class itself.
- **Avoids duplicate logic**: Once the behavior lives in the Data Class, anywhere else that wants to process that data just calls the class's method instead of rewriting the calculation logic.

## 🎮 In Game Dev

In game development, Data Classes are extremely common in systems that store stats or configuration:

### ❌ Example before refactoring:
The `WeaponData` class holds only data, and the `CombatManager` class has to perform the upgrade logic itself:
```csharp
public class WeaponData
{
    public string weaponName;
    public float baseDamage;
    public int upgradeLevel;
}

public class CombatManager : MonoBehaviour
{
    public void UpgradeWeapon(WeaponData weapon)
    {
        // Weapon upgrade logic written outside the WeaponData class
        weapon.upgradeLevel++;
        weapon.baseDamage *= 1.2f; // Increase damage by 20%
    }
}
```
**The problem:** `WeaponData` is a pure Data Class. If another class such as `ShopManager` also wants to upgrade weapons for the player on purchase, this upgrade logic would have to be rewritten or called across classes in a very convoluted way.

### ✅ Solution after refactoring:
Move the weapon upgrade logic into the `WeaponData` class itself using **Move Method**:
```csharp
public class WeaponData
{
    public string weaponName { get; private set; }
    public float baseDamage { get; private set; }
    public int upgradeLevel { get; private set; }

    public WeaponData(string name, float damage)
    {
        weaponName = name;
        baseDamage = damage;
        upgradeLevel = 1;
    }

    // Bring the behavior into the class that holds the data
    public void Upgrade()
    {
        upgradeLevel++;
        baseDamage *= 1.2f;
    }
}
```
Now any class (such as `CombatManager` or `ShopManager`) just needs to call `weapon.Upgrade()`, and encapsulation is perfectly preserved!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Lazy Class](./03-lazy-class.md) |
| → Next | [Dead Code](./05-dead-code.md) |
