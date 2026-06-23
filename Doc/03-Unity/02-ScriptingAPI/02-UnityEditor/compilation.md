# UnityEditor.Compilation (Quản lý Biên dịch)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Compilation](https://docs.unity3d.com/ScriptReference/UnityEditor.Compilation.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Quản lý việc biên dịch các file mã nguồn C# trong Editor, can thiệp thứ tự biên dịch và nạp thư viện động.

---

## 🧱 1. Điều khiển tiến trình biên dịch mã nguồn C#

Unity tự động chia nhỏ các file mã nguồn của bạn thành nhiều Assembly khác nhau dựa trên các tệp `.asmdef` (Assembly Definition). Phân hệ `UnityEditor.Compilation` cho phép bạn đăng ký các sự kiện theo dõi bắt đầu biên dịch, biên dịch hoàn tất của từng Assembly con.

---

## 📐 2. Ứng dụng trong CI/CD và Kiểm thử

Rất hữu ích để đo đạc thời gian biên dịch mã nguồn của dự án và tối ưu cấu trúc phân chia tệp `.asmdef` giúp giảm thiểu thời gian chờ đợi của lập trình viên.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Compilation`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Compilation;

public class CompilationListener
{
    [InitializeOnLoadMethod]
    private static void ListenCompilation()
    {
        // Đăng ký sự kiện lắng nghe khi tiến trình biên dịch hoàn tất một Assembly
        CompilationPipeline.assemblyCompilationFinished += (path, messages) =>
        {
            Debug.Log($"[Compilation.Editor] Assembly đã biên dịch xong: {path}. Số thông điệp lỗi: {messages.Length}");
        };
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Categorization](categorization.md) |
| → Tiếp theo | [UnityEditor.Connect](connect.md) |
