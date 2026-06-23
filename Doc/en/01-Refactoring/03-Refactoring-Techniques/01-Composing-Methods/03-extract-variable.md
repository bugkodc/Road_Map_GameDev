# Extract Variable

> 📖 **Source:** [Refactoring.Guru — Extract Variable](https://refactoring.guru/extract-variable) | Author: Alexander Shvets

## ❌ Problem

You have a **complex expression** that is hard to read and understand, especially inside `if` conditions or intricate calculations.

```csharp
// ❌ The expression is too complex and hard to read
if (player.hp > 0 && player.stamina > attackCost && !player.isStunned 
    && Time.time > player.lastAttackTime + player.attackCooldown
    && Physics.Raycast(player.transform.position, player.transform.forward, attackRange))
{
    PerformAttack();
}
```

## ✅ Solution

Extract the expression (or parts of it) into **separate, clearly named variables** that describe the expression's purpose.

```csharp
// ✅ Each variable has a name that explains its meaning
bool isAlive = player.hp > 0;
bool hasEnoughStamina = player.stamina > attackCost;
bool isNotStunned = !player.isStunned;
bool isCooldownReady = Time.time > player.lastAttackTime + player.attackCooldown;
bool isTargetInRange = Physics.Raycast(player.transform.position, player.transform.forward, attackRange);

bool canAttack = isAlive && hasEnoughStamina && isNotStunned && isCooldownReady && isTargetInRange;

if (canAttack)
{
    PerformAttack();
}
```

## 🔍 Why Refactor

- **Complex conditional expressions** are hard to read and easy to get wrong when editing
- **Variable names are documentation**: A variable named `canAttack` immediately explains the purpose without a comment
- **Easier to debug**: You can inspect each variable in the debugger
- **Reuse**: A variable can be reused elsewhere within the same method

## 👍 Benefits

| Benefit | Description |
|---------|-------|
| 📖 **More readable code** | Variable names explain the meaning of the expression |
| 🐛 **Easier to debug** | Inspect the value of each part in the debugger |
| 🔄 **Less duplication** | An expression used multiple times is computed only once |
| 🧪 **Easier to maintain** | Edit a condition in one place and it applies everywhere |

## 📝 How to Refactor

1. **Identify the expression** to extract — usually the hardest-to-read part
2. **Create a new local variable** and assign the expression to it
3. **Name the variable** to describe its meaning (what), not how it's computed (how)
4. **Replace the expression** with the new variable everywhere it's used
5. **Compile and test**

> 💡 **Naming tip**: `canAttack` ✅ is better than `hpAndStaminaCheck` ❌

## 🦨 Helps treat these Code Smells

- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — A clear variable name replaces an explanatory comment
- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Clearly named variables make a method easier to read

## 🎮 In Game Dev

### Breaking up a combat condition:
```csharp
// In an RPG
bool isWeaponReady = currentWeapon != null && currentWeapon.durability > 0;
bool hasAmmo = currentWeapon.weaponType != WeaponType.Ranged || currentAmmo > 0;
bool isInCombatRange = Vector3.Distance(transform.position, target.position) <= currentWeapon.range;

if (isWeaponReady && hasAmmo && isInCombatRange)
{
    Attack(target);
}
```

### Breaking up a damage calculation:
```csharp
// Instead of: float finalDamage = (baseDamage + weaponDamage) * critMultiplier * (1 - target.armor / 100f) * elementalBonus;
float rawDamage = baseDamage + weaponDamage;
float critDamage = rawDamage * critMultiplier;
float armorReduction = 1f - target.armor / 100f;
float finalDamage = critDamage * armorReduction * elementalBonus;
```

### Breaking up a UI condition:
```csharp
bool isInventoryFull = inventory.Count >= inventory.MaxSlots;
bool isItemPickable = item.isInteractable && !item.isQuestLocked;
bool canPickUp = !isInventoryFull && isItemPickable;

pickupPrompt.SetActive(canPickUp);
```

---

## 🔗 Links

- ⬆️ [Composing Methods — Overview](./00-composing-methods-overview.md)
- ⬅️ [Inline Method](./02-inline-method.md)
- ➡️ [Inline Temp](./04-inline-temp.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
