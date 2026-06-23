# Flyweight

> 📖 **Source:** [Refactoring.Guru — Flyweight](https://refactoring.guru/design-patterns/flyweight) | Author: Alexander Shvets

---

## 🎯 Intent

**Flyweight** is a structural design pattern that helps optimize RAM usage by sharing the common parts of state (the **Intrinsic State**) among many similar objects, instead of repeatedly storing all of that data in each object individually.

---

## ❌ Problem

Imagine you are developing a "Bullet Hell" shooter or a large-scale real-time strategy (RTS) game.
- At any given moment, there can be up to 10,000 bullets flying on the screen at once.
- Each bullet in the game needs to store the following information:
  *   *Dynamic information:* Position (`Vector3 position`), travel direction (`Vector3 direction`), current speed.
  *   *Static information:* The bullet sprite (`Sprite`), the 3D model (`Mesh`), the sound effect played when fired (`AudioClip`), the damage dealt (`damage`), the explosion radius, and the maximum lifetime (`maxLifetime`).
- If each bullet is an independent GameObject containing all of the variables above, RAM will be overloaded extremely quickly. Tens of thousands of bullets would keep tens of thousands of identical copies of the same Sprite, the same AudioClip, and the same damage values. This wastes a tremendous amount of memory and leads to stutter caused by the Garbage Collector (GC) having to constantly clean up memory whenever bullets disappear.

---

## ✅ Solution

The **Flyweight** pattern proposes splitting an object's attributes into two parts:

1.  **Intrinsic State:** This is the immutable data that is completely identical across every bullet of the same type (such as sprite, damage, speed, maxLifetime). This data is separated out and stored as **only a single copy** in memory.
2.  **Extrinsic State:** This is the data that changes continuously and independently per specific instance (such as position, direction). This data is retained inside each specific bullet.

In Unity, the most standard and intuitive way to implement Flyweight is to use a **ScriptableObject**.
- We create a ScriptableObject named `BulletData` (which plays the role of the Flyweight) that contains all of the Intrinsic State. We only need to create exactly one `BulletData` Asset file for the "Red Laser Bullet" type and one for the "Blue Plasma Bullet" type.
- The `Bullet` class (the Context) represents the actual bullet flying on screen and only holds the Extrinsic State (position, travel direction) plus a reference pointing to the shared `BulletData` Asset file.

As a result, even with 10,000 Red Laser bullets on screen, they all share a single reference to one unique `BulletData` file, saving up to 90% of the required RAM.

---

## 🎨 Structure

Instead of reading one large UML diagram right away, read the pattern in three layers: **quick idea → real runtime flow → condensed UML**.

### 1. Quick idea

```mermaid
flowchart TD
  Bullet1["Bullet instance A"] --> Data["Shared BulletData"]
  Bullet2["Bullet instance B"] --> Data
  Bullet3["Bullet instance C"] --> Data
  Data --> Shared["Sprite + damage + speed"]
```

### 2. The actual execution flow

```mermaid
flowchart TD
  A["Spawner needs to create many identical objects"] --> B["Get shared data from factory/cache"]
  B --> C["Context keeps its own state: position, direction"]
  C --> D["Render/update using shared data"]
  D --> E["Less RAM because heavy data is shared"]
```

### 3. Condensed UML

```mermaid
classDiagram
  direction TB
  class Flyweight {
    +Operation(extrinsicState)
  }
  class FlyweightFactory {
    -cache
    +GetFlyweight()
  }
  class Context {
    -uniqueState
    -flyweight
    +Operation()
  }
  FlyweightFactory --> Flyweight
  Context --> Flyweight
```

### How to read the diagram

| Component | Meaning |
|---|---|
| Quick look | Separate shared data from data unique to each instance. |
| Main flow | The Context passes its own state into the shared Flyweight at runtime. |
| In games | ScriptableObject data for bullets, tiles, trees, enemy stats. |
| Solid arrow | An object holds a reference to or directly calls another object. |
| Triangle / dashed arrow in UML | Inheritance or interface implementation. |

> Quick-reading tip: first find the **Client/Context**, then follow the arrows to the main interface. The concrete classes are just variants swapped in at runtime.

---

## 💻 Pseudocode

```csharp
// The Flyweight class holds the intrinsic state (Intrinsic State)
class Flyweight
{
    private string _sharedState; // Example: Texture, audio, shared stats
    
    public Flyweight(string shared) => _sharedState = shared;
    
    public void Operation(string uniqueState)
    {
        // Perform an action combining the intrinsic and extrinsic state
        Print($"Intrinsic: {_sharedState}, Extrinsic: {uniqueState}");
    }
}

// The Context class holds the extrinsic state (Extrinsic State) and a Flyweight reference
class Context
{
    private string _uniqueState; // Extrinsic state (position, direction)
    private Flyweight _flyweight;

    public Context(string unique, Flyweight flyweight)
    {
        _uniqueState = unique;
        _flyweight = flyweight;
    }

    public void Render() => _flyweight.Operation(_uniqueState);
}
```

---

## ⚙️ Applicability

Use Flyweight when:
- Your game needs to create an extremely large number of entities (thousands or tens of thousands of objects).
- The memory cost of storing these objects directly threatens game performance (causing crashes from RAM exhaustion or frame stutter from GC spikes).
- Most of an object's attributes can be clearly split into intrinsic state (shared) and extrinsic state (unique).
- Typical cases in games: bullet systems, particle effect systems, vegetation systems (rendering millions of grass blades and trees across an open-world map), or small minion units in MOBA/RTS games.

---

## 📝 How to Implement

1.  Analyze the attributes of the object you want to optimize and split them into two groups: Intrinsic and Extrinsic.
2.  Create a Flyweight class (in Unity, you should use a `ScriptableObject`) to store the Intrinsic attributes. Make sure this class contains no data that changes per specific instance.
3.  Create a Context class (usually a `MonoBehaviour` or a lightweight `struct`) to hold the Extrinsic attributes along with a reference pointing to the Flyweight class you just created.
4.  When the Spawner instantiates a Context object, inject the corresponding Flyweight reference into that object.

---

## ⚖️ Pros and Cons

*   **👍 Pros:**
    *   *Outstanding RAM savings:* Avoids duplicating thousands of expensive assets (Sprite, Audio, Mesh) in memory.
    *   *Improved performance:* Reduces the frequency of memory allocation and reclamation, minimizing stutter caused by Garbage Collection.
*   **👎 Cons:**
    *   The programmer has to separate the data, making the code slightly more complex.
    *   It costs a little CPU to retrieve data from the Flyweight through a reference (but this trade-off is extremely worthwhile compared to the RAM savings).

---

## 🎮 In Game Dev: C# Code Example (Unity)

Below is how to implement a memory-optimized Bullet system using a `ScriptableObject` as the Flyweight in Unity:

### 1. The Flyweight class (ScriptableObject) holding the intrinsic state
```csharp
using UnityEngine;

namespace DesignPatterns.Flyweight
{
    // Add a menu entry to create the Asset file in the Unity Editor
    [CreateAssetMenu(fileName = "NewBulletData", menuName = "Design Patterns/Flyweight/Bullet Data")]
    public class BulletData : ScriptableObject
    {
        [Header("Intrinsic Properties (Shared)")]
        public Sprite bulletSprite;
        public float baseDamage = 10f;
        public float baseSpeed = 20f;
        public float maxLifetime = 3f;
        
        [SerializeField] private AudioClip hitSound;

        public void PlayHitAudio(Vector3 position)
        {
            if (hitSound != null)
            {
                // Simulate playing the sound at the collision position
                Debug.Log($"[SFX] Playing sound {hitSound.name} at {position}");
            }
        }
    }
}
```

### 2. The Context class (MonoBehaviour) holding the extrinsic state
```csharp
using UnityEngine;

namespace DesignPatterns.Flyweight
{
    // Class representing the actual bullet flying in the game
    public class Bullet : MonoBehaviour
    {
        // Extrinsic state (Extrinsic State - independent for each bullet)
        private Vector3 _velocity;
        private float _currentLifetime;

        // Reference to the Flyweight (shared in common)
        private BulletData _bulletData;
        private SpriteRenderer _spriteRenderer;

        private void Awake()
        {
            _spriteRenderer = GetComponent<SpriteRenderer>();
        }

        // Set the initial extrinsic state and assign the Flyweight
        public void Initialize(Vector3 direction, BulletData data)
        {
            _bulletData = data;
            
            // Apply the shared intrinsic data to configure the display
            _spriteRenderer.sprite = _bulletData.bulletSprite;
            
            // Compute velocity based on direction (extrinsic) and flight speed (intrinsic)
            _velocity = direction.normalized * _bulletData.baseSpeed;
            _currentLifetime = 0f;
        }

        private void Update()
        {
            // Update the extrinsic state in real time
            transform.Translate(_velocity * Time.deltaTime);
            _currentLifetime += Time.deltaTime;

            if (_currentLifetime >= _bulletData.maxLifetime)
            {
                DestroyBullet();
            }
        }

        private void OnTriggerEnter2D(Collider2D collision)
        {
            // Handle the collision
            Debug.Log($"[Bullet] Dealt {_bulletData.baseDamage} damage to {collision.name}");
            
            // Call the Flyweight's method to play the shared sound
            _bulletData.PlayHitAudio(transform.position);
            
            DestroyBullet();
        }

        private void DestroyBullet()
        {
            // In practice, combine Object Pooling with Flyweight for maximum performance
            Destroy(gameObject);
        }
    }
}
```

### 3. The Spawner that creates bullets in bulk (BulletSpawner)
```csharp
using UnityEngine;

namespace DesignPatterns.Flyweight
{
    public class BulletSpawner : MonoBehaviour
    {
        [SerializeField] private GameObject bulletPrefab;
        
        // Drag and drop the BulletData ScriptableObject files here from the Inspector
        [SerializeField] private BulletData redLaserData;
        [SerializeField] private BulletData bluePlasmaData;

        private void Update()
        {
            // Press the J key to fire a Red Laser bullet
            if (Input.GetKeyDown(KeyCode.J))
            {
                SpawnBullet(Vector3.up, redLaserData);
            }

            // Press the K key to fire a Blue Plasma bullet
            if (Input.GetKeyDown(KeyCode.K))
            {
                SpawnBullet(new Vector3(0.5f, 1f, 0f), bluePlasmaData);
            }
        }

        private void SpawnBullet(Vector3 direction, BulletData data)
        {
            // Instantiate the GameObject
            GameObject bulletObj = Instantiate(bulletPrefab, transform.position, Quaternion.identity);
            Bullet bulletScript = bulletObj.GetComponent<Bullet>();
            
            // Inject the Flyweight ScriptableObject into the bullet
            bulletScript.Initialize(direction, data);
            
            Debug.Log($"[Spawner] Fired 1 bullet. This bullet shares the data: {data.name} (Damage: {data.baseDamage})");
        }
    }
}
```

---

> 📚 **Source:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Facade](./05-facade.md) |
| → Next | [Proxy](./07-proxy.md) |
