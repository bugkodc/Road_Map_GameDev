# Feature Envy (Thèm khát tính năng)

> 📖 **Nguồn:** [Refactoring.Guru — Feature Envy](https://refactoring.guru/refactoring/smells/couplers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Feature Envy** xảy ra khi một phương thức (method) của class A có vẻ "quan tâm" và **sử dụng các thuộc tính/dữ liệu của class B nhiều hơn** chính các thuộc tính của class mình.

*Dấu hiệu nhận biết:*
- Hàm liên tục gọi các phương thức getter của class khác để lấy dữ liệu.
- Hàm thực hiện hầu hết các phép toán dựa trên thông tin của đối tượng khác.

> 💬 **Nguyên tắc cốt lõi:** **Tell, Don't Ask (Hãy ra lệnh, đừng hỏi)**. Bạn nên ra lệnh cho đối tượng thực hiện hành vi, thay vì đi lấy thông tin chi tiết của đối tượng đó để tự mình thực hiện logic.

## ❓ Nguyên nhân (Reasons for the Problem)

Smell này thường xuất hiện khi dữ liệu và hành vi xử lý dữ liệu đó bị đặt ở **hai class khác nhau**:
- Lập trình viên vô tình tách rời class dữ liệu (Data Class) và class xử lý logic.
- Đặt nhầm chỗ phương thức trong quá trình thiết kế hệ thống.

## 💊 Cách điều trị (Treatment)

Quy tắc điều trị rất đơn giản: **Dữ liệu nằm ở đâu thì hành vi nằm ở đó.**

1. **Move Method**: Di chuyển phương thức bị "thèm khát tính năng" từ class hiện tại sang class chứa dữ liệu mà nó đang sử dụng nhiều nhất.
2. **Extract Method**: Nếu phương thức đó kiêm nhiệm nhiều thứ và chỉ có một phần code bị Feature Envy, hãy tách phần đó thành một method riêng, rồi dùng **Move Method** để đưa nó sang class chứa dữ liệu.

## ✅ Lợi ích (Payoff)

- **Đóng gói hoàn hảo (High Encapsulation)**: Dữ liệu được che giấu và bảo vệ, class ngoài không cần biết chi tiết cấu trúc nội bộ của nó.
- **Giảm Coupling**: Class A không còn phụ thuộc chặt chẽ vào các field của class B nữa. Nếu class B thay đổi cấu trúc dữ liệu, bạn chỉ cần sửa nội bộ class B.

## 🎮 Trong Game Dev

Hệ thống tính toán Combat/Sát thương là nơi Feature Envy xuất hiện nhiều nhất:

### ❌ Ví dụ chưa refactor:
Class `DamageCalculator` đi hỏi từng thông tin của `Enemy` để tự tính sát thương:
```csharp
public class DamageCalculator
{
    public float CalculatePhysicalDamage(Enemy enemy, float baseAttack)
    {
        // Feature Envy: Hàm này lấy và tính toán hoàn toàn dựa trên dữ liệu của Enemy!
        float netDamage = baseAttack - enemy.GetArmorValue();
        if (enemy.IsShieldActive())
        {
            netDamage *= 0.5f; // Giảm 50% nếu có khiên
        }
        return Mathf.Max(0, netDamage);
    }
}
```
**Vấn đề:** Phương thức này hoàn toàn sử dụng dữ liệu của `Enemy` (`GetArmorValue`, `IsShieldActive`). Nếu ngày mai `Enemy` có thêm thuộc tính né tránh (`evadeChance`) hay giáp kháng phép (`magicResist`), bạn lại phải sửa class `DamageCalculator` bên ngoài.

### ✅ Giải pháp sau refactor:
Chuyển phương thức tính toán sát thương vào trong chính class `Enemy` bằng **Move Method**:
```csharp
public class Enemy : MonoBehaviour
{
    private float armorValue;
    private bool isShieldActive;

    public float GetArmorValue() => armorValue;
    public bool IsShieldActive() => isShieldActive;

    // Di chuyển hành vi về đúng nơi chứa dữ liệu
    public float TakeIncomingDamage(float baseAttack)
    {
        float netDamage = baseAttack - armorValue;
        if (isShieldActive)
        {
            netDamage *= 0.5f;
        }
        return Mathf.Max(0, netDamage);
    }
}
```
Giờ đây, class ngoài muốn gây sát thương chỉ cần gọi: `enemy.TakeIncomingDamage(baseAttack)`. Class ngoài hoàn toàn không biết và không cần quan tâm quái vật có khiên hay có giáp như thế nào!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Couplers Overview](./00-couplers-overview.md) |
| → Tiếp theo | [Inappropriate Intimacy](./02-inappropriate-intimacy.md) |
