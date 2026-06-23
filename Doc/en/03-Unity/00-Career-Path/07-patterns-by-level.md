# 🎨 Design Pattern Map by Career Level

> 📖 **About this page:** It answers the exact question *"which patterns do I need at this level, and what problem do they solve?"*. Every pattern links to its full theory + code in the roadmap's **Design Patterns** and **Game Programming Patterns** sections.

> [!IMPORTANT]
> **Patterns are tools, not goals.** Don't memorize 23 patterns then hunt for places to wedge them in. Learn a pattern *when you hit the problem it was invented to solve*. This page orders patterns by **when you actually meet that problem** in your career.

---

## 🗺️ Overview: which level each pattern shows up

| Level | Patterns you start needing | Problem it solves |
|---|---|---|
| **Intern** | *(no patterns yet)* | One script = one job; feel the **Component** model (Unity enforces it). |
| **Fresher** | Observer, Object Pool, Component | Decouple UI from gameplay; kill `Instantiate`/`Destroy` stutter. |
| **Junior** | State, Strategy, Singleton (careful), Command | Replace "if/else jungles"; stateful AI/gameplay; decoupled input. |
| **Middle** | Factory, Facade, Flyweight, Type Object, Event Queue, Dependency Injection | Decoupled modules; data-driven; clear system boundaries. |
| **Senior** | Service Locator, Bytecode, Spatial Partition, Double Buffer, Subclass Sandbox | Whole-project architecture; large-scale performance; extensibility/modding. |
| **Lead** | *(no new patterns)* | Use pattern knowledge to **review & set standards** for others. |

> [!TIP]
> "Patterns you start needing" is **cumulative** — Middle still uses everything from Junior. Each level only *adds* tools when a new problem appears.

---

## 🟢 Intern — no rush for patterns

At this level, **writing clean code matters more than patterns**. The only "pattern" you need to feel is the one Unity already forces on you:

* **Component pattern** ([GPP](#gpp-doc:component)) — a GameObject is a container, each Component is one behavior. This is why we *attach many small scripts* instead of writing one giant script.

👉 **What to do:** each script does **one thing** (`PlayerMovement`, `PlayerHealth` — never merged). That habit is the foundation for every pattern later.

---

## 🟡 Fresher — your first 3 patterns

| Pattern | Real problem | When NOT to use |
|---|---|---|
| **[Observer](../../02-Design-Patterns/02-Catalog/03-Behavioral/06-observer.md)** ([GPP](#gpp-doc:observer)) | The health/score HUD must update when gameplay changes, but gameplay **shouldn't know** the UI exists → use C# `event`/`Action`. | When only one listener exists and a direct call works — don't event-ify everything. |
| **Object Pool** ([GPP](#gpp-doc:update-method)) | Firing bullets / spawning enemies constantly → `Instantiate`/`Destroy` causes **GC spikes** that stutter the game. Reuse objects instead of recreating. | Objects created once that live long (boss, map). |
| **[Component](#gpp-doc:component)** | A character needs movement + health + audio → **compose** small components instead of deep inheritance. | — (this is the base mindset, always on). |

> [!WARNING]
> Fresher trap: overusing `event` until you can't trace who calls whom ("event spaghetti"). Rule: events **announce that something happened** (`OnPlayerDied`), they don't **issue commands** (`KillPlayer`).

---

## 🟠 Junior — managing state & behavior

This is where patterns start *answering problems you actually hit*.

| Pattern | Real problem | When NOT to use |
|---|---|---|
| **[State](../../02-Design-Patterns/02-Catalog/03-Behavioral/07-state.md)** ([GPP](#gpp-doc:state)) | AI/character with many states (Idle/Patrol/Chase/Attack) → replace the giant `switch` in `Update` with a **State Machine**. | Just two simple bool states. |
| **[Strategy](../../02-Design-Patterns/02-Catalog/03-Behavioral/08-strategy.md)** | Multiple damage formulas / movement styles → swap the "algorithm" at runtime without touching the base class. | Exactly one algorithm that never changes. |
| **[Singleton](../../02-Design-Patterns/02-Catalog/01-Creational/05-singleton.md)** ([GPP](#gpp-doc:singleton)) | Need one global access point (`AudioManager`, `GameManager`). | **Most of the time** — read the warning below. |
| **[Command](../../02-Design-Patterns/02-Catalog/03-Behavioral/02-command.md)** ([GPP](#gpp-doc:command)) | Wrap "an action" into an object → undo/redo, replay, key remapping. | Simple input with no history needed. |

> [!CAUTION]
> **Singleton is a double-edged sword.** It's convenient but creates global coupling, hard to test, hard to decouple. At Junior, learn to *use* it; from Middle, gradually replace it with **Dependency Injection**. Understanding its **downsides** matters as much as knowing how to write it.

---

## 🔵 Middle — decoupling & data-driven

The focus shifts from "one object" to "one system". Patterns now serve the **boundaries between systems**.

| Pattern | Real problem | Note |
|---|---|---|
| **[Factory Method](../../02-Design-Patterns/02-Catalog/01-Creational/01-factory-method.md)** / **[Abstract Factory](../../02-Design-Patterns/02-Catalog/01-Creational/02-abstract-factory.md)** | Spawn enemies/items by type without scattering `new`/`Instantiate` everywhere. | Pairs with ScriptableObject. |
| **[Facade](../../02-Design-Patterns/02-Catalog/02-Structural/05-facade.md)** | A large system (Inventory, Audio) exposes **one clean API**, hiding internals. | This is how you define a "module boundary". |
| **[Flyweight](../../02-Design-Patterns/02-Catalog/02-Structural/06-flyweight.md)** ([GPP](#gpp-doc:flyweight)) | 10,000 trees/enemies of one kind → share common data (mesh, base stats) instead of duplicating. | Big RAM savings. |
| **Type Object** ([GPP](#gpp-doc:type-object)) | "Goblin", "Orc" are **data** (ScriptableObject), not separate subclasses → designers add enemies without programmers. | The backbone of data-driven design. |
| **Event Queue** ([GPP](#gpp-doc:event-queue)) | Decouple sender and receiver in **time** (process later, in batches) — e.g. audio, analytics. | Differs from Observer by having a queue. |
| **Dependency Injection** | Replace Singleton: pass dependencies in via constructor/inspector (Zenject/VContainer). | Not GoF but a *must-have* pattern at Middle. |

> [!TIP]
> Cross-reference **Refactoring → Code Smells**: reach for Factory when you see `new` scattered everywhere; reach for Facade when you see "Inappropriate Intimacy" between systems.

---

## 🟣 Senior — architecture & large-scale performance

Patterns here serve the **whole project** and **performance/scaling** problems.

| Pattern | Real problem |
|---|---|
| **Service Locator** ([GPP](#gpp-doc:singleton)) | Provide global services (audio, save, log) with **more control** than Singleton — swap implementations, mock in tests. |
| **Bytecode** ([GPP](#gpp-doc:bytecode)) | Let designers/modders define behavior (skills, events) via "data/script" instead of recompiling the engine. |
| **Spatial Partition** ([GPP](#gpp-doc:spatial-partition)) | Thousands of entities need "who's near whom" → grid/quadtree instead of O(n²). The base of open-world & large-scale collision. |
| **Double Buffer** ([GPP](#gpp-doc:double-buffer)) | Update state without letting readers see a half-finished state (rendering, simulation). |
| **Subclass Sandbox** ([GPP](#gpp-doc:subclass-sandbox)) | Define a "safe API" for many subclasses (e.g. 100 skill types inheriting `Ability`). |

👉 At Senior you also choose the **overall architecture** (layering, ECS, plugin architecture) — see [🏗️ System Design](./08-system-design-guide.md).

---

## 🔴 Lead — no new patterns, but *gatekeeping* patterns

Leads rarely learn new patterns. The role shifts to:

* **Design review:** spotting when a Senior is overusing/misusing a pattern (over-engineering is a bug too).
* **Setting standards:** deciding which DI framework the team uses, how the State Machine convention works.
* **Teaching:** explaining *why* pattern A was chosen — turning personal knowledge into a team standard.

> [!NOTE]
> The sign of pattern maturity: at first you ask *"which pattern should I use?"*, later you ask *"do I even need a pattern, or is straightforward code simpler?"*. **A surplus pattern is a form of technical debt.**

---

## 🔗 Read next

* [🏗️ System Design Guide](./08-system-design-guide.md) — how to combine these patterns into real systems.
* [📐 Design Patterns overview](../../02-Design-Patterns/00-design-patterns-overview.md) — full theory + code for all 23 patterns.
* [📖 Game Programming Patterns](#gpp-doc:introduction) — game-specific patterns (Nystrom).

---

⬅️ [Career ladder overview](./00-career-overview.md) · ➡️ [System Design](./08-system-design-guide.md)
