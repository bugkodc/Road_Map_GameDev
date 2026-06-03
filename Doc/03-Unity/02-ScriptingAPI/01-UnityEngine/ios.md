# UnityEngine.iOS

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.iOS](https://docs.unity3d.com/ScriptReference/UnityEngine.iOS.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Lập trình tương tác đặc thù với iOS: Điều khiển phản hồi xúc giác (Haptic Feedback), tạo thông báo đẩy Local Notifications, và cấu hình bàn phím ảo iOS.

---

## 🧱 1. Tương tác chuyên sâu với hệ thống iOS

Lớp `UnityEngine.iOS` cung cấp các tính năng giúp game tương thích tốt hơn với hệ sinh thái Apple iOS.

* **`Device.RequestStoreReview`**: Hiển thị hộp thoại đánh giá ứng dụng trực tiếp trong game mà không cần mở App Store.
* **Haptic Feedback**: Sử dụng hệ thống rung phản hồi lực để tăng trải nghiệm xúc giác khi người chơi chiến đấu hoặc click UI.

---

## 📐 2. Cạm bẫy đa nền tảng

Tránh gọi trực tiếp các phương thức của `UnityEngine.iOS` trên Android hoặc PC để không bị lỗi biên dịch. Luôn bao bọc mã trong `#if UNITY_IOS`.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.iOS`.

```csharp
using UnityEngine;

public class iOSManager : MonoBehaviour
{
    public void RequestAppRating()
    {
        #if UNITY_IOS
        // Yêu cầu người dùng đánh giá game trên App Store (an toàn không gây gián đoạn)
        UnityEngine.iOS.Device.RequestStoreReview();
        Debug.Log("[iOS] Đã gửi yêu cầu đánh giá ứng dụng.");
        #else
        Debug.Log("[iOS] Yêu cầu đánh giá chỉ khả dụng trên thiết bị iOS.");
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Identifiers](identifiers.md) |
| → Tiếp theo | [UnityEditor Core API](../02-UnityEditor/01-editor-core.md) |
