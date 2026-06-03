# Parallel Inheritance Hierarchies (Phân cấp kế thừa song song)

> 📖 **Nguồn:** [Refactoring.Guru — Parallel Inheritance Hierarchies](https://refactoring.guru/refactoring/smells/change-preventers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Parallel Inheritance Hierarchies** thực chất là một trường hợp đặc biệt của *Shotgun Surgery*. Nó xảy ra khi bạn nhận thấy: Mỗi khi bạn tạo ra một **subclass mới cho class A**, bạn cũng bắt buộc phải tạo thêm một **subclass tương ứng cho class B**.

*Ví dụ:* Nếu bạn tạo class `MageEnemy` kế thừa từ `Enemy`, bạn cũng bắt buộc phải tạo class `MageAI` kế thừa từ `EnemyAI` và class `MageAnimation` kế thừa từ `EnemyAnimation`.

## ❓ Nguyên nhân (Reasons for the Problem)

Smell này xuất hiện do việc thiết kế kiến trúc phân lớp bị lỗi:
- Các trách nhiệm của hai sơ đồ kế thừa đáng lẽ nên thuộc về cùng một sơ đồ duy nhất.
- Lạm dụng tính kế thừa (Inheritance) thay vì sử dụng tính bao hàm/thành phần (Composition) để chia sẻ hành vi giữa các đối tượng.

## 💊 Cách điều trị (Treatment)

Để phá vỡ sự ràng buộc song song này, chúng ta cần chuyển đổi mô hình từ Kế thừa sang Ủy quyền/Bao hàm (**Composition over Inheritance**):

1. **Move Method** và **Move Field**: Di chuyển các thuộc tính và hành vi từ subclass của phân cấp này sang subclass của phân cấp kia để gộp chúng lại.
2. **Replace Inheritance with Delegation (Thay thế kế thừa bằng ủy quyền)**: Biến class phụ thuộc thành một thuộc tính (property/field) của class chính. Thay vì tạo cả một cây kế thừa song song, class chính chỉ cần chứa một instance của interface/class chiến lược. (Xem thêm: **Strategy Pattern**).

## ✅ Lợi ích (Payoff)

- **Giảm số lượng class**: Cắt giảm một nửa số lượng class thừa trong dự án.
- **Tăng độ linh hoạt (Flexibility)**: Bạn có thể thay đổi hành vi (ví dụ: đổi AI của Enemy) ngay trong runtime bằng cách gán một instance AI khác, thay vì bị đóng băng bởi class kế thừa cứng nhắc.
- **Tránh trùng lặp cấu trúc**: Việc mở rộng game trở nên đơn giản hơn vì bạn chỉ cần tạo 1 subclass mới thay vì phải tạo cả bộ 3-4 subclass đi kèm.

## 🎮 Trong Game Dev

Trong lập trình game, Parallel Inheritance Hierarchies là cái bẫy kế thừa điển hình:

### ❌ Ví dụ chưa refactor:
Bạn thiết kế hệ thống Enemy và AI của chúng như sau:
```
           [Enemy]                             [EnemyAI]
          /   |   \                           /   |   \
[Warrior]  [Mage]  [Archer]         [WarriorAI] [MageAI] [ArcherAI]
```
Nếu bạn muốn tạo thêm class `AssassinEnemy`, bạn bắt buộc phải tạo thêm cả `AssassinAI`. Hai cây kế thừa này luôn luôn chạy song song và phụ thuộc lẫn nhau một cách cứng nhắc.

### ✅ Giải pháp sau refactor:
Áp dụng **Strategy Pattern** hoặc **Composition**:
- Xóa bỏ toàn bộ cây kế thừa `EnemyAI`. Thay vào đó, tạo một interface `IAIBehaviour` hoặc class `AIController` độc lập.
- Class `Enemy` sẽ chứa một tham chiếu đến `IAIBehaviour` như một component (như cách Unity làm với các Component).
```csharp
public class Enemy : MonoBehaviour
{
    private IAIBehaviour aiBehaviour; // Component đảm nhận AI

    public void SetAI(IAIBehaviour newAI)
    {
        aiBehaviour = newAI;
    }

    void Update()
    {
        aiBehaviour?.ExecuteAI(this);
    }
}
```
Lúc này, khi bạn tạo `MageEnemy` hay `AssassinEnemy`, bạn chỉ cần tạo các class thực thi `IAIBehaviour` tương ứng (`MageAI`, `AssassinAI`) và gắn (inject) chúng vào Enemy. Bạn hoàn toàn không cần tạo các subclass `Enemy` mới nếu không có sự khác biệt lớn về cấu trúc vật lý hay dữ liệu cơ bản! Thậm chí, bạn có thể cho một `WarriorEnemy` chuyển sang dùng `MageAI` trong game một cách dễ dàng chỉ bằng một dòng code gán lại.

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Shotgun Surgery](./02-shotgun-surgery.md) |
| 🦨 Trở về | [Danh sách Code Smells](../00-code-smells-overview.md) |
