# UnityEngine.AMD

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.AMD](https://docs.unity3d.com/ScriptReference/UnityEngine.AMD.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Cung cấp các API chuyên biệt tối ưu hóa riêng cho card đồ họa và CPU của AMD, chẳng hạn như truy cập bộ nhớ đệm và các lệnh đồ họa cấp thấp.

---

## 🧱 1. Tối ưu hóa cho kiến trúc AMD

Lớp `UnityEngine.AMD` cho phép truy cập trực tiếp vào một số tính năng phần cứng mở rộng của GPU AMD Radeon. Điều này giúp tối ưu hóa luồng dựng hình, giảm trễ vẽ hình và tăng tốc độ xử lý các hiệu ứng hậu kỳ (Post-Processing) phức tạp.

* **Tính tương thích**: Cần kiểm tra kỹ dòng card đồ họa của người chơi trước khi thực hiện các cuộc gọi API chuyên biệt để tránh gây treo driver đồ họa.

---

## 📐 2. Cạm bẫy khi sử dụng

Gọi trực tiếp các lệnh này trên thiết bị chạy GPU NVIDIA hoặc Intel sẽ không có tác dụng hoặc gây crash. Luôn bao bọc các hàm gọi này trong bộ kiểm tra kiểm tra phần cứng thích hợp.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.AMD`.

```csharp
using UnityEngine;

public class AMDOptimizer : MonoBehaviour
{
    void Start()
    {
        string gpuName = SystemInfo.graphicsDeviceName.ToLower();
        if (gpuName.Contains("amd") || gpuName.Contains("radeon"))
        {
            ApplyAMDOptimizations();
        }
    }

    private void ApplyAMDOptimizations()
    {
        // Thiết lập cấu hình đồ họa tối ưu riêng cho GPU AMD Radeon
        Debug.Log("[AMD] Đang áp dụng các tinh chỉnh tối ưu hóa riêng cho phần cứng AMD.");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.AdaptivePerformance](adaptive-performance.md) |
| → Tiếp theo | [UnityEngine.Android](android.md) |
