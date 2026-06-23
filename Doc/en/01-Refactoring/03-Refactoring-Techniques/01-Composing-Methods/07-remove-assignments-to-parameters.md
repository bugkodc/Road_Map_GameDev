# Remove Assignments to Parameters

> 📖 **Source:** [Refactoring.Guru — Remove Assignments to Parameters](https://refactoring.guru/remove-assignments-to-parameters) | Author: Alexander Shvets

## ❌ Problem

A new value is **assigned back to a parameter** inside the method body. This is confusing because the parameter loses its original value, making it hard to tell which data the method is working with.

```csharp
// ❌ Reassigning a parameter
float CalculateDiscount(float inputVal, int quantity)
{
    if (quantity > 50)
        inputVal -= 2;  // Reassigning the parameter!
    if (inputVal > 100)
        inputVal -= 1;  // Reassigning again!
    return inputVal;
}
```

## ✅ Solution

Use a **local variable** instead of reassigning the parameter.

```csharp
// ✅ Use a separate local variable
float CalculateDiscount(float inputVal, int quantity)
{
    float result = inputVal;
    if (quantity > 50)
        result -= 2;
    if (result > 100)
        result -= 1;
    return result;
}
```

## 🔍 Why Refactor

- **Confusion between pass by value and pass by reference**: In many languages (C#, Java) parameters are passed by value, so reassigning them has no effect outside the method — which is misleading
- **Loss of the original value**: After reassigning, you can no longer access the parameter's original value
- **Hard to debug**: It's unclear whether the parameter holds its original or a new value
- **Harder to read**: You have to trace the entire method to know what value the parameter currently holds

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **Clearer code** | The parameter always keeps its original value, which is easy to track |
| 🐛 **Fewer bugs** | Avoids value/reference passing confusion |
| 🔍 **Easier to debug** | The original value is always available for comparison |

## 📝 How to Refactor

1. **Create a new local variable**
2. **Assign the parameter's value** to the local variable
3. **Replace all** uses of the parameter (after the first assignment) with the local variable
4. **Compile and test**

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — A clear local variable makes it easier to extract methods

## 🎮 In Game Dev

### Damage calculation:
```csharp
// ❌ Before — reassigning the parameter
float ApplyDamageModifiers(float damage, DamageType type)
{
    damage *= GetElementalMultiplier(type);  // Reassign!
    damage -= target.armor;                   // Reassign!
    damage = Mathf.Max(damage, 1f);           // Reassign!
    return damage;
}

// ✅ After — use a local variable
float ApplyDamageModifiers(float damage, DamageType type)
{
    float result = damage;
    result *= GetElementalMultiplier(type);
    result -= target.armor;
    result = Mathf.Max(result, 1f);
    return result;
}
```

### Especially important with `ref` parameters in C#:
```csharp
// In C#, a `ref` parameter DOES affect the outside
// → Be even more careful when reassigning
void ModifyPosition(ref Vector3 position)
{
    Vector3 adjusted = position;  // Use a local variable
    adjusted.y = Mathf.Max(adjusted.y, 0f);  // Work on the local variable
    position = adjusted;  // Assign back at the end — clearly intentional
}
```

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Split Temporary Variable](./06-split-temporary-variable.md)
- ➡️ [Replace Method with Method Object](./08-replace-method-with-method-object.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
