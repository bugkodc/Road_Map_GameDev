# UnityEditor.Callbacks (Sự kiện Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Callbacks](https://docs.unity3d.com/ScriptReference/UnityEditor.Callbacks.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Đăng ký các hàm tự kích hoạt (Callback) sau khi Unity hoàn tất biên dịch code (DidReloadScripts) hoặc sau khi build game hoàn tất (PostProcessBuild).

---

## 🧱 1. Bắt các sự kiện vòng đời Editor

Lớp `UnityEditor.Callbacks` cung cấp các Attribute cực kỳ hữu ích để chạy các hàm khởi tạo cấu hình tự động.

* **`[DidReloadScripts]`**: Tự động chạy mỗi khi mã nguồn C# được biên dịch xong trong Editor. Rất thích hợp để khởi tạo lại dữ liệu Cache hoặc kiểm tra lỗi cấu trúc dữ liệu.
* **`[PostProcessBuild]`**: Chạy sau khi file chạy game được tạo ra (thường dùng để chỉnh sửa file Xcode project của iOS hoặc sao chép file cấu hình bổ sung).

---

## 📐 2. Cạm bẫy vòng lặp vô hạn

Trong hàm đánh dấu `DidReloadScripts`, tránh gọi các phương thức làm thay đổi Asset và lưu Asset (`AssetDatabase.SaveAssets`) vì việc này lại kích hoạt biên dịch lại, tạo ra vòng lặp vô hạn.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Callbacks`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Callbacks;

public class EditorCompilationCallback
{
    [DidReloadScripts]
    private static void OnScriptsReloaded()
    {
        // Tự động kích hoạt khi lập trình viên quay lại Unity sau khi sửa code trong IDE
        Debug.Log("[Callbacks.Editor] Mã nguồn C# đã được biên dịch thành công! Đang đồng bộ hóa dữ liệu...");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Build](build.md) |
| → Tiếp theo | [UnityEditor.Categorization](categorization.md) |
