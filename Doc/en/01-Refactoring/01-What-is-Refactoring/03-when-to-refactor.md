# ⏰ When to Refactor

> **Origin:** Compiled and adapted from [Refactoring.Guru — When to Refactor](https://refactoring.guru/refactoring/when)
> Author: **Alexander Shvets** · Illustrations: **Dmitry Zhart**
> This is a study summary; all rights belong to the original author.

![When to Refactor](../../images/refactoring/when-to-refactor.png)

## When Should You Refactor?

Refactoring isn't a separate task in the sprint — it should be a **natural part** of the everyday development process. But specifically, when?

---

## The Rule of Three

This is the simplest heuristic for knowing when to refactor:

1. **The first time** — You write code to do something. Just write it, don't worry ✅
2. **The second time** — You write similar code again. A bit annoying, but tolerable for now ⚠️
3. **The third time** — You write similar code yet again. **Stop and refactor!** 🛑

> 💡 *"Three strikes and you refactor"* — When the same piece of code appears for the third time, that's a clear signal it should be extracted into a shared abstraction.

---

## Good Times to Refactor

### 1. 🆕 When adding a feature (Adding a Feature)

This is the most common time to refactor:

- You need to **understand the old code** before adding new code → refactor to make it easier to understand
- The old code isn't flexible enough to accept the new feature → refactor to extend it
- You notice a repeating pattern → refactor before adding the third instance

> Refactoring at this step makes the new feature **easier to implement** and the overall code **cleaner than before**.

### 2. 🐛 When fixing a bug (Fixing a Bug)

Bugs often hide in complex, hard-to-understand code:

- If the code were clean enough, the bug would have been spotted sooner
- Refactoring the code around the bug helps you **understand the root cause**
- Cleaner code → fewer places for bugs to hide

### 3. 👀 During code review (Code Review)

Code review is the last chance to improve code before merging:

- Fresh eyes see problems the author doesn't
- You can refactor right away with the agreement of both parties
- It shares knowledge and raises the team's code quality

---

## ⛔ When NOT to Refactor

Refactoring isn't always the right choice:

### The code is too messy — it needs a rewrite

When the code is so bad that **refactoring takes more time than rewriting from scratch**, consider a rewrite. Signs:

- No one on the team understands what the code does
- The code has no tests → it can't be refactored safely
- The architecture is wrong at its core and can't be improved incrementally

> ⚠️ **But be careful:** A rewrite is also very risky. You should only rewrite when you have test coverage for the current behavior to ensure the new system works exactly like the old one.

### The deadline is very close

If the deadline is right around the corner and the current code "works," ship first and refactor later. The technical debt from this decision should be recorded and planned for.

### The code is going to be thrown away

If a module is about to be completely replaced, there's no need to spend time refactoring it.

---

## 🎮 In Game Dev

### 🏁 After Each Milestone

Each milestone (alpha, beta, vertical slice) is a good time to refactor:

```
Milestone complete
    ↓
Sprint 0: Refactoring & Tech Debt
    ↓
Start the next milestone with a clean codebase
```

### 🔄 From Prototype → Production

When a prototype is approved and the team decides to continue development:

- **Assess** what can be kept vs. what needs a rewrite
- **Design an architecture** suitable for production
- **Refactor or rewrite** one module at a time, not everything all at once

### 👋 When Onboarding New Members

A new developer joining the team is a good time to refactor:

- They read the code with **fresh eyes** — making it easy to spot hard-to-understand code
- Questions like "Why is this code like this?" often point to real problems
- Refactoring speeds up onboarding and creates living documentation

### 🎮 Example refactor timing in the game cycle

| Stage | Refactor? | Reason |
|-----------|:---:|--------|
| Game Jam (48h) | ❌ | Focus on shipping, the code is throwaway |
| Prototype | ⚠️ Little | Light refactoring if the prototype drags on |
| Pre-production | ✅ A lot | Establish the architectural foundation |
| Production | ✅ Regularly | Refactor when adding features / fixing bugs |
| Pre-release crunch | ❌ | Ship first, record the debt |
| Post-release | ✅ A lot | Pay down technical debt, prepare for DLC/updates |

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| ← Previous | [Technical Debt](./02-technical-debt.md) |
| → Next | [How to Refactor](./04-how-to-refactor.md) |

---

> 📝 **Origin:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
