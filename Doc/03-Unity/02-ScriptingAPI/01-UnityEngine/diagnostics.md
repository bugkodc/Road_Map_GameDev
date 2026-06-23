# UnityEngine.Diagnostics

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Diagnostics](https://docs.unity3d.com/ScriptReference/UnityEngine.Diagnostics.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Các API đo đạc và chẩn đoán sâu tình trạng hoạt động của Engine, bao gồm kiểm tra tính toàn vẹn của dữ liệu và chẩn đoán bộ nhớ.

---

## 🧱 1. Chẩn đoán và Giám sát bộ nhớ hệ thống

Không gian tên `UnityEngine.Diagnostics` cung cấp các công cụ gỡ lỗi cực mạnh, cho phép lập trình viên kiểm tra độ ổn định của trò chơi dưới các điều kiện khắc nghiệt.

* **`Utils.ForceCrash`**: Giả lập sập game cố ý để kiểm tra xem hệ thống lưu trữ lưu lại checkpoint đúng cách không hoặc kiểm tra hệ thống báo cáo lỗi.
* **Chỉ sử dụng khi gỡ lỗi**: Lớp này chỉ nên được kích hoạt trong môi trường phát triển (Development Builds).

---

## 📐 2. Cảnh báo an toàn

Tuyệt đối không để sót các dòng mã `ForceCrash` trong bản build thương mại phát hành cho người chơi trên cửa hàng ứng dụng.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Diagnostics`.

```csharp
using UnityEngine;
using UnityEngine.Diagnostics;

public class SystemDebugger : MonoBehaviour
{
    public void SimulateSystemError()
    {
        if (Debug.isDebugBuild)
        {
            Debug.LogWarning("[Diagnostics] Đang giả lập lỗi truy cập bộ nhớ...");
            // Cố ý gây sập game để kiểm tra hệ thống ghi nhận log
            Utils.ForceCrash(ForcedCrashCategory.AccessViolation);
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.DedicatedServer](dedicated-server.md) |
| → Tiếp theo | [UnityEngine.Experimental](experimental.md) |
