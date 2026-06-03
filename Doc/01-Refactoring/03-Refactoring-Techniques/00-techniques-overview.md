# 🛠️ Refactoring Techniques (Kỹ thuật Refactoring)

> 📖 **Nguồn:** [Refactoring.Guru — Refactoring Techniques](https://refactoring.guru/refactoring/techniques) | Tác giả: Alexander Shvets

## Giới thiệu

Danh mục **66 kỹ thuật refactoring**, chia thành **6 nhóm chính**. Mỗi kỹ thuật giải quyết một loại vấn đề cụ thể trong code, giúp cải thiện cấu trúc, khả năng đọc hiểu và bảo trì.

Các kỹ thuật này là "công cụ" thực tế mà bạn áp dụng khi phát hiện [Code Smells](../02-code-smells.md). Việc nắm vững chúng giúp bạn tự tin refactor code mà không lo phá vỡ chức năng.

---

## 📋 Danh sách 6 nhóm kỹ thuật

### 1. 📝 [Composing Methods](./01-Composing-Methods/00-composing-methods-overview.md) — Tổ chức lại phương thức
> **9 kỹ thuật** — Phần lớn refactoring liên quan đến tổ chức lại method. Method dài là nguồn gốc của nhiều vấn đề.

Bao gồm: Extract Method, Inline Method, Extract Variable, Inline Temp, Replace Temp with Query, Split Temporary Variable, Remove Assignments to Parameters, Replace Method with Method Object, Substitute Algorithm.

### 2. 🚚 [Moving Features between Objects](./02-Moving-Features/00-moving-features-overview.md) — Di chuyển tính năng giữa các đối tượng
> **8 kỹ thuật** — Giúp phân phối trách nhiệm hợp lý giữa các class theo nguyên tắc Single Responsibility.

Bao gồm: Move Method, Move Field, Extract Class, Inline Class, Hide Delegate, Remove Middle Man, Introduce Foreign Method, Introduce Local Extension.

### 3. 📊 [Organizing Data](./03-Organizing-Data/00-organizing-data-overview.md) — Tổ chức dữ liệu
> **15 kỹ thuật** — Cải thiện cách quản lý, đóng gói và truy cập dữ liệu trong class.

Bao gồm: Self Encapsulate Field, Replace Data Value with Object, Change Value to Reference, Change Reference to Value, Replace Array with Object, Duplicate Observed Data, và nhiều kỹ thuật khác.

### 4. 🔀 [Simplifying Conditional Expressions](./04-Simplifying-Conditional/00-simplifying-conditional-overview.md) — Đơn giản hóa biểu thức điều kiện
> **8 kỹ thuật** — Logic điều kiện phức tạp là nguồn gốc của nhiều bug và khó khăn khi bảo trì.

Bao gồm: Decompose Conditional, Consolidate Conditional Expression, Replace Nested Conditional with Guard Clauses, Replace Conditional with Polymorphism, và nhiều hơn.

### 5. 📞 [Simplifying Method Calls](./05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md) — Đơn giản hóa lời gọi phương thức
> **14 kỹ thuật** — Giúp method call dễ đọc, dễ hiểu, interface rõ ràng hơn.

Bao gồm: Rename Method, Add/Remove Parameter, Separate Query from Modifier, Introduce Parameter Object, Replace Constructor with Factory Method, và nhiều hơn.

### 6. 🏗️ [Dealing with Generalization](./06-Dealing-with-Generalization/00-dealing-with-generalization-overview.md) — Xử lý tổng quát hóa
> **12 kỹ thuật** — Tổ chức lại cấu trúc kế thừa (inheritance hierarchy) hợp lý.

Bao gồm: Pull Up Field/Method, Push Down Field/Method, Extract Subclass/Superclass/Interface, Replace Inheritance with Delegation, và nhiều hơn.

---

## 📊 Bảng tổng hợp

| # | Nhóm | Số kỹ thuật | Mục đích chính | Áp dụng khi |
|---|------|-------------|----------------|-------------|
| 1 | 📝 Composing Methods | 9 | Tổ chức lại method | Method dài, khó đọc |
| 2 | 🚚 Moving Features | 8 | Phân phối trách nhiệm | Class quá lớn, Feature Envy |
| 3 | 📊 Organizing Data | 15 | Quản lý dữ liệu | Data clumps, magic numbers |
| 4 | 🔀 Simplifying Conditional | 8 | Đơn giản hóa logic | If/else lồng nhau, switch phức tạp |
| 5 | 📞 Simplifying Method Calls | 14 | Cải thiện API/interface | Long parameter list, tên method tối nghĩa |
| 6 | 🏗️ Dealing with Generalization | 12 | Tổ chức kế thừa | Inheritance hierarchy rối |
| | **Tổng cộng** | **66** | — | — |

---

## 🎮 Trong Game Dev

Refactoring techniques đặc biệt quan trọng trong game development vì:

- **Code game thay đổi liên tục**: Gameplay được iterate nhiều lần → cần refactor thường xuyên
- **Nhiều hệ thống tương tác**: Input, Physics, AI, Rendering, Audio → cần tổ chức rõ ràng
- **Performance-critical**: Code sạch dễ profile và optimize hơn
- **Team collaboration**: Game thường được phát triển bởi nhiều người

### Các kỹ thuật thường dùng nhất trong Game Dev:
1. **Extract Method** — Tách `Update()` thành các method nhỏ
2. **Extract Class** — Tách `PlayerController` thành nhiều component
3. **Replace Conditional with Polymorphism** — Thay `switch(state)` bằng State Pattern
4. **Replace Magic Number** — Dùng constants cho game balance values
5. **Replace Inheritance with Delegation** — Component-based architecture (Unity style)

---

## 🔗 Liên kết

- ⬆️ [Refactoring — Tổng quan](../00-refactoring-overview.md)
- ⬅️ [Code Smells](../02-code-smells.md)
- ➡️ [Composing Methods](./01-Composing-Methods/00-composing-methods-overview.md) (bắt đầu từ nhóm đầu tiên)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
