# Unity.CodeEditor (Tích hợp IDE soạn thảo code)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.CodeEditor](https://docs.unity3d.com/ScriptReference/Unity.CodeEditor.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API kết nối và cấu hình tích hợp với các trình soạn thảo mã nguồn bên ngoài (như Visual Studio, VS Code, Rider).

---

## 🧱 1. Đồng bộ hóa mã nguồn với IDE bên ngoài

Cho phép viết script tự động hóa thiết lập cấu hình IDE yêu thích của lập trình viên, hoặc tự động tạo các tệp solution `.sln` và `.csproj` phù hợp sau khi có thay đổi tài nguyên ngoài hệ thống.

---

## 📐 2. Cấu hình Editor mặc định

Thay đổi cài đặt trình biên tập code mặc định của Unity Editor thông qua cấu hình preferences.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.CodeEditor`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using Unity.CodeEditor;

public class IDEIntegrator
{
    public static void SyncSolution()
    {
        // Đồng bộ hóa các tệp cấu hình mã nguồn với IDE bên ngoài qua CodeEditor API
        CodeEditor.Editor.CurrentCodeEditor.SyncAll();
        Debug.Log($"[CodeEditor] Đã kích hoạt đồng bộ hóa giải pháp mã nguồn với IDE: {CodeEditor.Editor.CurrentCodeEditor.Name}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Burst](burst.md) |
| → Tiếp theo | [Unity.Collections](02-collections.md) |
