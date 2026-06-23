# Extract Variable

> 📖 **Nguồn:** [Refactoring.Guru — Extract Variable](https://refactoring.guru/extract-variable) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **biểu thức phức tạp** khó đọc và khó hiểu, đặc biệt trong các điều kiện if hoặc phép tính phức tạp.

```csharp
// ❌ Biểu thức quá phức tạp, khó đọc
if (player.hp > 0 && player.stamina > attackCost && !player.isStunned 
    && Time.time > player.lastAttackTime + player.attackCooldown
    && Physics.Raycast(player.transform.position, player.transform.forward, attackRange))
{
    PerformAttack();
}
```

## ✅ Giải pháp (Solution)

Tách biểu thức (hoặc các phần của nó) thành **biến riêng có tên rõ ràng**, mô tả mục đích của biểu thức.

```csharp
// ✅ Mỗi biến có tên giải thích ý nghĩa
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

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Biểu thức điều kiện phức tạp** khó đọc và dễ sai khi sửa
- **Tên biến là documentation**: Biến `canAttack` giải thích ngay mục đích mà không cần comment
- **Debug dễ hơn**: Bạn có thể inspect từng biến trong debugger
- **Tái sử dụng**: Biến có thể dùng lại ở chỗ khác trong cùng method

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code dễ đọc hơn** | Tên biến giải thích ý nghĩa của biểu thức |
| 🐛 **Dễ debug** | Inspect giá trị từng phần trong debugger |
| 🔄 **Giảm duplication** | Biểu thức dùng nhiều lần chỉ tính một lần |
| 🧪 **Dễ maintain** | Sửa điều kiện ở một chỗ, áp dụng khắp nơi |

## 📝 Cách thực hiện (How to Refactor)

1. **Xác định biểu thức** cần tách — thường là phần khó đọc nhất
2. **Tạo biến local mới** và gán biểu thức cho nó
3. **Đặt tên biến** mô tả ý nghĩa (what), không phải cách tính (how)
4. **Thay thế biểu thức** bằng biến mới ở tất cả các chỗ dùng
5. **Biên dịch và test**

> 💡 **Mẹo đặt tên**: `canAttack` ✅ tốt hơn `hpAndStaminaCheck` ❌

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — Tên biến rõ ràng thay thế comment giải thích
- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Biến có tên rõ ràng giúp method dễ đọc hơn

## 🎮 Trong Game Dev

### Tách điều kiện combat:
```csharp
// Trong game RPG
bool isWeaponReady = currentWeapon != null && currentWeapon.durability > 0;
bool hasAmmo = currentWeapon.weaponType != WeaponType.Ranged || currentAmmo > 0;
bool isInCombatRange = Vector3.Distance(transform.position, target.position) <= currentWeapon.range;

if (isWeaponReady && hasAmmo && isInCombatRange)
{
    Attack(target);
}
```

### Tách phép tính damage:
```csharp
// Thay vì: float finalDamage = (baseDamage + weaponDamage) * critMultiplier * (1 - target.armor / 100f) * elementalBonus;
float rawDamage = baseDamage + weaponDamage;
float critDamage = rawDamage * critMultiplier;
float armorReduction = 1f - target.armor / 100f;
float finalDamage = critDamage * armorReduction * elementalBonus;
```

### Tách điều kiện UI:
```csharp
bool isInventoryFull = inventory.Count >= inventory.MaxSlots;
bool isItemPickable = item.isInteractable && !item.isQuestLocked;
bool canPickUp = !isInventoryFull && isItemPickable;

pickupPrompt.SetActive(canPickUp);
```

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Inline Method](./02-inline-method.md)
- ➡️ [Inline Temp](./04-inline-temp.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
