# Refused Bequest

> 📖 **Nguồn:** [Refactoring.Guru — Refused Bequest](https://refactoring.guru/smells/refused-bequest) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Subclass chỉ sử dụng **một vài method và property** từ parent class. Phần lớn các method được kế thừa hoặc **không được dùng** hoặc bị **override để làm việc khác hoàn toàn** hoặc **throw exception**.

Dấu hiệu nhận biết:
- Subclass **override** nhiều method của parent để không làm gì hoặc throw exception
- Subclass chỉ dùng **1-2 method** từ parent nhưng kế thừa toàn bộ
- Hierarchy thừa kế cảm thấy **gượng ép**, không tự nhiên
- Subclass và parent class không thực sự có quan hệ **"is-a"**

## ❓ Nguyên nhân (Reasons for the Problem)

- **Kế thừa chỉ để tái sử dụng code** — Dùng inheritance vì muốn "mượn" vài method, không phải vì quan hệ IS-A thực sự
- **Thiết kế hierarchy sai** — Parent class quá chung chung hoặc quá cụ thể
- **Thay đổi yêu cầu** — Ban đầu hierarchy đúng nhưng requirements thay đổi

> [!WARNING]
> Refused Bequest là dấu hiệu cho thấy **inheritance đang bị dùng sai mục đích**. Composition/delegation thường là giải pháp tốt hơn.

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Replace Inheritance with Delegation](../../03-Refactoring-Techniques/)** *(kỹ thuật chính)* — Thay kế thừa bằng composition: giữ reference đến class kia và delegate method cần dùng
- **[Extract Superclass](../../03-Refactoring-Techniques/)** — Tạo superclass mới chỉ chứa phần chung thực sự

## ✅ Lợi ích (Payoff)

- 🏗️ **Hierarchy rõ ràng** — Mỗi class chỉ kế thừa những gì thực sự cần
- 📐 **Đúng nguyên tắc** — Tuân thủ Liskov Substitution Principle
- 🔄 **Linh hoạt hơn** — Delegation cho phép thay đổi behavior dễ dàng
- 🧹 **Bớt code thừa** — Không mang theo baggage không cần thiết

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **FlyingEnemy extends GroundEnemy** — Nhưng override hết movement methods vì flying enemy không đi trên mặt đất. Kế thừa chỉ vì muốn dùng `health` và `attack` → nên dùng composition hoặc tạo base `Enemy` class
- **UIButton extends UIPanel** — Chỉ vì muốn mượn rendering code, nhưng button không phải panel
- **Projectile extends Character** — Chỉ vì cần transform và collision, nhưng projectile không phải character

### Cải thiện:

```
❌ Trước:
class GroundEnemy {
    void Walk() { ... }
    void TakeDamage() { ... }
    void Attack() { ... }
    void PlayFootstepSound() { ... }
}

class FlyingEnemy : GroundEnemy {
    override void Walk() { /* BỎ TRỐNG hoặc throw! */ }
    override void PlayFootstepSound() { /* BỎ TRỐNG */ }
    void Fly() { ... }
}
```

```
✅ Sau:
abstract class Enemy {
    void TakeDamage() { ... }
    void Attack() { ... }
    abstract void Move();
}

class GroundEnemy : Enemy {
    override void Move() { Walk(); }
}

class FlyingEnemy : Enemy {
    override void Move() { Fly(); }
}
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Trước: Temporary Field](./02-temporary-field.md) | ➡️ [Tiếp: Alternative Classes](./04-alternative-classes.md)
