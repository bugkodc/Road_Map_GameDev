# Split Temporary Variable

> 📖 **Source:** [Refactoring.Guru — Split Temporary Variable](https://refactoring.guru/split-temporary-variable) | Author: Alexander Shvets

## ❌ Problem

You have a **temporary variable assigned multiple times** for different purposes (not a loop variable or an accumulator). A single variable serving several purposes makes the code hard to understand.

```csharp
// ❌ The variable `temp` is used for 2 different purposes
float temp = 2 * (width + height);  // Perimeter
Debug.Log("Perimeter: " + temp);

temp = width * height;  // Area — a completely different purpose!
Debug.Log("Area: " + temp);
```

## ✅ Solution

Create a **separate variable for each purpose**, with a clearly descriptive name.

```csharp
// ✅ Each variable has a single purpose
float perimeter = 2 * (width + height);
Debug.Log("Perimeter: " + perimeter);

float area = width * height;
Debug.Log("Area: " + area);
```

## 🔍 Why Refactor

- **One variable = one purpose**: A variable used for multiple purposes violates the Single Responsibility principle at the variable level
- **The name loses meaning**: When a variable serves many purposes, its name can't describe it accurately
- **Hard to debug**: The variable's value changes with context, causing confusion while debugging
- **Risk of bugs**: Accidentally using the old/new value of the variable

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **Clearer code** | Each variable's name describes its actual purpose |
| 🐛 **Fewer bugs** | No confusion between different values |
| 🔧 **Easier to refactor further** | Sets up Extract Method or Replace Temp with Query |

## 📝 How to Refactor

1. **Find the first assignment** to the temp
2. **Rename the variable** to describe the purpose of that first assignment
3. **Declare it `readonly`/`const`** if possible (so the compiler catches any reassignment)
4. **Create a new variable** for the second assignment, named for its new purpose
5. **Repeat** for subsequent assignments
6. **Compile and test**

## 🦨 Helps treat these Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Clear variables make it easier to extract methods
- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — Good variable names replace comments

## 🎮 In Game Dev

### Splitting a physics calculation variable:
```csharp
// ❌ Before — `force` is used for 2 purposes
Vector3 force = transform.forward * thrustPower;  // Thrust force
rb.AddForce(force);

force = Vector3.up * jumpPower;  // Jump force — completely different!
rb.AddForce(force);

// ✅ After
Vector3 thrustForce = transform.forward * thrustPower;
rb.AddForce(thrustForce);

Vector3 jumpForce = Vector3.up * jumpPower;
rb.AddForce(jumpForce);
```

### Splitting a timer variable:
```csharp
// ❌ The variable `timer` is shared between attack and heal
float timer = Time.time - lastAttackTime;
if (timer > attackCooldown) { /* attack */ }

timer = Time.time - lastHealTime;  // Reused for a different purpose
if (timer > healCooldown) { /* heal */ }

// ✅ Split clearly
float attackTimer = Time.time - lastAttackTime;
if (attackTimer > attackCooldown) { /* attack */ }

float healTimer = Time.time - lastHealTime;
if (healTimer > healCooldown) { /* heal */ }
```

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Replace Temp with Query](./05-replace-temp-with-query.md)
- ➡️ [Remove Assignments to Parameters](./07-remove-assignments-to-parameters.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
