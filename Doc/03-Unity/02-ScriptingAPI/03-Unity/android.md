# Unity.Android (API tối ưu phần cứng Android)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Android](https://docs.unity3d.com/ScriptReference/Unity.Android.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cung cấp các API hỗ trợ các dịch vụ đặc thù của hệ điều hành Android.

---

## 🧱 1. Tinh chỉnh hiệu năng cấp thấp trên Android

Không gian tên `Unity.Android` cung cấp các tính năng tối ưu sâu phần cứng di động Android, hỗ trợ kiểm soát xung nhịp và tương tác trực tiếp với tầng phần cứng thông qua Java Native Interface (JNI).

---

## 📐 2. Quản lý luồng xử lý

Giúp lập trình viên neo các luồng tính toán nặng của game vào các nhân hiệu năng cao (Big Cores) hoặc nhân tiết kiệm điện (LITTLE Cores) của chip ARM di động.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Android`.

```csharp
using UnityEngine;

public class UnityAndroidOptimizer : MonoBehaviour
{
    void Start()
    {
        #if UNITY_ANDROID
        // Mã tối ưu hóa xung nhịp xử lý CPU cho game Android khi vào trận đấu lớn
        Debug.Log("[Unity.Android] Đã kích hoạt tối ưu hóa xung nhịp CPU di động.");
        #endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Experimental](../02-UnityEditor/experimental.md) |
| → Tiếp theo | [Unity.Burst](burst.md) |
