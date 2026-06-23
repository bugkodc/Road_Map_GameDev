# Dead Code (Code chết)

> 📖 **Nguồn:** [Refactoring.Guru — Dead Code](https://refactoring.guru/refactoring/smells/dispensables) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Dead Code** là bất kỳ phần code nào (biến, tham số, phương thức, thuộc tính, class hoặc file) **không bao giờ được gọi, sử dụng hay thực thi** trong toàn bộ vòng đời hoạt động của ứng dụng.

> 🗑️ **Quy tắc tối cao:** Nếu code không được dùng đến, giải pháp duy nhất và tốt nhất là **XÓA NÓ ĐI**. Đừng comment nó lại để dành cho tương lai. Bạn luôn có thể tìm lại nó trong lịch sử của Version Control (Git).

## ❓ Nguyên nhân (Reasons for the Problem)

- **Yêu cầu thay đổi liên tục**: Tính năng A bị loại bỏ hoặc thay thế bằng tính năng B, lập trình viên viết code mới nhưng quên xóa các đoạn code hỗ trợ tính năng cũ.
- **Để dành cho tương lai**: Nghĩ rằng "đoạn code này sau này có thể sẽ dùng đến" nên comment lại hoặc để nguyên đó.
- **Hàm tự sinh (Boilerplate)**: Các IDE hoặc game engine tự sinh ra các hàm callback trống rỗng khi tạo file mới và lập trình viên lười xóa đi.

## 💊 Cách điều trị (Treatment)

1. **Delete**: Xóa không thương tiếc các file, class, method hoặc variable không sử dụng.
2. **Sử dụng công cụ IDE phân tích tĩnh (Static Analysis)**: Các IDE hiện đại như Rider, Visual Studio, VS Code đều có tính năng cảnh báo màu xám (greyed out) đối với các code không có tham chiếu (0 references). Hãy tin tưởng và dọn dẹp chúng.
3. **Remove Unused Boilerplate**: Xóa các hàm mặc định rỗng của engine nếu không viết gì vào đó.

## ✅ Lợi ích (Payoff)

- **Giảm cognitive load**: Codebase gọn gàng giúp lập trình viên tập trung vào những đoạn code thực sự chạy.
- **Tăng tốc độ biên dịch (Compile Time)**: Ít code hơn đồng nghĩa với việc build game nhanh hơn.
- **Tối ưu hiệu năng (Performance)**: Tránh được các cuộc gọi ngầm vô ích từ engine.

## 🎮 Trong Game Dev

Trong Unity, Dead Code không chỉ làm bẩn codebase mà còn trực tiếp **gây hao tổn tài nguyên CPU**:

### ❌ Ví dụ chưa refactor:
Một MonoBehaviour script với các hàm trống rỗng và biến debug cũ:
```csharp
public class PlayerController : MonoBehaviour
{
    // Biến cũ dùng cho prototype bắn súng nay đã bỏ
    private float oldFireRate = 0.5f;

    // Hàm Start trống rỗng sinh ra bởi Unity
    void Start()
    {
        
    }

    // Hàm Update trống rỗng sinh ra bởi Unity
    void Update()
    {
        
    }
}
```
**Tác hại trong Unity:** 
- Biến `oldFireRate` gây tốn bộ nhớ vô ích.
- **Nguy hiểm nhất:** Ngay cả khi hàm `Start()` và `Update()` trống rỗng, Unity vẫn phải thực hiện các cuộc gọi cầu nối (C++ to C# bridge calls) cho mỗi MonoBehaviour này trong mỗi frame. Nếu bạn có 1000 quái vật mang script chứa hàm `Update()` trống, game của bạn sẽ bị sụt giảm FPS đáng kể vô ích!

### ✅ Giải pháp sau refactor:
Xóa bỏ hoàn toàn những thứ không dùng:
```csharp
public class PlayerController : MonoBehaviour
{
    // Sạch sẽ, không biến thừa, không hàm callback rỗng!
}
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Data Class](./04-data-class.md) |
| → Tiếp theo | [Speculative Generality](./06-speculative-generality.md) |
