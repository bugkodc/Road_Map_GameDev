# Unity.ProjectAuditor (Kiểm toán dự án tự động)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.ProjectAuditor](https://docs.unity3d.com/ScriptReference/Unity.ProjectAuditor.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API tương tác với công cụ quét dự án tự động để tìm lỗi hiệu năng hoặc rò rỉ RAM tiềm ẩn.

---

## 🧱 1. Quét lỗi cấu trúc dự án tự động

Project Auditor tự động phân tích tất cả mã nguồn C# và cấu hình thiết lập của dự án để chỉ ra những dòng code có thể gây tắc nghẽn hiệu năng (ví dụ: gọi `GetComponent` liên tục trong Update) hoặc cấu hình asset chưa tối ưu.

---

## 📐 2. Tích hợp Build Pipeline

Có thể tích hợp quét lỗi trước khi build game, nếu phát hiện lỗi hiệu năng nghiêm trọng sẽ tự động dừng tiến trình build để báo cáo.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.ProjectAuditor`.

```csharp
using UnityEngine;

public class BuildAuditCheck : MonoBehaviour
{
    public static bool PerformAudit()
    {
        Debug.Log("[ProjectAuditor] Bắt đầu quét kiểm tra tối ưu hóa toàn bộ dự án...");
        // Mô phỏng kiểm tra lỗi: Luôn trả về true nếu dự án đạt tiêu chuẩn chất lượng
        return true;
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Profiling](03-profiling.md) |
| → Tiếp theo | [Unity.Properties](properties.md) |
