# UnityEngine Core API (Lập trình cốt lõi Unity)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine](https://docs.unity3d.com/ScriptReference/UnityEngine.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Phân hệ **UnityEngine Core API** chứa các lớp (classes), cấu trúc (structs) và giao diện (interfaces) nền tảng nhất của Unity Engine. Hiểu đúng bản chất hoạt động của các lớp cốt lõi như `GameObject`, `Component`, `Transform`, và các kiểu dữ liệu toán học (`Vector3`, `Quaternion`) là chìa khóa để viết mã nguồn tối ưu hiệu năng, tránh rác bộ nhớ (GC Alloc) và tổ chức kiến trúc game linh hoạt.

---

## 🧱 1. Bản chất của GameObject & Thành phần (Component)

`GameObject` là thực thể cơ bản nhất chứa mọi đối tượng trong thế giới game. Tuy nhiên, bản thân `GameObject` không tự thực hiện hành vi nào; nó đóng vai trò là một **Container** chứa các `Component` xử lý logic.

```
┌─────────────────────────────────────────────────────────┐
│                    GameObject (C# Wrapper)              │
│  - Name: "Player"                                       │
│  - Tag: "Player", Layer: 3 (Default)                    │
│  - Active Self: true                                    │
├───────────────┬───────────────────┬─────────────────────┤
│   Transform   │  SpriteRenderer   │   PlayerController  │
│  (Vị trí/Xoay)│  (Hiển thị ảnh)   │  (C# Logic Script)  │
└───────────────┴───────────────────┴─────────────────────┘
```

### Cơ chế C++ vs C# Boundary:
Mỗi khi bạn truy cập một `GameObject` hoặc `Component` trong C#, thực chất bạn đang gọi qua một **C# Wrapper Object** kết nối đến đối tượng thực tế được quản lý bởi nhân C++ (Native Engine). 
*   **Chi phí Null Check:** Việc so sánh `gameObject == null` hoặc `component == null` tốn hiệu năng hơn so với kiểm tra null thông thường vì Unity phải thực hiện cuộc gọi xuyên biên giới (P/Invoke) sang C++ để kiểm tra xem đối tượng native đã bị hủy chưa.
*   **Giải pháp:** Trong các vòng lặp lớn, hãy cache tham chiếu hoặc sử dụng toán tử null-coalescing cẩn thận.

### Quản lý Component tối ưu:
Để lấy tham chiếu component, tránh dùng `GetComponent(string name)` do sử dụng chuỗi gây tốn tài nguyên tìm kiếm và không an toàn kiểu dữ liệu (type-safe). Thay vào đó, hãy dùng generic type:

*   **`GetComponent<T>()`**: Lấy component kiểu `T`.
*   **`TryGetComponent<T>(out T component)`**: Tránh cấp phát rác (Garbage Collection) khi kiểm tra sự tồn tại. Phương thức này không ném ra exception và không tạo rác do null-check native bên dưới, cực kỳ tối ưu cho các hệ thống như va chạm vật lý hoặc phát đạn bắn.

---

## 📐 2. Lớp Transform & Cây phân cấp (Scene Hierarchy)

Mỗi `GameObject` bắt buộc phải có một component `Transform`. Lớp này quản lý vị trí (Position), góc quay (Rotation), và tỉ lệ (Scale) của đối tượng trong không gian 2D/3D.

### Hệ tọa độ Local vs World Space:
*   **`transform.position` & `transform.rotation`**: Vị trí và góc xoay trong không gian **thế giới (World Space)** đối chiếu với tâm toàn cục `(0,0,0)`.
*   **`transform.localPosition` & `transform.localRotation`**: Vị trí và góc xoay tương đối so với **đối tượng cha (Parent)**. Nếu đối tượng không có cha, tọa độ local sẽ bằng tọa độ world.

```csharp
// Chuyển đổi một vector từ không gian cục bộ (Local) sang thế giới (World)
// Ví dụ: Tìm điểm cách mũi tàu chiến (local là forward Vector3.forward) 5 mét
Vector3 spawnWorldPos = transform.TransformPoint(Vector3.forward * 5f);
```

### Mối quan hệ Cha-Con (Parent-Child Relationship):
Lớp `Transform` triển khai interface `IEnumerable`, nghĩa là bạn có thể duyệt qua một transform để tìm các transform con trực tiếp của nó:

```csharp
// Duyệt qua tất cả con trực tiếp của GameObject này
foreach (Transform child in transform)
{
    Debug.Log("Tìm thấy đối tượng con: " + child.name);
}
```

> [!WARNING]
> **Tránh thay đổi liên tục cấu trúc cha-con (Reparenting) trong runtime:**
> Khi bạn thay đổi cha của một Transform (`transform.SetParent(newParent)`), Unity buộc phải tính toán lại ma trận chuyển đổi không gian cho toàn bộ cây phân cấp bên dưới và sắp xếp lại cấu trúc dữ liệu trên bộ nhớ cache của C++ Native. Việc này gây tụt khung hình (framerate spike) nếu thực hiện liên tục với số lượng lớn đối tượng.

---

## 🧮 3. Vector Toán học: Vector2 vs Vector3

Unity sử dụng cấu trúc giá trị (struct - Value Type) `Vector2` và `Vector3` để biểu diễn các vector không gian và điểm số học.

### Các hàm toán học quan trọng:
1.  **`Normalize()` vs `normalized`**:
    *   `Vector3.normalized`: Trả về một bản sao vector có độ dài (magnitude) bằng `1` mà không làm thay đổi vector gốc.
    *   `vector.Normalize()`: Thay đổi trực tiếp độ dài của chính vector đó về `1`. Giúp tiết kiệm bộ nhớ do không phải tạo bản sao.
2.  **`Vector3.Dot(A, B)` (Tích vô hướng)**: Trả về một số thực (`float`). 
    *   Nếu kết quả `> 0`: Hai vector cùng hướng (góc nhọn `< 90°`).
    *   Nếu kết quả `= 0`: Hai vector vuông góc (`90°`).
    *   Nếu kết quả `< 0`: Hai vector ngược hướng (góc tù `> 90°`).
    *   *Ứng dụng:* Xác định xem kẻ địch có đang nằm trong tầm nhìn phía trước của người chơi hay không.
3.  **`Vector3.Cross(A, B)` (Tích có hướng)**: Trả về một `Vector3` vuông góc với cả A và B.
    *   *Ứng dụng:* Tìm vector chỉ hướng đi lên (Up vector) khi bo cua xe đua, hoặc tìm trục xoay xoắn ốc.
4.  **`Vector3.Lerp` vs `Vector3.Slerp`**:
    *   `Lerp` (Linear Interpolation): Nội suy tuyến tính theo đường thẳng. Phù hợp di chuyển tịnh tiến.
    *   `Slerp` (Spherical Linear Interpolation): Nội suy theo đường cong hình cầu. Phù hợp cho tính toán quỹ đạo bay hoặc xoay hướng mượt mà.

---

## 🔄 4. Góc xoay & Hệ Quaternion

Trong toán học game, việc sử dụng góc Euler (Euler Angles - X, Y, Z từ 0 đến 360 độ) rất dễ dẫn đến lỗi **Gimbal Lock** (Khóa trục: hiện tượng hai trục xoay trùng nhau làm mất đi 1 chiều tự do xoay).

### Giải pháp: Quaternion (Số ảo bốn chiều)
Unity sử dụng struct `Quaternion` (gồm 4 thành phần `x, y, z, w`) để biểu diễn mọi trạng thái xoay. Bạn **không nên tự chỉnh sửa thủ công** các giá trị `x, y, z, w` này trừ khi hiểu rất sâu về toán học Quaternion.

### Các API Quaternion thiết thực:
*   **`Quaternion.identity`**: Biểu diễn trạng thái không xoay (góc xoay mặc định, tương ứng góc Euler `(0, 0, 0)`).
*   **`Quaternion.Euler(x, y, z)`**: Chuyển đổi góc Euler quen thuộc sang định dạng Quaternion để gán cho `transform.rotation`.
*   **`Quaternion.LookRotation(forwardVector, upVector)`**: Tạo ra một trạng thái xoay sao cho trục Z (Forward) hướng thẳng về phía `forwardVector`. Cực kỳ hữu ích để làm AI tự động quay mặt về phía người chơi.
*   **`Quaternion.Slerp(from, to, t)`**: Xoay mượt mà từ góc này sang góc khác theo thời gian `t`.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là tập lệnh mẫu thể hiện cách tối ưu hóa hiệu năng khi tương tác với `UnityEngine Core API` thông qua việc cache tham chiếu, sử dụng `TryGetComponent` tránh rác bộ nhớ, thực hiện phép toán Vector và xoay hướng Quaternion mượt mà.

```csharp
using UnityEngine;

public class SpaceShipController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 10f;
    [SerializeField] private float rotationSpeed = 5f;
    [SerializeField] private float fireDistance = 15f;

    [Header("References")]
    [SerializeField] private Transform targetEnemy;
    
    // Cache components để tránh việc gọi xuyên biên giới C++/C# liên tục trong Update
    private Transform myTransform;
    private Rigidbody myRigidbody;

    private void Awake()
    {
        // Cache transform và rigidbody gốc của đối tượng
        myTransform = transform;
        
        // Sử dụng TryGetComponent để lấy tham chiếu an toàn và hiệu năng cao
        if (TryGetComponent<Rigidbody>(out Rigidbody rb))
        {
            myRigidbody = rb;
            // Tắt gravity vì tàu di chuyển trong không gian vũ trụ
            myRigidbody.useGravity = false;
        }
        else
        {
            Debug.LogWarning($"[SpaceShip] Thiếu Rigidbody trên {gameObject.name}!");
        }
    }

    private void Update()
    {
        HandleMovement();
        
        if (targetEnemy != null)
        {
            AimAndCheckEnemy();
        }
    }

    private void HandleMovement()
    {
        // Nhận dữ liệu di chuyển từ bàn phím (trục W/S và A/D)
        float moveInput = Input.GetAxis("Vertical");
        float turnInput = Input.GetAxis("Horizontal");

        // 1. Dùng vector di chuyển tịnh tiến cục bộ (Local Space forward)
        // Thay vì dùng transform.forward liên tục (gây chi phí P/Invoke), ta tự tính toán cục bộ
        Vector3 direction = myTransform.forward * moveInput;
        myTransform.position += direction * moveSpeed * Time.deltaTime;

        // 2. Tính toán xoay hướng cục bộ quanh trục Up
        float rotationAngle = turnInput * rotationSpeed * 10f * Time.deltaTime;
        Quaternion turnRotation = Quaternion.AngleAxis(rotationAngle, Vector3.up);
        
        // Nhân 2 Quaternion để cộng dồn góc xoay
        myTransform.rotation = myTransform.rotation * turnRotation;
    }

    private void AimAndCheckEnemy()
    {
        // 1. Tính toán khoảng cách bằng Vector3.sqrMagnitude (Tối ưu hơn Vector3.Distance)
        // Vector3.Distance thực hiện phép tính khai căn bậc hai (Mathf.Sqrt) rất chậm.
        // Dùng bình phương khoảng cách để so sánh nhanh hơn.
        Vector3 toEnemy = targetEnemy.position - myTransform.position;
        float sqrDist = toEnemy.sqrMagnitude;
        float sqrFireRange = fireDistance * fireDistance;

        if (sqrDist <= sqrFireRange)
        {
            // 2. Tính tích vô hướng (Dot Product) để kiểm tra góc nhìn
            Vector3 directionToEnemy = toEnemy.normalized;
            float dotProduct = Vector3.Dot(myTransform.forward, directionToEnemy);

            // Nếu góc lệch nhỏ hơn 30 độ (cos(30°) ≈ 0.86)
            if (dotProduct > 0.86f)
            {
                Debug.Log("[SpaceShip] Kẻ địch nằm trong tầm ngắm! Khai hỏa!");
                
                // 3. Xoay mượt mà về phía kẻ địch sử dụng Quaternion.Slerp
                Quaternion targetRotation = Quaternion.LookRotation(toEnemy, Vector3.up);
                myTransform.rotation = Quaternion.Slerp(myTransform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            }
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Tổng quan Unity Lộ trình](../../00-unity-overview.md) |
| → Tiếp theo | [MonoBehaviour Lifecycle (Vòng đời)](./02-monobehaviour-lifecycle.md) |
