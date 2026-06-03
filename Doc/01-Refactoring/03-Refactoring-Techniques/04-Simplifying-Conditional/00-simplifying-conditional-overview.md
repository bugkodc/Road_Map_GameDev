# 🔀 Simplifying Conditional Expressions (Đơn giản hóa biểu thức điều kiện)

> 📖 **Nguồn:** [Refactoring.Guru — Simplifying Conditional Expressions](https://refactoring.guru/refactoring/techniques/simplifying-conditional-expressions) | Tác giả: Alexander Shvets

## Giới thiệu

Câu lệnh điều kiện (`if-else`, `switch-case`) là công cụ căn bản nhất để lập trình luồng rẽ nhánh của ứng dụng. Tuy nhiên, theo thời gian, các điều kiện có xu hướng trở nên lồng nhau phức tạp, dài dòng và cực kỳ khó hiểu, biến codebase thành "mớ spaghetti".

Nhóm kỹ thuật **Simplifying Conditional Expressions** cung cấp các phương pháp cấu trúc lại điều kiện để code trở nên rõ ràng, mạch lạc và trực diện hơn.

---

## 📋 Các kỹ thuật chính và Khi nào nên dùng

### 1. Decompose Conditional (Phân rã câu lệnh điều kiện)
- **Vấn đề:** Bạn có một câu lệnh điều kiện phức tạp chứa nhiều logic phức tạp (`if-then-else`).
- **Giải pháp:** Tách các điều kiện phức tạp và thân hàm `then/else` thành các phương thức nhỏ có tên rõ nghĩa.
- *Ví dụ:* Tách `if (date.after(SUMMER_START) && date.before(SUMMER_END))` thành `if (IsSummer(date))`.

### 2. Consolidate Conditional Expression (Hợp nhất biểu thức điều kiện)
- **Vấn đề:** Nhiều câu lệnh điều kiện trả về cùng một kết quả hoặc dẫn đến cùng một hành động.
- **Giải pháp:** Gộp chúng lại thành một biểu thức điều kiện duy nhất bằng các toán tử logic `&&` hoặc `||`, rồi tách thành một method riêng.

### 3. Replace Nested Conditional with Guard Clauses (Mệnh đề bảo vệ / Guard Clauses)
- **Vấn đề:** Bạn có các câu lệnh điều kiện lồng nhau nhiều cấp (`if` trong `if` trong `if`), tạo ra cấu trúc hình "mũi tên" thụt lề sâu hoắm, rất khó theo dõi logic.
- **Giải pháp:** Đảo ngược điều kiện, kiểm tra các trường hợp ngoại lệ trước và thoát khỏi hàm sớm (bằng `return` hoặc `break`). Logic chính của hàm sẽ nằm ở tầng ngoài cùng của hàm.

### 4. Replace Conditional with Polymorphism (Thay thế điều kiện bằng tính đa hình)
- **Vấn đề:** Bạn sử dụng `switch-case` hoặc chuỗi `if-else` dài để thực hiện các hành vi khác nhau dựa trên loại đối tượng (Type).
- **Giải pháp:** Tạo các subclass kế thừa và di chuyển logic đặc thù vào phương thức ghi đè (override) của từng subclass.

### 5. Introduce Null Object (Đối tượng Null)
- **Vấn đề:** Bạn phải liên tục kiểm tra `if (obj != null)` trước khi thực hiện hành động trên đối tượng.
- **Giải pháp:** Tạo một class đặc biệt kế thừa từ class gốc đại diện cho trạng thái "không có gì" (Null) và định nghĩa các hành vi mặc định an toàn cho nó.

---

## 🎮 Trong Game Dev

Mệnh đề bảo vệ (**Guard Clauses**) và Đa hình (**Polymorphism**) là hai vũ khí cực kỳ lợi hại trong lập trình game:

- **Replace Nested Conditional with Guard Clauses (Guard Clauses)**:
  - ❌ *Ví dụ chưa tốt:*
    ```csharp
    void PlayerAttack(Enemy target)
    {
        if (target != null)
        {
            if (player.IsAlive)
            {
                if (player.HasEnoughEnergy())
                {
                    // Thực hiện tấn công
                    player.PerformSlash(target);
                }
            }
        }
    }
    ```
  - ✅ *Giải pháp tốt (Dùng Guard Clauses):*
    ```csharp
    void PlayerAttack(Enemy target)
    {
        if (target == null) return;
        if (!player.IsAlive) return;
        if (!player.HasEnoughEnergy()) return;

        // Logic chính nằm phẳng ở ngoài cùng, cực kỳ dễ đọc!
        player.PerformSlash(target);
    }
    ```

- **Replace Conditional with Polymorphism**:
  - Tránh việc viết `switch(weaponType)` khổng lồ trong hàm tấn công. Hãy cho class `Weapon` là abstract, và các class `Sword`, `Gun`, `Spell` tự override hàm `Fire()` của mình.

---

## 🔗 Liên kết

- ⬆️ [Refactoring Techniques — Tổng quan](../00-techniques-overview.md)
- ⬅️ [Organizing Data](../03-Organizing-Data/00-organizing-data-overview.md)
- ➡️ [Simplifying Method Calls](../05-Simplifying-Method-Calls/00-simplifying-method-calls-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
