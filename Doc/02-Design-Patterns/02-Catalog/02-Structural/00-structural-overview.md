# 🏗️ Structural Design Patterns (Mẫu thiết kế Cấu trúc)

> 📖 **Nguồn:** [Refactoring.Guru — Structural Design Patterns](https://refactoring.guru/design-patterns/structural-patterns) | Tác giả: Alexander Shvets

## Structural Patterns là gì?

**Structural Design Patterns** (Mẫu thiết kế Cấu trúc) tập trung vào việc **thiết lập mối quan hệ** giữa các class và object. Chúng giải thích cách lắp ráp và tổ chức các thực thể riêng lẻ này thành các cấu trúc lớn hơn, phức tạp hơn nhưng vẫn đảm bảo tính linh hoạt, dễ mở rộng và hiệu quả về mặt tài nguyên hệ thống.

> [!TIP]
> Mục tiêu lớn nhất của nhóm mẫu này là giúp hệ thống đạt được sự kế thừa và lắp ghép tối ưu, giảm sự phụ thuộc cứng nhắc (decoupling) và tối ưu hóa việc quản lý bộ nhớ/tài nguyên.

---

## 📋 Danh sách 7 Mẫu thiết kế Cấu trúc

Nhấp vào từng mẫu dưới đây để xem giải thích chi tiết nhất (đầy đủ Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons và C# Game Dev Code trong Unity):

### 1. [Adapter](./01-adapter.md) (Bộ chuyển đổi)
Cho phép các class có interface không tương thích có thể làm việc cùng nhau bằng cách bao bọc interface cũ của class đó trong một interface mới tương thích với client.

### 2. [Bridge](./02-bridge.md) (Cầu nối)
Tách biệt phần trừu tượng (Abstraction) khỏi phần thực thi (Implementation), giúp cả hai thành phần có thể phát triển và thay đổi một cách độc lập mà không ảnh hưởng tới nhau.

### 3. [Composite](./03-composite.md) (Hỗn hợp)
Cho phép bạn tổ chức các đối tượng theo cấu trúc cây (tree structure) và làm việc với cấu trúc này như thể các đối tượng đơn lẻ hay các nhóm đối tượng đều giống nhau.

### 4. [Decorator](./04-decorator.md) (Trang trí)
Cho phép gắn thêm các hành vi, thuộc tính mới vào một đối tượng một cách động (at runtime) mà không cần tạo các subclass mới hay làm thay đổi class gốc.

### 5. [Facade](./05-facade.md) (Mặt tiền)
Cung cấp một interface đơn giản hóa, duy nhất đại diện cho một hệ thống con (subsystem) phức tạp gồm nhiều class và logic xử lý chằng chịt bên trong.

### 6. [Flyweight](./06-flyweight.md) (Khinh lượng)
Tiết kiệm bộ nhớ bằng cách chia sẻ các phần trạng thái chung (intrinsic state) giữa hàng ngàn đối tượng tương tự nhau, thay vì lưu trữ độc lập trong mỗi thực thể.

### 7. [Proxy](./07-proxy.md) (Ủy quyền)
Cung cấp một đối tượng đại diện (substitute/placeholder) để kiểm soát quyền truy cập, lazy loading, bảo mật hoặc logging trước khi tiếp cận đối tượng gốc.

---

## 📊 Bảng tổng hợp so sánh nhanh

| Tên mẫu | Vấn đề cốt lõi giải quyết | Ví dụ cụ thể trong Game Dev | Phổ biến trong Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Adapter** | Không tương thích interface giữa các hệ thống | Tích hợp thư viện SDK/Plugin quảng cáo cũ vào API mới | ⭐⭐ |
| **Bridge** | Bùng nổ số lượng subclass khi kết hợp nhiều đặc tính | Tách biệt logic loại vũ khí khỏi hiệu ứng hình ảnh/sfx | ⭐⭐ |
| **Composite** | Duyệt và quản lý phân cấp cha-con phức tạp | Hệ thống UI (Canvas, Panel, Button) hoặc Hòm đồ (Inventory) | ⭐⭐⭐ (Unity hierarchy!) |
| **Decorator** | Thêm tính năng động, tránh bùng nổ class con | Hệ thống Buff/Debuff hoặc các Mod súng (lửa, băng, độc) | ⭐⭐ |
| **Facade** | Quá nhiều class con phức tạp cần giao tiếp | Quản lý Save/Load gom File I/O, PlayerPrefs, Cloud, Encrypt | ⭐⭐⭐ |
| **Flyweight** | Bộ nhớ quá tải khi tạo hàng vạn thực thể | Lưu trữ thuộc tính đạn, cỏ cây thông qua ScriptableObject | ⭐⭐⭐ (Tối ưu hóa RAM) |
| **Proxy** | Khởi tạo tài nguyên quá nặng khi khởi động | Lazy loading âm thanh hoặc Asset lớn từ Addressables | ⭐⭐ |

---

## 🎮 Tại sao Game Dev cần nhóm mẫu này?

Trò chơi điện tử là một hệ thống cực kỳ phức tạp với hàng ngàn GameObject tương tác thời gian thực. Nhóm mẫu Cấu trúc hỗ trợ đắc lực trong việc:
- **Tối ưu hóa hiệu năng**: Tránh lỗi tràn bộ nhớ (Out of Memory) nhờ **Flyweight** khi vẽ hàng vạn viên đạn, lá cây hoặc dùng **Proxy** để chỉ tải asset khi người chơi thực sự chạm trán.
- **Tổ chức hòm đồ khoa học**: Quản lý các container (rương, túi đồ) chứa vật phẩm lồng nhau mượt mà bằng **Composite**.
- **Tách biệt đồ họa và logic**: Sử dụng **Bridge** để lập trình viên tập trung phát triển Gameplay của vũ khí, trong khi nghệ sĩ Tech Artist tinh chỉnh VFX/SFX mà không làm hỏng code của nhau.

---

⬅️ [Quay lại: Design Patterns Overview](../00-design-patterns-overview.md)
