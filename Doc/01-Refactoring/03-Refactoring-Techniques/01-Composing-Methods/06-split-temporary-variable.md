# Split Temporary Variable

> 📖 **Nguồn:** [Refactoring.Guru — Split Temporary Variable](https://refactoring.guru/split-temporary-variable) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **biến tạm được gán giá trị nhiều lần** cho các mục đích khác nhau (không phải biến vòng lặp hay biến tích lũy). Một biến phục vụ nhiều mục đích khiến code khó hiểu.

```csharp
// ❌ Biến `temp` dùng cho 2 mục đích khác nhau
float temp = 2 * (width + height);  // Chu vi
Debug.Log("Perimeter: " + temp);

temp = width * height;  // Diện tích — khác mục đích hoàn toàn!
Debug.Log("Area: " + temp);
```

## ✅ Giải pháp (Solution)

Tạo **biến riêng cho mỗi mục đích**, đặt tên mô tả rõ ràng.

```csharp
// ✅ Mỗi biến có một mục đích duy nhất
float perimeter = 2 * (width + height);
Debug.Log("Perimeter: " + perimeter);

float area = width * height;
Debug.Log("Area: " + area);
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Một biến = một mục đích**: Biến dùng cho nhiều mục đích vi phạm nguyên tắc Single Responsibility ở cấp biến
- **Tên biến mất ý nghĩa**: Khi biến phục vụ nhiều mục đích, tên biến không thể mô tả chính xác
- **Khó debug**: Giá trị biến thay đổi theo ngữ cảnh, gây nhầm lẫn khi debug
- **Nguy cơ bug**: Sử dụng nhầm giá trị cũ/mới của biến

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code rõ ràng hơn** | Mỗi biến có tên mô tả đúng mục đích |
| 🐛 **Giảm bug** | Không nhầm lẫn giữa các giá trị khác nhau |
| 🔧 **Dễ refactor tiếp** | Chuẩn bị cho Extract Method hoặc Replace Temp with Query |

## 📝 Cách thực hiện (How to Refactor)

1. **Tìm phép gán đầu tiên** cho biến tạm
2. **Đổi tên biến** thành tên mô tả mục đích của phép gán đầu tiên
3. **Khai báo `readonly`/`const`** nếu có thể (để compiler bắt lỗi nếu gán lại)
4. **Tạo biến mới** cho phép gán thứ hai, với tên mô tả mục đích mới
5. **Lặp lại** cho các phép gán tiếp theo
6. **Biên dịch và test**

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Biến rõ ràng giúp dễ tách method
- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — Tên biến tốt thay thế comment

## 🎮 Trong Game Dev

### Tách biến tính toán vật lý:
```csharp
// ❌ Trước — `force` dùng cho 2 mục đích
Vector3 force = transform.forward * thrustPower;  // Lực đẩy
rb.AddForce(force);

force = Vector3.up * jumpPower;  // Lực nhảy — khác hoàn toàn!
rb.AddForce(force);

// ✅ Sau
Vector3 thrustForce = transform.forward * thrustPower;
rb.AddForce(thrustForce);

Vector3 jumpForce = Vector3.up * jumpPower;
rb.AddForce(jumpForce);
```

### Tách biến timer:
```csharp
// ❌ Biến `timer` dùng chung cho attack và heal
float timer = Time.time - lastAttackTime;
if (timer > attackCooldown) { /* attack */ }

timer = Time.time - lastHealTime;  // Dùng lại cho mục đích khác
if (timer > healCooldown) { /* heal */ }

// ✅ Tách rõ ràng
float attackTimer = Time.time - lastAttackTime;
if (attackTimer > attackCooldown) { /* attack */ }

float healTimer = Time.time - lastHealTime;
if (healTimer > healCooldown) { /* heal */ }
```

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Replace Temp with Query](./05-replace-temp-with-query.md)
- ➡️ [Remove Assignments to Parameters](./07-remove-assignments-to-parameters.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
