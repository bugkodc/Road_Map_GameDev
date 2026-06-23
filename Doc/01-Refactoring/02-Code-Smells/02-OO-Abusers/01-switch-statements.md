# Switch Statements

> 📖 **Nguồn:** [Refactoring.Guru — Switch Statements](https://refactoring.guru/smells/switch-statements) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Bạn có một **switch/if phức tạp** phân loại xử lý theo type hoặc loại đối tượng. Tệ hơn, cùng một switch/if tương tự xuất hiện ở **nhiều nơi** trong code — mỗi khi thêm một loại mới, phải sửa tất cả các switch đó.

Dấu hiệu nhận biết:
- `switch` hoặc chuỗi `if-else if` dài phân biệt theo **type code** hoặc **loại đối tượng**
- Cùng switch/if pattern **lặp lại** ở nhiều method hoặc class
- Mỗi khi thêm loại mới, phải sửa **nhiều switch** ở nhiều nơi
- Switch xử lý behavior khác nhau cho từng loại

## ❓ Nguyên nhân (Reasons for the Problem)

- **Thói quen procedural** — Developer quen viết code tuần tự, chưa tư duy OOP
- **Thiếu hiểu biết về polymorphism** — Không biết dùng inheritance/interface thay thế
- **Prototype nhanh** — Switch nhanh hơn để viết khi prototype, nhưng quên refactor
- **Sợ tạo nhiều class** — Cảm thấy tạo class cho mỗi type là "quá nhiều"

> [!IMPORTANT]
> Khi bạn thấy switch dựa trên **type code**, hãy nghĩ ngay đến **polymorphism**. Đây là trường hợp kinh điển nhất cần refactor.

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Replace Conditional with Polymorphism](../../03-Refactoring-Techniques/)** *(kỹ thuật chính)* — Thay switch bằng các subclass với behavior riêng
- **[Extract Method](../../03-Refactoring-Techniques/)** — Tách từng case thành method riêng trước khi áp dụng polymorphism
- **[Move Method](../../03-Refactoring-Techniques/)** — Di chuyển behavior về class phù hợp
- **[Replace Type Code with Subclasses](../../03-Refactoring-Techniques/)** — Tạo subclass cho từng type
- **[Replace Type Code with State/Strategy](../../03-Refactoring-Techniques/)** — Dùng State/Strategy pattern khi cần linh hoạt hơn

## ✅ Lợi ích (Payoff)

- 📦 **Tuân thủ Open/Closed Principle** — Thêm loại mới không cần sửa code cũ
- 🧹 **Giảm duplication** — Loại bỏ switch lặp lại ở nhiều nơi
- 🔧 **Dễ mở rộng** — Thêm loại mới chỉ cần tạo class mới
- 📖 **Code tổ chức tốt hơn** — Mỗi loại có behavior riêng trong class riêng

## 🎮 Trong Game Dev

### Ví dụ phổ biến:

```
❌ Trước:
void ProcessAI(Enemy enemy) {
    switch(enemy.type) {
        case EnemyType.Melee:
            // 20 dòng AI melee
            break;
        case EnemyType.Ranged:
            // 25 dòng AI ranged
            break;
        case EnemyType.Flying:
            // 30 dòng AI flying
            break;
        // Thêm loại mới → thêm case ở ĐÂY
        // VÀ ở ProcessAnimation(), ProcessSound(), ...
    }
}
```

```
✅ Sau:
abstract class Enemy {
    abstract void ProcessAI();
}

class MeleeEnemy : Enemy {
    override void ProcessAI() { /* AI melee */ }
}

class RangedEnemy : Enemy {
    override void ProcessAI() { /* AI ranged */ }
}

// Thêm loại mới → chỉ cần tạo class mới!
class FlyingEnemy : Enemy {
    override void ProcessAI() { /* AI flying */ }
}
```

### Các trường hợp khác:
- `switch(weaponType)` để tính damage → Weapon polymorphism
- `switch(itemType)` để xử lý sử dụng item → Item subclasses
- `if(powerUpType == ...)` → PowerUp hierarchy

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: OO Abusers](./00-oo-abusers-overview.md) | ➡️ [Tiếp: Temporary Field](./02-temporary-field.md)
