# UnityEngine.Experimental

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Experimental](https://docs.unity3d.com/ScriptReference/UnityEngine.Experimental.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Không gian chứa các thư viện và API đang trong giai đoạn thử nghiệm (Experimental) của Unity. Chúng có thể được tích hợp chính thức hoặc loại bỏ hoàn toàn trong các bản cập nhật sau.

---

## 🧱 1. Làm việc với các API đang thử nghiệm

Unity thường đưa các công nghệ mới vào không gian tên `UnityEngine.Experimental`. Đây là nơi chứa các tính năng cực kỳ hấp dẫn nhưng chưa được tối ưu hóa hoàn toàn hoặc giao diện lập trình (API) chưa được chốt cố định.

* **Cảnh báo độ ổn định**: API có thể thay đổi hoàn toàn cú pháp ở phiên bản Unity tiếp theo, đòi hỏi lập trình viên phải sửa đổi lại code.

---

## 📐 2. Chiến lược sử dụng an toàn

Luôn bao bọc mã thử nghiệm bằng các chỉ thị tiền xử lý (#if) hoặc tạo các lớp bao bọc (Wrapper) để dễ dàng chuyển đổi sang API chính thức khi chúng ra khỏi giai đoạn thử nghiệm.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Experimental`.

```csharp
using UnityEngine;
// Lưu ý: Các API Experimental có thể thay đổi tùy phiên bản Unity
using UnityEngine.Experimental.Rendering;

public class ExperimentalFeatureTest : MonoBehaviour
{
    void Start()
    {
        // Ví dụ kiểm tra định dạng texture thử nghiệm được hỗ trợ bởi phần cứng hay không
        bool isSupported = SystemInfo.IsFormatSupported(GraphicsFormat.R8G8B8A8_SRGB, FormatUsage.Sample);
        Debug.Log($"[Experimental] Định dạng SRGB thử nghiệm có được hỗ trợ: {isSupported}");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Diagnostics](diagnostics.md) |
| → Tiếp theo | [UnityEngine.Identifiers](identifiers.md) |
