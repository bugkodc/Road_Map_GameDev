# Physics & Physics2D API (Hệ thống Vật lý)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Physics](https://docs.unity3d.com/ScriptReference/Physics.html) và [UnityEngine.Physics2D](https://docs.unity3d.com/ScriptReference/Physics2D.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống vật lý của Unity (3D dựa trên **NVIDIA PhysX**, 2D dựa trên **Box2D**) xử lý các tương tác thực tế giữa các đối tượng. Việc lập trình hệ thống vật lý yêu cầu hiểu đúng bản chất tương tác giữa lực, va chạm và cách kiểm tra không gian (Spatial Queries) như Raycast, Overlap, và Sweeps. Tối ưu hóa hiệu năng vật lý là vô cùng quan trọng để tránh giật lag khung hình (CPU spikes).

---

## ⚡ 1. Bản chất va chạm: Collision vs Trigger

Để Unity nhận diện bất kỳ va chạm nào, **ít nhất một trong hai đối tượng** tham gia va chạm bắt buộc phải có component **Rigidbody** (hoặc Rigidbody2D) gắn kèm.

```
                  ┌─────────────────────────────────────┐
                  │          Kiểu va chạm (Type)        │
                  └──────────────────┬──────────────────┘
                                     │
          ┌──────────────────────────┴──────────────────────────┐
          v                                                     v
┌─────────────────────────┐                           ┌─────────────────────────┐
│        Collision        │                           │         Trigger         │
│ (Vật lý - Cản trở nhau) │                           │ (Cảm biến - Đi xuyên qua)│
└─────────┬───────────────┘                           └─────────┬───────────────┘
          │                                                     │
          v                                                     v
   OnCollisionEnter                                      OnTriggerEnter
   OnCollisionStay                                       OnTriggerStay
   OnCollisionExit                                       OnTriggerExit
```

### So sánh bản chất:
*   **Collision (Tác dụng vật lý):** Hai đối tượng cản trở lẫn nhau, có lực đẩy và phản lực làm thay đổi vận tốc.
*   **Trigger (Cảm biến không gian):** Hai đối tượng có thể đi xuyên qua nhau. Sử dụng thuộc tính `Is Trigger` trên Collider để kích hoạt cơ chế này.
*   **Hiệu năng:** Trigger tốn ít tài nguyên CPU hơn Collision vì Engine không phải tính toán ma trận phản lực vật lý phức tạp (contacts, friction, bounce).

---

## 🔍 2. Truy vấn không gian (Spatial Queries)

Các truy vấn không gian cho phép bạn phát hiện các đối tượng trong thế giới game mà không cần dùng đến va chạm vật lý trực tiếp.

1.  **Raycast (Bắn tia):** Bắn một tia vô hình từ một điểm theo một hướng để tìm vật cản.
    *   *Sử dụng:* `Physics.Raycast(origin, direction, out RaycastHit hitInfo, maxDistance, layerMask)`
2.  **Overlap (Quét vùng):** Kiểm tra xem có những Collider nào đang nằm trong một vùng không gian xác định (Sphere, Box, Capsule).
    *   *Sử dụng:* `Physics.OverlapSphere(position, radius, layerMask)`
3.  **Sweep (Quét khối):** Di chuyển một khối hình học (Sphere, Box) dọc theo một hướng để quét vật cản (tương tự bắn đạn có kích thước thực tế thay vì một tia laser siêu mỏng).

> [!WARNING]
> **Quy tắc hiệu năng khi sử dụng Spatial Queries:**
> *   **Luôn sử dụng `LayerMask`:** Nếu bạn không truyền LayerMask, Unity sẽ phải duyệt qua tất cả Collider trên toàn Scene, gây lãng phí CPU.
> *   **Tránh dùng phiên bản cấp phát mảng:** `Physics.OverlapSphere` trả về một mảng `Collider[]`, gây cấp phát bộ nhớ rác (GC Alloc). Hãy dùng phiên bản không cấp phát: **`Physics.OverlapSphereNonAlloc`** truyền vào một mảng đã khởi tạo sẵn (Pre-allocated array).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là mã nguồn C# thực chiến kết hợp cả bắn tia Raycast hiệu năng cao (bỏ qua đồng đội nhờ LayerMask) và vụ nổ vật lý quét vùng xung quanh (sử dụng phiên bản NonAlloc tránh rác).

```csharp
using UnityEngine;

public class PhysicsSystemDemo : MonoBehaviour
{
    [Header("Raycast Settings")]
    [SerializeField] private float rayDistance = 20f;
    [SerializeField] private LayerMask enemyLayer;

    [Header("Explosion Settings")]
    [SerializeField] private float explosionRadius = 5f;
    [SerializeField] private float explosionForce = 500f;
    [SerializeField] private LayerMask destructibleLayer;

    // Mảng khởi tạo sẵn để dùng cho truy vấn không cấp phát rác (Non-Alloc)
    private Collider[] overlapResults = new Collider[10];

    private void Update()
    {
        // 1. Kiểm tra tia bắn Raycast khi nhấp chuột trái
        if (Input.GetMouseButtonDown(0))
        {
            PerformRaycastLaser();
        }

        // 2. Kích hoạt vụ nổ vật lý khi nhấn Space
        if (Input.GetKeyDown(KeyCode.Space))
        {
            TriggerExplosion();
        }
    }

    private void PerformRaycastLaser()
    {
        Vector3 origin = transform.position;
        Vector3 direction = transform.forward;

        // Vẽ tia debug trong Editor để trực quan hóa
        Debug.DrawRay(origin, direction * rayDistance, Color.red, 1f);

        // Thực hiện bắn tia Raycast truyền LayerMask để tối ưu tìm kiếm
        if (Physics.Raycast(origin, direction, out RaycastHit hit, rayDistance, enemyLayer))
        {
            Debug.Log($"[Raycast] Trúng mục tiêu: {hit.collider.name} tại vị trí: {hit.point}");
            
            // Lấy điểm tiếp xúc va chạm và pháp tuyến để tạo hiệu ứng
            Vector3 hitPoint = hit.point;
            Vector3 hitNormal = hit.normal;
            
            // Xử lý gây sát thương nếu đối tượng có script Health
            if (hit.collider.TryGetComponent<Rigidbody>(out Rigidbody targetRb))
            {
                // Tác động lực đẩy cục bộ tại điểm bắn trúng
                targetRb.AddForceAtPosition(direction * 200f, hitPoint);
            }
        }
    }

    private void TriggerExplosion()
    {
        Vector3 explosionOrigin = transform.position;

        // Sử dụng OverlapSphereNonAlloc để tránh cấp phát bộ nhớ rác (GC Alloc)
        // Trả về số lượng Collider thực sự quét trúng (tối đa bằng độ dài mảng kết quả là 10)
        int hitCount = Physics.OverlapSphereNonAlloc(explosionOrigin, explosionRadius, overlapResults, destructibleLayer);

        Debug.Log($"[Explosion] Vụ nổ quét trúng {hitCount} đối tượng.");

        for (int i = 0; i < hitCount; i++)
        {
            Collider col = overlapResults[i];
            
            if (col.TryGetComponent<Rigidbody>(out Rigidbody rb))
            {
                // Áp dụng lực nổ tỏa ra từ tâm vụ nổ
                // Lực nổ tự động giảm dần theo khoảng cách đến tâm nổ
                rb.AddExplosionForce(explosionForce, explosionOrigin, explosionRadius, 3.0f, ForceMode.Impulse);
            }
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.InputSystem API (Input mới)](./03-inputsystem-api.md) |
| → Tiếp theo | [SceneManagement API (Quản lý cảnh)](./05-scene-management-api.md) |
