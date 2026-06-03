# UnityEditor.CrashReporting (Quản lý lỗi sập)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.CrashReporting](https://docs.unity3d.com/ScriptReference/UnityEditor.CrashReporting.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Thiết lập cấu hình thu thập dữ liệu báo cáo lỗi sập nguồn game tự động từ Editor.

---

## 🧱 1. Cấu hình dịch vụ thu thập lỗi

Cho phép bật/tắt dịch vụ Cloud Diagnostics Crash Reporting qua mã nguồn. Giúp đồng bộ cấu hình lỗi cho toàn bộ các thành viên trong đội ngũ phát triển game.

---

## 📐 2. Tự động hóa thiết lập

Tự động ghi đè cấu hình báo cáo lỗi khi chuyển đổi giữa môi trường Development và Production.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.CrashReporting`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class CrashReportingSettings
{
    public static void EnableReportingInEditor()
    {
        // Kích hoạt dịch vụ chẩn đoán lỗi tự động gửi về máy chủ đám mây
        PlayerSettings.enableCrashReportAPI = true;
        Debug.Log("[CrashReporting.Editor] Đã kích hoạt API báo cáo lỗi tự động gửi cho nhà phát triển.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Connect](connect.md) |
| → Tiếp theo | [UnityEditor.DeviceSimulation](device-simulation.md) |
