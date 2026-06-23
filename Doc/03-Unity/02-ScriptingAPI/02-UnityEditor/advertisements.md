# UnityEditor.Advertisements (Quản lý Quảng cáo)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Advertisements](https://docs.unity3d.com/ScriptReference/UnityEditor.Advertisements.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý và thiết lập cấu hình tích hợp gói quảng cáo Unity Ads cho các nền tảng di động trong Editor.

---

## 🧱 1. Tự động hóa tích hợp Unity Ads

Lớp này hỗ trợ cấu hình ID trò chơi của Unity Ads cho các nền tảng Google Play và Apple App Store trực tiếp qua mã C# Editor, rất tiện lợi cho các hệ thống Build tự động (CI/CD Pipelines).

---

## 📐 2. Quản lý trạng thái quảng cáo

Lập trình viên có thể bật chế độ chạy thử quảng cáo (Test Mode) khi phát triển để tránh vi phạm chính sách hiển thị của nhà cung cấp mạng quảng cáo.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Advertisements`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AdsBuildSetup : MonoBehaviour
{
    public static void ConfigureAds(string androidGameId, bool testMode)
    {
        // Mã cấu hình phân hệ quảng cáo tự động lúc Build game
        Debug.Log($"[Ads.Editor] Cấu hình Ads GameID: {androidGameId}, Test Mode: {testMode}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.AdaptivePerformance](adaptive-performance.md) |
| → Tiếp theo | [UnityEditor.AI](ai.md) |
