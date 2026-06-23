# 🟣 Level 5 — Senior

> ⏱️ **Indicative timeline:** 4–7 years · **In one line:** *"Design architecture & master the engine."*

---

## 🎯 Role

Own the **technical architecture of the whole project** or several large systems. Make decisions that affect the team. Solve the hardest problems. You are the technical authority — the person who untangles production crises.

---

## 🧠 Technical knowledge to reach

### Global architecture
* Clear layering: **gameplay / core / platform / services**.
* **Assembly Definitions** (`.asmdef`) to cut compile time and manage dependencies.
* Design for **3–5 year extensibility & maintainability**, for many people working in parallel.

### Performance at scale
* Set a **performance budget** (frame budget in ms, memory budget) per platform.
* Optimize for **low-end devices**; profile **on real devices**, not just the Editor.
* **DOTS/ECS** at production level when the problem demands it (thousands of entities); native memory.

### Deep engine knowledge (engine-level)
* Unity's **serialization** mechanics; the **asset import pipeline**.
* **Scripting backend**: Mono vs **IL2CPP**; GC modes (incremental); impact on build & performance.
* Know when a **native plugin (C++)** is needed and how to integrate it.

### Multi-platform & shipping
* Console specifics (**cert** requirements), **mobile** specifics (battery, heat, build size).
* **Live-ops**, A/B testing, analytics integration, remote config.

### Security & live games
* **Server-authoritative** design; basic anti-cheat.
* **Hot-update content** (ship content without a new store build).

### Technology direction
* Evaluate & choose **packages / SDKs / engine versions**.
* Manage **technical debt** at the project level; plan how to pay it down.

---

## 🏗️ Design at this level

You design at the **whole-project architecture** altitude, not just one system. The focus is *how systems stack together* and patterns serving large-scale performance/extensibility:

* **Layering:** gameplay → core → platform/services; **dependencies only point downward**. Enforce with **Assembly Definitions** (`.asmdef`).
* **Service Locator / DI container** — provide global services with control, replacing Singleton.
* **Spatial Partition · Double Buffer · Bytecode · Subclass Sandbox** — performance & extensibility patterns (detail in [🎨 Patterns by level](./07-patterns-by-level.md)).

🏗️ **Reference:** the whole-project layering model + boundary-enforcing tools in [🏗️ System Design — Altitude 3](./08-system-design-guide.md).

---

## 🛠️ Proof of work

* **Shipped ≥1 commercial product** as the lead architect.
* Resolved a **technical crisis** in production (mass crashes, severe perf drop, a live incident).

---

## ✅ Criteria to reach Lead

- [ ] Impact that **goes beyond your own code** — you raise the whole team's level.
- [ ] Balance business needs ↔ technical constraints; communicate well with non-tech (PM, designer, publisher).
- [ ] Establish **processes / technical standards** the team adopts.
- [ ] Trusted by the team & management with important technical decisions.

> [!NOTE]
> Senior is where many people stop — and remain very valuable (Senior IC — Individual Contributor). Going to Lead is **not mandatory**; it's a choice of direction, not "a higher level that's automatically better".

---

⬅️ [Level 4 — Middle](./04-middle.md) · ➡️ [Level 6 — Technical Lead](./06-lead.md)
