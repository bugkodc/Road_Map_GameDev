# UnityEngine.AdaptivePerformance

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.AdaptivePerformance](https://docs.unity3d.com/ScriptReference/UnityEngine.AdaptivePerformance.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý hiệu năng thích ứng, cho phép game tự động phát hiện tình trạng nhiệt độ, CPU/GPU quá tải của thiết bị di động để tự điều chỉnh đồ họa nhằm giữ FPS ổn định và tiết kiệm pin.

---

## 🧱 1. Cơ chế hoạt động của Adaptive Performance

Adaptive Performance giúp game tương tác trực tiếp với hệ điều hành của thiết bị di động (đặc biệt là Samsung Android) để theo dõi:
* **Thermal Warning Level**: Mức độ nóng lên của thiết bị.
* **CPU/GPU Bottleneck**: Nghẽn cổ chai tại CPU hay GPU.

Dựa trên các chỉ số này, game có thể chủ động hạ độ phân giải, giảm chất lượng đổ bóng, hoặc khóa FPS xuống mức thấp hơn để ngăn hiện tượng giảm hiệu năng đột ngột do thiết bị quá nhiệt (Thermal Throttling).

---

## 📐 2. Cách thức tự động điều chỉnh hiệu năng

Bằng cách đăng ký nhận sự kiện thay đổi trạng thái nhiệt, lập trình viên có thể thay đổi các thiết lập chất lượng đồ họa (`QualitySettings`) hoặc quy mô phân giải (`ScalableBufferManager`) một cách linh hoạt trong runtime.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.AdaptivePerformance`.

```csharp
using UnityEngine;
#if UNITY_ADAPTIVEPERFORMANCE
using UnityEngine.AdaptivePerformance;
#endif

public class PerformanceAdapter : MonoBehaviour
{
#if UNITY_ADAPTIVEPERFORMANCE
    private IAdaptivePerformance ap;

    void Start()
    {
        ap = Holder.Instance;
        if (ap != null && ap.Active)
        {
            ap.ThermalStatus.ThermalEvent += OnThermalChange;
        }
    }

    private void OnThermalChange(ThermalStatusEventArgs ev)
    {
        if (ev.ThermalWarningLevel == ThermalWarningLevel.Warning)
        {
            // Thiết bị bắt đầu nóng lên -> Giảm chất lượng đồ họa
            QualitySettings.SetQualityLevel(0, true); // Chuyển về mức Low
            Application.targetFrameRate = 30; // Giới hạn FPS
            Debug.LogWarning("[AdaptivePerformance] Thiết bị nóng! Đã hạ cấu hình xuống Low.");
        }
    }
#endif
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Accessibility](accessibility.md) |
| → Tiếp theo | [UnityEngine.AMD](amd.md) |
