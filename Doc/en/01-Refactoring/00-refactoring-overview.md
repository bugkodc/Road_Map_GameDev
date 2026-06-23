# ✂️ Refactoring

> **Origin:** Content compiled and adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: **Alexander Shvets**, Illustrations: **Dmitry Zhart**. This is a study summary; all rights belong to the original author.

![Refactoring — from messy code to clean code](../images/refactoring/refactoring-hero.png)

**Refactoring** is the process of systematically improving code **WITHOUT creating new functionality**. It transforms messy code into clean code and a simpler design.

The goal of refactoring is to keep the codebase clean, understandable, and maintainable — helping the team move faster and ship fewer bugs over time.

---

## 📚 Contents

### 1. [What is Refactoring](./01-What-is-Refactoring/01-clean-code.md)

Understand the essence of refactoring — from the concept of clean code to how it's done:

| # | Topic | Description |
|---|--------|--------|
| 01 | [Clean Code](./01-What-is-Refactoring/01-clean-code.md) | The ultimate goal of refactoring — clean, clear code |
| 02 | [Technical Debt](./01-What-is-Refactoring/02-technical-debt.md) | Technical debt — why refactoring is needed |
| 03 | [When to Refactor](./01-What-is-Refactoring/03-when-to-refactor.md) | The right time to refactor |
| 04 | [How to Refactor](./01-What-is-Refactoring/04-how-to-refactor.md) | A safe process for performing refactoring |

### 2. [Code Smells](./02-Code-Smells/00-code-smells-overview.md)

Recognize the signs that code needs to be refactored:

- **Bloaters** — Code, methods, and classes that grow excessively large
- **Object-Orientation Abusers** — Incorrect application of OOP
- **Change Preventers** — Code that's hard to change, where one edit forces many others
- **Dispensables** — Redundant, unnecessary code
- **Couplers** — Classes that are too tightly linked to one another

### 3. [Refactoring Techniques](./03-Refactoring-Techniques/00-techniques-overview.md)

Specific refactoring techniques for dealing with code smells:

- **Composing Methods** — Restructuring methods
- **Moving Features between Objects** — Moving features between objects
- **Organizing Data** — Organizing data
- **Simplifying Conditional Expressions** — Simplifying conditional expressions
- **Simplifying Method Calls** — Simplifying method calls
- **Dealing with Generalization** — Handling inheritance and generalization

---

## 🎮 Why Does Game Dev Need Refactoring?

Game development has its own challenges that make refactoring especially important:

1. **Prototype → Production Pipeline** — Games usually start as quick prototypes, then grow into finished products. Refactoring helps turn prototype code into production-ready code.

2. **Continuous iteration** — Game design changes constantly throughout development. Code needs to be flexible enough to adapt to gameplay changes without breaking.

3. **Performance-critical** — Games run in real time at 30/60 FPS. Messy code is not only hard to read but also causes lag, frame drops, and a poor player experience.

4. **Team collaboration** — Game projects typically involve many people (programmers, designers, artists) working together. Clean code helps everyone understand and contribute more effectively.

5. **Long-term maintenance** — Live-service games need to be maintained for years. Accumulated technical debt makes adding new content or fixing bugs extremely costly.

---

## 🗺️ Navigation

| Direction | Link |
|-------|----------|
| 📖 Get started | [Clean Code →](./01-What-is-Refactoring/01-clean-code.md) |
| 👃 Code Smells | [Code Smells Overview →](./02-Code-Smells/00-code-smells-overview.md) |
| 🔧 Techniques | [Refactoring Techniques →](./03-Refactoring-Techniques/00-techniques-overview.md) |

---

> 📝 **Origin:** [Refactoring.Guru](https://refactoring.guru/) · Author: Alexander Shvets · Illustrations: Dmitry Zhart
