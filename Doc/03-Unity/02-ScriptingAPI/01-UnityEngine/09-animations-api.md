# Animations API (Hệ thống Hoạt họa Animator)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Animator](https://docs.unity3d.com/ScriptReference/Animator.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống hoạt họa Mecanim của Unity (`UnityEngine.Animator`) quản lý cách thức chuyển đổi các động tác của nhân vật 2D/3D. Lập trình hoạt họa chuyên nghiệp yêu cầu hiểu cách tương tác động giữa logic code (C#) và máy trạng thái hoạt họa (Animator Controller), bao gồm thiết lập tham số hiệu quả, sử dụng sự kiện hoạt họa (Animation Events), và đồng bộ hóa chuyển động thông qua Blend Trees và Root Motion.

---

## ⚙️ 1. Giao tiếp với Animator Controller qua C#

Mã nguồn C# điều khiển hoạt họa bằng cách thay đổi giá trị của các tham số (Parameters) được cấu hình sẵn trong Animator Controller.

### Các phương thức thiết lập tham số:
*   **`animator.SetFloat("Speed", value)`**: Dùng cho di chuyển mượt mà (Blend Trees).
*   **`animator.SetBool("IsGrounded", true)`**: Dùng cho các trạng thái nhị phân ổn định (đứng trên đất vs đang bay).
*   **`animator.SetTrigger("Attack")`**: Dùng cho các hành động xảy ra một lần tức thì (chém kiếm, bắn súng, chết).

> [!WARNING]
> **Tối ưu hóa hiệu năng chuỗi ký tự (String hashing):**
> Việc gọi `animator.SetTrigger("Attack")` mỗi lần sẽ ép Unity tính toán chuyển chuỗi `"Attack"` thành mã băm (hash integer) để tìm kiếm tham số. Hãy tính toán mã băm một lần duy nhất trong `Awake()` bằng **`Animator.StringToHash()`** để tăng tốc độ thực thi:
> `private static readonly int attackHash = Animator.StringToHash("Attack");`
> `animator.SetTrigger(attackHash);`

---

## ⚡ 2. Đồng bộ hóa chuyển động vật lý & Hoạt họa

*   **Animation Events (Sự kiện hoạt họa):** Cho phép kích hoạt một hàm C# cụ thể tại một thời điểm chính xác trên Timeline của clip hoạt họa (ví dụ: phát ra âm thanh bước chân khi gót chân chạm đất trên hoạt họa chạy, hoặc tạo Collider sát thương khi lưỡi kiếm chém xuống ở hoạt họa tấn công).
*   **Root Motion:** Cơ chế lấy dữ liệu dịch chuyển thực tế từ file hoạt họa 3D áp đặt trực tiếp lên vị trí của GameObject (thay vì di chuyển bằng code C#, nhân vật sẽ đi xa bao nhiêu mét khớp hoàn toàn với bước chân trong file hoạt họa). Sử dụng sự kiện `OnAnimatorMove()` để tùy biến cơ chế này.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một bộ điều khiển chuyển động nhân vật C# đồng bộ hóa chính xác vận tốc di chuyển vật lý của Rigidbody vào Blend Tree của Animator bằng mã băm tối ưu hiệu năng.

```csharp
using UnityEngine;

[RequireComponent(typeof(Animator))]
[RequireComponent(typeof(Rigidbody))]
public class CharacterAnimationController : MonoBehaviour
{
    [Header("Movement Speeds")]
    [SerializeField] private float walkSpeed = 2f;
    [SerializeField] private float runSpeed = 6f;

    private Animator animator;
    private Rigidbody rb;

    // Tối ưu hiệu năng bằng cách băm chuỗi tham số sang Integer một lần duy nhất
    private int speedPercentHash;
    private int isMovingHash;
    private int attackTriggerHash;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        rb = GetComponent<Rigidbody>();

        // Thực hiện băm chuỗi tham số
        speedPercentHash = Animator.StringToHash("SpeedPercent");
        isMovingHash = Animator.StringToHash("IsMoving");
        attackTriggerHash = Animator.StringToHash("Attack");
    }

    private void Update()
    {
        // Kiểm tra lệnh tấn công từ người chơi
        if (Input.GetMouseButtonDown(0))
        {
            // Gọi Trigger bằng mã băm tối ưu hiệu năng
            animator.SetTrigger(attackTriggerHash);
        }

        HandleMovementAnimation();
    }

    private void HandleMovementAnimation()
    {
        float inputX = Input.GetAxis("Horizontal");
        float inputZ = Input.GetAxis("Vertical");
        Vector3 moveDir = new Vector3(inputX, 0f, inputZ).normalized;

        bool isRunning = Input.GetKey(KeyCode.LeftShift);
        float currentTargetSpeed = isRunning ? runSpeed : walkSpeed;

        if (moveDir.magnitude > 0.1f)
        {
            // Di chuyển nhân vật vật lý
            Vector3 movement = moveDir * currentTargetSpeed * Time.deltaTime;
            rb.MovePosition(transform.position + movement);

            // Xoay hướng mặt về phía di chuyển
            Quaternion targetRot = Quaternion.LookRotation(moveDir, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRot, 10f * Time.deltaTime);

            // Cập nhật giá trị Blend Tree hoạt họa (0 = Idle, 0.3 = Walk, 1.0 = Run)
            float speedPercent = isRunning ? 1.0f : 0.3f;
            animator.SetFloat(speedPercentHash, speedPercent, 0.1f, Time.deltaTime); // 0.1f là thời gian làm mượt chuyển trị (dampTime)
            animator.SetBool(isMovingHash, true);
        }
        else
        {
            // Trả về Idle
            animator.SetFloat(speedPercentHash, 0f, 0.1f, Time.deltaTime);
            animator.SetBool(isMovingHash, false);
        }
    }

    // ==========================================
    // 🔔 ANIMATION EVENT CALLBACK
    // Hàm này được gọi tự động từ File Hoạt họa (Animation Clip timeline)
    // ==========================================
    public void OnFootstep(string footSide)
    {
        Debug.Log($"[AnimEvent] Chân {footSide} chạm đất. Phát tiếng bước chân!");
        // Thực tế: SoundManagerDemo.Instance.PlaySfx(footstepSound, transform.position);
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [AI & Navigation API (Tìm đường)](./08-ai-api.md) |
| → Tiếp theo | [Rendering & Materials API (Đồ họa)](./10-rendering-api.md) |
