# UnityEngine.CrashReportHandler

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.CrashReportHandler](https://docs.unity3d.com/ScriptReference/UnityEngine.CrashReportHandler.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Lập trình tương tác với hệ thống thu thập báo cáo sập game (Crash Reporting). Cho phép tùy biến thông tin đính kèm và gửi trực tiếp dữ liệu lỗi về Unity Cloud Diagnostics.

---

## 🧱 1. Thu thập dữ liệu báo cáo lỗi tự động

Lớp `CrashReportHandler` cho phép thu thập thông tin khi ứng dụng bị lỗi nghiêm trọng hoặc sập nguồn (Crash).

* **`CrashReportHandler.SetUserMetadata`**: Gán siêu dữ liệu tùy biến (ví dụ: phiên bản game, ID phòng chơi, cấu hình thiết bị thực tế) giúp việc gỡ lỗi trên Cloud Diagnostics dễ dàng hơn nhiều.

---

## 📐 2. Cạm bẫy bảo mật

Không lưu trữ các thông tin cá nhân nhạy cảm của người dùng (như mật khẩu, email hoặc thông tin thẻ tín dụng) vào siêu dữ liệu báo cáo lỗi để tuân thủ các quy định bảo mật (như GDPR).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.CrashReportHandler`.

```csharp
using UnityEngine;
using UnityEngine.CrashReportHandler;

public class CrashReportConfigurator : MonoBehaviour
{
    void Start()
    {
        // Đính kèm ID người chơi và chế độ chơi hiện tại vào dữ liệu báo cáo lỗi
        CrashReportHandler.SetUserMetadata("player_id", "user_198273");
        CrashReportHandler.SetUserMetadata("game_mode", "battle_royale");
        
        Debug.Log("[CrashReport] Đã thiết lập siêu dữ liệu thành công cho báo cáo lỗi.");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Categorization](categorization.md) |
| → Tiếp theo | [UnityEngine.DedicatedServer](dedicated-server.md) |
