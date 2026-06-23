# UnityEditor.DeviceSimulation (Mô phỏng Thiết bị)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.DeviceSimulation](https://docs.unity3d.com/ScriptReference/UnityEditor.DeviceSimulation.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API điều khiển mô phỏng thiết bị (Device Simulator) thông qua mã C#, cho phép tự động test xoay màn hình và độ phân giải.

---

## 🧱 1. Tự động hóa kiểm thử trên giả lập di động

Bộ giả lập thiết bị (Device Simulator) là công cụ tuyệt vời để xem giao diện game hiển thị như thế nào trên màn hình tai thỏ, đục lỗ của các dòng máy như iPhone, Samsung. API này cho phép thay đổi giả lập thiết bị qua mã nguồn.

---

## 📐 2. Mô phỏng xoay màn hình (Orientation)

Tự động đổi hướng màn hình từ ngang sang dọc và ngược lại để kiểm tra xem hệ thống UI tự thích ứng (Responsive UI Layout) có hoạt động đúng không.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.DeviceSimulation`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#if UNITY_DEVICE_SIMULATOR
using UnityEditor.DeviceSimulation;
#endif

public class SimulatorAutomation
{
    public static void TestRotateScreen()
    {
        #if UNITY_DEVICE_SIMULATOR
        // Thay đổi hướng màn hình giả lập sang chế độ xoay dọc (Portrait)
        var simulator = DeviceSimulator.GetWindow();
        if (simulator != null)
        {
            simulator.SetOrientation(ScreenOrientation.Portrait);
            Debug.Log("[DeviceSimulation.Editor] Đã chuyển đổi hướng màn hình giả lập sang Portrait.");
        }
        #endif
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.CrashReporting](crash-reporting.md) |
| → Tiếp theo | [UnityEditor.EditorTools](editor-tools.md) |
