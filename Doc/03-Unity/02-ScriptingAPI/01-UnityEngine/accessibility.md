# UnityEngine.Accessibility (Khả năng tiếp cận)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Accessibility](https://docs.unity3d.com/ScriptReference/UnityEngine.Accessibility.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cung cấp các API hỗ trợ khả năng tiếp cận (Accessibility) trong game, tích hợp với các công cụ đọc màn hình (Screen Readers) và cấu hình phím điều khiển đặc biệt dành cho người chơi khuyết tật.

---

## 🧱 1. Tích hợp Hỗ trợ Đọc màn hình & Phụ đề

Trong phát triển game hiện đại, khả năng tiếp cận (Accessibility) là một yếu tố quan trọng giúp tiếp cận nhiều nhóm người chơi hơn. Unity cung cấp các phương thức thông qua lớp `UnityEngine.Accessibility` để tối ưu giao diện đồ họa và âm thanh cho người khuyết tật.

* **`VisionUtility`**: Hỗ trợ phân tích màu sắc giao diện để đảm bảo hiển thị rõ ràng cho người mù màu.
* **`VisionUtility.GetColorBlindSafePalette`**: Tự động sinh ra bảng màu an toàn cho người mù màu (Protanopia, Deuteranopia, Tritanopia).

---

## 📐 2. Cấu hình bảng màu mù màu và Phụ đề

Việc tạo các bảng màu tương phản cao giúp người chơi dễ nhìn thấy các chi tiết giao diện quan trọng. Đồng thời, kết hợp với các bộ lọc màu của hệ điều hành để đảm bảo trải nghiệm chơi game tốt nhất.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Accessibility`.

```csharp
using UnityEngine;
using UnityEngine.Accessibility;

public class AccessibilityManager : MonoBehaviour
{
    public Renderer uiElementRenderer;

    void Start()
    {
        // Lấy bảng màu an toàn cho người mù màu
        Color[] safeColors = new Color[5];
        int count = VisionUtility.GetColorBlindSafePalette(safeColors, 0.5f, 1.0f);
        
        if (count > 0 && uiElementRenderer != null)
        {
            // Áp dụng màu an toàn đầu tiên cho phần tử UI mẫu
            uiElementRenderer.material.color = safeColors[0];
            Debug.Log($"[Accessibility] Đã áp dụng {count} màu an toàn cho người chơi.");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Device](12-device-platforms-api.md) |
| → Tiếp theo | [UnityEngine.AdaptivePerformance](adaptive-performance.md) |
