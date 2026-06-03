# Primitive Obsession

> 📖 **Nguồn:** [Refactoring.Guru — Primitive Obsession](https://refactoring.guru/smells/primitive-obsession) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Sử dụng **primitive types** (int, float, string, bool...) thay vì tạo **small objects** cho các khái niệm có ý nghĩa. Ví dụ:

- Dùng `string` cho số điện thoại, email, địa chỉ
- Dùng `int` cho tiền tệ (money), sức khỏe (health)
- Dùng `string` constants cho type codes thay vì enum/class
- Dùng arrays hoặc dictionaries thay vì tạo data structure phù hợp

Dấu hiệu nhận biết:
- Nhiều **field primitive** liên quan đến nhau trong class
- Code **validation** cho primitive values bị lặp lại ở nhiều nơi
- Dùng **magic numbers** hoặc **magic strings** trong code
- Logic xử lý dữ liệu nằm **rải rác** thay vì tập trung

## ❓ Nguyên nhân (Reasons for the Problem)

Primitive types **dễ dùng** nên developer lười tạo class mới cho những khái niệm "đơn giản". Tâm lý: *"Chỉ là một string thôi mà, tạo class riêng chi cho mệt."*

Nguyên nhân cụ thể:
- **"Chỉ thêm một field nữa thôi"** — Mỗi lần thêm một primitive, tích tụ dần
- **Ngại tạo class mới** — Cảm thấy overhead khi tạo class cho dữ liệu nhỏ
- **Thiếu kinh nghiệm OOP** — Không nhận ra khi nào cần đối tượng hóa
- **Bắt đầu từ prototype** — Code ban đầu dùng primitive, sau quên refactor

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Replace Data Value with Object](../../03-Refactoring-Techniques/)** — Thay primitive bằng object có ý nghĩa
- **[Replace Type Code with Class](../../03-Refactoring-Techniques/)** — Thay type code bằng class/enum
- **[Replace Type Code with Subclasses](../../03-Refactoring-Techniques/)** — Khi type code ảnh hưởng behavior
- **[Replace Type Code with State/Strategy](../../03-Refactoring-Techniques/)** — Khi cần thay đổi behavior dynamically
- **[Extract Class](../../03-Refactoring-Techniques/)** — Nhóm primitive liên quan thành class mới
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Nhóm tham số primitive thành object

## ✅ Lợi ích (Payoff)

- 🔄 **Code linh hoạt hơn** — Dễ thêm behavior cho đối tượng mới
- 📐 **Type safety tốt hơn** — Compiler giúp bắt lỗi sớm hơn
- 🧩 **Dễ mở rộng** — Thêm tính năng mới mà không ảnh hưởng code cũ
- 📖 **Code tự giải thích** — `Money amount` rõ nghĩa hơn `int amount`
- 🧹 **Giảm duplication** — Logic validation tập trung một chỗ

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **Dùng `int` cho mọi stat** thay vì tạo `Stat` class có min/max/modifiers
- **Dùng `string` cho item IDs** thay vì `ItemID` struct với validation
- **Dùng `int` cho currency** thay vì `Currency` class xử lý conversion
- **Dùng magic numbers** — `if (state == 3)` thay vì `if (state == GameState.Combat)`

### Cải thiện:

```
❌ Trước:
class Player {
    int health;       // Current health
    int maxHealth;     // Max health
    int attack;        // Attack power
    int defense;       // Defense power
    // Logic tính toán rải rác khắp nơi
}

✅ Sau:
class Player {
    Stat health;    // Stat class chứa current, max, modifiers
    Stat attack;
    Stat defense;
    // Logic nằm trong Stat class
}

class Stat {
    int baseValue;
    int maxValue;
    List<Modifier> modifiers;
    int GetFinalValue() { ... }
}
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: Bloaters](./00-bloaters-overview.md) | ⬅️ [Trước: Large Class](./02-large-class.md) | ➡️ [Tiếp: Long Parameter List](./04-long-parameter-list.md)
