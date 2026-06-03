# Inappropriate Intimacy (Thân mật thái quá)

> 📖 **Nguồn:** [Refactoring.Guru — Inappropriate Intimacy](https://refactoring.guru/refactoring/smells/couplers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Inappropriate Intimacy** xảy ra khi hai class **biết quá nhiều về các chi tiết nội bộ** của nhau. Class này can thiệp trực tiếp vào các thuộc tính, phương thức lẽ ra phải là riêng tư (private/protected) của class kia.

*Dấu hiệu nhận biết:*
- Một class liên tục truy cập trực tiếp vào các trường dữ liệu non-public của class khác.
- Hai class phụ thuộc chéo lẫn nhau chặt chẽ đến mức thay đổi bất kỳ biến nào ở class này cũng làm crash logic của class kia.

> [!CAUTION]
> Các class tốt nên giữ khoảng cách và chỉ giao tiếp qua các kênh public chính thống. "Thân mật thái quá" trực tiếp vi phạm nguyên tắc **Information Hiding (Che giấu thông tin)** trong OOP.

## ❓ Nguyên nhân (Reasons for the Problem)

- Do thiết kế hệ thống thiếu tính module hóa từ đầu.
- Class con (subclass) truy cập quá sâu vào các chi tiết triển khai cụ thể của class cha (superclass), thay vì chỉ sử dụng các API được định nghĩa sẵn.

## 💊 Cách điều trị (Treatment)

Để thiết lập lại ranh giới lành mạnh giữa các class, chúng ta dùng các kỹ thuật:

1. **Move Method** và **Move Field**: Chuyển các thuộc tính hoặc phương thức bị can thiệp nhiều về đúng class đang truy cập nó để gom nhóm logic lại.
2. **Extract Class**: Tách các phần chi tiết dùng chung ra một class trung gian mới nhằm giảm coupling trực tiếp giữa hai class ban đầu.
3. **Hide Delegate**: Thay vì cho phép class ngoài truy cập trực tiếp đối tượng con của mình, hãy cung cấp một phương thức wrapper để che giấu nó đi.
4. **Replace Inheritance with Delegation**: Nếu sự thân mật quá mức xảy ra giữa class cha và con, hãy chuyển quan hệ kế thừa sang quan hệ bao hàm (composition).

## ✅ Lợi ích (Payoff)

- **Các lớp độc lập**: Dễ dàng thay đổi cấu trúc dữ liệu của một class mà không lo ngại làm ảnh hưởng đến các class khác trong game.
- **Tái sử dụng code tốt hơn**: Bạn có thể mang class `Player` sang một dự án game khác mà không bắt buộc phải kéo theo cả class `Enemy` hay `SaveSystem` đi cùng.

## 🎮 Trong Game Dev

Trong lập trình game, smell này thường xuất hiện giữa hệ thống điều khiển nhân vật và hệ thống UI/Vật lý:

### ❌ Ví dụ chưa refactor:
Class `Player` chứa các chi tiết vật lý riêng tư và class `EnemyAI` nhảy vào đọc và chỉnh sửa trực tiếp các thông số đó:
```csharp
public class Player : MonoBehaviour
{
    // Để public vô tội vạ các chi tiết vật lý nội bộ
    public Rigidbody rb;
    public Vector3 internalVelocity; 
    public float privateSpeedModifier;
}

public class EnemyAI : MonoBehaviour
{
    public void RepelPlayer(Player player)
    {
        // EnemyAI tự tiện nhảy vào can thiệp sâu vào Rigidbody và biến vận tốc của Player!
        player.rb.velocity = Vector3.zero;
        player.internalVelocity = Vector3.back * 10f;
        player.privateSpeedModifier = 0.5f; // Làm chậm player
    }
}
```
**Vấn đề:** `EnemyAI` đang can thiệp quá sâu vào cách `Player` di chuyển vật lý. Nếu sau này bạn đổi Rigidbody của `Player` sang `CharacterController` (không dùng biến `velocity` trực tiếp của Rigidbody nữa), class `EnemyAI` sẽ lập tức bị lỗi biên dịch và không hoạt động.

### ✅ Giải pháp sau refactor:
Che giấu chi tiết vật lý của `Player` và cung cấp API chính thức để bên ngoài tương tác:
```csharp
public class Player : MonoBehaviour
{
    private Rigidbody rb;
    private Vector3 internalVelocity;
    private float speedModifier = 1f;

    // Cung cấp API chính thức, đóng gói chi tiết vật lý
    public void ApplyKnockback(Vector3 direction, float force, float slowFactor)
    {
        rb.velocity = Vector3.zero;
        internalVelocity = direction * force;
        speedModifier = slowFactor;
    }
}

public class EnemyAI : MonoBehaviour
{
    public void RepelPlayer(Player player)
    {
        // EnemyAI chỉ ra lệnh cho Player tự thực hiện knockback
        player.ApplyKnockback(Vector3.back, 10f, 0.5f);
    }
}
```
Giờ đây, dù `Player` có thay đổi cách triển khai knockback bên trong như thế nào, `EnemyAI` vẫn hoạt động hoàn hảo mà không cần chỉnh sửa bất kỳ dòng code nào!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Feature Envy](./01-feature-envy.md) |
| → Tiếp theo | [Message Chains](./03-message-chains.md) |
