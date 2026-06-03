# AI & Navigation API (Hệ thống Tìm đường NavMesh)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.AI](https://docs.unity3d.com/ScriptReference/AI.NavMeshAgent.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống điều hướng **Unity NavMesh** (`UnityEngine.AI`) cho phép nhân vật (AI) tìm kiếm đường đi ngắn nhất quanh màn chơi tránh vật cản. Lập trình tìm đường đòi hỏi kiểm soát tốt trạng thái của `NavMeshAgent` (tác nhân di chuyển), `NavMeshObstacle` (chướng ngại vật tĩnh/động), và các tính toán đường đi bất đồng bộ nâng cao để tránh quá tải hiệu năng CPU khi có nhiều Agent chạy cùng lúc.

---

## 🧠 1. NavMeshAgent: Tác nhân tìm đường qua C#

Component `NavMeshAgent` quản lý cả việc tính toán đường đi (Pathfinding) và việc thực hiện di chuyển vật lý của AI.

### Các API C# điều khiển Agent phổ biến:
*   **`agent.SetDestination(Vector3 target)`**: Đặt điểm đích đến cho Agent. Unity sẽ tự động tính toán đường đi tối ưu ngầm.
*   **`agent.remainingDistance`**: Khoảng cách còn lại từ vị trí hiện tại đến điểm đích.
*   **`agent.isPathStale`**: Cờ kiểm tra xem đường đi hiện tại có bị cũ/lỗi thời không (do chướng ngại vật mới xuất hiện cản đường).
*   **`agent.CalculatePath(Vector3 target, NavMeshPath path)`**: Tính toán thử đường đi đến đích và lưu vào cấu trúc `NavMeshPath` mà **không cần ép Agent di chuyển**. Rất hữu ích để kiểm tra trước xem một điểm có thể đến được hay không.

---

## ⚡ 2. Tối ưu hóa Hiệu năng Tìm đường

Khi một trò chơi có hàng trăm kẻ địch cùng chạy tìm đường, việc gọi `SetDestination` liên tục trên mỗi khung hình (`Update`) sẽ gây sụt giảm khung hình nghiêm trọng do Engine phải giải thuật toán A* quá nhiều lần.

### Giải pháp tối ưu:
1.  **Cơ chế giãn cách thời gian (Time-slicing):** Chỉ cho phép tính toán đường đi mới sau mỗi chu kỳ cố định (ví dụ: 0.2 đến 0.5 giây), không gọi mỗi frame.
2.  **Tắt cơ chế tự động xoay/di chuyển:** Nếu bạn muốn tự kiểm soát chuyển động hoặc dùng hiệu ứng hoạt họa Root Motion để di chuyển AI, hãy đặt `agent.updatePosition = false` và `agent.updateRotation = false`, sau đó tự di chuyển Transform dựa trên thuộc tính `agent.nextPosition`.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script mẫu C# hoàn chỉnh điều khiển AI kẻ địch đi tuần tra qua các Waypoint, đuổi theo Player khi phát hiện tầm nhìn, và sử dụng cơ chế giãn cách thời gian để tối ưu hiệu năng CPU.

```csharp
using UnityEngine;
using UnityEngine.AI;

[RequireComponent(typeof(NavMeshAgent))]
public class EnemyAiController : MonoBehaviour
{
    [Header("Patrol Settings")]
    [SerializeField] private Transform[] patrolWaypoints;
    [SerializeField] private float patrolSpeed = 2f;
    
    [Header("Chase Settings")]
    [SerializeField] private Transform playerTarget;
    [SerializeField] private float chaseRange = 10f;
    [SerializeField] private float chaseSpeed = 5f;
    [SerializeField] private float updateInterval = 0.5f; // Thời gian giãn cách giữa các lần tính đường đi

    private NavMeshAgent agent;
    private int currentWaypointIndex;
    private float nextUpdateTime;

    private void Awake()
    {
        agent = GetComponent<NavMeshAgent>();
    }

    private void Start()
    {
        currentWaypointIndex = 0;
        agent.speed = patrolSpeed;
        GoToNextWaypoint();
    }

    private void Update()
    {
        // Kiểm tra xem có người chơi và đã đến giờ cập nhật đường đi chưa
        if (playerTarget != null && Time.time >= nextUpdateTime)
        {
            nextUpdateTime = Time.time + updateInterval;
            ProcessAiBehavior();
        }
    }

    private void ProcessAiBehavior()
    {
        // 1. Đo khoảng cách thực tế đến Player
        float distanceToPlayer = Vector3.Distance(transform.position, playerTarget.position);

        if (distanceToPlayer <= chaseRange)
        {
            // Trạng thái: Đuổi theo Player
            agent.speed = chaseSpeed;
            agent.SetDestination(playerTarget.position);
            Debug.Log("[EnemyAI] Phát hiện mục tiêu! Tiến hành đuổi theo.");
        }
        else
        {
            // Trạng thái: Quay lại Tuần tra
            agent.speed = patrolSpeed;
            
            // Nếu đã đến gần điểm tuần tra hiện tại, chuyển sang điểm tiếp theo
            if (!agent.pathPending && agent.remainingDistance < 0.5f)
            {
                GoToNextWaypoint();
            }
        }
    }

    private void GoToNextWaypoint()
    {
        if (patrolWaypoints.Length == 0) return;

        // Thiết lập điểm đến tuần tra tiếp theo
        agent.destination = patrolWaypoints[currentWaypointIndex].position;
        Debug.Log($"[EnemyAI] Đi tuần tra đến Waypoint: {currentWaypointIndex}");

        // Xoay vòng chỉ mục các điểm tuần tra
        currentWaypointIndex = (currentWaypointIndex + 1) % patrolWaypoints.Length;
    }

    // Trực quan hóa bán kính phát hiện người chơi trong Editor
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, chaseRange);
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Audio System API (Âm thanh)](./07-audio-api.md) |
| → Tiếp theo | [Animations API (Hoạt họa)](./09-animations-api.md) |
