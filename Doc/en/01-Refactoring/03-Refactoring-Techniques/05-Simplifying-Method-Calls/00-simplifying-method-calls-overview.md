# 📞 Simplifying Method Calls

> 📖 **Source:** [Refactoring.Guru — Simplifying Method Calls](https://refactoring.guru/refactoring/techniques/simplifying-method-calls) | Author: Alexander Shvets

## Introduction

Designing a good method interface (API) is the key to a codebase that is easy to read, easy to integrate, and free of silly mistakes when passing arguments. A method interface must be clear, concise, and convey the author's intent accurately.

The **Simplifying Method Calls** group of techniques focuses on cleaning up method signatures, minimizing the arguments passed in, and clearly separating a method's responsibilities.

---

## 📋 Key techniques and when to use them

### 1. Rename Method
- **Problem:** The method name doesn't accurately describe, or is ambiguous about, its actual behavior.
- **Solution:** Rename the method to a clear name with a strong verb that accurately describes its purpose.

### 2. Separate Query from Modifier
- **Problem:** A method both returns a value (Query) and directly changes the object's state (Modifier).
- **Solution:** Split it into two separate methods: one that only reads data (`Get...`) and one that only writes data (`Set...` or `Execute...`).
- > 💡 **The CQRS principle:** "Asking a question should not change the answer."

### 3. Introduce Parameter Object
- **Problem:** A method takes too many separate parameters (Long Parameter List).
- **Solution:** Group the closely related, separate parameters into a single data class/struct so they can be passed more cleanly.

### 4. Preserve Whole Object
- **Problem:** You pull individual small properties out of an object to pass as arguments to a method.
- **Solution:** Pass the **whole** object directly into the method.

### 5. Replace Parameter with Explicit Methods
- **Problem:** A method takes a "flag" parameter (a boolean or enum) to switch between different running logic.
- **Solution:** Split it into separate methods, each representing one clear behavior.
- *Example:* Instead of `SetHeight(string name, int value)` with a switch-case on `name`, write `SetHeight(int value)` and `SetWidth(int value)`.

### 6. Replace Constructor with Factory Method
- **Problem:** Creating objects directly via `new` is too rigid, or the constructor has too many confusing overloads.
- **Solution:** Create a static Factory Method with a clearly descriptive name to construct the object.

---

## 🎮 In Game Dev

Entity SPAWN systems and stat configuration in games greatly benefit from these techniques:

- **Separate Query from Modifier**:
  - ❌ *Poor example:* A `GetNextWaypoint()` method both returns the next waypoint and increments the Player's index counter. When you only want to peek at where the next waypoint is to draw a guide line without moving the Player, this method will mess up the movement index!
  - ✅ *Better solution:* Split it into `GetCurrentWaypoint()` (which only returns a value) and `MoveToNextWaypoint()` (which changes the index).

- **Replace Parameter with Explicit Methods**:
  - ❌ *Poor example:* `void SetSpeed(float value, bool isRunning)`
  - ✅ *Better solution:* Split it into `SetWalkingSpeed(float value)` and `SetRunningSpeed(float value)`.

- **Preserve Whole Object**:
  - ❌ *Poor example:* `CalculateDamage(target.armor, target.health, target.level)`
  - ✅ *Better solution:* `CalculateDamage(target)` (pass the whole Target instance in).

---

## 🔗 Links

- ⬆️ [Refactoring Techniques — Overview](../00-techniques-overview.md)
- ⬅️ [Simplifying Conditional](../04-Simplifying-Conditional/00-simplifying-conditional-overview.md)
- ➡️ [Dealing with Generalization](../06-Dealing-with-Generalization/00-dealing-with-generalization-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
