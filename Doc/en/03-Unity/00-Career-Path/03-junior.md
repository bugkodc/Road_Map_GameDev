# 🟠 Level 3 — Junior

> ⏱️ **Indicative timeline:** 1–2 years · **In one line:** *"Ship a full feature on your own."*

---

## 🎯 Role

Take a feature from a **business description** and complete it end to end. Your code is reviewed but rarely needs big changes. You begin to care about **code quality** and start reviewing Intern/Fresher code.

---

## 🧠 Technical knowledge to reach

### Code architecture
* Apply **SOLID** in practice (especially SRP & Dependency Inversion).
* Separate **Model – View** (data decoupled from presentation).
* **State Machines** for gameplay/AI instead of an `if/else` jungle.
* Avoid "God objects"; recognize when to refactor.

### Design Patterns in practice
* **Singleton** — and understanding the harm of overusing it.
* **Observer / Event Bus** — loose coupling between systems.
* **State**, **Strategy**, **Object Pool**, **Component** patterns.

> [!TIP]
> Cross-reference the **Design Patterns** and **Game Programming Patterns** tracks in this roadmap — this is when pattern theory starts answering problems you actually hit.

### Scene management
* `SceneManager`: **Single** vs **Additive** loading.
* Async loading (`LoadSceneAsync`) + a loading screen.

### Data & Save/Load
* JSON (`JsonUtility` / Newtonsoft.Json) to serialize state.
* `PlayerPrefs` and its **limits** (not for large save games).

### Advanced physics
* `Raycast` / `SphereCast` / `BoxCast`.
* **Layers** & **Layer Masks**; the Collision Matrix; Physics Materials.

### Advanced UI
* Runtime-generated UI (instantiating list items).
* Start exploring **UI Toolkit**; design responsive layouts for many resolutions.

### Performance basics
* Read the **Profiler**; spot **GC allocations** and why they cause hitches (spikes).
* Understand what a **Draw Call** / batching is.

### Assets & Git
* **Addressables** basics — load assets asynchronously instead of cramming everything into a scene.
* Advanced Git: resolve merge conflicts, create & review **Pull Requests**.

---

## 🏗️ Design at this level

This is where you start designing at the *feature → small-system* altitude. Related patterns (detail + when NOT to use in [🎨 Patterns by level](./07-patterns-by-level.md)):

* **[State](../../02-Design-Patterns/02-Catalog/03-Behavioral/07-state.md)** — a State Machine for AI/characters instead of a giant `switch` in `Update`.
* **[Strategy](../../02-Design-Patterns/02-Catalog/03-Behavioral/08-strategy.md)** — swap algorithms (movement, damage formula) at runtime.
* **[Singleton](../../02-Design-Patterns/02-Catalog/01-Creational/05-singleton.md)** — *usable* but understand its downsides (global coupling, hard to test).
* **[Command](../../02-Design-Patterns/02-Catalog/03-Behavioral/02-command.md)** — wrap actions for undo/replay/key remapping.

🏗️ **Try designing:** a State Machine for enemy AI (Idle → Patrol → Chase → Attack). Walk through the 6-step process in [🏗️ System Design](./08-system-design-guide.md).

---

## 🛠️ Proof of work

* Deliver a **core feature** in a real project (job or team), **or**
* A personal game with **clear architecture**, published to a store (Google Play / itch.io / App Store).

---

## ✅ Criteria to reach Middle

- [ ] Take a vague feature → ask clarifying questions → break it into tasks → complete it.
- [ ] Write structured, readable, loosely coupled code; refactor when "code smells" appear.
- [ ] Solve simple performance problems yourself (reduce GC alloc, batch draw calls).
- [ ] Review Fresher/Intern PRs and point out concrete issues.

> [!IMPORTANT]
> The Junior → Middle jump is about **design thinking**, not just "coding faster". Start asking *"how will this feature change in the next 6 months?"* before you write it.

---

⬅️ [Level 2 — Fresher](./02-fresher.md) · ➡️ [Level 4 — Middle](./04-middle.md)
