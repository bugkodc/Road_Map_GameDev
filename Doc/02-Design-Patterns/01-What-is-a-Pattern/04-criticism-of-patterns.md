# Criticism of patterns (Góc nhìn phản biện về mẫu thiết kế)

> **Nguồn gốc:** Tổng hợp và tham khảo từ [Refactoring.Guru — Criticism of Patterns](https://refactoring.guru/design-patterns/criticism)
> Tác giả: **Alexander Shvets** · Minh họa: **Dmitry Zhart**
> Đây là tài liệu tóm tắt cho mục đích học tập, mọi quyền thuộc về tác giả gốc.

## ⚖️ Mặt Trái của Design Patterns

Design Patterns là một công cụ tuyệt vời, nhưng giống như bất kỳ vũ khí sắc bén nào, nếu sử dụng không đúng cách hoặc lạm dụng quá đà, chúng sẽ quay lại gây hại trực tiếp cho dự án của bạn. 

Dưới đây là những ý kiến phản biện và phê bình nổi tiếng từ cộng đồng phát triển phần mềm trên thế giới về Design Patterns:

---

## 🚫 3 Lỗi lầm & Ý kiến phê bình phổ biến

### 1. 🪓 Cái bẫy Lạm dụng & Thiết kế quá đà (Over-engineering)
Đây là căn bệnh kinh điển của các lập trình viên mới làm quen với Design Patterns.
- Hội chứng này được gọi là: *"Khi bạn chỉ có một cây búa, bạn sẽ nhìn mọi thứ xung quanh giống như chiếc đinh."*
- Lập trình viên cố gắng nhồi nhét thật nhiều pattern vào codebase để chứng tỏ trình độ, biến các chức năng đơn giản (ví dụ: chỉ cần gán một biến số) thành hàng chục interface và abstract class trừu tượng, phức tạp hóa hệ thống một cách vô ích.

> [!WARNING]
> Thiết kế code quá đà làm tăng độ phức tạp nhận thức (cognitive complexity), khiến người khác mất rất nhiều thời gian đọc hiểu và trực tiếp làm giảm tốc độ phát triển dự án.

### 2. 🩹 Vá víu cho những Khuyết điểm của Ngôn ngữ Lập trình
Nhiều học giả máy tính (điển hình là các lập trình viên ngôn ngữ LISP hoặc Functional Programming) cho rằng: Hầu hết các design patterns thực chất chỉ là các **biện pháp chắp vá cho sự thiếu hụt các tính năng hiện đại** của các ngôn ngữ hướng đối tượng thế hệ cũ (như C++ hay Java thuở sơ khai).
- Ví dụ: Trong C# hiện đại, cơ chế **Delegates** và **Actions/Events** đã tích hợp sẵn tính năng đăng ký/phát sự kiện cực kỳ gọn nhẹ. Việc vẽ ra cả sơ đồ Observer Pattern cổ điển với class `Subject`, `Observer` thủ công đôi khi là không cần thiết.
- Tương tự, **Strategy Pattern** cổ điển yêu cầu tạo các class riêng biệt cho thuật toán, trong khi các ngôn ngữ hiện đại có thể giải quyết nhanh bằng các hàm nặc danh (**Lambdas/Anonymous Functions**).

### 3. 🤖 Áp dụng máy móc, thiếu tùy biến (Blind Replication)
Nhiều lập trình viên coi Design Patterns như giáo lý bất di bất dịch trong sách vở. Họ cố gắng bê nguyên xi cấu trúc UML của cuốn sách GoF năm 1994 vào dự án game của mình mà không thèm quan tâm đến đặc thù hiệu năng và bối cảnh thực tế.

---

## 🎮 Trong Game Dev: Cơn ác mộng Singleton

Trong lập trình game, **Singleton** là minh chứng rõ nét nhất cho việc lạm dụng pattern gây hậu quả nghiêm trọng:
*   Vì Singleton quá dễ viết và dễ gọi (`GameManager.Instance.DoSomething()`), nhiều coder lười biếng biến gần như mọi class chính thành Singleton: `Player.Instance`, `LevelManager.Instance`, `UIManager.Instance`, `ScoreManager.Instance`...
*   **Hậu quả:** Tất cả các class này liên kết chéo chằng chịt với nhau. Việc thay đổi hay nâng cấp một class sẽ kéo theo cả dự án bị lỗi. Hệ thống mất đi tính module hóa, cực kỳ khó viết các bản kiểm thử tự động (Unit Tests) và không thể áp dụng tối ưu đa luồng (multi-threading) của CPU!

---

## 🗺️ Điều hướng

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Why should I learn patterns?](./03-why-should-i-learn-patterns.md) |
| → Tiếp theo | [Classification of Patterns](./05-classification-of-patterns.md) |

---

> 📝 **Nguồn gốc:** [Refactoring.Guru](https://refactoring.guru/) · Tác giả: Alexander Shvets · Minh họa: Dmitry Zhart
