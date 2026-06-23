# Remove Assignments to Parameters

> 📖 **Nguồn:** [Refactoring.Guru — Remove Assignments to Parameters](https://refactoring.guru/remove-assignments-to-parameters) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Một giá trị mới được **gán lại cho tham số** (parameter) bên trong method body. Điều này gây nhầm lẫn vì parameter mất đi giá trị ban đầu, khiến khó biết method đang làm việc với dữ liệu nào.

```csharp
// ❌ Gán lại giá trị cho parameter
float CalculateDiscount(float inputVal, int quantity)
{
    if (quantity > 50)
        inputVal -= 2;  // Gán lại cho parameter!
    if (inputVal > 100)
        inputVal -= 1;  // Gán lại lần nữa!
    return inputVal;
}
```

## ✅ Giải pháp (Solution)

Sử dụng **biến local** thay vì gán lại cho parameter.

```csharp
// ✅ Dùng biến local riêng
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

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Nhầm lẫn giữa pass by value và pass by reference**: Trong nhiều ngôn ngữ (C#, Java), parameter được truyền by value, nên gán lại không ảnh hưởng bên ngoài — gây hiểu nhầm
- **Mất giá trị gốc**: Sau khi gán lại, không thể truy cập giá trị ban đầu của parameter
- **Khó debug**: Không rõ parameter đang giữ giá trị gốc hay giá trị mới
- **Đọc code khó hơn**: Phải trace toàn bộ method để biết parameter đang có giá trị gì

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code rõ ràng hơn** | Parameter luôn giữ giá trị gốc, dễ theo dõi |
| 🐛 **Giảm bug** | Tránh nhầm lẫn value/reference passing |
| 🔍 **Dễ debug** | Giá trị gốc luôn có sẵn để so sánh |

## 📝 Cách thực hiện (How to Refactor)

1. **Tạo biến local** mới
2. **Gán giá trị parameter** cho biến local
3. **Thay thế tất cả** nơi sử dụng parameter (sau phép gán đầu tiên) bằng biến local
4. **Biên dịch và test**

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Biến local rõ ràng giúp dễ tách method hơn

## 🎮 Trong Game Dev

### Tính toán damage:
```csharp
// ❌ Trước — gán lại cho parameter
float ApplyDamageModifiers(float damage, DamageType type)
{
    damage *= GetElementalMultiplier(type);  // Gán lại!
    damage -= target.armor;                   // Gán lại!
    damage = Mathf.Max(damage, 1f);           // Gán lại!
    return damage;
}

// ✅ Sau — dùng biến local
float ApplyDamageModifiers(float damage, DamageType type)
{
    float result = damage;
    result *= GetElementalMultiplier(type);
    result -= target.armor;
    result = Mathf.Max(result, 1f);
    return result;
}
```

### Đặc biệt quan trọng với `ref` parameter trong C#:
```csharp
// Trong C#, `ref` parameter CÓ ảnh hưởng bên ngoài
// → Phải cẩn thận hơn khi gán lại
void ModifyPosition(ref Vector3 position)
{
    Vector3 adjusted = position;  // Dùng biến local
    adjusted.y = Mathf.Max(adjusted.y, 0f);  // Xử lý trên biến local
    position = adjusted;  // Gán lại cuối cùng — có chủ đích rõ ràng
}
```

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Split Temporary Variable](./06-split-temporary-variable.md)
- ➡️ [Replace Method with Method Object](./08-replace-method-with-method-object.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
