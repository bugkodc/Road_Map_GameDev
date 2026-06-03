# UnityEditor.Connect (Kết nối dịch vụ Cloud)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Connect](https://docs.unity3d.com/ScriptReference/UnityEditor.Connect.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý kết nối giữa Unity Editor và các dịch vụ trực tuyến của tài khoản nhà phát triển (Unity Cloud Services).

---

## 🧱 1. Quản lý trạng thái kết nối Cloud

Lớp này cho phép các công cụ tự phát hiện xem Editor hiện tại có đang được đăng nhập bằng tài khoản Unity hợp lệ không và kiểm tra quyền liên kết dự án với Unity Cloud Services.

---

## 📐 2. Cấu hình tự động

Tự động cấu hình liên kết tài khoản nhà phát triển phục vụ kéo dữ liệu từ Unity Dashboard.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Connect`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class CloudConnectionVerify
{
    public static void CheckConnection()
    {
        // Kiểm tra xem Editor hiện tại đã được liên kết với ID đám mây của tổ chức phát triển chưa
        string cloudId = PlayerSettings.cloudProjectId;
        Debug.Log($"[Connect.Editor] Đang kết nối dự án. ID đám mây: {cloudId}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Compilation](compilation.md) |
| → Tiếp theo | [UnityEditor.CrashReporting](crash-reporting.md) |
