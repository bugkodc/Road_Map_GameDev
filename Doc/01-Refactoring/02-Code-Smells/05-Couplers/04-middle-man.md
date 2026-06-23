# Middle Man (Kẻ môi giới / Người trung gian)

> 📖 **Nguồn:** [Refactoring.Guru — Middle Man](https://refactoring.guru/refactoring/smells/couplers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Middle Man** xảy ra khi một class trong codebase của bạn không thực hiện bất kỳ công việc thực tế nào ngoài việc **chuyển tiếp (delegate) tất cả các yêu cầu** của client sang một class khác.

*Dấu hiệu nhận biết:*
- Gần như tất cả các phương thức trong class đều có dạng:
```csharp
public void DoSomething() 
{
    otherObject.DoSomething(); 
}
```

> ⚠️ **Sự cân bằng tinh tế:** Middle Man là thái cực ngược lại của **Message Chains**. 
> - Nếu bạn lạm dụng kỹ thuật *Hide Delegate* để che giấu *Message Chains*, bạn sẽ biến class trung gian thành một *Middle Man* vô dụng.
> - Nhiệm vụ của bạn là tìm điểm cân bằng: Class trung gian phải thực sự đóng góp giá trị/logic thay vì chỉ làm "bưu tá" chuyển thư.

## ❓ Nguyên nhân (Reasons for the Problem)

- **Hệ quả của việc Refactoring quá tay**: Khi bạn cố gắng áp dụng nguyên lý đóng gói quá mức và tạo ra quá nhiều hàm ủy thác.
- **Tàn dư của các Pattern cũ**: Hệ thống thiết kế theo kiểu Proxy Pattern hay Facade Pattern nhưng theo thời gian các logic bị lược bỏ hết, chỉ còn lại vỏ bọc rỗng.

## 💊 Cách điều trị (Treatment)

Giải pháp rất đơn giản và trực diện:

1. **Remove Middle Man**: Cho phép client bỏ qua class trung gian này và gọi trực tiếp các phương thức của class thực tế bên dưới.
2. **Replace Delegation with Inheritance**: Nếu thấy phù hợp, bạn có thể biến class trung gian thành class con (subclass) của class thực thi để nó kế thừa trực tiếp các phương thức đó mà không cần viết hàm chuyển tiếp thủ công nữa.

## ✅ Lợi ích (Payoff)

- **Kiến trúc tinh gọn**: Loại bỏ các class "ký sinh" không mang lại giá trị thực tế.
- **Code ngắn gọn hơn**: Giảm bớt số lượng hàm wrapper thừa thãi trong codebase.

## 🎮 Trong Game Dev

Hãy cẩn thận với các class quản lý dạng Wrapper rỗng:

### ❌ Ví dụ chưa refactor:
Class `PlayerManager` được tạo ra nhưng không làm gì ngoài việc chuyển tiếp cuộc gọi đến component `PlayerController`:
```csharp
public class PlayerManager : MonoBehaviour
{
    private PlayerController playerController;

    // Các hàm chuyển tiếp hoàn toàn vô dụng!
    public void MovePlayer(Vector3 direction)
    {
        playerController.Move(direction);
    }

    public void MakePlayerJump()
    {
        playerController.Jump();
    }
}
```
**Vấn đề:** `PlayerManager` không thực hiện thêm bất kỳ logic quản lý hay tính toán nào. Nó là một `Middle Man` hoàn hảo. Việc client phải gọi qua `PlayerManager` chỉ làm tăng số dòng code và làm chậm luồng suy nghĩ.

### ✅ Giải pháp sau refactor:
Áp dụng **Remove Middle Man**, cho phép client lấy reference trực tiếp đến `PlayerController` và ra lệnh:
```csharp
// Trong Client (ví dụ InputHandler):
public class InputHandler : MonoBehaviour
{
    private PlayerController player; // Gọi trực tiếp!

    void Update()
    {
        Vector3 moveInput = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        player.Move(moveInput);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            player.Jump();
        }
    }
}
```
Chúng ta xóa hoàn toàn các hàm wrapper rỗng trong `PlayerManager` hoặc xóa bỏ hẳn class `PlayerManager` nếu nó không còn nhiệm vụ nào khác!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Message Chains](./03-message-chains.md) |
| → Tiếp theo | [Incomplete Library Class](./05-incomplete-library-class.md) |
