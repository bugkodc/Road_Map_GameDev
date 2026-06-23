# 🔵 Level 4 — Middle (Mid-level)

> ⏱️ **Indicative timeline:** 2–4 years · **In one line:** *"Own a whole large system."*

---

## 🎯 Role

Own a **large system/module** in the project (combat, inventory, networking, economy, save system…). Take responsibility for the **technical design** of your area. Need little supervision; you're who Juniors come to with questions.

---

## 🧠 Technical knowledge to reach

### Game system architecture
* Design **decoupled modules** with clear boundaries (interfaces between systems).
* **Dependency Injection** (Zenject / VContainer) instead of Singletons everywhere.
* **MVVM / MVC** for UI; **data-driven design** with ScriptableObjects.

### Deep performance optimization
* **Profiler + Memory Profiler + Frame Debugger** — read them and trace root causes.
* **Batching**: static / dynamic / SRP Batcher; reduce **overdraw**; texture **atlases**.
* Manage **GC** rigorously: cache references, use `struct`s, avoid boxing, avoid allocating `foreach`, use `StringBuilder`.

### Async & multithreading
* `async/await`, the **UniTask** library (replacing Coroutines when needed).
* **Job System + Burst Compiler** basics for compute-heavy work; the **DOTS/ECS** concept.

### Rendering & shaders
* Distinguish **Built-in vs URP vs HDRP**; render pipeline structure.
* **Shader Graph**; write basic shaders (HLSL); lighting, post-processing (Volumes).

### Multiplayer
* **Netcode for GameObjects** or Mirror / Photon.
* Client–server model, **state sync**, **RPCs**, handling latency & prediction.

### Addressables & build
* Content delivery, remote bundles, asset dependency management.
* Multi-platform build pipeline: PC · Mobile · Console · WebGL.

### Testing
* **Unit tests** (NUnit + Unity Test Framework); **Play Mode tests**.

### Editor tooling
* Write **Custom Editors**, `EditorWindow`s, `PropertyDrawer`s to boost team productivity.

### CI/CD
* Understand automated builds: Unity Cloud Build / GameCI / Jenkins.

---

## 🛠️ Proof of work

* Own the **architecture of a core system** in a shipped project.
* Have an **internal tool** you wrote that other teammates use.

---

## ✅ Criteria to reach Senior

- [ ] Design architecture for a large module, **anticipate future change**, write technical docs.
- [ ] Solve complex performance/sync bugs that stump others.
- [ ] Make technical decisions with **clear trade-offs** (explain why A over B).
- [ ] Mentor Juniors; help shape the team's coding conventions.

> [!IMPORTANT]
> Middle is the **"master craftsman"** level: it's not just about being correct, but **durable** and **extensible**. Trade-offs become the central word — there's no longer an "absolutely right" answer.

---

⬅️ [Level 3 — Junior](./03-junior.md) · ➡️ [Level 5 — Senior](./05-senior.md)
