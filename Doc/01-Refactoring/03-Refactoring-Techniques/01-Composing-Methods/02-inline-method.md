# Inline Method

> 📖 **Nguồn:** [Refactoring.Guru — Inline Method](https://refactoring.guru/inline-method) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Khi **method body đơn giản và rõ ràng như chính tên method**, thì method đó trở thành lớp trung gian không cần thiết (unnecessary indirection). Đôi khi code được ủy thác (delegate) quá mức khiến việc đọc code trở nên rối rắm.

```csharp
// ❌ Method quá đơn giản, không cần tồn tại riêng
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

## ✅ Giải pháp (Solution)

**Thay thế lời gọi method bằng nội dung của method đó**, rồi **xóa method** không cần thiết.

```csharp
// ✅ Inline trực tiếp — đơn giản và rõ ràng
void Update()
{
    if (health <= 0)
    {
        HandleDeath();
    }
}
```

> ⚠️ **Lưu ý:** Chỉ inline khi method thực sự quá đơn giản. Nếu `IsPlayerDead()` được gọi ở **nhiều nơi**, giữ nó lại là lựa chọn tốt hơn (DRY principle).

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Quá nhiều indirection**: Khi phải nhảy qua nhiều method chỉ để hiểu một dòng logic đơn giản
- **Chuẩn bị cho refactoring khác**: Inline method trước, rồi tổ chức lại code theo cách tốt hơn
- **Method body rõ ràng hơn tên**: Đôi khi biểu thức trực tiếp dễ hiểu hơn tên method
- **Sau khi refactor quá mức**: Khi Extract Method được áp dụng quá tay

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Giảm complexity không cần thiết** | Bớt số lượng method phải navigate |
| 🔍 **Code trực quan hơn** | Logic nằm ngay tại chỗ, không cần nhảy method |
| 🧹 **Loại bỏ indirection thừa** | Bỏ lớp trung gian vô nghĩa |

## 📝 Cách thực hiện (How to Refactor)

1. **Kiểm tra method không bị override** trong subclass (nếu bị override, không inline)
2. **Tìm tất cả các lời gọi** đến method
3. **Thay thế mỗi lời gọi** bằng nội dung method body
4. **Xóa method** sau khi đã thay thế tất cả
5. **Biên dịch và test**

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Middle Man](../../02-Code-Smells/05-Couplers/03-middle-man.md) — Khi class chỉ delegate mà không thêm giá trị
- 🔗 [Speculative Generality](../../02-Code-Smells/04-Dispensables/04-speculative-generality.md) — Method được tạo "phòng khi cần" nhưng thực tế quá đơn giản

## 🎮 Trong Game Dev

### Inline method quá đơn giản:
```csharp
// ❌ Trước: method chỉ wrap một expression
float GetSpeed() { return baseSpeed; }
bool IsGrounded() { return controller.isGrounded; }

// ✅ Sau: inline trực tiếp
if (controller.isGrounded)
{
    velocity.y = 0;
    transform.position += direction * baseSpeed * Time.deltaTime;
}
```

### Khi KHÔNG nên Inline:
```csharp
// ❌ ĐỪNG inline method này — nó được gọi ở nhiều nơi
bool CanAttack()
{
    return health > 0 && stamina >= attackCost && !isStunned && Time.time > lastAttackTime + cooldown;
}
// Method này nên giữ nguyên vì biểu thức phức tạp VÀ dùng nhiều nơi
```

### Lưu ý:
- Trong Unity, các method như `GetComponent<T>()` wrapper đơn giản có thể inline
- Nhưng giữ method nếu nó **đặt tên cho business logic**: `CanAttack()`, `IsInRange()`, `HasEnoughMana()`

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Extract Method](./01-extract-method.md)
- ➡️ [Extract Variable](./03-extract-variable.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
