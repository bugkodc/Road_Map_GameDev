# AI & Navigation API (NavMesh Pathfinding System)

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.AI](https://docs.unity3d.com/ScriptReference/AI.NavMeshAgent.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The **Unity NavMesh** navigation system (`UnityEngine.AI`) allows characters (AI) to find the shortest path around a level while avoiding obstacles. Pathfinding programming requires good control over the state of the `NavMeshAgent` (the moving agent), the `NavMeshObstacle` (static/dynamic obstacles), and advanced asynchronous path computations to avoid overloading the CPU when many Agents are running at the same time.

---

## 🧠 1. NavMeshAgent: The Pathfinding Agent via C#

The `NavMeshAgent` component manages both the path computation (Pathfinding) and the AI's physical movement.

### Common C# APIs for controlling the Agent:
*   **`agent.SetDestination(Vector3 target)`**: Sets the destination point for the Agent. Unity will automatically compute the optimal path under the hood.
*   **`agent.remainingDistance`**: The remaining distance from the current position to the destination point.
*   **`agent.isPathStale`**: A flag that checks whether the current path has become stale/outdated (because a new obstacle has appeared to block the way).
*   **`agent.CalculatePath(Vector3 target, NavMeshPath path)`**: Computes a trial path to the destination and stores it in the `NavMeshPath` structure **without forcing the Agent to move**. Very useful for checking in advance whether a point is reachable.

---

## ⚡ 2. Optimizing Pathfinding Performance

When a game has hundreds of enemies running pathfinding at once, calling `SetDestination` continuously every frame (`Update`) will cause severe framerate drops, because the Engine has to solve the A* algorithm too many times.

### Optimization solutions:
1.  **Time-slicing mechanism:** Only allow a new path to be computed after each fixed cycle (for example, every 0.2 to 0.5 seconds), rather than every frame.
2.  **Disable automatic rotation/movement:** If you want to control the movement yourself or use Root Motion animation to move the AI, set `agent.updatePosition = false` and `agent.updateRotation = false`, then move the Transform yourself based on the `agent.nextPosition` property.

---

## 🎮 Practical Source Code (Unity C#)

Below is a complete sample C# script that controls an enemy AI patrolling through Waypoints, chasing the Player when it spots them in its line of sight, and using a time-slicing mechanism to optimize CPU performance.

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
    [SerializeField] private float updateInterval = 0.5f; // Time interval between path computations

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
        // Check whether there is a player and whether it is time to update the path
        if (playerTarget != null && Time.time >= nextUpdateTime)
        {
            nextUpdateTime = Time.time + updateInterval;
            ProcessAiBehavior();
        }
    }

    private void ProcessAiBehavior()
    {
        // 1. Measure the actual distance to the Player
        float distanceToPlayer = Vector3.Distance(transform.position, playerTarget.position);

        if (distanceToPlayer <= chaseRange)
        {
            // State: Chasing the Player
            agent.speed = chaseSpeed;
            agent.SetDestination(playerTarget.position);
            Debug.Log("[EnemyAI] Target detected! Beginning the chase.");
        }
        else
        {
            // State: Returning to Patrol
            agent.speed = patrolSpeed;
            
            // If we have reached the current patrol point, move on to the next one
            if (!agent.pathPending && agent.remainingDistance < 0.5f)
            {
                GoToNextWaypoint();
            }
        }
    }

    private void GoToNextWaypoint()
    {
        if (patrolWaypoints.Length == 0) return;

        // Set the next patrol destination
        agent.destination = patrolWaypoints[currentWaypointIndex].position;
        Debug.Log($"[EnemyAI] Patrolling to Waypoint: {currentWaypointIndex}");

        // Cycle through the patrol point indices
        currentWaypointIndex = (currentWaypointIndex + 1) % patrolWaypoints.Length;
    }

    // Visualize the player detection radius in the Editor
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, chaseRange);
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Audio System API](./07-audio-api.md) |
| → Next | [Animations API](./09-animations-api.md) |
