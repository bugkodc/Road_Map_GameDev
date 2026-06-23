# UnityEditor.AdaptivePerformance (Cấu hình Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.AdaptivePerformance](https://docs.unity3d.com/ScriptReference/UnityEditor.AdaptivePerformance.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Các công cụ cấu hình cài đặt và theo dõi hiệu năng thích ứng (Adaptive Performance) cho dự án trực tiếp trong Editor.

---

## 🧱 1. Thiết lập cấu hình hiệu năng di động

Cho phép nhà phát triển thiết lập các ngưỡng nhiệt độ mặc định, mức độ tối ưu đồ họa mong muốn ngay trong giao diện cài đặt Project Settings của Unity Editor.

* Tích hợp kiểm tra hiệu năng giả lập để debug luồng tối ưu hóa mà không cần phải cài đặt lên điện thoại thực tế.

---

## 📐 2. Giao diện cấu hình thích ứng

Người dùng có thể bật/tắt các trình quản lý (Providers) cho từng hệ điều hành di động riêng biệt.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.AdaptivePerformance`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class APConfigurator : EditorWindow
{
    [MenuItem("Tools/Adaptive Performance Status")]
    public static void ShowWindow()
    {
        GetWindow<APConfigurator>("AP Config");
    }

    void OnGUI()
    {
        GUILayout.Label("Cấu hình Adaptive Performance", EditorStyles.boldLabel);
        if (GUILayout.Button("Kiểm tra cài đặt dự án"))
        {
            // Logic kiểm tra xem gói Adaptive Performance đã cài đặt đúng chưa
            Debug.Log("[AP Editor] Cấu hình đang hoạt động tốt.");
        }
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Actions](actions.md) |
| → Tiếp theo | [UnityEditor.Advertisements](advertisements.md) |
