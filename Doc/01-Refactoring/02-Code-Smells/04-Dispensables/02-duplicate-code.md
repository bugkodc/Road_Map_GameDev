# Duplicate Code (Trùng lặp code)

> 📖 **Nguồn:** [Refactoring.Guru — Duplicate Code](https://refactoring.guru/smells/duplicate-code) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Duplicate Code** là "vua" của các code smells. Nó xảy ra khi hai hoặc nhiều đoạn code có cấu trúc, logic và chức năng **gần như giống hệt nhau** xuất hiện ở nhiều nơi trong dự án.

> [!WARNING]
> Đây là loại smell nguy hại nhất vì khi phát hiện ra bug trong đoạn code trùng lặp đó, bạn sẽ phải đi tìm và sửa nó ở tất cả mọi nơi — và khả năng rất cao là bạn sẽ bỏ sót ít nhất một chỗ.

## ❓ Nguyên nhân (Reasons for the Problem)

- **Copy-Paste thần chưởng**: Lập trình viên muốn tạo tính năng nhanh bằng cách copy code hoạt động tốt từ file khác sang file hiện tại và chỉnh sửa nhẹ.
- **Thiếu giao tiếp trong team**: Hai lập trình viên cùng giải quyết một bài toán tương tự (ví dụ: parse chuỗi dữ liệu) và tự viết hai hàm riêng biệt giải quyết cùng một việc.

## 💊 Cách điều trị (Treatment)

Tùy thuộc vào vị trí của đoạn code trùng lặp mà chúng ta có các giải pháp khác nhau:

1. **Extract Method**: Nếu trùng lặp nằm trong các method của **cùng một class**, hãy tách đoạn code trùng lặp đó thành một method chung và gọi nó từ các nơi cần dùng.
2. **Pull Up Method**: Nếu trùng lặp nằm ở các class con (**subclasses**) cùng cấp, hãy đưa method chung đó lên class cha (**superclass**).
3. **Form Template Method**: Nếu các subclass có thuật toán tương tự nhau về các bước thực hiện, nhưng khác biệt nhẹ ở một vài chi tiết nhỏ, hãy định nghĩa khung thuật toán ở class cha và cho phép class con ghi đè (override) các chi tiết đó.
4. **Substitute Algorithm**: Thay thế thuật toán trùng lặp phức tạp bằng một thuật toán đơn giản, gọn gàng và hiệu quả hơn.

## ✅ Lợi ích (Payoff)

- **Tuân thủ nguyên lý DRY (Don't Repeat Yourself)**: Dữ liệu và logic chỉ tồn tại ở một nơi duy nhất.
- **Dễ tìm và diệt Bug**: Khi phát hiện lỗi trong logic, bạn chỉ cần sửa ở 1 file duy nhất.
- **Codebase gọn nhẹ**: Giảm dung lượng file code và tăng hiệu quả biên dịch (compile).

## 🎮 Trong Game Dev

Trùng lặp code thường xảy ra khi viết các thực thể game có hành vi tương đồng:

### ❌ Ví dụ chưa refactor:
Class `Player` và `Enemy` có logic tính toán né tránh vật lý giống hệt nhau:
```csharp
public class Player : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        // Công thức tính né tránh phức tạp
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}

public class Enemy : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        // Copy y hệt công thức của Player sang đây!
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}
```
**Vấn đề:** Nếu Designer muốn đổi công thức né tránh (ví dụ: thay đổi hệ số 0.5f thành 0.4f), lập trình viên phải nhớ sửa ở cả hai class `Player` và `Enemy`.

### ✅ Giải pháp sau refactor:
Tạo một base class `Character` hoặc một Utility class để chia sẻ logic:
```csharp
public abstract class Character : MonoBehaviour
{
    public int agility;

    public bool TryEvadeAttack(int incomingAccuracy)
    {
        float evadeChance = (agility * 0.5f) - (incomingAccuracy * 0.2f);
        evadeChance = Mathf.Clamp(evadeChance, 0.05f, 0.95f);
        return Random.value < evadeChance;
    }
}

// Giờ đây Player và Enemy chỉ cần kế thừa Character:
public class Player : Character { }
public class Enemy : Character { }
```
Nếu có sự khác biệt nhỏ về cách tính né tránh của quái vật đặc biệt, bạn có thể biến hàm này thành `virtual` để cho phép `override` cụ thể.

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Comments](./01-comments.md) |
| → Tiếp theo | [Lazy Class](./03-lazy-class.md) |
