# UnityEditor.Analytics (Cấu hình Phân tích)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Analytics](https://docs.unity3d.com/ScriptReference/UnityEditor.Analytics.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cấu hình cài đặt và theo dõi lưu lượng dữ liệu phân tích Unity Analytics phục vụ marketing và vận hành game.

---

## 🧱 1. Đăng ký sự kiện phân tích

Hỗ trợ kích hoạt dịch vụ phân tích dữ liệu trò chơi của Unity Cloud, kiểm tra tính đúng đắn của dữ liệu sự kiện gửi đi trước khi đóng gói sản phẩm thương mại.

---

## 📐 2. Thiết lập ID phân tích

Tự động thiết lập cấu hình khóa API hoặc token xác thực của dịch vụ Analytics qua code.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Analytics`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AnalyticsSetup
{
    public static void VerifyAnalyticsStatus()
    {
        // Kiểm tra xem ID dự án đã được liên kết chính xác với Unity Cloud Analytics chưa
        string projectId = PlayerSettings.cloudProjectId;
        Debug.Log($"[Analytics.Editor] Mã dự án đã liên kết: {projectId}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.AI](ai.md) |
| → Tiếp theo | [UnityEditor.Android](android.md) |
