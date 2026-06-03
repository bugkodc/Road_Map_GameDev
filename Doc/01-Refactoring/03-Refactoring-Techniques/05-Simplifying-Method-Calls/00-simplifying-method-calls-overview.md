# 📞 Simplifying Method Calls (Đơn giản hóa cuộc gọi phương thức)

> 📖 **Nguồn:** [Refactoring.Guru — Simplifying Method Calls](https://refactoring.guru/refactoring/techniques/simplifying-method-calls) | Tác giả: Alexander Shvets

## Giới thiệu

Thiết kế giao diện phương thức (API) tốt là chìa khóa giúp codebase dễ đọc, dễ tích hợp và tránh được các sai sót ngớ ngẩn khi truyền tham số. Giao diện phương thức phải rõ ràng, ngắn gọn và truyền đạt đúng ý định của người viết.

Nhóm kỹ thuật **Simplifying Method Calls** tập trung vào việc làm sạch chữ ký của hàm (method signature), tối giản hóa tham số truyền vào và phân tách rõ ràng trách nhiệm của hàm.

---

## 📋 Các kỹ thuật chính và Khi nào nên dùng

### 1. Rename Method (Đổi tên phương thức)
- **Vấn đề:** Tên phương thức không mô tả đúng hoặc mơ hồ về hành vi thực sự của nó.
- **Giải pháp:** Đổi tên phương thức thành một tên rõ ràng, động từ mạnh mẽ mô tả đúng mục đích.

### 2. Separate Query from Modifier (Tách truy vấn khỏi thay đổi trạng thái)
- **Vấn đề:** Phương thức vừa trả về một giá trị (Query) vừa trực tiếp thay đổi trạng thái của đối tượng (Modifier).
- **Giải pháp:** Tách thành hai phương thức riêng biệt: một hàm chỉ đọc dữ liệu (`Get...`) và một hàm chỉ ghi dữ liệu (`Set...` hoặc `Execute...`).
- > 💡 **Nguyên lý CQRS:** "Hỏi một câu hỏi không nên làm thay đổi câu trả lời."

### 3. Introduce Parameter Object (Giới thiệu đối tượng tham số)
- **Vấn đề:** Một phương thức nhận quá nhiều tham số rời rạc (Long Parameter List).
- **Giải pháp:** Gom các tham số rời rạc có liên quan chặt chẽ với nhau thành một class/struct dữ liệu để truyền đi gọn gàng hơn.

### 4. Preserve Whole Object (Bảo toàn toàn bộ đối tượng)
- **Vấn đề:** Bạn lấy từng thuộc tính nhỏ của một đối tượng để truyền làm tham số cho hàm.
- **Giải pháp:** Truyền trực tiếp **toàn bộ** đối tượng đó vào hàm.

### 5. Replace Parameter with Explicit Methods (Thay tham số bằng các phương thức rõ ràng)
- **Vấn đề:** Hàm nhận một tham số "cờ" (boolean hoặc enum) để chuyển đổi qua lại giữa các logic chạy khác nhau.
- **Giải pháp:** Tách thành các phương thức riêng biệt, mỗi phương thức đại diện cho một hành vi rõ ràng.
- *Ví dụ:* Thay vì `SetHeight(string name, int value)` có switch-case cho name, hãy viết `SetHeight(int value)` và `SetWidth(int value)`.

### 6. Replace Constructor with Factory Method (Thay Constructor bằng Factory Method)
- **Vấn đề:** Tạo đối tượng trực tiếp qua `new` quá cứng nhắc hoặc Constructor có quá nhiều overload khó hiểu.
- **Giải pháp:** Tạo hàm static Factory Method có tên mô tả rõ ràng để khởi tạo đối tượng.

---

## 🎮 Trong Game Dev

Hệ thống SPAWN thực thể hoặc cấu hình chỉ số trong game rất cần áp dụng các kỹ thuật này:

- **Separate Query from Modifier**:
  - ❌ *Ví dụ chưa tốt:* Hàm `GetNextWaypoint()` vừa trả về Waypoint tiếp theo vừa tăng biến đếm index của Player. Khi bạn chỉ muốn lấy xem Waypoint tiếp theo ở đâu để vẽ đường line định vị mà không di chuyển Player, hàm này sẽ làm loạn index di chuyển!
  - ✅ *Giải pháp tốt:* Tách thành hàm `GetCurrentWaypoint()` (chỉ trả về giá trị) và hàm `MoveToNextWaypoint()` (thay đổi index).

- **Replace Parameter with Explicit Methods**:
  - ❌ *Ví dụ chưa tốt:* `void SetSpeed(float value, bool isRunning)`
  - ✅ *Giải pháp tốt:* Tách thành `SetWalkingSpeed(float value)` và `SetRunningSpeed(float value)`.

- **Preserve Whole Object**:
  - ❌ *Ví dụ chưa tốt:* `CalculateDamage(target.armor, target.health, target.level)`
  - ✅ *Giải pháp tốt:* `CalculateDamage(target)` (truyền cả instance Target vào).

---

## 🔗 Liên kết

- ⬆️ [Refactoring Techniques — Tổng quan](../00-techniques-overview.md)
- ⬅️ [Simplifying Conditional](../04-Simplifying-Conditional/00-simplifying-conditional-overview.md)
- ➡️ [Dealing with Generalization](../06-Dealing-with-Generalization/00-dealing-with-generalization-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
