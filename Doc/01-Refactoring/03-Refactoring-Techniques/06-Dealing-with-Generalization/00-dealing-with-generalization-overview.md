# 🏗️ Dealing with Generalization (Xử lý khái quát hóa / Kế thừa)

> 📖 **Nguồn:** [Refactoring.Guru — Dealing with Generalization](https://refactoring.guru/refactoring/techniques/dealing-with-generalization) | Tác giả: Alexander Shvets

## Giới thiệu

Tính kế thừa (Inheritance) là một trong những cột trụ mạnh mẽ nhất của lập trình hướng đối tượng. Tuy nhiên, nó cũng là thứ dễ bị lạm dụng nhất. Các sơ đồ kế thừa bị thiết kế sai cách sẽ biến codebase thành một cái bẫy cứng nhắc, cực kỳ khó thay đổi và mở rộng.

Nhóm kỹ thuật **Dealing with Generalization** tập trung vào việc tổ chức lại cây kế thừa, đẩy các thuộc tính và hành vi lên trên hoặc xuống dưới, trích xuất interface, và quan trọng nhất là chuyển đổi từ Kế thừa sang Ủy quyền (**Composition over Inheritance**) khi cần thiết.

---

## 📋 Các kỹ thuật chính và Khi nào nên dùng

### 1. Pull Up Field / Pull Up Method
- **Vấn đề:** Nhiều class con (subclasses) có chung thuộc tính hoặc phương thức giống hệt nhau.
- **Giải pháp:** Đẩy thuộc tính hoặc phương thức chung đó lên class cha (superclass) để loại bỏ trùng lặp code.

### 2. Push Down Field / Push Down Method
- **Vấn đề:** Một thuộc tính hoặc phương thức ở class cha chỉ được sử dụng bởi **một vài** class con cụ thể, class con khác hoàn toàn không dùng (vi phạm Interface Segregation).
- **Giải pháp:** Đẩy thuộc tính hoặc phương thức đó xuống các class con thực sự sử dụng nó.

### 3. Extract Interface
- **Vấn đề:** Nhiều class không có quan hệ kế thừa nhưng cùng chia sẻ chung một số hành vi (ví dụ: cùng có thể bị tấn công, có thể lưu trữ).
- **Giải pháp:** Trích xuất các hành vi đó thành một Interface chung và cho các class thực thi nó.

### 4. Collapse Hierarchy (Gộp sơ đồ phân cấp)
- **Vấn đề:** Cây kế thừa quá phức tạp, class cha và class con gần như không có sự khác biệt về dữ liệu hay hành vi thực tế.
- **Giải pháp:** Gộp class cha và class con thành một class duy nhất để đơn giản hóa hệ thống.

### 5. Replace Inheritance with Delegation (Thay thế kế thừa bằng ủy quyền)
- **Vấn đề:** Class con kế thừa class cha chỉ để tái sử dụng code, nhưng thực tế class con không phải là một "phân loại" của class cha (vi phạm nguyên lý Liskov Substitution Principle - LSP).
- **Giải pháp:** Biến class cha thành một thuộc tính (field) của class con và ủy quyền thực thi thay vì kế thừa trực tiếp.

---

## 🎮 Trong Game Dev

Kế thừa và Đóng gói (Composition) là cuộc tranh luận kinh điển trong phát triển game. Game dev hiện đại (như Unity ECS hay Unreal Components) cực kỳ ưa chuộng **Composition over Inheritance**:

- **Extract Interface**:
  - ❌ *Ví dụ chưa tốt:* Tạo class `DestructibleObject` kế thừa từ `Actor`. Nhưng bạn cũng muốn có `Player` và `Enemy` có thể bị phá hủy/tấn công. Không thể cho tất cả cùng kế thừa từ `DestructibleObject` vì đa kế thừa không được hỗ trợ trong C#.
  - ✅ *Giải pháp tốt:* Trích xuất interface `IDamageable`. Lúc này cả `Player`, `Enemy`, và `ExplosiveBarrel` (Thùng thuốc nổ) đều có thể implement interface `IDamageable` và tự định nghĩa cách nhận sát thương của mình.

- **Replace Inheritance with Delegation (Composition)**:
  - ❌ *Ví dụ chưa tốt:* Tạo class `FlyingPlayer` kế thừa từ `PlayerController` chỉ để lấy logic di chuyển của Player và thêm cánh bay.
  - ✅ *Giải pháp tốt:* Tạo một component `MovementBehaviour` riêng biệt. Player sẽ chứa component này. Khi muốn bay, ta chỉ cần thay đổi/gán component `FlyingMovement` cho Player.

---

## 🔗 Liên kết

- ⬆️ [Refactoring Techniques — Tổng quan](../00-techniques-overview.md)
- ⬅️ [Simplifying Method Calls](../05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md)
- 🦨 [Trở về: Danh sách Code Smells](../../02-Code-Smells/00-code-smells-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
