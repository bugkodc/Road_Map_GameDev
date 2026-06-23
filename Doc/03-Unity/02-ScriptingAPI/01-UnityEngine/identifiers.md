# UnityEngine.Identifiers

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Identifiers](https://docs.unity3d.com/ScriptReference/UnityEngine.Identifiers.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý và định danh các đối tượng thông qua cơ chế GUID (Global Unique Identifier) trong thế giới game.

---

## 🧱 1. Định danh đối tượng đồng nhất

Trong các game quy mô lớn hoặc nhiều người chơi, việc quản lý định danh duy nhất (GUID) cho từng thực thể (Entity) là cực kỳ quan trọng để đồng bộ hóa dữ liệu lưu (Save Game) và mạng.

* **Tránh trùng lặp ID**: Việc tự quản lý ID bằng số nguyên dễ bị trùng lặp khi ghép nối dữ liệu. Sử dụng GUID chuỗi đảm bảo tính độc nhất toàn cầu.

---

## 📐 2. Cạm bẫy khi nhân bản (Duplicate)

Khi nhân bản một GameObject trong Editor hoặc Runtime, ID định danh cũ thường bị sao chép nguyên vẹn. Cần viết mã tự động tạo mới ID khi đối tượng được khởi tạo hoặc hồi sinh.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Identifiers`.

```csharp
using System;
using UnityEngine;

public class EntityIdentifier : MonoBehaviour
{
    [SerializeField] private string entityGUID;

    public string EntityGUID => entityGUID;

    void Awake()
    {
        // Nếu đối tượng chưa có GUID, tự động sinh mới
        if (string.IsNullOrEmpty(entityGUID))
        {
            entityGUID = Guid.NewGuid().ToString();
            Debug.Log($"[Identifiers] Đã sinh GUID mới cho {gameObject.name}: {entityGUID}");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Experimental](experimental.md) |
| → Tiếp theo | [UnityEngine.iOS](ios.md) |
