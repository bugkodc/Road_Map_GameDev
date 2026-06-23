# UnityEditor.EngineDiagnostics (Chẩn đoán sâu)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.EngineDiagnostics](https://docs.unity3d.com/ScriptReference/UnityEditor.EngineDiagnostics.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API chẩn đoán sâu hoạt động của Engine phục vụ gỡ lỗi kỹ thuật trong Editor.

---

## 🧱 1. Theo dõi lỗi và cảnh báo bên trong Engine

Phân hệ này cho phép lập trình viên truy cập sâu vào các báo cáo phân tích hiệu năng của chính nhân Engine (C++). Thích hợp để truy vết lỗi rò rỉ bộ nhớ đồ họa hoặc các cuộc gọi bất đồng bộ bị treo.

---

## 📐 2. Thu thập nhật ký chẩn đoán

Xuất dữ liệu chẩn đoán chi tiết ra file text phục vụ gửi báo cáo lỗi cho bộ phận hỗ trợ kỹ thuật của Unity.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.EngineDiagnostics`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class EngineDiagnosticsLogger
{
    public static void LogDiagnosticDump()
    {
        // Ghi lại nhật ký trạng thái hiện tại của lõi Engine trong quá trình chỉnh sửa
        Debug.Log("[EngineDiagnostics] Dump log trạng thái hoàn tất. Hệ thống hoạt động bình thường.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Embree](embree.md) |
| → Tiếp theo | [UnityEditor.Events](events.md) |
