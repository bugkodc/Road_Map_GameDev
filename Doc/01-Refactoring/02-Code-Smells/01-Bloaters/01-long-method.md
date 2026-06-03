# Long Method

> 📖 **Nguồn:** [Refactoring.Guru — Long Method](https://refactoring.guru/smells/long-method) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Method có **quá nhiều dòng code**. Nói chung, bất kỳ method nào dài hơn **10 dòng** đều nên khiến bạn suy nghĩ lại. Nếu bạn cảm thấy cần viết comment để giải thích một đoạn code trong method, có lẽ đoạn đó nên được tách thành method riêng.

Dấu hiệu nhận biết:
- Method dài hàng chục hoặc hàng trăm dòng
- Cần scroll nhiều lần để đọc hết method
- Có nhiều comment chia method thành các "phần"
- Khó hiểu method đang làm gì chỉ từ cái nhìn đầu tiên

## ❓ Nguyên nhân (Reasons for the Problem)

**Thêm code vào luôn dễ hơn bỏ code ra.** Đây là hiệu ứng "Hotel California" — code đi vào nhưng không bao giờ rời đi.

Nguyên nhân cụ thể:
- Dev có xu hướng **thêm feature** vào method có sẵn thay vì tạo method mới
- Không nhận ra method đang **vi phạm Single Responsibility Principle**
- Cảm thấy tạo method mới là "overhead" không cần thiết
- Copy-paste code vào method thay vì trích xuất thành method riêng
- Method bắt đầu nhỏ nhưng **lớn dần theo thời gian** qua nhiều lần sửa đổi

## 💊 Cách điều trị (Treatment)

Quy tắc vàng: **Nếu bạn cảm thấy cần comment để giải thích một đoạn code, hãy tách đoạn đó thành method riêng.**

Các kỹ thuật refactoring giúp giải quyết:

- **[Extract Method](../../03-Refactoring-Techniques/)** *(kỹ thuật chính)* — Tách một đoạn code thành method riêng với tên mô tả
- **[Replace Temp with Query](../../03-Refactoring-Techniques/)** — Thay biến tạm bằng lời gọi method
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Nhóm các tham số liên quan thành object
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Truyền toàn bộ object thay vì từng field riêng lẻ
- **[Decompose Conditional](../../03-Refactoring-Techniques/)** — Tách logic điều kiện phức tạp thành method riêng
- **[Replace Method with Method Object](../../03-Refactoring-Techniques/)** — Chuyển method thành class riêng khi có quá nhiều biến cục bộ

## ✅ Lợi ích (Payoff)

- 📖 **Code dễ đọc hơn** — Method ngắn với tên mô tả tốt hơn method dài với nhiều comment
- 🔧 **Dễ bảo trì** — Method nhỏ dễ sửa và ít bug hơn
- ♻️ **Tái sử dụng** — Method nhỏ có thể được gọi lại ở nhiều nơi
- 🧪 **Dễ test** — Method ngắn, đơn nhiệm dễ viết unit test
- 📝 **Tên method thay thế comment** — `CalculateDamage()` tự giải thích hơn `// Calculate damage`

> Trong tất cả các loại code hướng đối tượng, class có **method ngắn** sống lâu nhất. Method càng dài, càng khó hiểu và bảo trì.

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **`Update()` làm mọi thứ** — Một hàm Update() xử lý input, movement, animation, combat, UI trong cùng một method
- **Coroutine khổng lồ** — Một coroutine xử lý toàn bộ quest flow từ đầu đến cuối
- **Initialization method quá dài** — Hàm `Start()` hoặc `Initialize()` setup mọi thứ trong hàng trăm dòng

### Cải thiện:

```
❌ Trước:
void Update() {
    // Handle Input (20 dòng)
    // Handle Movement (30 dòng)
    // Handle Combat (40 dòng)
    // Handle Animation (15 dòng)
    // Handle UI Update (25 dòng)
}

✅ Sau:
void Update() {
    HandleInput();
    HandleMovement();
    HandleCombat();
    HandleAnimation();
    UpdateUI();
}
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: Bloaters](./00-bloaters-overview.md) | ➡️ [Tiếp: Large Class](./02-large-class.md)
