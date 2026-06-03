# Replace Temp with Query

> 📖 **Nguồn:** [Refactoring.Guru — Replace Temp with Query](https://refactoring.guru/replace-temp-with-query) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **biến tạm chứa kết quả** của một biểu thức. Biến tạm này chỉ tồn tại trong một method và khiến method dài hơn, đồng thời ngăn cản việc tái sử dụng logic tính toán ở nơi khác.

```csharp
// ❌ Biến tạm chứa kết quả tính toán
float CalculateTotal()
{
    float basePrice = quantity * itemPrice;
    
    if (basePrice > 1000)
        return basePrice * 0.95f;  // giảm 5%
    else
        return basePrice * 0.98f;  // giảm 2%
}
```

## ✅ Giải pháp (Solution)

**Chuyển biểu thức thành method riêng** (query method) và thay biến tạm bằng lời gọi method đó. Kết quả có thể được dùng lại ở các method khác trong class.

```csharp
// ✅ Thay biến tạm bằng query method
float CalculateTotal()
{
    if (GetBasePrice() > 1000)
        return GetBasePrice() * 0.95f;
    else
        return GetBasePrice() * 0.98f;
}

float GetBasePrice()
{
    return quantity * itemPrice;
}
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Tái sử dụng logic**: Method mới có thể được gọi từ nhiều nơi trong class
- **Bước chuẩn bị**: Chuẩn bị cho [Extract Method](./01-extract-method.md) — giảm số biến local cần xử lý
- **Code tự giải thích**: Tên method mô tả ý nghĩa tốt hơn tên biến
- **Giảm kích thước method**: Loại bỏ biến tạm và phép gán

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code dễ đọc hơn** | Method có tên rõ ràng thay vì biến tạm |
| 🔄 **Tái sử dụng** | Logic tính toán dùng được ở nhiều method |
| 🧹 **Method gọn hơn** | Bớt biến tạm, bớt dòng code |
| 🔧 **Dễ refactor tiếp** | Ít biến local = dễ Extract Method hơn |

## 📝 Cách thực hiện (How to Refactor)

1. **Đảm bảo biến tạm chỉ được gán một lần** trong method. Nếu không, dùng [Split Temporary Variable](./06-split-temporary-variable.md) trước
2. **Tạo private method mới** trả về giá trị của biểu thức
3. **Thay thế biến tạm** bằng lời gọi method mới
4. **Xóa khai báo biến tạm**
5. **Biên dịch và test**

> ⚠️ **Cẩn thận với performance**: Nếu method mới tốn performance (tính toán nặng, database query...) và được gọi nhiều lần, cân nhắc cache kết quả.

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Giảm kích thước method bằng cách loại bỏ biến tạm

## 🎮 Trong Game Dev

### Tách logic tính damage:
```csharp
// ❌ Trước
float CalculateDamage()
{
    float baseDamage = strength * weaponMultiplier;
    float critBonus = Random.value < critChance ? baseDamage * critMultiplier : 0;
    return baseDamage + critBonus;
}

// ✅ Sau — tái sử dụng được
float CalculateDamage()
{
    float critBonus = Random.value < critChance ? GetBaseDamage() * critMultiplier : 0;
    return GetBaseDamage() + critBonus;
}

float GetBaseDamage() => strength * weaponMultiplier;
```

### ⚠️ Cẩn thận trong Game Dev:
```csharp
// ❌ ĐỪNG thay temp bằng query nếu phép tính tốn kém
// Vector3.Distance, Physics.Raycast, GetComponent, FindObjectsOfType
// → Các phép tính này nên cache trong biến tạm

float distance = Vector3.Distance(a, b); // Tính một lần
if (distance < range1) { /* ... */ }
if (distance < range2) { /* ... */ } // Dùng lại, không tính lại
```

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Inline Temp](./04-inline-temp.md)
- ➡️ [Split Temporary Variable](./06-split-temporary-variable.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
