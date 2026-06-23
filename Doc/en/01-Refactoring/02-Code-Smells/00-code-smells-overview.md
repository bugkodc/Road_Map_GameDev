# 🦨 Code Smells

> 📖 **Source:** [Refactoring.Guru — Code Smells](https://refactoring.guru/refactoring/smells) | Author: Alexander Shvets

![Code Smells](../../images/refactoring/code-smells.png)

## What Are Code Smells?

**Code Smells** are surface-level signs that point to a deeper problem underneath. They aren't bugs — the code still runs — but they call for refactoring. Just as a bad smell in the kitchen indicates that food is going off, code smells signal that the design of the code has an issue that needs to be addressed.

> [!NOTE]
> Code Smells don't always need to be fixed right away. They are **indicators** that tell you where to look more closely.

## 📂 Categories of Code Smells

There are **23 code smells**, grouped into **5 main categories**:

### 1. 📦 [Bloaters](./01-Bloaters/00-bloaters-overview.md)
Code, methods, or classes that have **bloated** to the point where they're hard to work with. They usually accumulate gradually over time as the program grows.

> **5 smells:** Long Method · Large Class · Primitive Obsession · Long Parameter List · Data Clumps

### 2. 🔨 [Object-Orientation Abusers](./02-OO-Abusers/00-oo-abusers-overview.md)
Applying **OOP incorrectly** or incompletely, resulting in code that fails to take advantage of the power of object orientation.

> **4 smells:** Switch Statements · Temporary Field · Refused Bequest · Alternative Classes with Different Interfaces

### 3. 🚧 [Change Preventers](./03-Change-Preventers/00-change-preventers-overview.md)
When a change in **one place** forces you to **modify many other places**. These smells make development slow and risky.

> **3 smells:** Divergent Change · Shotgun Surgery · Parallel Inheritance Hierarchies

### 4. 🗑️ [Dispensables](./04-Dispensables/00-dispensables-overview.md)
**Unnecessary** code — removing it makes things cleaner, easier to understand, and more efficient.

> **6 smells:** Comments · Duplicate Code · Lazy Class · Data Class · Dead Code · Speculative Generality

### 5. 🔗 [Couplers](./05-Couplers/00-couplers-overview.md)
**Excessive coupling** between classes, making them tightly dependent on each other and hard to separate.

> **5 smells:** Feature Envy · Inappropriate Intimacy · Message Chains · Middle Man · Incomplete Library Class

## 📊 Quick Overview

| Category | Count | Main Problem |
|------|:--------:|--------------|
| Bloaters | 5 | Code too large, bloated |
| OO Abusers | 4 | OOP done wrong |
| Change Preventers | 3 | Hard to change |
| Dispensables | 6 | Unnecessary code |
| Couplers | 5 | Excessive tight coupling |
| **Total** | **23** | |

## 🎮 Why Does Game Dev Need to Know Code Smells?

1. **Game code is complex** — Many interacting systems (AI, physics, rendering, UI, networking)
2. **Fast iteration** — Game dev requires constant prototyping and change based on feedback
3. **Performance-critical** — Code smells often lead to performance bottlenecks
4. **Team collaboration** — Game dev is rarely a solo effort; code needs to be readable
5. **Long-term maintenance** — Live-service games need to be maintained for years

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Refactoring Overview](../00-refactoring-overview.md)
