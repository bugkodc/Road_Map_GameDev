# Long Method

> 📖 **Source:** [Refactoring.Guru — Long Method](https://refactoring.guru/smells/long-method) | Author: Alexander Shvets

## 📋 Signs & Symptoms

A method has **too many lines of code**. As a general rule, any method longer than **10 lines** should make you think twice. If you feel the need to write a comment to explain a block of code inside a method, that block should probably be extracted into its own method.

How to spot it:
- A method that runs dozens or hundreds of lines long
- You have to scroll several times to read the whole method
- Many comments split the method into "sections"
- It's hard to tell what the method does at a first glance

## ❓ Reasons for the Problem

**Adding code is always easier than removing it.** This is the "Hotel California" effect — code checks in but never leaves.

Specific causes:
- Developers tend to **add features** to an existing method instead of creating a new one
- Not realizing the method is **violating the Single Responsibility Principle**
- Feeling that creating a new method is unnecessary "overhead"
- Copy-pasting code into a method instead of extracting it into a separate method
- The method starts small but **grows over time** through repeated modifications

## 💊 Treatment

The golden rule: **If you feel the need for a comment to explain a block of code, extract that block into its own method.**

Refactoring techniques that help:

- **[Extract Method](../../03-Refactoring-Techniques/)** *(the main technique)* — Extract a block of code into its own method with a descriptive name
- **[Replace Temp with Query](../../03-Refactoring-Techniques/)** — Replace a temporary variable with a method call
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Group related parameters into an object
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Pass the whole object instead of individual fields
- **[Decompose Conditional](../../03-Refactoring-Techniques/)** — Break complex conditional logic out into its own method
- **[Replace Method with Method Object](../../03-Refactoring-Techniques/)** — Turn the method into its own class when there are too many local variables

## ✅ Payoff

- 📖 **More readable code** — A short method with a descriptive name beats a long method with lots of comments
- 🔧 **Easier to maintain** — Small methods are easier to change and have fewer bugs
- ♻️ **Reuse** — Small methods can be called again from many places
- 🧪 **Easier to test** — Short, single-purpose methods are easy to write unit tests for
- 📝 **A method name replaces a comment** — `CalculateDamage()` is more self-explanatory than `// Calculate damage`

> Among all kinds of object-oriented code, classes with **short methods** live the longest. The longer a method, the harder it is to understand and maintain.

## 🎮 In Game Dev

### Common examples:
- **`Update()` doing everything** — A single Update() function handling input, movement, animation, combat, and UI all in one method
- **A giant coroutine** — One coroutine handling an entire quest flow from start to finish
- **An overly long initialization method** — A `Start()` or `Initialize()` function setting up everything across hundreds of lines

### Improvement:

```
❌ Before:
void Update() {
    // Handle Input (20 lines)
    // Handle Movement (30 lines)
    // Handle Combat (40 lines)
    // Handle Animation (15 lines)
    // Handle UI Update (25 lines)
}

✅ After:
void Update() {
    HandleInput();
    HandleMovement();
    HandleCombat();
    HandleAnimation();
    UpdateUI();
}
```

---

> 📚 **Attribution:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: Bloaters](./00-bloaters-overview.md) | ➡️ [Next: Large Class](./02-large-class.md)
