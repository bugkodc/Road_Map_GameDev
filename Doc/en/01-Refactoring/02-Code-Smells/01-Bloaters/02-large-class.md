# Large Class

> 📖 **Source:** [Refactoring.Guru — Large Class](https://refactoring.guru/smells/large-class) | Author: Alexander Shvets

## 📋 Signs & Symptoms

A class has **too many fields, methods, and lines of code** — it's trying to do too much at once. A large class often violates the **Single Responsibility Principle** (SRP).

How to spot it:
- The class has dozens (or hundreds) of fields
- The class has too many methods serving many different purposes
- You can't summarize what the class does in **one sentence**
- There are several unrelated groups of fields/methods within the same class
- When you change one feature, you have to read and understand a lot of unrelated code

## ❓ Reasons for the Problem

Developers find it **easier** to add a feature to an existing class than to create a new one. Like Long Method, a class usually starts small but bloats over time.

Specific causes:
- **Lack of design planning** — Responsibilities aren't separated from the start
- **"Might as well add it here"** — Adding a field/method to the nearest class instead of creating an appropriate one
- **God Object pattern** — A single central class that manages everything
- **Lack of refactoring** — Not taking the time to split the class as it grows

## 💊 Treatment

Refactoring techniques that help:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Move a group of related fields/methods into a new class
- **[Extract Subclass](../../03-Refactoring-Techniques/)** — Move the behavior specific to one kind into a subclass
- **[Extract Interface](../../03-Refactoring-Techniques/)** — Define a common interface for the behaviors
- **[Duplicate Observed Data](../../03-Refactoring-Techniques/)** — Split data used by both the domain and the GUI into separate objects

> [!TIP]
> If the large class is responsible for both the **interface** (UI) and the **business logic**, split them apart. Sometimes you'll need to keep a copy of the data in both places and keep them in sync.

## ✅ Payoff

- 🧠 **Fewer attributes to remember** — Each class is smaller and easier to understand
- 🔄 **Less duplication** — When a class is large, it's easy to end up with duplicated code inside it
- 🔧 **Easier to maintain** — Changes in a small class have less impact
- 📦 **Better organization** — Each class has a clear responsibility

## 🎮 In Game Dev

### Common examples:
- **GameManager contains everything** — Score, spawning, game state, save/load, audio, UI updates... all in one class
- **PlayerController too large** — Handling input, movement, combat, inventory, quests, animation, and audio in the same MonoBehaviour
- **A giant Level class** — Containing level generation, enemy placement, item spawning, and environmental effects all at once

### Improvement:

```
❌ Before:
class GameManager {
    // Score fields & methods (50 lines)
    // Spawning fields & methods (80 lines)
    // Save/Load fields & methods (60 lines)
    // Audio fields & methods (40 lines)
    // UI fields & methods (70 lines)
}

✅ After:
class GameManager    → Manages game state only
class ScoreManager   → Manages the score
class SpawnManager   → Manages spawning
class SaveManager    → Manages save/load
class AudioManager   → Manages audio
class UIManager      → Manages the interface
```

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Bloaters](./00-bloaters-overview.md) | ⬅️ [Previous: Long Method](./01-long-method.md) | ➡️ [Next: Primitive Obsession](./03-primitive-obsession.md)
