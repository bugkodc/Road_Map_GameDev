# Lazy Class (Class lười biếng)

> 📖 **Nguồn:** [Refactoring.Guru — Lazy Class](https://refactoring.guru/refactoring/smells/lazy-class) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Lazy Class** xảy ra khi một class trong dự án của bạn **làm quá ít việc, quá đơn giản** và không xứng đáng với công sức duy trì nó (viết test, đọc hiểu, quản lý file).

> [!NOTE]
> Việc duy trì mỗi một class đều tốn chi phí trí tuệ (cognitive cost). Nếu một class không mang lại đủ giá trị để bù đắp chi phí đó, nó nên bị xóa hoặc tích hợp vào nơi khác.

## ❓ Nguyên nhân (Reasons for the Problem)

- **Hệ quả của quá trình Refactoring**: Trước đây class này rất lớn, nhưng sau khi bạn chuyển bớt các trách nhiệm của nó sang các class khác, nó chỉ còn lại một vài hàm hoặc biến nhỏ.
- **Thiết kế quá đà (Over-engineering)**: Dev vẽ ra trước cấu trúc class phức tạp cho các tính năng tương lai, nhưng thực tế tính năng đó không bao giờ được phát triển thêm.

## 💊 Cách điều trị (Treatment)

Các kỹ thuật giải quyết Lazy Class rất thẳng thắn:

1. **Inline Class**: Chuyển toàn bộ các thuộc tính và hành vi của Lazy Class sang một class khác đang trực tiếp sử dụng nó nhiều nhất, sau đó xóa hoàn toàn Lazy Class đó.
2. **Collapse Hierarchy**: Nếu Lazy Class là một subclass hoặc superclass không có thêm nhiều điểm khác biệt nổi trội so với class còn lại, hãy gộp hai class này thành một class duy nhất.

## ✅ Lợi ích (Payoff)

- **Giảm số lượng file**: Codebase gọn gàng hơn, dễ quản lý cấu trúc thư mục.
- **Dễ tìm kiếm code**: Người mới đọc dự án sẽ không bị phân tâm bởi hàng chục class rỗng hoặc class "vô hại" không có tác dụng thực tế.

## 🎮 Trong Game Dev

Trong Unity hay Unreal, Lazy Class thường xuất hiện dưới dạng các class wrapper thừa thãi:

### ❌ Ví dụ chưa refactor:
Bạn tạo ra một class `Armor` chỉ để chứa đúng một biến chỉ số giáp:
```csharp
public class Armor
{
    public int defenseValue;
}

public class PlayerInventory : MonoBehaviour
{
    private Armor equippedArmor;
    
    public int GetTotalDefense()
    {
        return equippedArmor != null ? equippedArmor.defenseValue : 0;
    }
}
```
**Vấn đề:** Class `Armor` cực kỳ lười biếng. Nó không có bất kỳ hành vi hay phương thức nào khác. Việc phải quản lý riêng một file `Armor.cs` cho mục đích đơn giản này là thừa thãi.

### ✅ Giải pháp sau refactor:
Nếu giáp không có thêm logic gì đặc biệt (như độ bền, hiệu ứng đặc biệt), hãy gộp thuộc tính đó trực tiếp vào class định nghĩa Item hoặc Player, hoặc biến nó thành một biến `int` đơn giản, hoặc gộp nó vào một class `Item` chung hơn bằng kỹ thuật **Inline Class**:
```csharp
public class Item
{
    public string itemName;
    public int defenseValue; // Tích hợp trực tiếp defense vào class Item chung
    public int attackValue;
}
```
Chúng ta không cần duy trì một class `Armor` độc lập rỗng tuếch nữa.

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Duplicate Code](./02-duplicate-code.md) |
| → Tiếp theo | [Data Class](./04-data-class.md) |
