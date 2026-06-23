# 🟢 Level 1 — Intern

> ⏱️ **Indicative timeline:** 0–6 months · **In one line:** *"Learn how to learn."*

---

## 🎯 Role

Work on small tasks with a **mentor reviewing every step**. The goal isn't production value — it's getting used to the **workflow**, the tools, and how a developer thinks. Mistakes are normal; what matters is asking at the right time and learning fast.

---

## 🧠 Technical knowledge to reach

### C# fundamentals
* Variables, data types, operators, `if/else`, `switch`, `for`/`foreach`/`while` loops.
* `class` vs `struct`, methods, parameters, return values.
* Basic collections: `List<T>`, `Dictionary<K,V>`, arrays, `enum`.
* Basic OOP: inheritance, polymorphism, encapsulation (`public`/`private`).

### Unity Editor
* Fluent with the windows: **Scene · Game · Hierarchy · Inspector · Project · Console**.
* Move/rotate/scale GameObjects; use Gizmos; snapping.
* Distinguish **Edit mode** vs **Play mode** (and the "I edited during Play mode and lost it" trap).

### GameObject & Component
* The **Entity–Component** model: a GameObject is a container, a Component is behavior.
* `Transform`: position, rotation, scale; parent–child relationships.
* Add/remove components; basic **Prefabs** (create, drag into scene, `Instantiate`).

### MonoBehaviour
* Core lifecycle: `Awake()` → `Start()` → `Update()`.
* `[SerializeField]` and wiring references via the Inspector.
* `Update` runs **every frame** → use `Time.deltaTime` for frame-rate independence.

### Physics basics
* `Rigidbody`, `Collider` (Box/Sphere/Capsule), `isTrigger`.
* Collision callbacks: `OnCollisionEnter`, `OnTriggerEnter`.

### Tools
* Basic **Git**: `clone`, `commit`, `pull`, `push`, create a branch.
* Read errors in the **Console**; follow a stack trace to the right line.

---

## 🎨 Patterns & design at this level

At Intern you **don't need design patterns yet**. What matters more: feel the **Component pattern** Unity already forces on you — *each script does exactly one thing*, never merged into one file.

* ❌ `Player.cs` holding movement + health + audio + UI.
* ✅ Split into `PlayerMovement`, `PlayerHealth`, `PlayerAudio` — one responsibility each.

> This is the foundation for every pattern later. See the [🎨 Pattern map by level](./07-patterns-by-level.md) for the full picture.

---

## 🛠️ Proof of work

One **complete mini game** built from scratch to a **runnable build**:
> Flappy Bird · Pong · Roll-a-ball · Breakout.

---

## ✅ Criteria to reach Fresher

- [ ] Build a simple scene and write a control script without line-by-line hand-holding.
- [ ] Understand that `Update` runs every frame and use `Time.deltaTime` correctly.
- [ ] Commit code to Git following the team's conventions.
- [ ] Finish one mini game from idea to build.

> [!TIP]
> At this level, **knowing how to ask** matters more than knowing everything. Before asking your mentor: did you try Google / read the Console? Can you describe the problem *and* what you already tried?

---

⬅️ [Career overview](./00-career-overview.md) · ➡️ [Level 2 — Fresher](./02-fresher.md)
