# Inline Temp

> 📖 **Nguồn:** [Refactoring.Guru — Inline Temp](https://refactoring.guru/inline-temp) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **biến tạm (temporary variable)** chỉ được gán một lần từ một biểu thức đơn giản, và biến đó **không thêm giá trị nào** về mặt ngữ nghĩa — tên biến không giải thích thêm gì so với biểu thức gốc.

```csharp
// ❌ Biến tạm thừa — không thêm ý nghĩa gì
float basePrice = order.GetBasePrice();
return basePrice > 1000;
```

## ✅ Giải pháp (Solution)

**Thay thế tham chiếu đến biến** bằng biểu thức gốc trực tiếp.

```csharp
// ✅ Inline trực tiếp
return order.GetBasePrice() > 1000;
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Biến tạm thừa** tạo noise trong code mà không thêm giá trị
- **Cản trở refactoring khác**: Biến tạm có thể cản trở việc áp dụng [Replace Temp with Query](./05-replace-temp-with-query.md) hoặc các kỹ thuật khác
- **Khi biến chỉ dùng một lần**: Nếu biểu thức đủ rõ ràng, biến tạm chỉ là bước trung gian không cần thiết

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 🧹 **Code gọn hơn** | Bớt biến tạm không cần thiết |
| 🔍 **Ít indirection** | Đọc code không cần nhảy qua biến trung gian |
| 🔄 **Dễ refactor tiếp** | Loại bỏ rào cản cho các kỹ thuật khác |

## 📝 Cách thực hiện (How to Refactor)

1. **Tìm tất cả nơi sử dụng** biến tạm
2. **Thay thế** biến bằng biểu thức gốc ở mọi nơi sử dụng
3. **Xóa khai báo** biến và phép gán
4. **Biên dịch và test**

> ⚠️ **Không inline khi**: Biến được gán một lần nhưng **dùng nhiều lần** và biểu thức có side effect hoặc tốn performance khi gọi lại.

## 🦨 Giúp điều trị các Code Smells

- Thường là bước trung gian chuẩn bị cho [Replace Temp with Query](./05-replace-temp-with-query.md)
- Giúp giảm [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) bằng cách loại bỏ biến thừa

## 🎮 Trong Game Dev

### Inline biến tạm đơn giản:
```csharp
// ❌ Trước
float distance = Vector3.Distance(a.position, b.position);
if (distance < attackRange)

// ✅ Sau — nếu chỉ dùng một lần
if (Vector3.Distance(a.position, b.position) < attackRange)
```

### Khi KHÔNG nên Inline:
```csharp
// ❌ ĐỪNG inline — dùng nhiều lần + tốn performance
float distance = Vector3.Distance(a.position, b.position);
if (distance < attackRange)     // dùng lần 1
    Attack(target);
else if (distance < chaseRange) // dùng lần 2
    ChaseTarget(target);
else if (distance < detectRange) // dùng lần 3
    AlertNearbyEnemies();
```

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Extract Variable](./03-extract-variable.md)
- ➡️ [Replace Temp with Query](./05-replace-temp-with-query.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
