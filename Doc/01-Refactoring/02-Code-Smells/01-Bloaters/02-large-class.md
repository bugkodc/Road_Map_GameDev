# Large Class

> 📖 **Nguồn:** [Refactoring.Guru — Large Class](https://refactoring.guru/smells/large-class) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Class có **quá nhiều field, method, và dòng code** — nó đang cố gắng làm quá nhiều việc cùng lúc. Một class lớn thường vi phạm **Single Responsibility Principle** (SRP).

Dấu hiệu nhận biết:
- Class có hàng chục (hoặc hàng trăm) field
- Class có quá nhiều method phục vụ nhiều mục đích khác nhau
- Bạn không thể tóm tắt class làm gì trong **một câu**
- Có nhiều nhóm field/method không liên quan đến nhau trong cùng class
- Khi thay đổi một tính năng, bạn phải đọc hiểu rất nhiều code không liên quan

## ❓ Nguyên nhân (Reasons for the Problem)

Developer thấy **dễ hơn** khi thêm feature vào class có sẵn thay vì tạo class mới. Tương tự Long Method, class thường bắt đầu nhỏ nhưng phình to dần theo thời gian.

Nguyên nhân cụ thể:
- **Thiếu kế hoạch thiết kế** — Không phân tách trách nhiệm từ đầu
- **"Tiện thể thêm vào"** — Thêm field/method vào class gần nhất thay vì tạo class phù hợp
- **God Object pattern** — Một class trung tâm quản lý mọi thứ
- **Thiếu refactoring** — Không dành thời gian tách class khi nó lớn dần

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Tách nhóm field/method liên quan thành class mới
- **[Extract Subclass](../../03-Refactoring-Techniques/)** — Tách behavior cụ thể của một loại thành subclass
- **[Extract Interface](../../03-Refactoring-Techniques/)** — Xác định interface chung cho các behavior
- **[Duplicate Observed Data](../../03-Refactoring-Techniques/)** — Tách data được dùng ở cả domain và GUI thành các object riêng

> [!TIP]
> Nếu class lớn chịu trách nhiệm về cả **giao diện** (UI) lẫn **logic nghiệp vụ**, hãy tách chúng ra. Đôi khi cần giữ bản sao dữ liệu ở cả hai nơi và đồng bộ chúng.

## ✅ Lợi ích (Payoff)

- 🧠 **Ít thuộc tính cần nhớ** — Mỗi class nhỏ hơn, dễ hiểu hơn
- 🔄 **Giảm duplication** — Khi class lớn, dễ có code trùng lặp bên trong
- 🔧 **Dễ bảo trì** — Thay đổi trong class nhỏ ít ảnh hưởng hơn
- 📦 **Tổ chức tốt hơn** — Mỗi class có trách nhiệm rõ ràng

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **GameManager chứa mọi thứ** — Score, spawning, game state, save/load, audio, UI update... tất cả trong một class
- **PlayerController quá lớn** — Xử lý input, movement, combat, inventory, quest, animation, audio trong cùng một MonoBehaviour
- **Level class khổng lồ** — Chứa cả level generation, enemy placement, item spawning, environmental effects

### Cải thiện:

```
❌ Trước:
class GameManager {
    // Score fields & methods (50 dòng)
    // Spawning fields & methods (80 dòng)
    // Save/Load fields & methods (60 dòng)
    // Audio fields & methods (40 dòng)
    // UI fields & methods (70 dòng)
}

✅ Sau:
class GameManager    → Chỉ quản lý game state
class ScoreManager   → Quản lý điểm số
class SpawnManager   → Quản lý spawning
class SaveManager    → Quản lý save/load
class AudioManager   → Quản lý âm thanh
class UIManager      → Quản lý giao diện
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: Bloaters](./00-bloaters-overview.md) | ⬅️ [Trước: Long Method](./01-long-method.md) | ➡️ [Tiếp: Primitive Obsession](./03-primitive-obsession.md)
