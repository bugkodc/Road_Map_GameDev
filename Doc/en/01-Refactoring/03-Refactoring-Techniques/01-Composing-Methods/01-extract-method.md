# Extract Method

> 📖 **Source:** [Refactoring.Guru — Extract Method](https://refactoring.guru/extract-method) | Author: Alexander Shvets

## ❌ Problem

You have **a fragment of code that can be grouped** into one logical block. That fragment is buried inside a long method, making the method hard to read and obscuring its overall purpose.

```csharp
// ❌ Before refactoring
void Update()
{
    // Handle input
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");
    Vector3 direction = new Vector3(h, 0, v).normalized;
    
    // Handle movement
    if (direction.magnitude >= 0.1f)
    {
        float targetAngle = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg;
        transform.rotation = Quaternion.Euler(0, targetAngle, 0);
        controller.Move(direction * speed * Time.deltaTime);
    }
    
    // Handle combat
    if (Input.GetButtonDown("Fire1") && Time.time > lastAttackTime + cooldown)
    {
        // ... 20 lines of combat logic ...
    }
}
```

## ✅ Solution

Move that fragment into a **new method** and name the method after its **PURPOSE** (what it does), not after **how** it does it.

```csharp
// ✅ After refactoring
void Update()
{
    HandleInput();
    HandleMovement();
    HandleCombat();
}

private void HandleInput()
{
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");
    moveDirection = new Vector3(h, 0, v).normalized;
}

private void HandleMovement()
{
    if (moveDirection.magnitude >= 0.1f)
    {
        float targetAngle = Mathf.Atan2(moveDirection.x, moveDirection.z) * Mathf.Rad2Deg;
        transform.rotation = Quaternion.Euler(0, targetAngle, 0);
        controller.Move(moveDirection * speed * Time.deltaTime);
    }
}

private void HandleCombat()
{
    if (Input.GetButtonDown("Fire1") && Time.time > lastAttackTime + cooldown)
    {
        // combat logic
    }
}
```

## 🔍 Why Refactor

- **The longer a method, the harder it is to understand**: You have to read the whole thing to grasp what it does
- **Comments are a signal**: If you need a comment to explain a fragment of code, that's a sign it should be extracted into a method
- **Reuse**: Extracted code can be reused elsewhere
- **Isolation**: Bugs are isolated within a small method, making them easier to debug

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **More readable code** | A well-named method acts as "living documentation" |
| 🔄 **Less duplication** | Duplicated code is replaced by a single method call |
| 🧪 **Easier to test** | Small methods can be unit tested in isolation |
| 🐛 **Easier to debug** | Bugs are isolated within a specific method |

## 📝 How to Refactor

1. **Create a new method** and name it to describe the purpose of the fragment (what, not how)
2. **Copy the fragment** you want to extract into the new method
3. **Handle local variables** in the fragment:
   - A variable only read within the fragment → pass it as a **parameter**
   - A variable assigned within the fragment → **return** that value
   - Multiple variables assigned → consider using an `out` parameter or splitting into multiple methods
   - A temp used only within the fragment → **keep it** inside the new method
4. **Replace the old fragment** with a call to the new method
5. **Compile and test** to make sure nothing is broken

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Break a long method into several short ones
- 🔗 [Duplicate Code](../../02-Code-Smells/04-Dispensables/01-duplicate-code.md) — Consolidate duplicated code into a single method
- 🔗 [Feature Envy](../../02-Code-Smells/05-Couplers/01-feature-envy.md) — Extract the "envious" code into its own method, then move it
- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — A clearly named method replaces a comment

## 🎮 In Game Dev

### Unity — Breaking up a complex Update():
```csharp
// In a MonoBehaviour
void Update()
{
    HandleInput();
    HandleMovement();
    HandleCombat();
    HandleAnimation();
    UpdateUI();
}
```

### Breaking up spawn logic:
```csharp
// Instead of 50 lines of spawn logic in one method
void SpawnWave()
{
    var spawnPoints = CalculateSpawnPositions();
    var enemies = CreateEnemies(waveConfig);
    PlaceEnemiesAtPositions(enemies, spawnPoints);
    NotifyWaveStarted();
}
```

### Notes for Game Dev:
- **Don't extract too aggressively** in performance-critical code (each method call has a small overhead)
- The **Unity Profiler** is easier to read when methods are clearly separated
- **Name by domain**: `HandleInput()` is better than `ProcessData()`

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ➡️ [Inline Method](./02-inline-method.md)
- 🔗 [Refactoring Techniques](../00-techniques-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
