# UnityEngine.InputSystem API (Hệ thống Input mới)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Input System Package Documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống **New Input System** (`UnityEngine.InputSystem`) thay thế hoàn toàn cho lớp Legacy Input Manager (`UnityEngine.Input`). Nhờ kiến trúc hướng sự kiện (Event-driven) và tách biệt hoàn toàn thiết bị vật lý ra khỏi mã nguồn logic thông qua lớp trung gian **Input Actions**, hệ thống mới giúp nhà phát triển dễ dàng xây dựng cơ chế điều khiển đa thiết bị (Keyboard, Mouse, Gamepad, Touch, VR Controllers), hỗ trợ tính năng thay đổi nút bấm động (Runtime Key Rebinding), và tối ưu hiệu năng luồng xử lý Input.

---

## 🔌 1. Đọc thiết bị trực tiếp (Direct Device Polling)

Trong trường hợp bạn cần viết các script công cụ nhanh, kiểm tra thử nghiệm mà không muốn tạo file cấu hình `.inputactions`, bạn có thể truy xuất trực tiếp trạng thái của thiết bị đang kết nối.

### Các API đọc phím trực tiếp:
```csharp
using UnityEngine;
using UnityEngine.InputSystem; // Bắt buộc phải import namespace này

public class DirectInputDemo : MonoBehaviour
{
    private void Update()
    {
        // 1. Kiểm tra bàn phím hiện tại
        if (Keyboard.current != null)
        {
            // Kiểm tra trạng thái nhấn phím trong khung hình hiện tại (tương tự GetKeyDown)
            if (Keyboard.current.spaceKey.wasPressedThisFrame)
            {
                Debug.Log("Nhấn Space!");
            }

            // Kiểm tra trạng thái đang giữ phím (tương tự GetKey)
            if (Keyboard.current.wKey.isPressed)
            {
                Debug.Log("Đang giữ nút W");
            }
        }

        // 2. Kiểm tra tay cầm Gamepad hiện tại
        if (Gamepad.current != null)
        {
            // Đọc giá trị Joystick trái dưới dạng Vector2
            Vector2 stickVal = Gamepad.current.leftStick.ReadValue();
            
            // Đọc nút bấm sườn phải
            if (Gamepad.current.rightTrigger.isPressed)
            {
                Debug.Log("Bóp cò phải tay cầm!");
            }
        }
    }
}
```

---

## ⚙️ 2. Lập trình hướng sự kiện (Event-Driven Action API)

Cách tiếp cận chuẩn trong sản xuất dự án lớn là thông qua các **Input Actions**. Ở đây ta khai báo một biến `InputAction` và cấu hình các ràng buộc (Bindings) cho nó.

```
┌────────────────────────────────────────┐
│             InputAction                │
│  - Name: "Move"                        │
│  - Type: Value (Vector2)               │
├───────────────────┬────────────────────┤
│   Keyboard WASD   │   Gamepad Joystick │
│   (Vector2 Comp)  │   (Stick Control)  │
└───────────────────┴────────────────────┘
```

### Các trạng thái Vòng đời của InputAction:
Mỗi khi xảy ra tương tác, `InputAction` sẽ chuyển đổi qua các pha sự kiện:
1.  **`started`**: Nút bắt đầu được chạm/nhấn xuống (giá trị bắt đầu khác 0).
2.  **`performed`**: Hành vi nhấn nút hoàn tất, hoặc giá trị trục di chuyển có sự thay đổi. Trạng thái này được gọi liên tục nếu bạn giữ hoặc di chuyển Joystick.
3.  **`canceled`**: Nút bấm được nhả ra hoàn toàn (giá trị quay về 0).

---

## 🤖 3. Sử dụng Class tự động sinh (C# Generated Wrapper Class)

Khi tạo một file cấu hình Action Asset (ví dụ: `GameControls.inputactions`), Unity cho phép tick chọn **Generate C# Class** để sinh ra một class C# cùng tên. Việc lập trình qua class tự động sinh giúp hạn chế tối đa việc sử dụng chuỗi string cứng, tránh lỗi chính tả và tận dụng tính năng tự động gợi ý code (Autocompletion) của IDE.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script hoàn chỉnh thể hiện 2 tính năng quan trọng nhất trong sản xuất:
1.  Đăng ký sự kiện điều khiển thông qua class C# tự sinh (`GameControls`).
2.  Viết tính năng **thay đổi nút bấm động (Runtime Key Rebinding)** và lưu lại cấu hình phím mới vào `PlayerPrefs` của người dùng.

### Bước chuẩn bị:
Giả định bạn đã tạo file `GameControls.inputactions` có Action Map tên là `Player` và Action tên là `Move` (Vector2), `Jump` (Button).

```csharp
using UnityEngine;
using UnityEngine.InputSystem;
using System.IO;

public class PlayerInputController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float speed = 5f;

    // Đối tượng của Class tự động sinh
    private GameControls controls;
    private Vector2 moveInput;

    private void Awake()
    {
        // 1. Khởi tạo đối tượng quản lý Input
        controls = new GameControls();

        // 2. Đăng ký callback cho sự kiện Jump (Button)
        // Dùng toán tử lambda (ctx =>) để đăng ký lắng nghe
        controls.Player.Jump.performed += ctx => PerformJump();
        
        // 3. Đọc dữ liệu liên tục cho sự kiện Move (Vector2)
        //performed kích hoạt mỗi khi Vector2 thay đổi giá trị
        controls.Player.Move.performed += ctx => moveInput = ctx.ReadValue<Vector2>();
        //canceled kích hoạt khi buông hoàn toàn WASD (trả về 0)
        controls.Player.Move.canceled += ctx => moveInput = Vector2.zero;

        // Tải cấu hình phím tùy biến của người dùng nếu có từ trước
        LoadCustomBindings();
    }

    private void OnEnable()
    {
        // Bắt buộc phải kích hoạt Action Map trước khi sử dụng
        controls.Player.Enable();
    }

    private void OnDisable()
    {
        // Vô hiệu hóa Action Map khi đối tượng không hoạt động
        controls.Player.Disable();
    }

    private void Update()
    {
        // Thực hiện di chuyển tịnh tiến
        Vector3 movement = new Vector3(moveInput.x, 0f, moveInput.y) * speed * Time.deltaTime;
        transform.Translate(movement, Space.Self);
    }

    private void PerformJump()
    {
        Debug.Log("[InputSystem] Thực hiện nhảy lò cò!");
    }

    // =========================================================================
    // 🛠️ HỆ THỐNG RUNTIME KEY REBINDING (Đổi phím động)
    // =========================================================================
    
    // Hàm thực hiện gán lại phím cho một Action cụ thể
    public void StartRebinding(InputAction actionToRebind, int bindingIndex)
    {
        Debug.Log($"[Rebind] Đang chờ bấm nút mới cho hành động: {actionToRebind.name}...");
        
        // Tạm khóa điều khiển trong lúc người dùng đang chọn nút mới
        controls.Player.Disable();

        // Thực thi tiến trình cấu hình lại nút bất đồng bộ
        var rebindOperation = actionToRebind.PerformInteractiveRebinding(bindingIndex)
            // Loại bỏ phím Esc để không vô tình gán nút thoát
            .WithControlsExcluding("<Keyboard>/escape")
            // Giới hạn thời gian chờ bấm là 10 giây
            .WithTimeout(10f)
            // Callback khi cấu hình thành công
            .OnComplete(operation => 
            {
                Debug.Log($"[Rebind] Thành công! Nút mới: {actionToRebind.GetBindingDisplayString(bindingIndex)}");
                
                // Giải phóng tài nguyên hoạt động rebind
                operation.Dispose();
                
                // Kích hoạt lại điều khiển
                controls.Player.Enable();
                
                // Lưu cấu hình mới
                SaveCustomBindings();
            })
            // Callback khi hủy bỏ hoặc quá thời gian chờ
            .OnCancel(operation => 
            {
                Debug.Log("[Rebind] Đã hủy bỏ quá trình đổi nút.");
                operation.Dispose();
                controls.Player.Enable();
            });

        // Bắt đầu quét lắng nghe thiết bị ngoại vi
        rebindOperation.Start();
    }

    private void SaveCustomBindings()
    {
        // Chuyển đổi toàn bộ sơ đồ phím đã sửa đổi sang định dạng JSON string
        string bindingsJson = controls.SaveBindingOverridesAsJson();
        PlayerPrefs.SetString("CustomInputBindings", bindingsJson);
        PlayerPrefs.Save();
        Debug.Log("[InputSystem] Đã lưu cấu hình phím.");
    }

    private void LoadCustomBindings()
    {
        if (PlayerPrefs.HasKey("CustomInputBindings"))
        {
            string bindingsJson = PlayerPrefs.GetString("CustomInputBindings");
            // Nạp ngược dữ liệu đè lên cấu hình mặc định
            controls.LoadBindingOverridesFromJson(bindingsJson);
            Debug.Log("[InputSystem] Đã nạp cấu hình phím tùy biến từ bộ nhớ.");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [MonoBehaviour Lifecycle (Vòng đời)](../../02-Lifecycle/00-monobehaviour-lifecycle.md) |
| → Tiếp theo | [UI Toolkit & UGUI API (Hệ thống giao diện)](../../04-UI/00-ui-api.md) |
