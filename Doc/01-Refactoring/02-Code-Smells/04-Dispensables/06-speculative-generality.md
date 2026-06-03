# Speculative Generality (Khái quát hóa suy đoán)

> 📖 **Nguồn:** [Refactoring.Guru — Speculative Generality](https://refactoring.guru/refactoring/smells/dispensables) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Speculative Generality** (Khái quát hóa suy đoán) xảy ra khi bạn thiết kế một hệ thống quá trừu tượng, tạo ra các interface, class cha rỗng, hoặc các tham số phức tạp **chỉ vì suy đoán rằng "tương lai chúng ta sẽ cần đến nó"**.

*Dấu hiệu nhận biết:*
- Có những interface trừu tượng nhưng chỉ có duy nhất **một** class con thực thi nó.
- Các class cha được tạo ra với kỳ vọng sẽ có nhiều subclass kế thừa, nhưng hiện tại chỉ có một subclass duy nhất.
- Hàm có các tham số truyền vào nhưng bên trong body không hề động chạm đến tham số đó.

> [!WARNING]
> Đây là biểu hiện kinh điển của lỗi **Over-engineering** (thiết kế quá đà) và vi phạm trực tiếp nguyên lý **YAGNI — You Aren't Gonna Need It** (Bạn sẽ không cần đến nó đâu).

## ❓ Nguyên nhân (Reasons for the Problem)

Lập trình viên thường muốn viết code thật "hoàn hảo" và "linh hoạt" nên cố gắng đón đầu mọi yêu cầu thay đổi có thể xảy ra trong tương lai. Tuy nhiên, 90% các tính năng suy đoán kiểu này không bao giờ được sử dụng, trong khi hệ thống đã trở nên vô cùng cồng kềnh và khó hiểu.

## 💊 Cách điều trị (Treatment)

Chúng ta cần kéo codebase về lại thực tại:

1. **Collapse Hierarchy**: Nếu một class cha trừu tượng không có mục đích sử dụng thực tế nào khác ngoài việc cho một subclass duy nhất kế thừa, hãy gộp chúng lại làm một.
2. **Inline Interface / Inline Class**: Nếu một interface hay class wrapper được vẽ ra không cần thiết, hãy tích hợp nó trực tiếp vào class thực thi.
3. **Remove Parameter**: Xóa bỏ các tham số không sử dụng trong method signature.

## ✅ Lợi ích (Payoff)

- **Kiến trúc hệ thống đơn giản**: Giảm bớt các layer trừu tượng hóa không cần thiết, giúp luồng code trực diện và dễ theo dõi.
- **Tiết kiệm thời gian bảo trì**: Không tốn công sức bảo trì và viết test cho các class/interface "vô dụng".
- **Dễ đọc hiểu**: Người mới đọc vào sẽ biết chính xác class nào làm việc gì thay vì bị lạc trong ma trận các interface trừu tượng.

## 🎮 Trong Game Dev

Trong game dev, việc prototype nhanh và kiểm chứng gameplay là quan trọng nhất. Speculative Generality là một rào cản cực lớn cho quá trình này:

### ❌ Ví dụ chưa refactor:
Bạn đang làm một game platformer đơn giản và chỉ có một loại Weapon duy nhất là Súng Lục (`Pistol`). Nhưng bạn đã vội vàng thiết kế hệ thống như sau:
```csharp
public interface IWeapon
{
    void Attack();
}

public abstract class RangedWeapon : IWeapon
{
    public abstract void Attack();
}

public class Pistol : RangedWeapon
{
    public override void Attack() { /* Bắn đạn */ }
}
```
**Vấn đề:** Hiện tại và cả trong bản kế hoạch 6 tháng tới, game của bạn **chỉ có duy nhất** khẩu súng lục `Pistol`. Việc vẽ ra cả interface `IWeapon` và abstract class `RangedWeapon` chỉ làm cho việc cấu hình GameObject trong Unity Editor trở nên phức tạp hơn (phải cast kiểu, khó reference trực tiếp trong Inspector).

### ✅ Giải pháp sau refactor:
Áp dụng **Collapse Hierarchy** và **Inline Interface**, chỉ giữ lại những gì thực sự cần thiết lúc này:
```csharp
public class Pistol : MonoBehaviour
{
    public void Shoot() { /* Bắn đạn */ }
}
```
**Tại sao điều này tốt?**
- Code cực kỳ đơn giản và trực diện.
- Dễ dàng kéo thả tham chiếu trực tiếp class `Pistol` trong Inspector của Unity.
- Khi nào game thực sự cần thêm loại vũ khí thứ hai (ví dụ: Kiếm), lúc đó ta mới thực hiện refactor tạo interface. Đừng làm điều đó từ ngày đầu tiên!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Dead Code](./05-dead-code.md) |
| 🦨 Trở về | [Danh sách Code Smells](../00-code-smells-overview.md) |
