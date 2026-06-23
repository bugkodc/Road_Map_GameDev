# Long Parameter List

> 📖 **Source:** [Refactoring.Guru — Long Parameter List](https://refactoring.guru/smells/long-parameter-list) | Author: Alexander Shvets

## 📋 Signs & Symptoms

A method takes **more than 3-4 parameters**. A long parameter list makes a method **hard to read, hard to call, and easy to mix up** the order of arguments.

How to spot it:
- The method signature is long and spans multiple lines
- You have to remember the **order** of the parameters when calling the method
- Several parameters have the **same type** (making positions easy to confuse)
- You have to pass `null` or default values for parameters you don't need
- The method is often called incorrectly because the parameter order gets mixed up

## ❓ Reasons for the Problem

A long parameter list happens when:
- **Several algorithms are merged** into one method — each algorithm needs its own input
- **Trying to reduce coupling** by passing data individually instead of passing an object (but this creates a new problem)
- **The method does too much** and needs many inputs for its different responsibilities
- **A half-finished refactoring** — The method was extracted but the parameters weren't grouped

> [!NOTE]
> A long parameter list is sometimes the result of trying to avoid a dependency between classes. But this solution is usually worse than the problem.

## 💊 Treatment

Refactoring techniques that help:

- **[Replace Parameter with Method Call](../../03-Refactoring-Techniques/)** — When the parameter value can be obtained from another object the method already knows about
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Pass the whole object instead of pulling out individual fields to pass separately
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Group related parameters into a new object

## ✅ Payoff

- 📖 **More readable code** — The method signature is tidy and clear
- 🔧 **Easier to call** — Fewer parameters means fewer mistakes in usage
- 🧹 **Tidier code** — Less clutter, more focus on the core logic
- 🔍 **Spot duplication** — Grouping parameters often reveals Data Clumps

## 🎮 In Game Dev

### Common examples:

```
❌ Before:
void SpawnEnemy(
    float x, float y, float z,
    int hp, float speed,
    string name, int level,
    bool isBoss, float attackRange,
    int dropGold, string lootTable
) { ... }

// Calling the method — easy to mix up the order!
SpawnEnemy(10f, 0f, 5f, 100, 3.5f, "Goblin", 5, false, 2f, 50, "common");
```

```
✅ After:
void SpawnEnemy(EnemyConfig config) { ... }

// Calling the method — clear and unambiguous
SpawnEnemy(new EnemyConfig {
    Position = new Vector3(10f, 0f, 5f),
    Stats = new EnemyStats(hp: 100, speed: 3.5f),
    Name = "Goblin",
    Level = 5,
    IsBoss = false
});
```

### Other cases:
- `CreateParticleEffect(pos, rot, scale, color, lifetime, speed, count, shape, ...)`
- `PlaySound(clip, volume, pitch, loop, delay, mixerGroup, spatialBlend, ...)`
- `ApplyDamage(target, amount, type, isCrit, source, element, ...)`

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Bloaters](./00-bloaters-overview.md) | ⬅️ [Previous: Primitive Obsession](./03-primitive-obsession.md) | ➡️ [Next: Data Clumps](./05-data-clumps.md)
