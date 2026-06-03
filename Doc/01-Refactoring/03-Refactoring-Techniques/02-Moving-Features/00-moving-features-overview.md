# 🚚 Moving Features between Objects (Di chuyển tính năng giữa các đối tượng)

> 📖 **Nguồn:** [Refactoring.Guru — Moving Features between Objects](https://refactoring.guru/refactoring/techniques/moving-features-between-objects) | Tác giả: Alexander Shvets

## Giới thiệu

Một trong những quyết định quan trọng nhất trong thiết kế hướng đối tượng là **đặt trách nhiệm (responsibility) ở đâu**. Ngay cả thiết kế tốt nhất cũng cần điều chỉnh khi requirement thay đổi.

Nhóm kỹ thuật **Moving Features between Objects** giúp bạn:
- **Di chuyển** method/field đến class phù hợp hơn
- **Tách** class quá lớn thành nhiều class nhỏ
- **Gộp** class quá nhỏ vào class khác
- **Ẩn** hoặc **loại bỏ** delegation không cần thiết

---

## 📋 Danh sách 8 kỹ thuật

### 1. Move Method
> 🔗 [Refactoring.Guru](https://refactoring.guru/move-method)

**Khi nào dùng:** Method **sử dụng dữ liệu của class khác nhiều hơn** class chứa nó (Feature Envy).

**Cách làm:** Tạo method mới trong class đích, copy logic sang, chuyển method cũ thành delegate hoặc xóa.

```csharp
// Chuyển CalculateDamage() từ Player sang DamageCalculator
// vì nó dùng nhiều data từ Weapon và Target hơn Player
```

---

### 2. Move Field
> 🔗 [Refactoring.Guru](https://refactoring.guru/move-field)

**Khi nào dùng:** Field **được sử dụng nhiều hơn bởi class khác** so với class chứa nó.

**Cách làm:** Tạo field trong class đích, cập nhật tất cả reference.

```csharp
// Chuyển `attackRange` từ Player sang Weapon
// vì range phụ thuộc vào vũ khí, không phải player
```

---

### 3. Extract Class
> 🔗 [Refactoring.Guru](https://refactoring.guru/extract-class)

**Khi nào dùng:** Một class **làm quá nhiều việc** (vi phạm Single Responsibility). Khi bạn thấy class có 2 nhóm method/field riêng biệt.

**Cách làm:** Tạo class mới, chuyển field và method liên quan sang, thiết lập liên kết giữa 2 class.

```csharp
// Tách PlayerController → PlayerInput + PlayerMovement + PlayerCombat
// Mỗi class đảm nhận một responsibility
```

---

### 4. Inline Class
> 🔗 [Refactoring.Guru](https://refactoring.guru/inline-class)

**Khi nào dùng:** Class **quá nhỏ**, gần như không có trách nhiệm riêng. Thường xảy ra sau khi refactor nhiều lần, class bị "rút ruột".

**Cách làm:** Chuyển tất cả feature từ class nhỏ vào class khác, xóa class nhỏ.

```csharp
// Nếu PhoneNumber class chỉ có 1 field `number` → gộp vào Person
```

---

### 5. Hide Delegate
> 🔗 [Refactoring.Guru](https://refactoring.guru/hide-delegate)

**Khi nào dùng:** Client code phải **biết về cấu trúc nội bộ** để truy cập chức năng (vi phạm Law of Demeter). Ví dụ: `person.GetDepartment().GetManager()`.

**Cách làm:** Tạo method ở class trung gian để client không cần biết delegate.

```csharp
// ❌ player.GetInventory().GetWeapon().GetDamage()
// ✅ player.GetEquippedWeaponDamage()
```

---

### 6. Remove Middle Man
> 🔗 [Refactoring.Guru](https://refactoring.guru/remove-middle-man)

**Khi nào dùng:** Class có **quá nhiều delegate method** — chỉ forward call mà không thêm logic. Ngược lại với Hide Delegate.

**Cách làm:** Cho client truy cập delegate trực tiếp, xóa các forwarding method thừa.

```csharp
// Khi GameManager chỉ forward mọi thứ sang AudioManager, UIManager, etc.
// → Cho các system truy cập trực tiếp qua ServiceLocator hoặc DI
```

---

### 7. Introduce Foreign Method
> 🔗 [Refactoring.Guru](https://refactoring.guru/introduce-foreign-method)

**Khi nào dùng:** Bạn cần method ở class mà **bạn không thể sửa** (library class, sealed class), nhưng chỉ cần **1-2 method**.

**Cách làm:** Tạo method ở client class, nhận instance của class thư viện làm parameter.

```csharp
// Thêm utility method cho class DateTime mà bạn không sửa được
static DateTime NextWorkingDay(DateTime date)
{
    // Logic tính ngày làm việc tiếp theo
}
```

---

### 8. Introduce Local Extension
> 🔗 [Refactoring.Guru](https://refactoring.guru/introduce-local-extension)

**Khi nào dùng:** Bạn cần **nhiều method** cho class mà bạn không thể sửa. Nhiều hơn 1-2 method (nếu ít thì dùng Introduce Foreign Method).

**Cách làm:** Tạo wrapper class (subclass hoặc decorator) hoặc **extension method** (trong C#).

```csharp
// C# Extension Methods — cách phổ biến nhất trong Unity
public static class VectorExtensions
{
    public static Vector3 WithY(this Vector3 v, float y) => new Vector3(v.x, y, v.z);
    public static Vector3 Flat(this Vector3 v) => new Vector3(v.x, 0, v.z);
    public static float DistanceTo(this Vector3 a, Vector3 b) => Vector3.Distance(a, b);
}
```

---

## 🗺️ Khi nào dùng kỹ thuật nào?

```
Class quá lớn?
├── Có 2 nhóm responsibility rõ ràng? → Extract Class
└── Chỉ 1 method/field không thuộc về? → Move Method / Move Field

Class quá nhỏ?
└── Gần như không có responsibility? → Inline Class

Client biết quá nhiều về cấu trúc nội bộ?
└── Gọi a.getB().getC().doSomething()? → Hide Delegate

Class chỉ forward call?
└── Quá nhiều delegate method? → Remove Middle Man

Cần thêm method cho class không sửa được?
├── Chỉ 1-2 method? → Introduce Foreign Method
└── Nhiều method? → Introduce Local Extension
```

---

## 🎮 Trong Game Dev

- **Extract Class**: Tách `PlayerController` 2000 dòng thành `PlayerInput`, `PlayerMovement`, `PlayerCombat`, `PlayerAnimation`
- **Move Method**: Chuyển logic tính damage từ `Player` sang `CombatSystem`
- **Hide Delegate**: `gameManager.GetScore()` thay vì `gameManager.GetScoreSystem().GetCurrentScore()`
- **Extension Methods (Unity)**: Mở rộng `Vector3`, `Transform`, `GameObject` — rất phổ biến trong Unity projects

---

## 🔗 Liên kết

- ⬆️ [Refactoring Techniques — Tổng quan](../00-techniques-overview.md)
- ⬅️ [Composing Methods](../01-Composing-Methods/00-composing-methods-overview.md)
- ➡️ [Organizing Data](../03-Organizing-Data/00-organizing-data-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
