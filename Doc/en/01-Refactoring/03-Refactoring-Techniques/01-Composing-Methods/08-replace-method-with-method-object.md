# Replace Method with Method Object

> 📖 **Source:** [Refactoring.Guru — Replace Method with Method Object](https://refactoring.guru/replace-method-with-method-object) | Author: Alexander Shvets

## ❌ Problem

You have a **long method** with many intertwined local variables, making [Extract Method](./01-extract-method.md) impossible to apply because the local variables depend on one another.

```csharp
// ❌ A long method with many interdependent local variables
float CalculateComplexDamage(Character attacker, Character defender, Weapon weapon)
{
    float baseDmg = attacker.strength * weapon.multiplier;
    float elementBonus = GetElementBonus(weapon.element, defender.weakness);
    float critChance = attacker.luck / 100f + weapon.critBonus;
    bool isCrit = Random.value < critChance;
    float critMultiplier = isCrit ? 2.5f : 1f;
    float rawDamage = (baseDmg + elementBonus) * critMultiplier;
    float armorReduction = defender.armor / (defender.armor + 100f);
    float finalDamage = rawDamage * (1f - armorReduction);
    float levelDiff = attacker.level - defender.level;
    float levelBonus = Mathf.Clamp(levelDiff * 0.05f, -0.5f, 0.5f);
    finalDamage *= (1f + levelBonus);
    // ... and much more
    return Mathf.Max(finalDamage, 1f);
}
```

## ✅ Solution

**Turn the method into its own class** — the local variables become fields, and you can freely break it into small methods inside that class.

```csharp
// ✅ Create a dedicated class for the complex logic
public class DamageCalculator
{
    private readonly Character attacker;
    private readonly Character defender;
    private readonly Weapon weapon;
    
    private float baseDmg;
    private float elementBonus;
    private float critMultiplier;
    private float rawDamage;
    private float finalDamage;
    
    public DamageCalculator(Character attacker, Character defender, Weapon weapon)
    {
        this.attacker = attacker;
        this.defender = defender;
        this.weapon = weapon;
    }
    
    public float Calculate()
    {
        ComputeBaseDamage();
        ApplyCritical();
        ApplyArmor();
        ApplyLevelBonus();
        return Mathf.Max(finalDamage, 1f);
    }
    
    private void ComputeBaseDamage()
    {
        baseDmg = attacker.strength * weapon.multiplier;
        elementBonus = GetElementBonus(weapon.element, defender.weakness);
    }
    
    private void ApplyCritical()
    {
        float critChance = attacker.luck / 100f + weapon.critBonus;
        critMultiplier = Random.value < critChance ? 2.5f : 1f;
        rawDamage = (baseDmg + elementBonus) * critMultiplier;
    }
    
    private void ApplyArmor()
    {
        float armorReduction = defender.armor / (defender.armor + 100f);
        finalDamage = rawDamage * (1f - armorReduction);
    }
    
    private void ApplyLevelBonus()
    {
        float levelDiff = attacker.level - defender.level;
        float levelBonus = Mathf.Clamp(levelDiff * 0.05f, -0.5f, 0.5f);
        finalDamage *= (1f + levelBonus);
    }
}

// Usage:
float damage = new DamageCalculator(attacker, defender, weapon).Calculate();
```

## 🔍 Why Refactor

- **A long method that resists Extract Method**: Too many interdependent local variables
- **Separate the responsibility**: Complex logic deserves its own class
- **Easy to extend**: The new class can have subclasses, interfaces, and unit tests
- **Locals → fields**: Turning local variables into fields makes them accessible from every method in the class

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 🧩 **Separate the responsibility** | Complex logic gets its own "home" |
| 🔧 **Easier to refactor further** | You can freely Extract Method within the new class |
| 🧪 **Easier to unit test** | Test the class in isolation, independent of the original class |
| 📖 **Readable code** | The `Calculate()` method reveals a clear flow |

## 📝 How to Refactor

1. **Create a new class** named after the method's purpose
2. **Create a private field** for each local variable and parameter of the original method
3. **Create a constructor** that takes the original parameters (and a reference to the original class if needed)
4. **Create the main method** (commonly named `Compute()`, `Calculate()`, or `Execute()`)
5. **Copy the code** from the original method into the main method
6. **Replace the original method** with creating a new object and calling the main method
7. **Now freely Extract Method** within the new class — the local-variable problem is gone

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Tackles a long method that Extract Method can't handle

## 🎮 In Game Dev

### AI Decision Making:
```csharp
// A dedicated class for complex AI logic
public class AIDecisionMaker
{
    private readonly AIAgent agent;
    private readonly List<Enemy> visibleEnemies;
    private readonly EnvironmentData environment;
    
    public AIAction Decide()
    {
        EvaluateThreats();
        ConsiderResources();
        CheckObjectives();
        return SelectBestAction();
    }
}
```

### Procedural Generation:
```csharp
// A dedicated class for dungeon generation
public class DungeonGenerator
{
    private Room[,] grid;
    private List<Room> rooms;
    private List<Corridor> corridors;
    
    public Dungeon Generate(DungeonConfig config)
    {
        InitializeGrid(config);
        PlaceRooms();
        ConnectRooms();
        AddEnemies();
        AddLoot();
        return BuildDungeon();
    }
}
```

### Notes:
- This pattern is very common in game dev: `DamageCalculator`, `PathFinder`, `LootGenerator`
- It combines well with the **Strategy Pattern** — you can create subclasses for variations

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Remove Assignments to Parameters](./07-remove-assignments-to-parameters.md)
- ➡️ [Substitute Algorithm](./09-substitute-algorithm.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
