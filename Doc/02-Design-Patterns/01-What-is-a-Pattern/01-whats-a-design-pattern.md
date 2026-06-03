# What's a design pattern? (Mẫu thiết kế là gì?)

> **Nguồn gốc:** Tổng hợp và tham khảo từ [Refactoring.Guru — What is a Design Pattern](https://refactoring.guru/design-patterns/what-is-pattern)
> Tác giả: **Alexander Shvets** · Minh họa: **Dmitry Zhart**
> Đây là tài liệu tóm tắt cho mục đích học tập, mọi quyền thuộc về tác giả gốc.

## 📐 Định nghĩa Design Pattern

**Design Pattern** (Mẫu thiết kế) là các giải pháp điển hình, đã được chứng minh hiệu quả cho những vấn đề thường gặp trong quá trình thiết kế cấu trúc phần mềm. 

Chúng không phải là các thư viện hay mã nguồn có sẵn mà bạn có thể tải về và copy trực tiếp vào dự án. Thay vào đó, Design Pattern là **một bản vẽ thiết kế (blueprint) hoặc một biểu mẫu tư duy** hướng dẫn cách giải quyết một vấn đề cụ thể trong các ngữ cảnh khác nhau.

---

## 💡 Phân biệt: Pattern vs Algorithm (Mẫu thiết kế vs Thuật toán)

Nhiều người thường nhầm lẫn giữa hai khái niệm này vì chúng đều là các giải pháp giải quyết vấn đề. Tuy nhiên, tính chất của chúng hoàn toàn khác nhau:

*   **Thuật toán (Algorithm)** giống như một **công thức nấu ăn chi tiết từng bước**: Nó định nghĩa một chuỗi các hành động rõ ràng, tuần tự để đạt được một mục tiêu cụ thể (ví dụ: thuật toán sắp xếp mảng). Bạn có thể viết code thuật toán giống hệt nhau ở bất kỳ ngôn ngữ nào.
*   **Mẫu thiết kế (Design Pattern)** giống như một **bản vẽ kiến trúc ngôi nhà**: Nó chỉ ra hình dáng, cấu trúc và cách các phòng tương tác với nhau, nhưng việc xây nhà bằng gạch gì, màu sơn nào, kích thước cụ thể ra sao hoàn toàn phụ thuộc vào bạn. Hai lập trình viên cùng áp dụng mẫu *Observer* vào hai dự án khác nhau sẽ viết ra những đoạn code hoàn toàn khác biệt.

---

## 📦 Thành phần cấu tạo của một Pattern

Hầu hết các tài liệu chính thống định nghĩa một Pattern qua các thành phần cốt lõi sau:

1.  **Ý định (Intent)**: Mô tả ngắn gọn vấn đề mà pattern giải quyết và giải pháp cơ bản của nó.
2.  **Động lực (Motivation)**: Giải thích sâu hơn về vấn đề thiết kế và tại sao giải pháp của pattern lại khả thi.
3.  **Cấu trúc (Structure)**: Sơ đồ các class và cách chúng liên kết, tương tác (thường biểu diễn bằng sơ đồ lớp UML).
4.  **Ví dụ Code (Code Example)**: Minh họa cách triển khai bằng một ngôn ngữ lập trình cụ thể (ví dụ: C#, C++).

---

## 🎮 Trong Game Dev

Trong lập trình game, thiết kế cấu trúc lớp (class structure) là thách thức cực kỳ lớn vì game là sự kết hợp của vô số hệ thống thời gian thực (real-time loops) tương tác phức tạp với nhau:

- Nếu bạn muốn hệ thống **UI (Giao diện)** tự động cập nhật mỗi khi **Player** nhận sát thương mà không muốn class `Player` phải biết về class `UIManager` (tránh coupling chặt) -> Bạn dùng **Observer Pattern**.
- Nếu bạn muốn người chơi có thể tùy biến các phím bấm (Key Bindings), hoặc hỗ trợ tính năng **Undo/Redo** (Đi lại lượt cũ trong game cờ) -> Bạn dùng **Command Pattern**.
- Nếu bạn muốn quản lý trạng thái của AI quái vật (Tuần tra, Đuổi theo, Tấn công) một cách chuyên nghiệp mà không bị ngập trong hàng ngàn câu lệnh `if-else` lồng nhau -> Bạn dùng **State Pattern**.

---

## 🗺️ Điều hướng

| Hướng | Liên kết |
|-------|----------|
| ← Tổng quan | [Design Patterns Overview](../00-design-patterns-overview.md) |
| → Tiếp theo | [History of Patterns](./02-history-of-patterns.md) |

---

> 📝 **Nguồn gốc:** [Refactoring.Guru](https://refactoring.guru/) · Tác giả: Alexander Shvets · Minh họa: Dmitry Zhart
