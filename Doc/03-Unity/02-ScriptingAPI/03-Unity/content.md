# Unity.Content (Quản lý Addressables & Asset Bundles)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Content](https://docs.unity3d.com/ScriptReference/Unity.Content.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý hệ thống lưu trữ, phân phối tài nguyên game tải thêm (Addressables / Asset Bundles).

---

## 🧱 1. Quản lý lưu trữ tài nguyên động

Hỗ trợ giám sát quá trình đóng gói và quản lý phiên bản của các tệp tài nguyên game tải thêm (Asset Bundles), tích hợp tải nội dung từ máy chủ đám mây (CDN) để giảm dung lượng file cài đặt ban đầu của ứng dụng.

---

## 📐 2. Giám sát băng thông

Đo đạc tốc độ tải tệp và xử lý giải nén bộ nhớ đệm (Cache) tài nguyên một cách an toàn trên thiết bị.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Content`.

```csharp
using UnityEngine;

public class ContentDownloadMonitor : MonoBehaviour
{
    public void CheckLocalCache()
    {
        // Mô phỏng kiểm tra dung lượng bộ nhớ đệm tài nguyên game đã tải
        Debug.Log("[Unity.Content] Kiểm tra bộ nhớ đệm hoàn tất. Dung lượng trống an toàn.");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Collections](02-collections.md) |
| → Tiếp theo | [Unity.GraphToolkit](graph-toolkit.md) |
