# Enumerations (Kiểu liệt kê Enums)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Enumerations](https://docs.unity3d.com/ScriptReference/Enumerations.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Danh mục tổng hợp tất cả các hằng số liệt kê (Enums) thiết lập trong lập trình Unity.

---

## 🧱 1. Viết code tường minh với Enum

Enum giúp mã nguồn của bạn cực kỳ dễ đọc bằng cách thay thế các con số ma thuật (Magic Numbers) bằng các từ khóa có nghĩa tựa văn viết. Ví dụ, thay vì quy định `state = 0` là Idle, `state = 1` là Walk, ta sử dụng `PlayerState.Idle`.

* **`[System.Flags]`**: Cho phép kết hợp nhiều giá trị Enum với nhau bằng các phép toán logic Bitwise (AND, OR). Rất thích hợp để quản lý các trạng thái hiệu ứng của nhân vật cùng lúc (vừa bị trúng độc, vừa bị làm chậm).

---

## 📐 2. Tránh chuyển đổi Enum thành String quá nhiều

Gọi hàm `.ToString()` trên một Enum tạo ra rác bộ nhớ (GC Alloc) do C# phải dùng Reflection để tìm tên chuỗi tương ứng. Trong các vòng lặp Update, hãy so sánh trực tiếp Enum bằng số nguyên hoặc cache chuỗi trước.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Enumerations`.

```csharp
using System;
using UnityEngine;

public class EnumStatusManager : MonoBehaviour
{
    // Định nghĩa các trạng thái hiệu ứng sử dụng Flag Bitwise
    [Flags]
    public enum CharacterStatus
    {
        None = 0,
        Poisoned = 1 << 0,
        Slowed = 1 << 1,
        Stunned = 1 << 2,
        Burning = 1 << 3
    }

    public CharacterStatus currentStatus = CharacterStatus.Poisoned | CharacterStatus.Slowed;

    void Start()
    {
        // Kiểm tra xem nhân vật có đang bị làm chậm không bằng phép toán bitwise AND
        bool isSlowed = (currentStatus & CharacterStatus.Slowed) != 0;
        Debug.Log($"[Enums] Trạng thái hiệu ứng hiện tại: {currentStatus}. Đang bị làm chậm: {isSlowed}");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Structs](structs.md) |
| → Tiếp theo | [Unity.VisualScripting API](01-visual-scripting.md) |
