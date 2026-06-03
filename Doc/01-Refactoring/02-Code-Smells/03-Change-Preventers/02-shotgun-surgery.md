# Shotgun Surgery (Thay đổi phân tán / Phẫu thuật bằng súng săn)

> 📖 **Nguồn:** [Refactoring.Guru — Shotgun Surgery](https://refactoring.guru/smells/shotgun-surgery) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Shotgun Surgery** xảy ra khi mỗi lần bạn thực hiện **một thay đổi nhỏ** nào đó, bạn bắt buộc phải đi sửa đổi **rất nhiều class khác nhau** trong codebase cùng một lúc.

*Hình ảnh ẩn dụ:* Giống như một phát súng bắn ra (shotgun), các mảnh đạn nhỏ găm vào rất nhiều vị trí khác nhau và bạn phải đi tìm và gắp từng mảnh ra.

*Ví dụ:* Khi bạn muốn đổi cách tính điểm sát thương (damage) trong game, bạn phải đi sửa code ở class `Sword`, class `Arrow`, class `Spell`, class `EnemyHealth` và class `CombatUI`.

## ❓ Nguyên nhân (Reasons for the Problem)

Smell này xảy ra khi một trách nhiệm hoặc một logic cụ thể bị **chia nhỏ và phân tán quá mức** ở nhiều nơi trong hệ thống, thay vì được tập trung tại một nơi duy nhất quản lý:
- Do lập trình viên cố gắng giảm coupling giữa các class nhưng làm quá tay, khiến logic bị loãng.
- Copy-paste logic tính toán thay vì viết hàm dùng chung.

## 💊 Cách điều trị (Treatment)

Để gom các "mảnh đạn" phân tán này lại một chỗ, chúng ta dùng các kỹ thuật sau:

1. **Move Method** và **Move Field**: Chuyển các thuộc tính và phương thức phân tán về một class chung thích hợp.
2. **Inline Class**: Nếu một class quá nhỏ và chỉ đảm nhận một phần nhỏ của logic bị phân tán, hãy gộp nó vào class chứa hầu hết các logic liên quan.
3. **Introduce Parameter Object** hoặc **Preserve Whole Object**: Gom các tham số rời rạc thành một object để truyền đi một cách có tổ chức hơn.

## ✅ Lợi ích (Payoff)

- **Single Source of Truth (Nguồn sự thật duy nhất)**: Khi một logic chỉ được định nghĩa ở một nơi duy nhất, bạn chỉ cần sửa đúng chỗ đó khi có yêu cầu thay đổi.
- **Giảm thiểu sai sót (Bugs)**: Không còn nỗi sợ hãi "quên sửa ở class X" dẫn đến crash game hay hoạt động sai lệch logic.
- **Code gọn gàng hơn**: Giảm thiểu việc lặp lại code ở các class khác nhau.

## 🎮 Trong Game Dev

Trong game dev, Shotgun Surgery thường xuất hiện ở các hệ thống cốt lõi:

### ❌ Ví dụ chưa refactor:
Giả sử bạn muốn thêm thuộc tính `Defense` (Giáp) cho nhân vật. Vì logic tính damage bị phân tán ở khắp mọi nơi, bạn phải làm như sau:
- Sửa class `Player` để thêm biến `defense`.
- Sửa class `Enemy` để khi tính damage phải gọi `player.defense`.
- Sửa class `Projectile` để trừ damage dựa trên giáp.
- Sửa class `UI_Status` để hiển thị giáp.
- Sửa class `SaveSystem` để lưu và load biến giáp.
- Sửa class `NetworkSync` để đồng bộ biến giáp qua mạng.

Nếu bạn quên sửa ở `SaveSystem` hay `Projectile`, game sẽ chạy sai logic hoặc mất dữ liệu khi người chơi load game.

### ✅ Giải pháp sau refactor:
Tập trung toàn bộ thuộc tính và logic tính toán của nhân vật vào một class chuyên biệt như `CharacterStats`:
- Class `CharacterStats` quản lý toàn bộ các thuộc tính như HP, Mana, Attack, Defense và cung cấp hàm `TakeDamage(int rawDamage)`.
- Khi đạn bắn trúng hay kẻ địch tấn công, chúng chỉ cần gọi `targetStats.TakeDamage(damage)`.
- Khi thêm thuộc tính `Defense`, bạn chỉ cần khai báo bên trong class `CharacterStats` và chỉnh sửa cách tính toán trong hàm `TakeDamage()` của chính class đó. Các class khác như `Projectile`, `Enemy` hoàn toàn không cần thay đổi gì cả!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Divergent Change](./01-divergent-change.md) |
| → Tiếp theo | [Parallel Inheritance Hierarchies](./03-parallel-inheritance.md) |
