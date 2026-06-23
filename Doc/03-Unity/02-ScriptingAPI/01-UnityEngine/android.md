# UnityEngine.Android

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Android](https://docs.unity3d.com/ScriptReference/UnityEngine.Android.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API tương tác đặc thù với hệ điều hành Android: Gọi các Activity, kiểm tra và yêu cầu cấp quyền runtime (Permissions), gọi bàn phím Android hoặc kết nối Java native plugins.

---

## 🧱 1. Yêu cầu quyền Runtime an sau trên Android

Kể từ Android 6.0, các quyền nhạy cảm như Camera, Microphone hay Vị trí phải được người dùng cấp phép lúc ứng dụng đang chạy (Runtime Permission). Lớp `UnityEngine.Android.Permission` cung cấp cơ chế kiểm tra và hiển thị hộp thoại yêu cầu cấp quyền trực tiếp.

* **`Permission.HasUserAuthorizedPermission`**: Kiểm tra xem người dùng đã đồng ý cấp quyền chưa.
* **`Permission.RequestUserPermission`**: Hiển thị hộp thoại xin quyền.

---

## 📐 2. Cạm bẫy khi xin quyền

Việc xin quyền diễn ra bất đồng bộ. Đừng cố gắng sử dụng tính năng (ví dụ: mở camera) ngay sau dòng gọi `RequestUserPermission` mà hãy kiểm tra quyền thông qua callback hoặc kiểm tra định kỳ trong Update.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Android`.

```csharp
using UnityEngine;
using UnityEngine.Android;

public class AndroidPermissionsHandler : MonoBehaviour
{
    void Start()
    {
        #if UNITY_ANDROID
        if (!Permission.HasUserAuthorizedPermission(Permission.Camera))
        {
            // Yêu cầu quyền truy cập Camera của Android
            Permission.RequestUserPermission(Permission.Camera);
        }
        else
        {
            Debug.Log("[Android] Camera đã được cấp quyền trước đó.");
        }
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.AMD](amd.md) |
| → Tiếp theo | [UnityEngine.Apple](apple.md) |
