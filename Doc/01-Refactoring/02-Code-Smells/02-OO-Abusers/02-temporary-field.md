# Temporary Field

> 📖 **Nguồn:** [Refactoring.Guru — Temporary Field](https://refactoring.guru/smells/temporary-field) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Class có **field chỉ có giá trị trong một số trường hợp** nhất định. Ngoài những trường hợp đó, field rỗng hoặc `null`. Điều này gây khó hiểu vì bạn kỳ vọng object luôn sử dụng tất cả field của nó.

Dấu hiệu nhận biết:
- Field chỉ được **set** và **sử dụng** trong một số method nhất định
- Phần lớn thời gian field có giá trị `null`, `0`, hoặc giá trị mặc định
- Code có nhiều **null checks** cho field này
- Field chỉ có ý nghĩa trong **một trạng thái** cụ thể của object

## ❓ Nguyên nhân (Reasons for the Problem)

- **Tính toán phức tạp** cần nhiều biến tạm — Thay vì truyền qua tham số, developer lưu vào field của class
- **Method quá dài** được tách nhỏ nhưng thay vì truyền data qua tham số, lại dùng field như "biến toàn cục"
- **Thiếu thiết kế** — Field được thêm vào vội vàng mà không suy nghĩ về lifecycle

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Tách field tạm và method liên quan thành class riêng
- **[Replace Method with Method Object](../../03-Refactoring-Techniques/)** — Chuyển method phức tạp thành class riêng, các field tạm trở thành field của class mới
- **[Introduce Null Object](../../03-Refactoring-Techniques/)** — Thay null checks bằng Null Object pattern

## ✅ Lợi ích (Payoff)

- 📖 **Code rõ ràng hơn** — Mỗi field đều có ý nghĩa và luôn được sử dụng
- 🐛 **Ít bug hơn** — Không còn null reference exceptions từ field tạm
- 🧹 **Class gọn hơn** — Bỏ field không cần thiết
- 🧠 **Dễ hiểu hơn** — Không phải đoán xem field nào đang active

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **Combat-only fields** — `currentTarget`, `combatTimer`, `damageMultiplier` chỉ có giá trị khi player đang trong combat, null khi explore
- **Quest-specific data** — Field `questDialog`, `questObjective` chỉ set khi có quest active
- **Ability cooldown data** — Nhiều field liên quan đến ability chỉ dùng khi casting

### Cải thiện:

```
❌ Trước:
class Player {
    // Luôn dùng
    float health;
    Vector3 position;

    // Chỉ dùng khi combat (null lúc khác!)
    Enemy currentTarget;
    float combatTimer;
    float damageMultiplier;
    List<Buff> activeBuffs;
}
```

```
✅ Sau:
class Player {
    float health;
    Vector3 position;
    CombatState combatState; // null khi không combat
}

class CombatState {
    Enemy currentTarget;
    float combatTimer;
    float damageMultiplier;
    List<Buff> activeBuffs;
}
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Trước: Switch Statements](./01-switch-statements.md) | ➡️ [Tiếp: Refused Bequest](./03-refused-bequest.md)
