# UnityEditor.AppleTV (Build Apple TV)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.AppleTV](https://docs.unity3d.com/ScriptReference/UnityEditor.AppleTV.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Thiết lập cài đặt build, chứng chỉ và cấu hình dành riêng cho xuất bản game lên nền tảng Apple TV.

---

## 🧱 1. Xuất bản ứng dụng lên tvOS

API quản lý thiết lập đặc thù cho việc phát triển trên Apple TV (tvOS), bao gồm cấu hình tương thích điều khiển cầm tay (Siri Remote) và xử lý phân giải hiển thị màn hình lớn.

---

## 📐 2. Cài đặt chứng chỉ Apple TV

Tự động hóa gán chứng chỉ ký ứng dụng và cấu hình nhóm ứng dụng (App Group) cho hệ điều hành tvOS.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.AppleTV`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AppleTVBuildSetup
{
    public static void ConfigureAppleTV()
    {
        // Chuyển đổi nền tảng mục tiêu sang Apple TV
        EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.tvOS, BuildTarget.tvOS);
        Debug.Log("[AppleTV.Editor] Đã chuyển đổi mục tiêu build sang Apple TV.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Animations](animations.md) |
| → Tiếp theo | [UnityEditor.Build](build.md) |
