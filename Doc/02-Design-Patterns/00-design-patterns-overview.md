# 🧩 Design Patterns - Tổng Quan

> **Nguồn**: [refactoring.guru/design-patterns](https://refactoring.guru/design-patterns)

## Design Patterns là gì?

**Design Patterns** (Mẫu thiết kế) là các giải pháp điển hình cho những vấn đề thường gặp trong thiết kế phần mềm. Chúng là những bản thiết kế (blueprint) có thể được tùy chỉnh để giải quyết một vấn đề thiết kế cụ thể trong code.

### Đặc điểm:
- **Không phải code có sẵn** — Đó là khái niệm, blueprint để giải quyết vấn đề
- **Không phải thuật toán** — Algorithm giải quyết vấn đề tính toán, Pattern giải quyết vấn đề thiết kế
- **Có thể tùy chỉnh** — Áp dụng linh hoạt cho từng tình huống cụ thể

## 📖 Nội dung chi tiết

### Tìm hiểu về Design Patterns
- **What's a Design Pattern?** — Định nghĩa và cấu trúc
- **History of Patterns** — Lịch sử phát triển (Gang of Four - GoF)
- **Why Should I Learn Patterns?** — Tại sao cần học
- **Criticism of Patterns** — Các góc nhìn phản biện
- **Classification of Patterns** — Phân loại theo mục đích

## 📂 Phân loại Design Patterns

Design Patterns được chia thành **3 nhóm chính** với tổng cộng **22 patterns**:

### 1. 🏭 Creational Patterns (Mẫu Khởi tạo) — 5 patterns
Cung cấp cơ chế tạo object linh hoạt, tái sử dụng code.

👉 Chi tiết: [01-creational-patterns.md](./01-creational-patterns.md)

| Pattern | Mô tả ngắn |
|---------|------------|
| Factory Method | Tạo object thông qua interface chung |
| Abstract Factory | Tạo họ (family) object liên quan |
| Builder | Xây dựng object phức tạp từng bước |
| Prototype | Clone object hiện có |
| Singleton | Đảm bảo chỉ có 1 instance duy nhất |

### 2. 🏗️ Structural Patterns (Mẫu Cấu trúc) — 7 patterns
Giải thích cách tổ chức object và class thành cấu trúc lớn hơn.

👉 Chi tiết: [02-structural-patterns.md](./02-structural-patterns.md)

| Pattern | Mô tả ngắn |
|---------|------------|
| Adapter | Chuyển đổi interface không tương thích |
| Bridge | Tách abstraction khỏi implementation |
| Composite | Tổ chức object thành cấu trúc cây |
| Decorator | Thêm behavior mới cho object |
| Facade | Cung cấp interface đơn giản cho hệ thống phức tạp |
| Flyweight | Chia sẻ state chung giữa nhiều object |
| Proxy | Cung cấp đối tượng đại diện |

### 3. 🔄 Behavioral Patterns (Mẫu Hành vi) — 10 patterns
Quản lý giao tiếp và phân phối trách nhiệm giữa các object.

👉 Chi tiết: [03-behavioral-patterns.md](./03-behavioral-patterns.md)

| Pattern | Mô tả ngắn |
|---------|------------|
| Chain of Responsibility | Truyền request qua chuỗi handler |
| Command | Đóng gói request thành object |
| Iterator | Duyệt qua collection tuần tự |
| Mediator | Giảm coupling bằng trung gian |
| Memento | Lưu và khôi phục state |
| Observer | Thông báo thay đổi cho subscriber |
| State | Thay đổi behavior theo state |
| Strategy | Đổi thuật toán runtime |
| Template Method | Định nghĩa skeleton, subclass override bước cụ thể |
| Visitor | Thêm operation mới mà không sửa class |

## 🎮 Tại sao Game Dev cần biết Design Patterns?

1. **Game architecture phức tạp** — Cần pattern để tổ chức code hàng trăm class
2. **Unity dùng rất nhiều patterns** — Component (Composite), Event System (Observer), Coroutine (Command)...
3. **Performance critical** — Flyweight, Object Pooling giúp tối ưu memory
4. **Scalability** — Pattern giúp mở rộng game dễ dàng (thêm enemy, weapon, level...)
5. **Common language** — Nói "dùng Observer pattern" dễ hiểu hơn giải thích cả hệ thống

## 🎯 Patterns quan trọng nhất cho Game Dev

| Ưu tiên | Pattern | Lý do |
|---------|---------|-------|
| ⭐⭐⭐ | **Singleton** | GameManager, AudioManager (nhưng cần cẩn thận!) |
| ⭐⭐⭐ | **Observer** | Event system, UI update, achievement tracking |
| ⭐⭐⭐ | **State** | Player states, Enemy AI, Game states |
| ⭐⭐⭐ | **Command** | Input system, Undo/Redo, Replay system |
| ⭐⭐⭐ | **Strategy** | AI behavior, Damage calculation, Movement types |
| ⭐⭐ | **Factory Method** | Spawning enemies, Creating projectiles |
| ⭐⭐ | **Flyweight** | Shared data cho hàng nghìn object giống nhau |
| ⭐⭐ | **Composite** | Scene hierarchy, UI hierarchy |
| ⭐ | **Decorator** | Power-ups, Buff/Debuff system |
| ⭐ | **Prototype** | Cloning game objects, Level templates |
