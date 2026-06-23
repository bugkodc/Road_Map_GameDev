# Message Chains (Chuỗi thông điệp / Gọi hàm dạng chuỗi)

> 📖 **Nguồn:** [Refactoring.Guru — Message Chains](https://refactoring.guru/refactoring/smells/couplers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Message Chains** xảy ra khi bạn thấy một đoạn code gọi liên tiếp các hàm lấy đối tượng (getters) dạng chuỗi dằng dặc để thực hiện một hành động:

`objectA.GetB().GetC().GetD().ExecuteSomething();`

Hoặc trong game dev:
`GameManager.Instance.GetPlayer().GetEquipment().GetActiveWeapon().Shoot();`

> [!WARNING]
> Smell này vi phạm trực tiếp **Định luật Demeter (Law of Demeter)** — Nguyên tắc "Chỉ nói chuyện với những người bạn thân thiết nhất". Class A không nên đi qua quá nhiều trung gian để nói chuyện với class D.

## ❓ Nguyên nhân (Reasons for the Problem)

- Lập trình viên thiết kế hệ thống phân cấp đối tượng quá sâu nhưng không che giấu cấu trúc điều hướng đó.
- Client cần sử dụng một tính năng của đối tượng nằm sâu bên trong và tự tiện điều hướng qua các getter thay vì giao trách nhiệm cho đối tượng ở tầng trên.

## 💊 Cách điều trị (Treatment)

Để phá vỡ chuỗi liên kết nguy hiểm này, chúng ta dùng:

1. **Hide Delegate**: Yêu cầu đối tượng ở tầng trên cung cấp một hàm ủy quyền (delegate method) để tự nó đi lấy thông tin bên dưới và trả về kết quả cuối cùng cho client.
2. **Extract Method & Move Method**: Xem xét hành động `ExecuteSomething()` ở cuối chuỗi thực sự thuộc về class nào, rồi di chuyển nó lên trên để client chỉ cần gọi trực tiếp.

## ✅ Lợi ích (Payoff)

- **Giảm cực mạnh Coupling**: Client hoàn toàn độc lập với cấu trúc phân cấp bên trong của đối tượng. Nếu ngày mai bạn đổi cấu trúc (ví dụ: vũ khí không nằm trong `Equipment` nữa mà nằm trực tiếp trong `Player`), bạn chỉ cần sửa ở `Player`, client hoàn toàn không bị ảnh hưởng.
- **Dễ đọc, ngắn gọn**: Code gọi hàm gọn gàng, tránh được lỗi crash do null reference ở giữa chuỗi (NullReferenceException).

## 🎮 Trong Game Dev

Smell này là kẻ thù số một của các UI hiển thị thông số nhân vật:

### ❌ Ví dụ chưa refactor:
Class `AmmoUI` muốn vẽ số lượng đạn lên màn hình và điều hướng qua cả chuỗi:
```csharp
public class AmmoUI : MonoBehaviour
{
    void Update()
    {
        // Message Chain vi phạm nghiêm trọng Định luật Demeter!
        int ammo = Player.Instance.GetWeaponSystem().GetInventory().GetActiveWeapon().ammoCount;
        UpdateAmmoText(ammo);
    }
}
```
**Tác hại:** Nếu ở giữa chuỗi, người chơi đang không cầm vũ khí nào (`GetActiveWeapon()` trả về `null`), game sẽ lập tức bị **NullReferenceException** và treo UI! Hơn nữa, `AmmoUI` đang phải phụ thuộc vào cấu trúc của 4-5 class khác nhau.

### ✅ Giải pháp sau refactor:
Áp dụng **Hide Delegate** trên class `Player`:
```csharp
public class Player : MonoBehaviour
{
    private WeaponSystem weaponSystem;

    // Cung cấp hàm ủy thác gọn gàng
    public int GetCurrentWeaponAmmo()
    {
        if (weaponSystem == null) return 0;
        var activeWeapon = weaponSystem.GetActiveWeapon();
        return activeWeapon != null ? activeWeapon.ammoCount : 0;
    }
}

// Lúc này AmmoUI chỉ cần gọi:
public class AmmoUI : MonoBehaviour
{
    void Update()
    {
        // AmmoUI chỉ nói chuyện trực tiếp với "người bạn thân" Player
        int ammo = Player.Instance.GetCurrentWeaponAmmo();
        UpdateAmmoText(ammo);
    }
}
```
UI giờ đây vô cùng sạch sẽ, an toàn (đã check null nội bộ) và không còn quan tâm vũ khí được quản lý như thế nào nữa!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Inappropriate Intimacy](./02-inappropriate-intimacy.md) |
| → Tiếp theo | [Middle Man](./04-middle-man.md) |
