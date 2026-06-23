# Unity.Loading (Quản lý luồng nạp dữ liệu)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Loading](https://docs.unity3d.com/ScriptReference/Unity.Loading.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API điều khiển luồng nạp và giải nén dữ liệu trong bộ nhớ RAM lúc runtime.

---

## 🧱 1. Tối ưu hóa thời gian tải màn chơi (Loading Screens)

Phân hệ `Unity.Loading` cho phép kiểm soát thứ tự giải nén tài nguyên, cấu hình giới hạn băng thông CPU dành cho việc nạp cảnh nhằm giúp game giữ được khung hình mượt mà ngay cả khi đang tải bản đồ mới ở chế độ chạy nền.

---

## 📐 2. Cấu hình kích thước bộ đệm

Điều chỉnh kích thước bộ nhớ đệm nạp tệp (Background Loading Priority) để ưu tiên tốc độ tải tối đa hoặc độ mượt mà của game.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Loading`.

```csharp
using UnityEngine;

public class LoadingSpeedAdjuster : MonoBehaviour
{
    void Start()
    {
        // Đặt mức độ ưu tiên nạp dữ liệu chạy nền ở mức cao nhất
        Application.backgroundLoadingPriority = ThreadPriority.High;
        Debug.Log("[Loading] Đã đặt mức ưu tiên nạp tài nguyên chạy nền sang High để rút ngắn thời gian load.");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Jobs](jobs.md) |
| → Tiếp theo | [Unity.Mathematics](01-mathematics.md) |
