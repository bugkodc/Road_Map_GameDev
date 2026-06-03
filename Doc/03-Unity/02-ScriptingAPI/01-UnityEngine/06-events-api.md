# Events & Actions API (Hệ thống Sự kiện)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Events](https://docs.unity3d.com/ScriptReference/Events.UnityEvent.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống sự kiện (Event-driven Architecture) giúp liên kết các thành phần trong game một cách lỏng lẻo (Loose Coupling). Thay vì để các lớp tham chiếu trực tiếp chéo nhau (ví dụ: lớp Player gọi trực tiếp đến UI, SFX, Achievements), ta sử dụng sự kiện để thông báo trạng thái. Việc này giúp code sạch hơn, dễ mở rộng và dễ bảo trì. 

Tài liệu này phân tích bản chất hai giải pháp sự kiện trong Unity: **`UnityEvent`** và **C# `System.Action` / `delegate`**, cùng kỹ thuật phòng tránh rò rỉ bộ nhớ (Memory Leaks).

---

## ⚖️ 1. So sánh: UnityEvent vs C# System.Action

Unity cung cấp lớp sự kiện riêng của mình, nhưng bạn cũng có thể sử dụng các kiểu dữ liệu delegate tiêu chuẩn của C#.

```
┌────────────────────────────────────────────────────────┐
│                   Hệ thống Sự kiện                     │
├───────────────────────────┬────────────────────────────┤
│        UnityEvent         │     System.Action / Event  │
├───────────────────────────┼────────────────────────────┤
│ - Trực quan trên Inspector│ - Chỉ viết bằng code       │
│ - Dễ dùng cho Designer    │ - Hiệu năng cực kỳ cao     │
│ - Chậm do cơ chế Reflection│ - An toàn kiểm tra kiểu    │
│ - Phù hợp UI, Logic game  │ - Phù hợp Core Engine, Loop│
└───────────────────────────┴────────────────────────────┘
```

### Chi tiết đặc tính:
1.  **UnityEvent (`UnityEngine.Events`):**
    *   *Ưu điểm:* Hiển thị trực quan trên giao diện Editor Inspector. Designer có thể kéo thả các GameObject và chọn hàm cần gọi khi sự kiện xảy ra mà không cần chỉnh sửa code.
    *   *Nhược điểm:* Tốn tài nguyên CPU hơn vì Unity phải thực hiện cơ chế tìm kiếm hàm qua chuỗi ký tự (Reflection) lúc runtime.
2.  **C# Action / Event (`System`):**
    *   *Ưu điểm:* Tốc độ gọi nhanh gấp nhiều lần so với UnityEvent vì liên kết hàm được tạo trực tiếp ở mức độ compiler (Delegate invocation list).
    *   *Nhược điểm:* Hoàn toàn ẩn danh trong Inspector của Editor.

---

## ⚠️ 2. Nguy cơ Rò rỉ Bộ nhớ (Memory Leaks)

Một lỗi rất phổ biến khi lập trình hướng sự kiện là không hủy đăng ký sự kiện.
*   **Vấn đề:** Khi Đối tượng A đăng ký lắng nghe sự kiện từ Đối tượng B (`B.OnSomeEvent += A.Method`), Đối tượng B giữ một tham chiếu ngầm đến Đối tượng A trong danh sách delegate. Kể cả khi bạn hủy Đối tượng A bằng lệnh `Destroy(A)`, bộ thu gom rác (Garbage Collector) cũng **không thể giải phóng bộ nhớ** của A vì B vẫn đang trỏ đến nó. Điều này dẫn đến lỗi phình bộ nhớ và rò rỉ tài nguyên.
*   **Giải pháp:** Luôn hủy đăng ký sự kiện ở `OnDisable()` hoặc `OnDestroy()`.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Mã nguồn C# mẫu dưới đây thể hiện cách xây dựng một bộ quản lý sức khỏe của nhân vật phát sự kiện hiệu năng cao bằng C# Action và UnityEvent đồng thời, kèm cách hủy đăng ký chuẩn chỉ để chống rò rỉ bộ nhớ.

```csharp
using System;
using UnityEngine;
using UnityEngine.Events;

public class PlayerHealthDemo : MonoBehaviour
{
    [Header("Health Settings")]
    [SerializeField] private int maxHealth = 100;
    private int currentHealth;

    // 1. Khai báo C# Action hiệu năng cao dành cho lập trình viên (Code-only)
    // Tự động truyền tham số máu hiện tại và máu tối đa
    public static event Action<int, int> OnHealthChangedAction;

    // 2. Khai báo UnityEvent dành cho việc kết nối kéo thả trên Inspector
    [Header("Inspector Events")]
    [SerializeField] private UnityEvent<int> onHealthChangedInspector;
    [SerializeField] private UnityEvent onDeathInspector;

    private void Start()
    {
        currentHealth = maxHealth;
        NotifyHealthChanged();
    }

    public void TakeDamage(int damage)
    {
        if (currentHealth <= 0) return;

        currentHealth = Mathf.Max(0, currentHealth - damage);
        NotifyHealthChanged();

        if (currentHealth <= 0)
        {
            // Kích hoạt sự kiện chết
            onDeathInspector?.Invoke();
        }
    }

    private void NotifyHealthChanged()
    {
        // Kích hoạt C# Action (Kiểm tra null bằng dấu ?)
        OnHealthChangedAction?.Invoke(currentHealth, maxHealth);

        // Kích hoạt UnityEvent trên Inspector
        onHealthChangedInspector?.Invoke(currentHealth);
    }
}

// =========================================================================
// 🔌 SCRIPT LẮNG NGHE SỰ KIỆN (UI CONTROLLER)
// =========================================================================
public class HealthUiController : MonoBehaviour
{
    [SerializeField] private TMPro.TextMeshProUGUI healthText;

    private void OnEnable()
    {
        // Bắt buộc: Đăng ký lắng nghe sự kiện khi script hoạt động
        PlayerHealthDemo.OnHealthChangedAction += UpdateHealthUi;
    }

    private void OnDisable()
    {
        // Bắt buộc: Hủy đăng ký lắng nghe để tránh lỗi Rò rỉ bộ nhớ (Memory Leak)
        PlayerHealthDemo.OnHealthChangedAction -= UpdateHealthUi;
    }

    private void UpdateHealthUi(int currentHealth, int maxHealth)
    {
        if (healthText != null)
        {
            healthText.text = $"HP: {currentHealth} / {maxHealth}";
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [SceneManagement API (Quản lý cảnh)](./05-scene-management-api.md) |
| → Tiếp theo | [Audio System API (Âm thanh)](./07-audio-api.md) |
