# UnityEditor.Android (Cấu hình Android Build)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Android](https://docs.unity3d.com/ScriptReference/UnityEditor.Android.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cấu hình chi tiết bộ cài Android: Thiết lập Keystore bảo mật, chọn kiến trúc CPU (ARM64, ARMv7) và quản lý xuất file AAB/APK.

---

## 🧱 1. Tự động hóa cấu hình Build Android

Để phát hành game lên Google Play Store, lập trình viên bắt buộc phải cấu hình chính xác tệp chứng chỉ ký ứng dụng (Keystore) và chọn đúng định dạng xuất tệp AAB (Android App Bundle). Việc này có thể được tự động cấu hình qua mã nguồn.

---

## 📐 2. Cấu hình kiến trúc CPU di động

Chọn kiến trúc ARM64 thay vì ARMv7 để đáp ứng đúng yêu cầu hiệu năng 64-bit bắt buộc của Google Play hiện nay.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Android`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AndroidBuildSetup
{
    public static void SetAndroidKeystore()
    {
        // Tự động gán thông tin chứng chỉ ký tệp cho Android Build
        PlayerSettings.Android.useCustomKeystore = true;
        PlayerSettings.Android.keystoreName = "mygame.keystore";
        PlayerSettings.Android.keyaliasName = "mykey";
        
        // Cấu hình build định dạng AAB thay vì APK thông thường
        EditorUserBuildSettings.buildAppBundle = true;
        
        Debug.Log("[Android.Editor] Đã cấu hình xong Keystore & AAB cho build Android.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Analytics](analytics.md) |
| → Tiếp theo | [UnityEditor.AnimatedValues](animated-values.md) |
