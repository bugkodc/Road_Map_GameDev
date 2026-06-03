# Packages & Assembly Definitions (Quản lý Gói & Định nghĩa Phân vùng Code)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp từ [Unity Manual — Packages](https://docs.unity3d.com/Manual/Packages.html) và [Assembly Definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)
Làm chủ hệ thống quản lý gói tài nguyên (Unity Package Manager - UPM) để tích hợp các thư viện bên thứ ba và cấu hình Scoped Registries. Đồng thời, hiểu sâu và áp dụng Assembly Definitions (`.asmdef`) để phân chia dự án thành các phân vùng code (DLL) độc lập, từ đó tối ưu hóa tốc độ biên dịch (Compilation Time) và ép buộc cấu trúc kiến trúc mã nguồn sạch sẽ, tránh spaghetti code.

---

## 🔑 Khái niệm Cốt lõi & Bản chất (Core Concepts & True Nature)

### 1. Unity Package Manager (UPM) & Cấu trúc manifest.json:
*   **Bản chất hoạt động:** UPM là một trình quản lý gói tương tự như `npm` trong Node.js hay `NuGet` trong .NET. Nó quản lý các gói thông qua tệp cấu hình chính đặt tại `Packages/manifest.json`.
*   **Cơ chế lưu trữ:** Các gói có thể được tham chiếu từ **Unity Registry** (chính chủ), từ một **Git URL** (ví dụ: github), một **Local path** trên máy, hoặc từ một **Scoped Registry**.
*   **Scoped Registries:** Cho phép khai báo các máy chủ lưu trữ package bên ngoài (như OpenUPM). Cấu hình này định nghĩa URL của registry và các "scopes" (nhóm tiền tố tên package, ví dụ: `com.openupm`) để UPM biết khi nào cần tìm kiếm package ở registry ngoài thay vì registry mặc định của Unity.

### 2. Bản chất của Assembly Definitions (.asmdef):
*   **Vấn đề biên dịch đơn khối (Monolithic Compilation):** Mặc định, nếu không cấu hình gì, Unity sẽ gom toàn bộ mã nguồn C# trong thư mục `Assets` và biên dịch chung vào một tệp DLL duy nhất có tên là `Assembly-CSharp.dll`. Khi dự án phình to lên hàng trăm nghìn dòng code, chỉ cần sửa một dấu chấm phẩy, Unity cũng bắt buộc phải biên dịch lại toàn bộ DLL này, gây ra hiện tượng đơ Editor từ 10 - 30 giây (Compile Time Bottleneck).
*   **Giải pháp với `.asmdef`:** Khi bạn tạo một tệp `.asmdef` trong một thư mục, thư mục đó (và các thư mục con của nó) sẽ được cô lập và biên dịch thành một tệp assembly (DLL) riêng biệt (ví dụ: `MyGame.Core.dll`).
*   **Quy trình biên dịch tối ưu:** Khi một file code thay đổi, Unity chỉ biên dịch lại assembly chứa file code đó và các assembly phụ thuộc trực tiếp vào nó. Các phân vùng code độc lập khác hoàn toàn không cần biên dịch lại, giúp rút ngắn thời gian lặp (iteration loop) xuống dưới 1 giây.
*   **Ranh giới kiến trúc:** Assembly Definitions ép buộc kiểm soát phụ thuộc (Dependency Control). Nếu Assembly A muốn gọi code của Assembly B, A bắt buộc phải khai báo tham chiếu (Reference) tới B. Nếu không, trình biên dịch sẽ báo lỗi ngay lập tức. Điều này giúp ngăn chặn triệt để liên kết vòng (Circular Dependency - A gọi B, B gọi A) và thúc đẩy mô hình thiết kế lỏng (Loose Coupling).

---

## 🎨 Cấu trúc & Vòng đời (Structure & Lifecycle)

Sơ đồ dưới đây so sánh sự khác biệt trong kiến trúc biên dịch giữa dự án Unity mặc định (không dùng `.asmdef`) và dự án chuẩn hóa Modular (sử dụng các file `.asmdef` riêng biệt):

```mermaid
graph TD
    subgraph Kich_Thuoc_Monolithic [1. Biên dịch Mặc định (Chậm & Spaghetti)]
        A1[PlayerInput.cs] -->|Biên dịch chung| AC[Assembly-CSharp.dll]
        A2[HealthSystem.cs] -->|Biên dịch chung| AC
        A3[UIPanel.cs] -->|Biên dịch chung| AC
        A4[ThirdPartyPlugin.cs] -->|Biên dịch chung| AC
        Note over AC: Thay đổi 1 dòng code ở bất kỳ file nào<br/>buộc biên dịch lại toàn bộ DLL này.
    end

    subgraph Kich_Thuoc_Modular [2. Biên dịch Modular với Assembly Definitions (Nhanh & Sạch)]
        M1[PlayerInput.cs] -->|Thuộc về| ASM_Gameplay[MyGame.Gameplay.asmdef]
        M2[HealthSystem.cs] -->|Thuộc về| ASM_Core[MyGame.Core.asmdef]
        M3[UIPanel.cs] -->|Thuộc về| ASM_UI[MyGame.UI.asmdef]
        
        ASM_Gameplay -->|Tham chiếu / Phụ thuộc| ASM_Core
        ASM_UI -->|Tham chiếu / Phụ thuộc| ASM_Core
        
        ASM_Gameplay -.->|Biên dịch riêng| DLL_Gameplay[MyGame.Gameplay.dll]
        ASM_Core -.->|Biên dịch riêng| DLL_Core[MyGame.Core.dll]
        ASM_UI -.->|Biên dịch riêng| DLL_UI[MyGame.UI.dll]
        
        Note over DLL_Core: Nếu sửa code ở MyGame.Gameplay.dll:<br/>Chỉ biên dịch duy nhất DLL đó.<br/>DLL_Core và DLL_UI được giữ nguyên cache!
    end
```

---

## 💻 Mã nguồn C# Scripting API (C# Example)

Để minh họa cách thức hoạt động thực tế của Assembly Definitions, chúng ta giả lập một dự án được chia làm 2 phân vùng Assembly:
1.  **Assembly `MyGame.Core`**: Chứa các thư viện và hệ thống nền tảng cốt lõi (ví dụ: Hệ thống Log tùy biến).
2.  **Assembly `MyGame.Gameplay`**: Chứa code logic game (ví dụ: Player controller), có tham chiếu và gọi sử dụng thư viện từ `MyGame.Core`.

### Cấu hình Assembly `MyGame.Core`:
Tệp tin lưu tại `Assets/Scripts/Core/MyGame.Core.asmdef`:
```json
{
    "name": "MyGame.Core",
    "rootNamespace": "MyGame.Core",
    "references": [],
    "includePlatforms": [],
    "excludePlatforms": [],
    "allowUnsafeCode": false,
    "overrideReferences": false,
    "precompiledReferences": [],
    "autoReferenced": true,
    "defineConstraints": [],
    "versionDefines": [],
    "noEngineReferences": false
}
```

Mã nguồn C# trong Assembly `MyGame.Core` (`Assets/Scripts/Core/GameLogger.cs`):
```csharp
using UnityEngine;

namespace MyGame.Core
{
    /// <summary>
    /// Hệ thống ghi nhật ký (Log) tập trung của dự án, hỗ trợ cấu hình cấp độ log.
    /// </summary>
    public static class GameLogger
    {
        public enum LogLevel
        {
            Info,
            Warning,
            Error
        }

        private static LogLevel currentMinLevel = LogLevel.Info;

        public static void SetMinLogLevel(LogLevel level)
        {
            currentMinLevel = level;
        }

        public static void LogInfo(string message, string systemName = "System")
        {
            if (currentMinLevel <= LogLevel.Info)
            {
                Debug.Log($"<color=#3498db>[INFO - {systemName}]</color> {message}");
            }
        }

        public static void LogWarning(string message, string systemName = "System")
        {
            if (currentMinLevel <= LogLevel.Warning)
            {
                Debug.LogWarning($"<color=#f1c40f>[WARN - {systemName}]</color> {message}");
            }
        }

        public static void LogError(string message, string systemName = "System")
        {
            if (currentMinLevel <= LogLevel.Error)
            {
                Debug.LogError($"<color=#e74c3c>[ERROR - {systemName}]</color> {message}");
            }
        }
    }
}
```

---

### Cấu hình Assembly `MyGame.Gameplay` (Phụ thuộc vào `MyGame.Core`):
Tệp tin cấu hình lưu tại `Assets/Scripts/Gameplay/MyGame.Gameplay.asmdef` (Khai báo tham chiếu tới `MyGame.Core` trong trường `"references"`):
```json
{
    "name": "MyGame.Gameplay",
    "rootNamespace": "MyGame.Gameplay",
    "references": [
        "GUID:7bb0b510ed28d444ea87d3a01db54907",
        "MyGame.Core"
    ],
    "includePlatforms": [],
    "excludePlatforms": [],
    "allowUnsafeCode": false,
    "overrideReferences": false,
    "precompiledReferences": [],
    "autoReferenced": true,
    "defineConstraints": [],
    "versionDefines": [],
    "noEngineReferences": false
}
```

Mã nguồn C# trong Assembly `MyGame.Gameplay` (`Assets/Scripts/Gameplay/PlayerController.cs`):
```csharp
using UnityEngine;
// Gọi namespace từ Assembly khác (Bắt buộc phải khai báo tham chiếu .asmdef trước đó)
using MyGame.Core;

namespace MyGame.Gameplay
{
    /// <summary>
    /// Component quản lý hành vi di chuyển cơ bản của người chơi.
    /// </summary>
    [AddComponentMenu("Unity Manual/Player Controller (Modular)")]
    public class PlayerController : MonoBehaviour
    {
        [SerializeField] private float moveSpeed = 5f;
        
        private void Start()
        {
            // Sử dụng thư viện tiện ích từ Core Assembly
            GameLogger.LogInfo($"Khởi tạo PlayerController trên đối tượng: {gameObject.name}", "Gameplay");
        }

        private void Update()
        {
            float horizontal = Input.GetAxisRaw("Horizontal");
            float vertical = Input.GetAxisRaw("Vertical");

            Vector3 direction = new Vector3(horizontal, 0f, vertical).normalized;

            if (direction.magnitude >= 0.1f)
            {
                transform.Translate(direction * (moveSpeed * Time.deltaTime), Space.World);
                
                // Ghi log chi tiết (Thực tế nên tránh gọi log trong Update, ở đây dùng để demo gọi thư viện)
                GameLogger.LogInfo($"Người chơi đang di chuyển hướng: {direction}", "Gameplay");
            }
        }

        public void TakeDamage(int amount)
        {
            if (amount < 0)
            {
                GameLogger.LogWarning($"Lượng sát thương nhận vào không hợp lệ: {amount}", "Gameplay");
                return;
            }
            
            GameLogger.LogError($"Người chơi nhận {amount} sát thương!", "Gameplay");
        }
    }
}
```

---

## ⚙️ Các bước thực hiện & Lưu ý thực chiến (Best Practices)

1.  **Quản lý Registry mở rộng (Scoped Registry):**
    *   Khi sử dụng OpenUPM hoặc các thư viện ngoài, thay vì tải thủ công tệp `.unitypackage` về thư mục Assets (làm phình kho lưu trữ Git), hãy khai báo scoped registry trực tiếp trong `Packages/manifest.json` như sau:
    ```json
    "scopedRegistries": [
      {
        "name": "package.openupm.com",
        "url": "https://package.openupm.com",
        "scopes": [
          "com.openupm",
          "com.cysharp.unitask"
        ]
      }
    ]
    ```
    *   Sau đó, bạn có thể dễ dàng quản lý phiên bản của chúng trực tiếp từ cửa sổ giao diện của Unity Package Manager.

2.  **Nguyên tắc thiết lập Assembly Definitions:**
    *   **Tách riêng mã nguồn Editor:** Code Editor sử dụng thư viện `UnityEditor` phải nằm trong một `.asmdef` riêng biệt (ví dụ: `MyGame.Editor.asmdef`) và chỉ chọn nền tảng đích là **Editor** (Include Platforms -> Editor). Đồng thời tham chiếu tới Assembly Runtime tương ứng.
    *   **Tắt Auto Referenced cho các gói thư viện ngoài:** Khi tạo `.asmdef` cho một plugin, bạn có thể cân nhắc bỏ chọn mục "Auto Referenced". Việc này ngăn chặn Unity tự động ép tất cả các assembly khác phải tham chiếu tới nó một cách không cần thiết, giúp tăng tốc build.
    *   **Áp dụng Root Namespace:** Thiết lập trường Root Namespace trong file `.asmdef` để Visual Studio hoặc Rider tự động tạo namespace chuẩn chỉnh khi bạn tạo file code mới trong thư mục đó.

3.  **Hạn chế biên dịch lại không cần thiết:**
    *   Chia nhỏ dự án thành các module lớn như: `Core` (Tiện ích, Log, Event), `Data` (Lưu trữ, Cấu hình), `UI` (Màn hình giao diện), `Gameplay` (Logic nhân vật, quái vật), `Plugins` (Thư viện ngoài).
    *   Tránh chia quá nhỏ (ví dụ: mỗi class một asmdef) vì số lượng DLL quá lớn sẽ làm tăng overhead khi khởi động game và tốn thời gian liên kết DLL (Link Time) khi biên dịch.

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity Editor Interface (Giao diện Unity Editor & Custom Inspector)](../02-Editor-Interface/00-editor-interface-overview.md) |
| → Tiếp theo | [Assets & Import Pipeline (Quản lý Tài nguyên & Đường ống Nhập khẩu)](../04-Assets-Media/00-assets-media-overview.md) |
