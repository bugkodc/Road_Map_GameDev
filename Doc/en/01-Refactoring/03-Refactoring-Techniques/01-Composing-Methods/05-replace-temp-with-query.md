# Replace Temp with Query

> 📖 **Source:** [Refactoring.Guru — Replace Temp with Query](https://refactoring.guru/replace-temp-with-query) | Author: Alexander Shvets

## ❌ Problem

You have a **temporary variable holding the result** of an expression. This temp exists only within one method, makes the method longer, and prevents the calculation logic from being reused elsewhere.

```csharp
// ❌ A temp holding a computed result
float CalculateTotal()
{
    float basePrice = quantity * itemPrice;
    
    if (basePrice > 1000)
        return basePrice * 0.95f;  // 5% off
    else
        return basePrice * 0.98f;  // 2% off
}
```

## ✅ Solution

**Move the expression into its own method** (a query method) and replace the temp with a call to that method. The result can then be reused by other methods in the class.

```csharp
// ✅ Replace the temp with a query method
float CalculateTotal()
{
    if (GetBasePrice() > 1000)
        return GetBasePrice() * 0.95f;
    else
        return GetBasePrice() * 0.98f;
}

float GetBasePrice()
{
    return quantity * itemPrice;
}
```

## 🔍 Why Refactor

- **Reuse logic**: The new method can be called from many places in the class
- **A preparatory step**: Sets up [Extract Method](./01-extract-method.md) — reduces the number of local variables to deal with
- **Self-documenting code**: A method name describes the meaning better than a variable name
- **Smaller methods**: Removes the temp and its assignment

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **More readable code** | A clearly named method instead of a temp |
| 🔄 **Reuse** | The calculation logic can be used in multiple methods |
| 🧹 **More concise methods** | Fewer temps, fewer lines of code |
| 🔧 **Easier to refactor further** | Fewer locals = easier Extract Method |

## 📝 How to Refactor

1. **Make sure the temp is assigned only once** in the method. If not, apply [Split Temporary Variable](./06-split-temporary-variable.md) first
2. **Create a new private method** that returns the value of the expression
3. **Replace the temp** with a call to the new method
4. **Delete the temp's declaration**
5. **Compile and test**

> ⚠️ **Watch out for performance**: If the new method is expensive (heavy computation, a database query, etc.) and is called many times, consider caching the result.

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Reduce the method's size by removing temps

## 🎮 In Game Dev

### Extracting damage calculation logic:
```csharp
// ❌ Before
float CalculateDamage()
{
    float baseDamage = strength * weaponMultiplier;
    float critBonus = Random.value < critChance ? baseDamage * critMultiplier : 0;
    return baseDamage + critBonus;
}

// ✅ After — now reusable
float CalculateDamage()
{
    float critBonus = Random.value < critChance ? GetBaseDamage() * critMultiplier : 0;
    return GetBaseDamage() + critBonus;
}

float GetBaseDamage() => strength * weaponMultiplier;
```

### ⚠️ Be careful in Game Dev:
```csharp
// ❌ DON'T replace a temp with a query if the calculation is expensive
// Vector3.Distance, Physics.Raycast, GetComponent, FindObjectsOfType
// → These should be cached in a temp

float distance = Vector3.Distance(a, b); // Compute once
if (distance < range1) { /* ... */ }
if (distance < range2) { /* ... */ } // Reuse, don't recompute
```

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Inline Temp](./04-inline-temp.md)
- ➡️ [Split Temporary Variable](./06-split-temporary-variable.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
