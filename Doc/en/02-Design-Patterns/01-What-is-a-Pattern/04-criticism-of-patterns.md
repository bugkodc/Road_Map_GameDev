# Criticism of patterns

> **Source:** Compiled and referenced from [Refactoring.Guru — Criticism of Patterns](https://refactoring.guru/design-patterns/criticism)
> Author: **Alexander Shvets** · Illustrations: **Dmitry Zhart**
> This is a summary document for learning purposes; all rights belong to the original author.

## ⚖️ The Downsides of Design Patterns

Design Patterns are a wonderful tool, but like any sharp weapon, if used incorrectly or overused, they will turn around and directly harm your project.

Below are some of the famous critiques and criticisms of Design Patterns from the global software development community:

---

## 🚫 3 Common Mistakes & Criticisms

### 1. 🪓 The Trap of Overuse & Over-engineering
This is the classic disease of programmers who are new to Design Patterns.
- This syndrome is described as: *"When all you have is a hammer, everything around you looks like a nail."*
- Programmers try to cram in as many patterns as possible to show off their skills, turning simple functions (for example, just assigning a variable) into dozens of abstract interfaces and abstract classes, needlessly complicating the system.

> [!WARNING]
> Over-engineering increases cognitive complexity, makes others spend a great deal of time reading and understanding the code, and directly slows down the pace of project development.

### 2. 🩹 Patching Over Programming Language Shortcomings
Many computer scientists (typically programmers of LISP or Functional Programming languages) argue that most design patterns are essentially **workarounds for the lack of modern features** in older-generation object-oriented languages (such as early C++ or Java).
- For example: In modern C#, the **Delegates** and **Actions/Events** mechanisms come with extremely lightweight event subscription/publishing built in. Manually drawing out the classic Observer Pattern diagram with `Subject` and `Observer` classes is sometimes unnecessary.
- Similarly, the classic **Strategy Pattern** requires creating separate classes for algorithms, whereas modern languages can solve this quickly with anonymous functions (**Lambdas/Anonymous Functions**).

### 3. 🤖 Blind Replication Without Customization
Many programmers treat Design Patterns as immutable doctrine from the textbooks. They try to copy the UML structure from the 1994 GoF book verbatim into their game project without caring about the specific performance characteristics and real-world context.

---

## 🎮 In Game Dev: The Singleton Nightmare

In game programming, **Singleton** is the clearest example of how pattern overuse causes serious consequences:
*   Because Singleton is so easy to write and call (`GameManager.Instance.DoSomething()`), many lazy coders turn nearly every major class into a Singleton: `Player.Instance`, `LevelManager.Instance`, `UIManager.Instance`, `ScoreManager.Instance`...
*   **The consequence:** All of these classes become tangled in cross-references with one another. Changing or upgrading one class will break the entire project. The system loses its modularity, becomes extremely hard to write automated tests (Unit Tests) for, and cannot take advantage of CPU multi-threading optimization!

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| ← Back | [Why should I learn patterns?](./03-why-should-i-learn-patterns.md) |
| → Next | [Classification of Patterns](./05-classification-of-patterns.md) |

---

> 📝 **Source:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
