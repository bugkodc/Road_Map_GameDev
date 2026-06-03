# Incomplete Library Class (Class thư viện chưa hoàn thiện)

> 📖 **Nguồn:** [Refactoring.Guru — Incomplete Library Class](https://refactoring.guru/refactoring/smells/couplers) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Incomplete Library Class** xảy ra khi bạn sử dụng một thư viện bên thứ ba (hoặc chính API gốc của Game Engine như Unity/Unreal) và phát hiện ra nó **thiếu đi một vài phương thức/tính năng cụ thể** mà bạn rất cần cho dự án.

Khó khăn ở chỗ: **Bạn không thể chỉnh sửa trực tiếp mã nguồn của thư viện đó** vì nó đã được đóng gói sẵn thành file DLL, package hoặc thuộc về engine.

*Dấu hiệu nhận biết:*
- Bạn phải liên tục viết các hàm tiện ích (helper functions) bên ngoài để biến đổi hoặc xử lý dữ liệu của thư viện đó trước khi dùng.
- Code của bạn xuất hiện các hàm static xử lý dữ liệu của đối tượng thư viện một cách lặp đi lặp lại.

## ❓ Nguyên nhân (Reasons for the Problem)

Tác giả của các thư viện hoặc game engine không thể nào đoán trước được tất cả các nhu cầu cụ thể của từng dự án game. Họ chỉ cung cấp các tính năng chung nhất và cơ bản nhất.

## 💊 Cách điều trị (Treatment)

Để mở rộng tính năng cho class thư viện một cách sạch sẽ, chúng ta có hai hướng tiếp cận chính:

1. **Introduce Foreign Method**: Nếu bạn chỉ cần thêm **một hoặc hai** phương thức đơn giản, hãy viết chúng như các hàm static tiện ích trong dự án của bạn (trong C#, đây là cơ chế **Extension Methods** vô cùng mạnh mẽ).
2. **Introduce Local Extension**: Nếu bạn cần thêm **nhiều** tính năng phức tạp hoặc muốn thay đổi hành vi gốc, hãy tạo một class con (subclass) kế thừa từ class thư viện đó (nếu class đó không bị đánh dấu là `sealed`), hoặc tạo một class wrapper bao bọc nó lại.

## ✅ Lợi ích (Payoff)

- **Code có tổ chức tốt**: Các hàm mở rộng được gom nhóm lại một nơi chuyên biệt (ví dụ: `VectorExtensions`), giúp tránh việc viết code chắp vá rải rác khắp nơi trong dự án.
- **Tăng tính tái sử dụng**: Bạn có thể gọi các hàm mở rộng trực tiếp từ đối tượng thư viện như thể đó là hàm gốc của nó.

## 🎮 Trong Game Dev

Trong Unity, C# cung cấp cơ chế **Extension Methods** cực kỳ hoàn hảo để giải quyết triệt để smell này:

### ❌ Ví dụ chưa refactor:
Bạn liên tục phải tính khoảng cách ngang (bỏ qua trục Y) giữa hai Object và viết hàm static rải rác:
```csharp
public class EnemyAI : MonoBehaviour
{
    void Update()
    {
        // Phải viết công thức thủ công dài dòng bỏ qua trục Y
        Vector3 diff = player.transform.position - transform.position;
        float distance2D = Mathf.Sqrt(diff.x * diff.x + diff.z * diff.z);

        if (distance2D < 5f) { /* Đuổi theo */ }
    }
}
```
**Vấn đề:** Nếu ở class `Projectile` hay `Spawner` bạn cũng cần tính khoảng cách 2D tương tự, bạn lại phải copy công thức này hoặc viết hàm helper tĩnh ở khắp nơi. Class `Vector3` gốc của Unity không có sẵn hàm `Distance2D()`.

### ✅ Giải pháp sau refactor:
Viết một **Extension Method** cho `Vector3` trong C#:
```csharp
public static class Vector3Extensions
{
    // Bổ sung phương thức trang nhã cho class Vector3 gốc của Unity!
    public static float Distance2D(this Vector3 origin, Vector3 target)
    {
        Vector3 diff = target - origin;
        return Mathf.Sqrt(diff.x * diff.x + diff.z * diff.z);
    }
}

// Lúc này, trong EnemyAI hay bất kỳ đâu, bạn gọi cực kỳ tự nhiên:
public class EnemyAI : MonoBehaviour
{
    void Update()
    {
        // Gọi trực tiếp như thể Distance2D là hàm có sẵn của Unity!
        float distance2D = transform.position.Distance2D(player.transform.position);

        if (distance2D < 5f) { /* Đuổi theo */ }
    }
}
```
Giải pháp Extension Method giúp bạn bổ sung tính năng vào API của Unity một cách vô cùng sạch sẽ, trang nhã và chuyên nghiệp!

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Middle Man](./04-middle-man.md) |
| 🦨 Trở về | [Danh sách Code Smells](../00-code-smells-overview.md) |
