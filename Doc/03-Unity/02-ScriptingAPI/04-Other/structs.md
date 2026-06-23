# Structs (Cấu trúc kiểu giá trị)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Structs](https://docs.unity3d.com/ScriptReference/Structs.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Danh mục tổng hợp và tra cứu các cấu trúc kiểu giá trị (Structs) toán học và hệ thống.

---

## 🧱 1. Tối ưu bộ nhớ với Struct (Value Type)

Khác với Class (Reference Type được cấp phát trên bộ nhớ Heap và quản lý bởi Garbage Collector), Struct là kiểu giá trị (Value Type) được cấp phát trực tiếp trên Stack.

* **Tiết kiệm GC Alloc**: Sử dụng Struct cho các đối tượng nhỏ, vòng đời ngắn giúp game tránh bị khựng do bộ thu dọn rác (GC) phải dọn dẹp bộ nhớ liên tục.
* **Bất biến (Immutability)**: Nên thiết kế các Struct ở dạng bất biến (ReadOnly) để tránh các lỗi logic gán giá trị ngoài ý muốn.

---

## 📐 2. Cạm bẫy sao chép dữ liệu

Khi truyền một Struct vào một hàm, toàn bộ dữ liệu của Struct sẽ được sao chép. Nếu Struct quá lớn (nhiều hơn 16 bytes), việc sao chép này sẽ gây giảm hiệu năng. Hãy sử dụng từ khóa `ref` hoặc `in` để truyền tham chiếu của Struct.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Structs`.

```csharp
using UnityEngine;

public struct DamageInfo
{
    // Struct chứa các thông số sát thương cơ bản
    public float amount;
    public bool isCritical;

    public DamageInfo(float amount, bool isCritical)
    {
        this.amount = amount;
        this.isCritical = isCritical;
    }
}

public class HealthController : MonoBehaviour
{
    public float hp = 100f;

    // Sử dụng từ khóa 'in' để tránh sao chép dữ liệu struct lớn
    public void TakeDamage(in DamageInfo damage)
    {
        hp -= damage.amount;
        Debug.Log($"[Structs] Đã nhận {damage.amount} sát thương. Máu còn lại: {hp}");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Classes](classes.md) |
| → Tiếp theo | [Enumerations](enumerations.md) |
