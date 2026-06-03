# 🏭 Creational Design Patterns (Mẫu thiết kế Khởi tạo)

> 📖 **Nguồn:** [Refactoring.Guru — Creational Design Patterns](https://refactoring.guru/design-patterns/creational-patterns) | Tác giả: Alexander Shvets

## Creational Patterns là gì?

**Creational Design Patterns** (Mẫu thiết kế Khởi tạo) cung cấp các cơ chế **khởi tạo đối tượng (object creation)** linh hoạt và hiệu quả hơn. Thay vì khởi tạo trực tiếp qua toán tử `new` truyền thống (gây coupling cứng nhắc), nhóm mẫu này che giấu chi tiết tạo lập phức tạp, giúp mã nguồn tăng tính tái sử dụng và khả năng bảo trì.

> [!TIP]
> Mục tiêu lớn nhất của nhóm mẫu này là tách biệt hoàn toàn giữa **quá trình sử dụng đối tượng** và **quá trình khởi tạo đối tượng** (Decouple creation from consumption).

---

## 📋 Danh sách 5 Mẫu thiết kế Khởi tạo

Nhấp vào từng mẫu dưới đây để xem giải thích chi tiết nhất (đầy đủ Problem, Solution, Structure, Pseudocode, Applicability, Pros & Cons và C# Game Dev Code):

### 1. [Factory Method](./01-factory-method.md) (Phương thức Nhà máy)
Định nghĩa một interface chung để tạo đối tượng trong superclass, nhưng cho phép các subclass quyết định loại đối tượng nào sẽ được khởi tạo.

### 2. [Abstract Factory](./02-abstract-factory.md) (Nhà máy Trừu tượng)
Cung cấp cơ chế khởi tạo **họ (family) các đối tượng có liên quan chặt chẽ** với nhau mà không cần chỉ định rõ ràng các concrete class cụ thể của chúng.

### 3. [Builder](./03-builder.md) (Người xây dựng)
Cho phép xây dựng các đối tượng cực kỳ phức tạp **từng bước một**. Bằng cách sử dụng cùng một quy trình xây dựng, bạn có thể tạo ra nhiều biến thể (configurations) khác nhau của đối tượng.

### 4. [Prototype](./04-prototype.md) (Mẫu nguyên mẫu)
Cho phép sao chép (clone) một đối tượng hiện có mà không làm cho mã nguồn của bạn phụ thuộc vào các concrete class cụ thể của chúng.

### 5. [Singleton](./05-singleton.md) (Độc bản)
Đảm bảo rằng một class chỉ có **duy nhất một instance** trong suốt vòng đời của ứng dụng và cung cấp một điểm truy cập toàn cục (global access point) đến instance đó.

---

## 📊 Bảng tổng hợp so sánh nhanh

| Tên mẫu | Vấn đề cốt lõi giải quyết | Ví dụ cụ thể trong đời thực | Phổ biến trong Game Dev |
|---------|---------------------------|----------------------------|------------------------|
| **Factory Method** | Chưa biết trước loại thực thể cần tạo | Spawner tuyển dụng binh lính | ⭐⭐⭐ |
| **Abstract Factory** | Tạo nhóm thực thể đồng bộ (theme) | Mua bộ trang bị chiến binh/pháp sư | ⭐⭐ |
| **Builder** | Tạo thực thể có quá nhiều thuộc tính | Lắp ráp robot tùy chỉnh | ⭐⭐ |
| **Prototype** | Khởi tạo thực thể đắt đỏ, tốn bộ nhớ | Nhân bản đạn dược, prefab | ⭐⭐⭐ (Prefab!) |
| **Singleton** | Đảm bảo duy nhất một bộ quản lý | GameManager, AudioManager | ⭐⭐⭐ (Cần cẩn thận!) |

---

## 🎮 Tại sao Game Dev cần nhóm mẫu này?

Trong phát triển game, việc khởi tạo GameObject diễn ra liên tục từng giây (spawn quái, bắn đạn, vẽ hiệu ứng hạt). Nhóm mẫu này giúp bạn:
- Tối ưu hóa bộ nhớ: Nhân bản các asset đắt đỏ thông qua **Prototype**.
- Quản lý Spawning khoa học: Dùng **Factory Method** để quản lý Spawner wave quái vật mà không viết switch-case rườm rà.
- Lắp ráp thuộc tính nhân vật phức tạp: Dùng **Builder** để build nhân vật với hàng trăm tùy chọn trang bị mà không bị lỗi Constructor.

---

⬅️ [Quay lại: Design Patterns Overview](../00-design-patterns-overview.md)
