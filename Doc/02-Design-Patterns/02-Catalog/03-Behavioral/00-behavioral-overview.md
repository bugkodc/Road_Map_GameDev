# 🔄 Behavioral Design Patterns (Mẫu thiết kế Hành vi)

> 📖 **Nguồn:** [Refactoring.Guru — Behavioral Design Patterns](https://refactoring.guru/design-patterns/behavioral-patterns) | Tác giả: Alexander Shvets

## Behavioral Patterns là gì?

**Behavioral Design Patterns** (Mẫu thiết kế Hành vi) tập trung vào sự **tương tác, giao tiếp và phân phối trách nhiệm (communication & responsibility assignment)** giữa các đối tượng. Thay vì chỉ quan tâm đến cách các đối tượng được tạo ra (Creational) hay cấu trúc của chúng (Structural), nhóm mẫu này giải quyết các thuật toán và luồng điều khiển phức tạp để các đối tượng có thể hợp tác hiệu quả nhưng vẫn giữ được sự lỏng lẻo (loose coupling).

> [!TIP]
> Mục tiêu cốt lõi của nhóm mẫu này là giúp hệ thống của bạn linh hoạt hơn trong việc thay đổi hành vi tại thời điểm chạy (runtime) và giảm thiểu sự phụ thuộc trực tiếp giữa các module tương tác.

---

## 📋 Danh sách 10 Mẫu thiết kế Hành vi

Nhấp vào từng mẫu dưới đây để xem giải thích chi tiết nhất (đầy đủ Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons và C# Game Dev Code):

### 1. [Chain of Responsibility](./01-chain-of-responsibility.md) (Chuỗi Trách nhiệm)
Cho phép truyền các yêu cầu dọc theo một chuỗi các bộ xử lý (handlers). Khi nhận được yêu cầu, mỗi bộ xử lý sẽ quyết định xử lý nó hoặc chuyển tiếp cho bộ xử lý tiếp theo trong chuỗi.

### 2. [Command](./02-command.md) (Lệnh)
Chuyển đổi một yêu cầu hoặc hành động thành một đối tượng độc lập chứa tất cả thông tin về yêu cầu đó. Sự chuyển đổi này cho phép bạn tham số hóa các phương thức, trì hoãn hoặc xếp hàng thực hiện yêu cầu, và hỗ trợ các hoạt động không thể hoàn tác (Undo/Redo).

### 3. [Iterator](./03-iterator.md) (Bộ lặp)
Cho phép bạn duyệt qua các phần tử của một tập hợp (collection) tuần tự mà không cần để lộ cấu trúc biểu diễn bên trong của tập hợp đó (dạng danh sách, ngăn xếp, cây, hay đồ thị).

### 4. [Mediator](./04-mediator.md) (Bộ trung gian)
Giảm thiểu sự liên kết chặt chẽ và phụ thuộc trực tiếp giữa các lớp bằng cách bắt chúng giao tiếp gián tiếp thông qua một đối tượng trung gian duy nhất.

### 5. [Memento](./05-memento.md) (Mẫu ghi nhớ)
Cho phép lưu lại và khôi phục trạng thái bên trong của một đối tượng mà không vi phạm nguyên tắc đóng gói (encapsulation).

### 6. [Observer](./06-observer.md) (Người quan sát)
Định nghĩa một cơ chế đăng ký để thông báo cho nhiều đối tượng (subscribers) về bất kỳ sự kiện nào xảy ra với đối tượng mà chúng đang quan sát (publisher).

### 7. [State](./07-state.md) (Trạng thái)
Cho phép một đối tượng thay đổi hành vi của nó khi trạng thái bên trong thay đổi. Đối tượng sẽ giống như thể đã thay đổi lớp của nó tại thời điểm chạy (runtime).

### 8. [Strategy](./08-strategy.md) (Chiến lược)
Định nghĩa một họ các thuật toán, đóng gói từng thuật toán lại và làm cho chúng có thể hoán đổi cho nhau tại thời điểm chạy, giúp thuật toán biến đổi độc lập với client sử dụng nó.

### 9. [Template Method](./09-template-method.md) (Phương thức Khuôn mẫu)
Định nghĩa bộ khung của một thuật toán trong lớp cha (superclass) nhưng cho phép các lớp con (subclasses) ghi đè các bước cụ thể của thuật toán mà không làm thay đổi cấu trúc chung của nó.

### 10. [Visitor](./10-visitor.md) (Bộ truy cập)
Cho phép bạn tách biệt các thuật toán và hành vi khỏi các đối tượng mà chúng hoạt động trên đó, giúp bạn thêm các hoạt động mới vào các cấu trúc đối tượng hiện có mà không cần sửa đổi các lớp đó.

---

## 📊 Bảng tổng hợp so sánh nhanh

| Tên mẫu | Vấn đề cốt lõi giải quyết | Ví dụ cụ thể trong Game Dev | Phổ biến trong Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Chain of Responsibility** | Xử lý request nhiều bước hoặc nhiều bên | Tính toán sát thương chồng chất, UI Event Bubbling | ⭐⭐ |
| **Command** | Xử lý Input, Undo/Redo, Replay | Áp xạ phím (Input Mapping), Quay lui hành động | ⭐⭐⭐ (Rất quan trọng) |
| **Iterator** | Duyệt danh sách/đồ thị phức tạp | Duyệt Inventory, Duyệt waypoint trên bản đồ | ⭐⭐ |
| **Mediator** | Quá nhiều UI/Manager liên kết chéo | UI Window Manager, Panel điều hướng hội thoại | ⭐⭐⭐ |
| **Memento** | Save/Load game, Undo, Rollback | Lưu Checkpoint, Network Rewind (Dự đoán mạng) | ⭐⭐ |
| **Observer** | Decouple sự kiện hệ thống | Event System (Player Health đổi thông báo UI/SFX) | ⭐⭐⭐ (Rất quan trọng) |
| **State** | State machine nhân vật/gameplay | AI State Machine (Idle, Patrol, Chase, Attack) | ⭐⭐⭐ (Cực phổ biến) |
| **Strategy** | Hoán đổi thuật toán linh hoạt | Cách thức di chuyển AI (A*, Flee, Chase, Wander) | ⭐⭐⭐ |
| **Template Method** | Tránh trùng lặp cấu trúc thuật toán | Cấu trúc AI chạy node, Chu trình spawn quái/bài | ⭐⭐ |
| **Visitor** | Thêm tính năng mới không sửa class | Hệ thống Buff/Power-up tương tác nhiều loại Entity | ⭐ |

---

## 🎮 Tại sao Game Dev cần nhóm mẫu này?

Trong phát triển trò chơi, gameplay chính là các hành vi tương tác liên tục:
- **Tối ưu hóa AI:** Bạn sẽ dùng **State** để tạo máy trạng thái (FSM) cho quái vật và **Strategy** để thay đổi thuật toán di chuyển của chúng.
- **Hệ thống Sự kiện:** **Observer** là xương sống của tất cả các game engine (đặc biệt là Unity Events và C# Actions) giúp tách biệt Gameplay Logic khỏi UI, Audio, và VFX.
- **Tính toán phức tạp:** **Chain of Responsibility** giúp bạn xử lý chuỗi buff/debuff tác động lên sát thương cuối cùng của nhân vật mà không viết code Spaghetti.
- **Kiểm soát hành động người chơi:** **Command** giúp lưu trữ lịch sử di chuyển, hỗ trợ chức năng tua ngược thời gian (Time Rewind) hoặc Replay màn chơi.

---

⬅️ [Quay lại: Design Patterns Overview](../00-design-patterns-overview.md)
