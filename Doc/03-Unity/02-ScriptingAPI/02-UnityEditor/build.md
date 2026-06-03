# UnityEditor.Build (Can thiệp tiến trình Build)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Build](https://docs.unity3d.com/ScriptReference/UnityEditor.Build.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Các API can thiệp vào tiến trình build game (IPreprocessBuild, IPostprocessBuild). Thích hợp tự động hóa tối ưu hình ảnh hoặc nạp mã cấu hình trước khi build.

---

## 🧱 1. Quản lý luồng Build tự động

Bằng cách triển khai các interface như `IPreprocessBuildWithReport` và `IPostprocessBuildWithReport`, lập trình viên có thể thực thi các đoạn mã tùy biến ngay trước và sau khi Unity tiến hành dịch mã nguồn sang file chạy cài đặt.

* **Ứng dụng**: Kiểm tra xem các Scene đã được tối ưu chưa, tự động tăng số phiên bản (Bundle Version) của game, hoặc dọn dẹp các tệp tạm trên ổ đĩa.

---

## 📐 2. Viết tập lệnh Build CI/CD

Tận dụng các interface này giúp quy trình đóng gói game lên máy chủ tự động hóa (ví dụ: Jenkins, GitHub Actions) diễn ra trơn tru mà không cần can thiệp thủ công.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Build`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;

public class CustomBuildPipeline : IPreprocessBuildWithReport
{
    public int callbackOrder => 0; // Thứ tự thực thi (số nhỏ chạy trước)

    public void OnPreprocessBuild(BuildReport report)
    {
        // Đoạn code này tự động chạy ngay trước khi quá trình Build game bắt đầu
        Debug.Log($"[Build.Editor] Đang chuẩn bị build game cho mục tiêu: {report.summary.platform}");
        // Ví dụ: Kiểm tra an toàn trước khi đóng gói
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.AppleTV](apple-tv.md) |
| → Tiếp theo | [UnityEditor.Callbacks](callbacks.md) |
