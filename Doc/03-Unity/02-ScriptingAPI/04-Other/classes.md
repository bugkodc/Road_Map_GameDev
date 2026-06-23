# Classes (Tra cứu Class hệ thống)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Classes](https://docs.unity3d.com/ScriptReference/Classes.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Danh mục tổng hợp và tra cứu tất cả các Class hệ thống của Unity dùng để xây dựng game.

---

## 🧱 1. Phân loại cấu trúc Class trong C# Unity

Lập trình Unity dựa trên sự tương tác giữa các Class khác nhau. Hiểu rõ sự phân biệt giữa các lớp kế thừa từ `MonoBehaviour` (có thể kéo thả vào đối tượng trên Scene và có vòng đời sự kiện) và các lớp C# thuần túy (Pure C# Classes - dùng cho tính toán logic, lưu trữ dữ liệu) là nền tảng của lập trình hướng đối tượng chuyên nghiệp.

---

## 📐 2. Sử dụng Class hiệu quả

Luôn tận dụng tính kế thừa và đa hình để xây dựng hệ thống Code sạch, dễ bảo trì.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Classes`.

```csharp
using UnityEngine;

// 1. Lớp C# thuần túy dùng lưu trữ dữ liệu nhân vật
[System.Serializable]
public class CharacterData
{
    public string name;
    public int level;
}

// 2. Lớp MonoBehaviour quản lý vòng đời và tương tác game
public class CharacterController : MonoBehaviour
{
    public CharacterData data;

    void Start()
    {
        Debug.Log($"[Classes] Khởi tạo nhân vật: {data.name} (Cấp độ: {data.level})");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Assemblies](02-assemblies-packages.md) |
| → Tiếp theo | [Structs](structs.md) |
