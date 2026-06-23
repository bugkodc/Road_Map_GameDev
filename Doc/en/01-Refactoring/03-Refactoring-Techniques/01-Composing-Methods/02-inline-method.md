# Inline Method

> 📖 **Source:** [Refactoring.Guru — Inline Method](https://refactoring.guru/inline-method) | Author: Alexander Shvets

## ❌ Problem

When a **method's body is as simple and clear as its name**, the method becomes unnecessary indirection. Sometimes code is delegated so much that reading it becomes confusing.

```csharp
// ❌ A method so simple it doesn't need to exist on its own
bool IsPlayerDead()
{
    return health <= 0;
}

void Update()
{
    if (IsPlayerDead())
    {
        HandleDeath();
    }
}
```

## ✅ Solution

**Replace the method call with the method's body**, then **delete** the unnecessary method.

```csharp
// ✅ Inlined directly — simple and clear
void Update()
{
    if (health <= 0)
    {
        HandleDeath();
    }
}
```

> ⚠️ **Note:** Only inline when the method is truly too simple. If `IsPlayerDead()` is called in **many places**, keeping it is the better choice (the DRY principle).

## 🔍 Why Refactor

- **Too much indirection**: When you have to jump through several methods just to understand a single simple piece of logic
- **Preparing for another refactoring**: Inline the method first, then reorganize the code in a better way
- **The body is clearer than the name**: Sometimes the expression itself is easier to understand than the method name
- **After over-refactoring**: When Extract Method was applied too eagerly

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **Less unnecessary complexity** | Fewer methods to navigate |
| 🔍 **More direct code** | The logic sits right where it's used, no method-hopping required |
| 🧹 **Removes redundant indirection** | Drops a meaningless intermediate layer |

## 📝 How to Refactor

1. **Check that the method isn't overridden** in a subclass (if it is, don't inline)
2. **Find all calls** to the method
3. **Replace each call** with the method's body
4. **Delete the method** once all calls have been replaced
5. **Compile and test**

## 🦨 Helps treat these Code Smells

- 🔗 [Middle Man](../../02-Code-Smells/05-Couplers/03-middle-man.md) — When a class only delegates without adding value
- 🔗 [Speculative Generality](../../02-Code-Smells/04-Dispensables/04-speculative-generality.md) — A method created "just in case" but in practice far too simple

## 🎮 In Game Dev

### Inlining an overly simple method:
```csharp
// ❌ Before: a method that just wraps an expression
float GetSpeed() { return baseSpeed; }
bool IsGrounded() { return controller.isGrounded; }

// ✅ After: inlined directly
if (controller.isGrounded)
{
    velocity.y = 0;
    transform.position += direction * baseSpeed * Time.deltaTime;
}
```

### When NOT to Inline:
```csharp
// ❌ DON'T inline this method — it's called in many places
bool CanAttack()
{
    return health > 0 && stamina >= attackCost && !isStunned && Time.time > lastAttackTime + cooldown;
}
// This method should stay because the expression is complex AND used in many places
```

### Notes:
- In Unity, simple wrappers like `GetComponent<T>()` can be inlined
- But keep a method if it **gives a name to business logic**: `CanAttack()`, `IsInRange()`, `HasEnoughMana()`

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Extract Method](./01-extract-method.md)
- ➡️ [Extract Variable](./03-extract-variable.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
