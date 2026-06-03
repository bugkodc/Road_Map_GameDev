# Unity.IntegerTime (Thời gian số nguyên độ chính xác cao)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.IntegerTime](https://docs.unity3d.com/ScriptReference/Unity.IntegerTime.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Đo đạc và quản lý thời gian bằng số nguyên độ chính xác cao để đồng bộ hóa hoạt ảnh và vật lý.

---

## 🧱 1. Khắc phục sai số làm tròn số thực (Floating-Point Precision Loss)

Khi game chạy liên tục trong thời gian dài (ví dụ: game MMO chạy hàng tuần không khởi động lại), kiểu số thực `float` sẽ bị mất độ chính xác (Precision Loss). Điều này dẫn đến các hiện tượng giật giật vật lý hoặc sai lệch đồng bộ hoạt ảnh.

* **`DiscreteTime`**: Sử dụng cấu trúc thời gian số nguyên để thực hiện các phép cộng trừ thời gian chính xác 100%.

---

## 📐 2. Tích hợp đồng bộ hóa hoạt ảnh

Áp dụng cấu trúc thời gian số nguyên giúp các hệ thống nhạc game (Rhythm Games) hoặc các đòn tấn công mạng diễn ra đồng bộ hoàn hảo.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.IntegerTime`.

```csharp
using UnityEngine;

public class HighPrecisionTimer : MonoBehaviour
{
    void Update()
    {
        // Sử dụng tích lũy thời gian có độ chính xác cao để tránh sai số dấu phẩy động
        double preciseTime = Time.timeAsDouble;
        // Thực hiện các phép so sánh thời gian chính xác cao
        if (preciseTime > 3600.0) // Chạy hơn 1 giờ liên tục
        {
            // Xử lý logic đồng bộ mà không sợ trôi số thực
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Hierarchy](hierarchy.md) |
| → Tiếp theo | [Unity.IO](io.md) |
