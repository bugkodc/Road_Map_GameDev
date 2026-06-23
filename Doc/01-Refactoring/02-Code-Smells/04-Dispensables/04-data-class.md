# Data Class (Class chỉ chứa dữ liệu)

> 📖 **Nguồn:** [Refactoring.Guru — Data Class](https://refactoring.guru/refactoring/smells/data-class) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Data Class** xảy ra khi một class **chỉ chứa dữ liệu** (các trường dữ liệu public, các thuộc tính getter/setter, hoặc các data structure đơn thuần) và **không có bất kỳ hành vi hay logic xử lý nào** bên trong nó.

Các class này chỉ là công cụ lưu trữ dữ liệu thụ động và luôn bị các class khác can thiệp trực tiếp để tính toán hay thay đổi dữ liệu đó.

> [!IMPORTANT]
> Một class OOP thực sự phải đóng gói (encapsulate) cả **Dữ liệu** và **Hành vi** đi kèm với dữ liệu đó. Một class chỉ có dữ liệu là dấu hiệu của phong cách lập trình thủ tục (procedural).

## ❓ Nguyên nhân (Reasons for the Problem)

- Thói quen tạo ra các cấu trúc dữ liệu thuần túy (C-style Structs) trong các dự án hướng đối tượng.
- Quá trình phân rã hệ thống bị lỗi, khiến logic tính toán bị tách rời và chuyển hết sang các class Service hay Control bên ngoài.

## 💊 Cách điều trị (Treatment)

Để cứu vớt một Data Class, chúng ta cần tìm xem các class khác đang làm gì với dữ liệu của nó:

1. **Move Method**: Tìm các phương thức ở class ngoài đang sử dụng dữ liệu của Data Class để tính toán, sau đó chuyển chính phương thức đó vào trong Data Class.
2. **Extract Method**: Nếu phương thức ở class ngoài quá lớn và làm nhiều việc, hãy tách phần logic liên quan đến dữ liệu của Data Class ra làm một method riêng, rồi chuyển nó vào Data Class.
3. **Encapsulate Field**: Nếu các trường dữ liệu đang để public một cách vô tội vạ, hãy chuyển chúng thành private/protected và cung cấp các property/hàm getter/setter có kiểm soát.

## ✅ Lợi ích (Payoff)

- **Tính đóng gói cao (High Encapsulation)**: Dữ liệu được bảo vệ và chỉ có thể thay đổi thông qua các hành vi hợp lệ do chính class đó định nghĩa.
- **Tránh trùng lặp logic**: Khi hành vi được đưa vào Data Class, các nơi khác muốn xử lý dữ liệu đó chỉ cần gọi hàm của class, không cần tự viết lại logic tính toán nữa.

## 🎮 Trong Game Dev

Trong phát triển game, Data Class cực kỳ phổ biến ở các hệ thống lưu trữ thông số hoặc cấu hình:

### ❌ Ví dụ chưa refactor:
Class `WeaponData` chỉ chứa dữ liệu và class `CombatManager` phải tự thực hiện logic nâng cấp:
```csharp
public class WeaponData
{
    public string weaponName;
    public float baseDamage;
    public int upgradeLevel;
}

public class CombatManager : MonoBehaviour
{
    public void UpgradeWeapon(WeaponData weapon)
    {
        // Logic nâng cấp vũ khí bị viết ở ngoài class WeaponData
        weapon.upgradeLevel++;
        weapon.baseDamage *= 1.2f; // Tăng 20% sát thương
    }
}
```
**Vấn đề:** `WeaponData` là một Data Class thuần túy. Nếu có một class khác như `ShopManager` cũng muốn thực hiện nâng cấp vũ khí cho người chơi khi mua, logic nâng cấp vũ khí này sẽ phải viết lại hoặc gọi chéo rất phức tạp.

### ✅ Giải pháp sau refactor:
Chuyển logic nâng cấp vũ khí vào chính class `WeaponData` bằng **Move Method**:
```csharp
public class WeaponData
{
    public string weaponName { get; private set; }
    public float baseDamage { get; private set; }
    public int upgradeLevel { get; private set; }

    public WeaponData(string name, float damage)
    {
        weaponName = name;
        baseDamage = damage;
        upgradeLevel = 1;
    }

    // Đưa hành vi (behavior) vào class chứa dữ liệu
    public void Upgrade()
    {
        upgradeLevel++;
        baseDamage *= 1.2f;
    }
}
```
Giờ đây, bất kỳ class nào (như `CombatManager` hay `ShopManager`) chỉ cần gọi `weapon.Upgrade()`, tính đóng gói được đảm bảo hoàn hảo!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Lazy Class](./03-lazy-class.md) |
| → Tiếp theo | [Dead Code](./05-dead-code.md) |
