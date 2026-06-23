# 🧹 Clean Code

> **Origin:** Compiled and adapted from [Refactoring.Guru — What is Refactoring](https://refactoring.guru/refactoring/what-is-refactoring)
> Author: **Alexander Shvets** · Illustrations: **Dmitry Zhart**
> This is a study summary; all rights belong to the original author.

![Clean Code](../../images/refactoring/clean-code.png)

## What is Clean Code?

The main purpose of refactoring is to **fight technical debt**. It transforms messy code into **clean code** — code that is clean, clear, and easy to maintain.

But what exactly is "clean code"? Every programmer may have their own definition, but in general clean code has the following characteristics:

---

## Characteristics of Clean Code

### 1. 📖 Clear to other programmers

Clean code must be **easy to read and understand** for any programmer, not just the person who wrote it.

- **Good naming** — Variable, function, and class names clearly describe their purpose
- **Logic that's easy to follow** — The flow of the code can be understood without complex explanatory comments
- **No tricks or hacks** — Straightforward code, with no hard-to-understand "tricks"

> 💡 Code is read far more often than it is written. Investing time in writing readable code saves a lot of time down the road.

### 2. 🔄 No duplicate code (DRY)

**DRY — Don't Repeat Yourself.** Each piece of logic should appear only **once** in the codebase.

- If you see the same chunk of code appearing in multiple places, that's a sign it should be extracted into a shared method or class
- Duplicate code means that when you fix a bug, you have to fix it in many places — and it's very easy to miss one

### 3. 📦 The minimum necessary number of classes/methods

Clean code keeps everything **simple and minimal**:

- Don't create unnecessary classes or methods (over-engineering)
- Don't add an abstraction layer before it's needed
- Follow the **YAGNI** principle — You Aren't Gonna Need It

### 4. ✅ Passes all tests

Clean code is code that **works correctly according to the specification**:

- It has full test coverage for the important cases
- All tests pass — the code does exactly what's required
- It's easy to write new tests when adding features

---

## Dirty Code

The opposite of clean code is **dirty code** — code that's messy, hard to understand, and hard to maintain:

| Characteristic | Dirty Code | Clean Code |
|-----------|------------|------------|
| **Comprehension** | Takes hours to understand | Grasped in a few minutes |
| **Changes** | Fix 1 place, break 10 others | Localized changes, no ripple effects |
| **Duplication** | Copy-paste everywhere | Each piece of logic in one place only |
| **Naming** | `temp`, `data`, `x`, `doStuff()` | `playerHealth`, `CalculateDamage()` |
| **Complexity** | 500-line methods, 10 levels of if-else | Short methods, clear logic |

Dirty code isn't always the result of inexperienced programmers. Deadline pressure, constantly changing requirements, or a lack of domain knowledge can all produce dirty code — and that's exactly when refactoring is needed.

---

## 🎮 In Game Dev

In game development, clean code is especially important because:

- **MonoBehaviour scripts** easily become bloated when input, logic, and rendering are all crammed into one file. Clean code means separating responsibilities clearly.

- **Naming in games** needs to be specific:
  - ❌ `void DoAction()` → ✅ `void ApplyDamageToTarget()`
  - ❌ `float val` → ✅ `float moveSpeed`
  - ❌ `GameObject obj` → ✅ `GameObject projectilePrefab`

- **ScriptableObject and Prefab** help apply DRY — instead of hardcoding values in many places, you centralize data into a reusable asset.

- **Play mode testing** — In Unity, you can hit Play to check things instantly. Take advantage of this to verify the code works correctly after each refactor.

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| ← Overview | [Refactoring Overview](../00-refactoring-overview.md) |
| → Next | [Technical Debt](./02-technical-debt.md) |

---

> 📝 **Origin:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
