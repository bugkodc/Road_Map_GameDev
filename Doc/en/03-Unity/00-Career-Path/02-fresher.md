# 🟡 Level 2 — Fresher

> ⏱️ **Indicative timeline:** 0–1 year · **In one line:** *"Get the work done with supervision."*

---

## 🎯 Role

Take **clearly described** tasks and complete them with a little guidance. Start to **self-debug** instead of asking immediately. Code is still reviewed closely, but you now drive most of your own work.

---

## 🧠 Technical knowledge to reach

### Intermediate C#
* `interface`, `abstract` classes, `virtual`/`override`.
* `properties` (get/set), `delegate`, `event`, `Action`/`Func`.
* Basic generics; exception handling `try/catch/finally`.
* Basic **LINQ**: `Where`, `Select`, `FirstOrDefault`.

### Full MonoBehaviour lifecycle
* The whole lifecycle: `Awake` · `OnEnable` · `Start` · `FixedUpdate` · `Update` · `LateUpdate` · `OnDisable` · `OnDestroy`.
* Clearly distinguish **`Update` (logic, render)** vs **`FixedUpdate` (physics)**.

### Prefabs & object management
* **Prefab Variants**, nested prefabs.
* Basic **Object Pooling** — why you shouldn't `Instantiate`/`Destroy` repeatedly (GC spikes).

### Input System
* The new Input System: **Action Asset**, bindings, control schemes for keyboard / gamepad / touch.

### UI (UGUI)
* `Canvas`, anchors & pivots, **Layout Groups**, `Button`, `Text`/`TMP_Text`, `Image`.
* Handle UI events (`onClick`), update the HUD.

### Animation
* **Animator Controller**: states, transitions, parameters (bool/trigger/float).
* Animation Clips; basic blending.

### Coroutines
* `IEnumerator`, `yield return`, `WaitForSeconds`, `StartCoroutine`/`StopCoroutine`.
* When to use a Coroutine instead of logic in `Update`.

### ScriptableObject
* The concept; using it to store **config/data** separate from code (e.g. enemy stats, level config).

### Audio
* `AudioSource`, `AudioClip`; play SFX and background music; manage volume.

---

## 🎨 Patterns & design at this level

Your first three patterns — learn each **when you hit the problem**, don't memorize:

| Pattern | When you meet it |
|---|---|
| **[Observer](../../02-Design-Patterns/02-Catalog/03-Behavioral/06-observer.md)** (C# `event`/`Action`) | The health/score HUD must update when gameplay changes — but gameplay shouldn't know the UI exists. |
| **Object Pool** | Constant firing/spawning stutters because of `Instantiate`/`Destroy` → reuse objects. |
| **[Component](#gpp-doc:component)** | Compose small scripts instead of deep inheritance. |

> [!WARNING]
> The biggest trap: event-ifying everything until you can't trace who calls whom. Events **announce that something happened** (`OnPlayerDied`), they don't **issue commands**.

🏗️ **Try designing:** a HUD updated via `event` (gameplay never calls the UI directly). See the example in [🏗️ System Design](./08-system-design-guide.md).

---

## 🛠️ Proof of work

A 2D/3D game with **multiple levels**, including:
* a full UI flow (menu → gameplay → game over),
* audio (SFX + music),
* character animation,
* a simple high-score save.

---

## ✅ Criteria to reach Junior

- [ ] Self-debug common issues (null reference, wrong logic, wrong lifecycle order).
- [ ] Split logic into multiple scripts, each with a clear single responsibility — not one giant file.
- [ ] Use `event`/`delegate` to reduce direct dependencies between scripts.
- [ ] Know when to use Coroutines and ScriptableObjects.

> [!WARNING]
> The biggest trap at this level: writing a **"God script"** — one file holding all the logic. Build the habit of asking *"does this component have exactly one reason to change?"* (Single Responsibility).

---

⬅️ [Level 1 — Intern](./01-intern.md) · ➡️ [Level 3 — Junior](./03-junior.md)
