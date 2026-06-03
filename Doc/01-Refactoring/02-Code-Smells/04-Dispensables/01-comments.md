# Comments (Bình luận quá mức)

> 📖 **Nguồn:** [Refactoring.Guru — Comments](https://refactoring.guru/smells/comments) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Comments** là một smell khi một method chứa đầy rẫy các dòng giải thích chi tiết code đang làm gì. Điều này thường xảy ra vì **bản thân code quá phức tạp, lộn xộn và khó hiểu**.

> 💬 **Bản chất vấn đề:** Comment giống như lớp trang điểm (make-up) cố gắng che giấu khuôn mặt đầy khuyết điểm của "dirty code". 
> *“Đừng comment cho code bẩn — hãy refactor nó.”*

## ❓ Nguyên nhân (Reasons for the Problem)

Lập trình viên thường viết comment với mục đích tốt là giúp người khác hiểu code. Tuy nhiên, họ lại quên rằng:
- Code thay đổi liên tục, nhưng comment thì hiếm khi được cập nhật. Comment lỗi thời sẽ trở thành những "lời nói dối" tai hại trong codebase.
- Việc phải dùng comment giải thích chứng tỏ cấu trúc code chưa tốt, đặt tên biến/hàm chưa rõ nghĩa.

## 💊 Cách điều trị (Treatment)

Nếu bạn cảm thấy cần phải viết comment để giải thích một đoạn code, hãy thử refactor trước:

1. **Extract Method**: Nếu comment dùng để giải thích một khối code làm gì, hãy tách khối code đó thành một method riêng và đặt tên theo **Mục đích** của khối code đó. Tên method tốt sẽ thay thế hoàn toàn cho comment.
2. **Rename Method / Rename Variable**: Nếu tên hàm hoặc biến quá mơ hồ, hãy đổi tên chúng thành những tên có ý nghĩa tự giải thích rõ ràng.
3. **Introduce Assertion**: Nếu comment giải thích về các điều kiện bắt buộc (pre-conditions), hãy thay thế nó bằng một câu lệnh Assert (khẳng định) trong code.

## ✅ Lợi ích (Payoff)

- **Self-documenting code (Code tự giải thích)**: Chỉ cần đọc tên hàm, tên biến là hiểu ngay mục đích mà không cần đọc comment.
- **Dễ bảo trì**: Không có nguy cơ comment bị lỗi thời so với code thực tế.
- **Code ngắn gọn, sạch sẽ hơn**: Giảm bớt số lượng dòng text thừa thãi trong file.

## 🎮 Trong Game Dev

### ❌ Ví dụ chưa refactor:
Dùng comment để giải thích các bước tính toán vật lý lộn xộn:
```csharp
void Update()
{
    // Bước 1: Tính toán khoảng cách tới mặt đất để xem player có chạm đất không
    RaycastHit hit;
    bool isGrounded = Physics.Raycast(transform.position, Vector3.down, out hit, 1.1f);

    // Bước 2: Nếu player đang chạm đất và người chơi bấm phím Space, thực hiện nhảy
    if (isGrounded && Input.GetKeyDown(KeyCode.Space))
    {
        // Thêm lực hướng lên trên để nhân vật nhảy
        rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
    }
}
```

### ✅ Giải pháp sau refactor:
Tách thành các method chuyên biệt với tên tự giải thích:
```csharp
void Update()
{
    if (IsTouchingGround() && UserPressedJumpButton())
    {
        PerformJump();
    }
}

private bool IsTouchingGround()
{
    return Physics.Raycast(transform.position, Vector3.down, 1.1f);
}

private bool UserPressedJumpButton()
{
    return Input.GetKeyDown(KeyCode.Space);
}

private void PerformJump()
{
    rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
}
```
Sau khi refactor, code trở nên cực kỳ rõ ràng, mạch lạc và tự giải thích mà không cần bất kỳ dòng comment nào!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Dispensables Overview](./00-dispensables-overview.md) |
| → Tiếp theo | [Duplicate Code](./02-duplicate-code.md) |
