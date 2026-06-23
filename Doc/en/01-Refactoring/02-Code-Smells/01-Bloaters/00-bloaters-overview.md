# 📦 Bloaters

> 📖 **Source:** [Refactoring.Guru — Bloaters](https://refactoring.guru/refactoring/smells/bloaters) | Author: Alexander Shvets

![Bloaters](../../../images/refactoring/bloaters.png)

## What Are Bloaters?

**Bloaters** are code, methods, or classes that have bloated to the point where they're hard to work with. They usually don't appear all at once but **accumulate gradually over time** as the program grows. Each little addition seems insignificant, but over months and years they turn into "monsters" that are hard to keep under control.

> [!WARNING]
> Bloaters are the **most common** group of code smells in game development, because game code tends to grow quickly across many iterations.

## 📋 List of Code Smells

| # | Code Smell | Short Description |
|:-:|-----------|-------------|
| 1 | [Long Method](./01-long-method.md) | A method with too many lines of code |
| 2 | [Large Class](./02-large-class.md) | A class with too many fields, methods, and responsibilities |
| 3 | [Primitive Obsession](./03-primitive-obsession.md) | Using primitive types instead of small objects |
| 4 | [Long Parameter List](./04-long-parameter-list.md) | A method that takes too many parameters |
| 5 | [Data Clumps](./05-data-clumps.md) | Groups of data that always appear together |

## 🎮 In Game Dev

Bloaters are especially common in game development:

- **Long Method**: An `Update()` function that handles all the logic in a single MonoBehaviour
- **Large Class**: `GameManager` becomes a "God Object" that contains everything
- **Primitive Obsession**: Using `float x, float y, float z` instead of `Vector3`
- **Long Parameter List**: `SpawnEnemy(x, y, z, hp, speed, name, level, ...)`
- **Data Clumps**: Position (x, y, z) and Rotation (rx, ry, rz) always go together

## 🔑 General Principle

> When code starts to **bloat**, that's the moment to **break it apart**. Divide and conquer is the most effective strategy.

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Code Smells Overview](../00-code-smells-overview.md)
