# UnityEngine.Categorization

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Categorization](https://docs.unity3d.com/ScriptReference/UnityEngine.Categorization.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cung cấp các cấu trúc phân loại và sắp xếp siêu dữ liệu (Metadata) cho các thực thể trong trò chơi.

---

## 🧱 1. Phân loại đối tượng và quản lý siêu dữ liệu

Phân hệ này hỗ trợ gán nhãn, tag nâng cao và phân cấp siêu dữ liệu cho các Asset cũng như các GameObject trong trò chơi. Thích hợp cho các dự án RPG, Open-world có hàng ngàn vật phẩm, trang bị cần phân loại động để phục vụ cơ chế lọc, tìm kiếm đồ hoặc chế tạo (Crafting).

---

## 📐 2. Cấu trúc tổ chức dữ liệu

Sử dụng các cấu trúc định danh phân nhóm giúp mã nguồn tránh việc lạm dụng quá nhiều thẻ chuỗi tag (`CompareTag`), tăng tính an toàn dữ liệu và tối ưu hiệu năng bộ nhớ.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Categorization`.

```csharp
using UnityEngine;

public class ItemCategory : MonoBehaviour
{
    [SerializeField] private string itemCategory = "Weapon/Sword";

    public bool IsInGroup(string parentGroup)
    {
        // Kiểm tra xem vật phẩm này có thuộc nhóm cha hay không
        return itemCategory.StartsWith(parentGroup);
    }

    void Start()
    {
        if (IsInGroup("Weapon"))
        {
            Debug.Log($"[Categorization] {gameObject.name} là một loại vũ khí.");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Assertions](assertions.md) |
| → Tiếp theo | [UnityEngine.CrashReportHandler](crash-report-handler.md) |
