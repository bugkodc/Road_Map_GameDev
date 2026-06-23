# Inline Temp

> 📖 **Source:** [Refactoring.Guru — Inline Temp](https://refactoring.guru/inline-temp) | Author: Alexander Shvets

## ❌ Problem

You have a **temporary variable** that is assigned only once from a simple expression, and that variable **adds no value** semantically — its name says nothing more than the original expression already does.

```csharp
// ❌ A redundant temp — it adds no meaning
float basePrice = order.GetBasePrice();
return basePrice > 1000;
```

## ✅ Solution

**Replace references to the variable** with the original expression directly.

```csharp
// ✅ Inlined directly
return order.GetBasePrice() > 1000;
```

## 🔍 Why Refactor

- **A redundant temp** adds noise to the code without adding value
- **It blocks other refactorings**: A temp can get in the way of applying [Replace Temp with Query](./05-replace-temp-with-query.md) or other techniques
- **When the variable is used only once**: If the expression is clear enough, the temp is just an unnecessary intermediate step

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 🧹 **More concise code** | Fewer unnecessary temps |
| 🔍 **Less indirection** | Reading the code doesn't require hopping through an intermediate variable |
| 🔄 **Easier to refactor further** | Removes an obstacle to other techniques |

## 📝 How to Refactor

1. **Find all uses** of the temp
2. **Replace** the variable with the original expression at every use
3. **Delete the declaration** and the assignment
4. **Compile and test**

> ⚠️ **Don't inline when**: The variable is assigned once but **used many times** and the expression has side effects or is expensive to re-evaluate.

## 🦨 Helps treat these Code Smells

- Often an intermediate step that prepares for [Replace Temp with Query](./05-replace-temp-with-query.md)
- Helps reduce [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) by removing redundant variables

## 🎮 In Game Dev

### Inlining a simple temp:
```csharp
// ❌ Before
float distance = Vector3.Distance(a.position, b.position);
if (distance < attackRange)

// ✅ After — if used only once
if (Vector3.Distance(a.position, b.position) < attackRange)
```

### When NOT to Inline:
```csharp
// ❌ DON'T inline — used multiple times + expensive
float distance = Vector3.Distance(a.position, b.position);
if (distance < attackRange)     // use #1
    Attack(target);
else if (distance < chaseRange) // use #2
    ChaseTarget(target);
else if (distance < detectRange) // use #3
    AlertNearbyEnemies();
```

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Extract Variable](./03-extract-variable.md)
- ➡️ [Replace Temp with Query](./05-replace-temp-with-query.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
