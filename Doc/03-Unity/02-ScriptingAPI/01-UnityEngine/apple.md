# UnityEngine.Apple

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Apple](https://docs.unity3d.com/ScriptReference/UnityEngine.Apple.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cơ chế lập trình tích hợp sâu với hệ điều hành Apple: Hỗ trợ Game Center, lưu trữ iCloud, Apple TV, và quản lý các thiết lập dành riêng cho iOS/macOS.

---

## 🧱 1. Hỗ trợ các tính năng của nền tảng Apple

Không gian tên `UnityEngine.Apple` cung cấp quyền truy cập vào các tính năng đặc trưng của nền tảng Apple để cải thiện trải nghiệm chơi game.

* **iCloud Key-Value Store**: Lưu trữ các cài đặt nhỏ gọn hoặc tiến trình game đồng bộ qua đám mây của Apple.
* **ReplayKit**: Cho phép người chơi quay màn hình quá trình chơi game trực tiếp từ thiết bị iOS và chia sẻ dễ dàng.

---

## 📐 2. Triển khai ReplayKit an toàn

Trước khi bắt đầu ghi âm/ghi hình, hãy sử dụng `ReplayKit.APIAvailable` để đảm bảo hệ điều hành và thiết bị của người chơi có hỗ trợ tính năng này.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Apple`.

```csharp
using UnityEngine;
#if UNITY_IOS
using UnityEngine.Apple.ReplayKit;
#endif

public class AppleReplayController : MonoBehaviour
{
    public void StartRecording()
    {
        #if UNITY_IOS
        if (ReplayKit.APIAvailable)
        {
            ReplayKit.StartRecording(true, true);
            Debug.Log("[Apple] Bắt đầu quay màn hình thông qua ReplayKit.");
        }
        #endif
    }

    public void StopRecording()
    {
        #if UNITY_IOS
        if (ReplayKit.isRecording)
        {
            ReplayKit.StopRecording();
            Debug.Log("[Apple] Đã dừng quay màn hình.");
        }
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Android](android.md) |
| → Tiếp theo | [UnityEngine.Assemblies](assemblies.md) |
