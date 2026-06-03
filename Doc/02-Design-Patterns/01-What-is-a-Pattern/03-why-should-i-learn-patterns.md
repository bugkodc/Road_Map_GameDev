# Why should I learn patterns? (Tại sao nên học mẫu thiết kế?)

> **Nguồn gốc:** Tổng hợp và tham khảo từ [Refactoring.Guru — Why should I learn patterns?](https://refactoring.guru/design-patterns/why-learn-patterns)
> Tác giả: **Alexander Shvets** · Minh họa: **Dmitry Zhart**
> Đây là tài liệu tóm tắt cho mục đích học tập, mọi quyền thuộc về tác giả gốc.

## 🤔 Bạn có thể lập trình mà không cần biết Pattern?

Câu trả lời ngắn gọn là: **Có thể.** Thực tế, rất nhiều lập trình viên đã làm việc nhiều năm và viết ra những sản phẩm chạy tốt mà không hề biết tên của một Design Pattern nào. Họ tự tìm tòi, thiết kế cấu trúc code theo bản năng và vô tình tự "phát minh" lại các pattern của GoF một cách vô thức.

Tuy nhiên, việc học Design Patterns có hệ thống mang lại cho bạn những bước nhảy vọt vượt bậc về mặt tư duy kiến trúc phần mềm.

---

## 🌟 3 Lợi ích Lớn nhất khi học Design Patterns

### 1. 🛠️ Sử dụng các Giải pháp đã được kiểm chứng (Proven Solutions)
Thay vì mất hàng tuần để loay hoay thiết kế cấu trúc cho một hệ thống AI quái vật hay hệ thống vật phẩm (inventory) phức tạp và dễ để lại lỗi thiết kế (design bugs), bạn có thể áp dụng ngay các mẫu thiết kế sẵn có. Chúng là các giải pháp đã được hàng triệu lập trình viên kiểm chứng, thử nghiệm và tối ưu hóa qua hàng thập kỷ. 
> *Học Design Patterns giúp bạn tránh được việc tốn thời gian "phát minh lại chiếc bánh xe".*

### 2. 🗣️ Ngôn ngữ giao tiếp chung trong Team (Common Vocabulary)
Đây là lợi ích cực kỳ to lớn trong môi trường làm việc nhóm:
- **❌ Khi chưa biết Pattern:** Bạn phải giải thích dài dòng với đồng nghiệp: *"Tôi định tạo một class quản lý âm thanh, class này chỉ có 1 thực thể duy nhất thôi, và từ bất kỳ script nào khác cũng có thể gọi trực tiếp nó mà không cần kéo thả tham chiếu trong Editor..."*
- **✅ Khi đã biết Pattern:** Bạn chỉ cần nói: *"Hệ thống AudioManager tôi viết theo kiểu **Singleton**."* Đồng nghiệp của bạn sẽ hiểu ngay lập tức cấu trúc và ý định của bạn trong vòng 1 giây!

### 3. 📐 Hướng tới Thiết kế code Chuyên nghiệp (SOLID Principles)
Design Patterns là những ví dụ trực quan và sinh động nhất về cách áp dụng **5 Nguyên lý SOLID** trong thiết kế hướng đối tượng. Học chúng giúp bạn hiểu sâu sắc cách:
- Chia nhỏ trách nhiệm của các class (Single Responsibility).
- Mở rộng tính năng mà không cần sửa đổi code nguồn cũ (Open/Closed Principle).
- Lập trình dựa trên các Interface thay vì các Concrete Class cụ thể (Dependency Inversion).

---

## 🎮 Trong Game Dev

Đối với Game Developer, việc nắm vững Design Patterns quyết định trực tiếp đến **khả năng mở rộng dự án**:

- **Prototype nhanh nhưng bền vững:** Giúp bạn biến các bản code thử nghiệm (prototype) hỗn loạn thành những cấu trúc vững chắc để phát triển thành phiên bản thương mại chính thức (production-ready).
- **Tối ưu hóa tài nguyên:** Giúp giải quyết các vấn đề sụt giảm FPS (lag) thông qua các pattern quản lý bộ nhớ thông minh như **Flyweight** (chia sẻ dữ liệu) hoặc **Object Pool** (tái sử dụng object thay vì liên tục gọi `Instantiate` và `Destroy` làm quá tải bộ dọn rác Garbage Collector).

---

## 🗺️ Điều hướng

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [History of Patterns](./02-history-of-patterns.md) |
| → Tiếp theo | [Criticism of Patterns](./04-criticism-of-patterns.md) |

---

> 📝 **Nguồn gốc:** [Refactoring.Guru](https://refactoring.guru/) · Tác giả: Alexander Shvets · Minh họa: Dmitry Zhart
