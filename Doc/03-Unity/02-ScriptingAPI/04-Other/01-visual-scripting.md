# Unity.VisualScripting API (Visual Scripting qua mã C#)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Visual Scripting Package Reference — Unity.VisualScripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@1.9/manual/index.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống **Unity Visual Scripting** cho phép nhà thiết kế game (Game Designers) xây dựng logic trò chơi bằng cách kết nối các khối đồ họa (Nodes) trực quan mà không cần viết mã. Tuy nhiên, đối với lập trình viên, nhiệm vụ cốt lõi là làm thế nào để mã nguồn C# có thể tương tác hai chiều với hệ thống Visual Scripting: triệu gọi các Custom Units tự tạo, gán/nhận biến từ Visual Graphs, và kích hoạt các sự kiện tùy biến từ code C# vào sơ đồ Visual Scripting.

---

## ⚙️ 1. Giao tiếp Hai chiều: C# vs Visual Scripting

```
┌──────────────────┐                    ┌──────────────────┐
│      C# Code     │ ─── Gọi Hàm/Event ─>│  Visual Script   │
│   (Script C#)    │ <─── Đọc/Ghi Biến ──│   (Visual Graph) │
└──────────────────┘                    └──────────────────┘
```

1.  **C# gọi sang Visual Scripting:**
    *   Sử dụng lớp **`CustomEvent.Trigger`** để gửi một sự kiện kèm tham số trực tiếp vào một đối tượng đang chứa component `ScriptMachine`. Các node sự kiện `Custom Event` trong Visual Graph sẽ bắt được sự kiện này và chạy tiếp logic tiếp theo.
2.  **Visual Scripting gọi sang C# (Custom Units):**
    *   Lập trình viên có thể viết các class C# kế thừa từ `Unit` để tạo ra các node tùy biến mới xuất hiện trong danh sách tìm kiếm (Fuzzy Finder) của Visual Scripting. Rất thích hợp để đóng gói các thuật toán C# phức tạp hoặc các API bên thứ ba (như Firebase, AdMob) thành các khối đơn giản cho Designer sử dụng.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là hai file script C# thực chiến:
1.  **Script 1:** Tạo một Custom Node (Custom Unit) mới trong Visual Scripting nhận vào 2 số thực và trả về hiệu số lớn nhất của chúng.
2.  **Script 2:** Triệu gọi kích hoạt một sự kiện Custom Event từ mã C# gửi tín hiệu và tham số vào Visual Scripting Machine.

### Script 1: Custom Node tự chế (Bắt buộc đặt trong thư mục `Editor/MaxDifferenceUnit.cs` hoặc file Script trong dự án)
```csharp
using Unity.VisualScripting;
using UnityEngine;

// Đăng ký mô tả hiển thị cho Node trong Visual Scripting Finder
[UnitTitle("Hiệu Số Lớn Nhất")]
[UnitCategory("Toán Học/Nâng Cao")]
public class MaxDifferenceUnit : Unit
{
    // Khai báo các cổng vào (Input Ports)
    [DoNotSerialize] public ValueInput valueA;
    [DoNotSerialize] public ValueInput valueB;

    // Khai báo cổng ra (Output Port)
    [DoNotSerialize] public ValueOutput result;

    // Thiết lập cấu hình các cổng kết nối
    protected override void Definition()
    {
        // Khởi tạo các cổng vào với kiểu dữ liệu mặc định là Float
        valueA = ValueInput<float>("Số A", 0f);
        valueB = ValueInput<float>("Số B", 0f);

        // Khởi tạo cổng ra
        result = ValueOutput<float>("Kết Quả", CalculateMaxDifference);

        // Thiết lập mối liên hệ phụ thuộc (Cổng ra phụ thuộc cổng vào để tính toán)
        Requirement(valueA, result);
        Requirement(valueB, result);
    }

    // Hàm xử lý logic tính toán khi cổng ra yêu cầu giá trị
    private float CalculateMaxDifference(Flow flow)
    {
        // Đọc giá trị từ các cổng vào của Graph
        float a = flow.GetValue<float>(valueA);
        float b = flow.GetValue<float>(valueB);

        // Tính toán và trả về kết quả
        return Mathf.Abs(a - b);
    }
}
```

### Script 2: Phát Sự kiện từ C# vào Visual Scripting (Runtime Script)
```csharp
using UnityEngine;
using Unity.VisualScripting; // Namespace Visual Scripting

public class CSharpToVisualScriptEventDemo : MonoBehaviour
{
    [Header("Target Machine")]
    [SerializeField] private GameObject targetObjectWithVisualScript;

    private void Update()
    {
        // Khi người chơi nhấn chuột trái
        if (Input.GetMouseButtonDown(0))
        {
            TriggerEventInVisualScript();
        }
    }

    private void TriggerEventInVisualScript()
    {
        if (targetObjectWithVisualScript == null) return;

        // 1. Chuẩn bị dữ liệu tham số gửi đi
        string eventName = "OnPlayerDamageReceived";
        int damageAmount = 25;
        string source = "Bẫy Gai";

        // 2. Kích hoạt Custom Event trong Visual Scripting Machine của GameObject đích
        // Cần truyền: GameObject đích, Tên sự kiện, và mảng tham số (args)
        CustomEvent.Trigger(targetObjectWithVisualScript, eventName, damageAmount, source);
        
        Debug.Log($"[C# Event] Đã phát sự kiện '{eventName}' với sát thương {damageAmount} vào Visual Scripting.");
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Profiling API (Đo đạc hiệu năng)](../03-Unity/03-profiling.md) |
| → Tiếp theo | [Assembly & Scoped Packages (Cấu hình nâng cao)](./02-assemblies-packages.md) |
