# Classification of patterns (Phân loại mẫu thiết kế)

> **Nguồn gốc:** Tổng hợp và tham khảo từ [Refactoring.Guru — Classification of Patterns](https://refactoring.guru/design-patterns/classification)
> Tác giả: **Alexander Shvets** · Minh họa: **Dmitry Zhart**
> Đây là tài liệu tóm tắt cho mục đích học tập, mọi quyền thuộc về tác giả gốc.

## 📊 Hệ thống Phân loại Design Patterns

Design Patterns vô cùng đa dạng và giải quyết nhiều khía cạnh khác nhau trong thiết kế phần mềm. Để giúp lập trình viên dễ dàng tìm kiếm và áp dụng, GoF đã hệ thống hóa và phân loại các mẫu thiết kế dựa trên 3 tiêu chí chính: **Mục đích sử dụng (Intent)**, **Phạm vi tác động (Scope)** và **Độ phức tạp**.

Trong đó, phân loại theo **Mục đích sử dụng** là phổ biến nhất và được chia thành **3 nhóm lớn**:

---

## 📂 3 Nhóm chính phân loại theo Mục đích (Intent)

### 1. 🏭 Creational Patterns (Nhóm Mẫu Khởi tạo)
Nhóm này tập trung vào **cách tạo ra các đối tượng (objects)**. Nó giúp che giấu chi tiết khởi tạo phức tạp và tăng tính linh hoạt bằng cách tách biệt logic tạo lập đối tượng khỏi logic sử dụng đối tượng.
- **Tác dụng:** Giảm sự phụ thuộc cứng nhắc (hardcoding) vào các class cụ thể khi gọi lệnh `new`.
- **5 mẫu tiêu biểu:** *Factory Method*, *Abstract Factory*, *Builder*, *Prototype*, *Singleton*.

### 2. 🏗️ Structural Patterns (Nhóm Mẫu Cấu trúc)
Nhóm này giải quyết bài toán **kết nối, lắp ráp các class và object** lại với nhau để tạo thành các cấu trúc lớn hơn, phức tạp hơn nhưng vẫn đảm bảo tính linh hoạt, lỏng lẻo (loose coupling) và hiệu quả.
- **Tác dụng:** Giúp các class có giao diện không tương thích có thể làm việc trơn tru với nhau hoặc đóng gói thêm hành vi mới.
- **7 mẫu tiêu biểu:** *Adapter*, *Bridge*, *Composite*, *Decorator*, *Facade*, *Flyweight*, *Proxy*.

### 3. 🔄 Behavioral Patterns (Nhóm Mẫu Hành vi)
Nhóm này tập trung vào **sự tương tác, truyền thông điệp và phân phối trách nhiệm** giữa các class và object với nhau.
- **Tác dụng:** Quản lý các luồng chạy (control flow) phức tạp, giúp các đối tượng phối hợp hành động một cách nhịp nhàng mà không phụ thuộc trực tiếp vào nhau.
- **10 mẫu tiêu biểu:** *Chain of Responsibility*, *Command*, *Iterator*, *Mediator*, *Memento*, *Observer*, *State*, *Strategy*, *Template Method*, *Visitor*.

---

## 📐 Phân loại theo Phạm vi tác động (Scope)

*   **Class Patterns:** Chủ yếu dựa trên **mối quan hệ kế thừa (Inheritance)**. Phép tính toán được cấu hình cứng cáp ngay tại thời điểm biên dịch (compile-time) thông qua các lớp cha và con (ví dụ: *Factory Method*, *Adapter* dạng class).
*   **Object Patterns:** Dựa trên **mối quan hệ bao hàm / thành phần (Composition / Aggregation)**. Phép tính toán được thay đổi linh hoạt ngay trong runtime khi chạy game bằng cách gán các instance khác nhau cho thuộc tính của đối tượng (ví dụ: hầu hết các pattern còn lại).

---

## 🎮 Trong Game Dev

Đối với lập trình viên game, việc nắm vững phân loại này giúp bạn chọn đúng "công cụ" cho từng bài toán:
- Khi cần tạo quái vật tự động: Hãy nghĩ ngay đến các **Creational Patterns** (ví dụ: *Factory Method* Spawner).
- Khi cần vẽ cây Scene Hierarchy (phân cấp cha con) trong Unity Editor: Đó là ứng dụng kinh điển của **Structural Patterns** (ví dụ: *Composite*).
- Khi cần thay đổi hành vi AI hoặc viết hệ thống kỹ năng nhân vật (Kích hoạt Buff, Hồi chiêu, Hồi máu): Tìm kiếm câu trả lời ở nhóm **Behavioral Patterns** (ví dụ: *Strategy* hay *State*).

---

## 🗺️ Điều hiểu hướng

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Criticism of Patterns](./04-criticism-of-patterns.md) |
| 🧩 Tổng quan | [Design Patterns Catalog](../00-design-patterns-overview.md) |

---

> 📝 **Nguồn gốc:** [Refactoring.Guru](https://refactoring.guru/) · Tác giả: Alexander Shvets · Minh họa: Dmitry Zhart
