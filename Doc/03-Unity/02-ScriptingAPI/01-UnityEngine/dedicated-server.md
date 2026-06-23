# UnityEngine.DedicatedServer

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.DedicatedServer](https://docs.unity3d.com/ScriptReference/UnityEngine.DedicatedServer.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cấu hình tối ưu hóa dành riêng cho việc biên dịch chạy máy chủ chuyên dụng (Dedicated Server), ngắt kết nối render hình ảnh để giảm tải tối đa CPU.

---

## 🧱 1. Tối ưu máy chủ chuyên dụng (Headless Server)

Khi build game dưới dạng Dedicated Server (chạy không màn hình - Headless Mode), chúng ta cần ngắt bỏ toàn bộ các tiến trình xử lý đồ họa, âm thanh để tiết kiệm tài nguyên hệ thống.

* **`DedicatedServer`**: API hỗ trợ kiểm tra và ngắt các tài nguyên không dùng đến trên server.
* **Tiết kiệm CPU**: Tắt các tính năng Mesh Renderers, Animator cập nhật hình ảnh giúp server có thể chịu tải số lượng phòng chơi lớn hơn gấp nhiều lần.

---

## 📐 2. Cạm bẫy NullReference khi viết code dùng chung

Nếu mã nguồn chạy chung giữa Client và Server (Shared Code), việc gọi trực tiếp các phương thức liên quan đến `Camera.main` hoặc `AudioSource` trên Server sẽ gây crash. Luôn kiểm tra môi trường trước khi gọi.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.DedicatedServer`.

```csharp
using UnityEngine;

public class ServerVisualStripper : MonoBehaviour
{
    void Awake()
    {
        // Kiểm tra xem game có đang chạy ở chế độ Server chuyên dụng không
        #if DEDICATED_SERVER || UNITY_SERVER
        Debug.Log("[Server] Phát hiện môi trường Dedicated Server. Đang gỡ bỏ đồ họa...");
        
        // Tắt MeshRenderer của đối tượng để giải phóng GPU/CPU render
        if (TryGetComponent<MeshRenderer>(out MeshRenderer mr))
        {
            Destroy(mr);
        }
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.CrashReportHandler](crash-report-handler.md) |
| → Tiếp theo | [UnityEngine.Diagnostics](diagnostics.md) |
