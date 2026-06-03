# Device & Platforms API (Thiết bị và Đa nền tảng)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Device](https://docs.unity3d.com/ScriptReference/Device.Application.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Khi phát hành game đa nền tảng (PC, Mobile, WebGL, Console), mã nguồn cần có khả năng tự động nhận diện và thích ứng với thông số phần cứng của thiết bị (dung lượng pin, kích thước màn hình, hệ điều hành). Đồng thời, lập trình viên cần làm chủ các kỹ thuật biên dịch có điều kiện (Platform-conditional compilation) để tách biệt logic giữa các nền tảng khác nhau một cách an toàn và tối ưu kích thước gói cài đặt.

---

## 📱 1. UnityEngine.Device vs SystemInfo

Kể từ các phiên bản Unity gần đây, lớp **`UnityEngine.Device`** được khuyên dùng để thay thế một số API cũ của lớp `Application` khi chạy trên thiết bị di động:
*   **`Device.Application.identifier`**: Trả về Application ID duy nhất (Package name trên Android, Bundle Identifier trên iOS).
*   **`Device.SystemInfo.batteryLevel`**: Trả về dung lượng pin còn lại (từ `0.0` đến `1.0`). Rất hữu ích để tự động bật chế độ tiết kiệm pin (giảm FPS, giảm chất lượng đồ họa) trong game.
*   **`Device.SystemInfo.systemMemorySize`**: Trả về dung lượng RAM hệ thống. Dựa vào đây để tự động điều chỉnh cấu hình đồ họa (Low/Medium/High) phù hợp cho điện thoại yếu.

---

## ⚙️ 2. Biên dịch có điều kiện (Conditional Compilation)

Khi viết code tương tác với hệ điều hành (ví dụ: gọi SDK thanh toán của Android, hoặc gọi bàn phím ảo của WebGL), các đoạn code đó sẽ báo lỗi compile ngay lập tức khi bạn đổi nền tảng đích sang PC nếu không dùng bộ lọc tiền xử lý.

### Các cờ tiền xử lý Platform phổ biến:
*   `UNITY_EDITOR`: Code chỉ chạy khi đang test trong môi trường Unity Editor trên máy tính.
*   `UNITY_STANDALONE`: Code chạy trên bản build PC (Windows/macOS/Linux).
*   `UNITY_ANDROID` & `UNITY_IOS`: Code chạy trên điện thoại di động.
*   `UNITY_WEBGL`: Code chạy trên nền tảng Web.

```csharp
#if UNITY_ANDROID
    // Đoạn code này chỉ được compiler biên dịch khi build sang Android
    AndroidJavaClass upmClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
#elif UNITY_IOS
    // Đoạn code này chỉ biên dịch khi build sang iOS
    _iosRegisterSDK();
#else
    // Chạy trên các nền tảng khác
    Debug.Log("Chạy trên PC hoặc Editor");
#endif
```

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script mẫu C# hoàn chỉnh thể hiện cách đọc thông số thiết bị để tự động điều chỉnh chất lượng đồ họa game và cách xử lý platform-conditional an toàn.

```csharp
using UnityEngine;

#if UNITY_ANDROID || UNITY_IOS
using UnityEngine.Device; // Import thư viện tối ưu thiết bị di động
#endif

public class PlatformSettingsManager : MonoBehaviour
{
    private void Start()
    {
        ConfigureGraphicsByHardware();
        InitializePlatformSpecifics();
    }

    private void ConfigureGraphicsByHardware()
    {
        // 1. Kiểm tra RAM hệ thống để cấu hình đồ họa ban đầu
        int ramMb = SystemInfo.systemMemorySize;
        Debug.Log($"[Hardware] Dung lượng RAM thiết bị: {ramMb} MB");

        if (ramMb < 2048) // Máy yếu dưới 2GB RAM
        {
            // Thiết lập mức chất lượng đồ họa thấp nhất
            QualitySettings.SetQualityLevel(0, true);
            // Giới hạn FPS ở mức 30 để máy đỡ nóng và tiết kiệm pin
            Application.targetFrameRate = 30;
            Debug.Log("[Hardware] Cấu hình đồ họa: LOW (30 FPS Limit)");
        }
        else // Máy mạnh
        {
            QualitySettings.SetQualityLevel(2, true);
            Application.targetFrameRate = 60;
            Debug.Log("[Hardware] Cấu hình đồ họa: HIGH (60 FPS Limit)");
        }

        // 2. Đọc trạng thái pin trên các thiết bị di động để bật chế độ tiết kiệm pin
#if UNITY_ANDROID || UNITY_IOS
        float battery = SystemInfo.batteryLevel;
        if (battery > 0 && battery < 0.2f) // Pin dưới 20%
        {
            // Hạ độ phân giải dựng hình xuống 0.75 để giảm tải GPU
            ScalableBufferManager.ResizeBuffers(0.75f, 0.75f);
            Debug.Log("[Hardware] Pin yếu! Đã kích hoạt chế độ tiết kiệm năng lượng.");
        }
#endif
    }

    private void InitializePlatformSpecifics()
    {
        // 3. Sử dụng cờ tiền xử lý để gọi API đặc thù
#if UNITY_EDITOR
        Debug.Log("[Platform] Đang chạy trong môi trường Unity Editor Test.");
#elif UNITY_WEBGL
        Debug.Log("[Platform] Đang chạy trên trình duyệt WebGL. Vô hiệu hóa tính năng lưu file cục bộ trực tiếp.");
#elif UNITY_ANDROID
        Debug.Log("[Platform] Khởi chạy SDK Google Play Services.");
#elif UNITY_IOS
        Debug.Log("[Platform] Khởi chạy SDK Apple Game Center.");
#endif
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UI Toolkit & UGUI API (Hệ thống giao diện)](./11-ui-api.md) |
| → Tiếp theo | [Tổng quan Unity Lộ trình](../../00-unity-overview.md) |
