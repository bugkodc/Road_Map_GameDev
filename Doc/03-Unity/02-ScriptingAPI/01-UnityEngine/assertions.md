# UnityEngine.Assertions

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Assertions](https://docs.unity3d.com/ScriptReference/UnityEngine.Assertions.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cung cấp các hàm kiểm thử khẳng định dữ liệu (Assert) giúp lập trình viên kiểm tra lỗi logic game lúc chạy thử (ví dụ: ép buộc đối tượng Player khi spawn không được null).

---

## 🧱 1. Sử dụng Assert để săn lỗi logic sớm

Khẳng định (Assert) là một kỹ thuật tuyệt vời để phát hiện sớm các giả định logic bị sai trong quá trình phát triển game.

* **`Assert.IsNotNull`**: Đảm bảo đối tượng bắt buộc phải tồn tại.
* **`Assert.AreApproximatelyEqual`**: So sánh hai số thực float có tính đến sai số làm tròn.
* **Loại bỏ trong Build**: Các câu lệnh Assert sẽ tự động bị loại bỏ hoàn toàn khỏi bản build phát hành (Release Build) để không làm ảnh hưởng đến hiệu năng của game.

---

## 📐 2. Cạm bẫy quan trọng

Vì Assert bị xóa trong Release Build, tuyệt đối không đặt các đoạn code thay đổi trạng thái game (ví dụ: `Assert.IsTrue(ApplyDamage())`) vào trong hàm Assert.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Assertions`.

```csharp
using UnityEngine;
using UnityEngine.Assertions;

public class PlayerSpawner : MonoBehaviour
{
    public GameObject playerPrefab;

    void Start()
    {
        // Khẳng định prefab người chơi không được phép null trước khi spawn
        Assert.IsNotNull(playerPrefab, "Prefab của Player chưa được kéo thả vào Inspector!");
        
        GameObject player = Instantiate(playerPrefab);
        
        // Khẳng định máu ban đầu của Player phải nằm trong khoảng hợp lệ
        int initialHealth = 100;
        Assert.IsTrue(initialHealth > 0, "Máu khởi tạo của Player phải lớn hơn 0!");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Assemblies](assemblies.md) |
| → Tiếp theo | [UnityEngine.Categorization](categorization.md) |
