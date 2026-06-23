# UnityEngine Core API

> 📖 **Source:** This document was compiled and written in depth from the [Unity Scripting API — UnityEngine](https://docs.unity3d.com/ScriptReference/UnityEngine.html) reference, based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The **UnityEngine Core API** subsystem contains the most fundamental classes, structs, and interfaces of the Unity Engine. Correctly understanding how the core classes such as `GameObject`, `Component`, `Transform`, and the math data types (`Vector3`, `Quaternion`) actually work is the key to writing performance-optimized code, avoiding memory garbage (GC Alloc), and organizing a flexible game architecture.

---

## 🧱 1. The Nature of GameObject & Component

A `GameObject` is the most basic entity that holds every object in the game world. However, a `GameObject` does not perform any behavior on its own; it acts as a **Container** that holds the `Component`s which handle the logic.

```
┌─────────────────────────────────────────────────────────┐
│                    GameObject (C# Wrapper)              │
│  - Name: "Player"                                       │
│  - Tag: "Player", Layer: 3 (Default)                    │
│  - Active Self: true                                    │
├───────────────┬───────────────────┬─────────────────────┤
│   Transform   │  SpriteRenderer   │   PlayerController  │
│  (Position/Rot)│  (Image display) │  (C# Logic Script)  │
└───────────────┴───────────────────┴─────────────────────┘
```

### The C++ vs C# Boundary mechanism:
Every time you access a `GameObject` or `Component` in C#, you are actually calling through a **C# Wrapper Object** that connects to the real object managed by the C++ core (Native Engine).
*   **Null Check cost:** Comparing `gameObject == null` or `component == null` costs more performance than an ordinary null check, because Unity must perform a cross-boundary call (P/Invoke) into C++ to check whether the native object has already been destroyed.
*   **Solution:** In large loops, cache the reference or use the null-coalescing operator carefully.

### Optimal Component management:
To get a component reference, avoid using `GetComponent(string name)`, because using a string wastes lookup resources and is not type-safe. Instead, use the generic type:

*   **`GetComponent<T>()`**: Gets a component of type `T`.
*   **`TryGetComponent<T>(out T component)`**: Avoids garbage allocation (Garbage Collection) when checking for existence. This method does not throw an exception and does not generate garbage thanks to the underlying native null-check, making it extremely optimal for systems such as physics collisions or firing projectiles.

---

## 📐 2. The Transform Class & Scene Hierarchy

Every `GameObject` is required to have a `Transform` component. This class manages the position, rotation, and scale of the object in 2D/3D space.

### Local vs World Space coordinate systems:
*   **`transform.position` & `transform.rotation`**: The position and rotation in **World Space**, relative to the global origin `(0,0,0)`.
*   **`transform.localPosition` & `transform.localRotation`**: The position and rotation relative to the **Parent** object. If the object has no parent, the local coordinates equal the world coordinates.

```csharp
// Convert a vector from Local space to World space
// Example: Find the point 5 meters ahead of a warship's nose (local forward is Vector3.forward)
Vector3 spawnWorldPos = transform.TransformPoint(Vector3.forward * 5f);
```

### Parent-Child Relationship:
The `Transform` class implements the `IEnumerable` interface, which means you can iterate over a transform to find its direct child transforms:

```csharp
// Iterate over all direct children of this GameObject
foreach (Transform child in transform)
{
    Debug.Log("Found child object: " + child.name);
}
```

> [!WARNING]
> **Avoid continuously changing the parent-child structure (Reparenting) at runtime:**
> When you change the parent of a Transform (`transform.SetParent(newParent)`), Unity is forced to recompute the space transformation matrix for the entire hierarchy below it and reorganize the data structure in the C++ Native cache. This causes a framerate spike if done continuously on a large number of objects.

---

## 🧮 3. Vector Math: Vector2 vs Vector3

Unity uses the value-type structs `Vector2` and `Vector3` to represent spatial vectors and numeric points.

### Important math functions:
1.  **`Normalize()` vs `normalized`**:
    *   `Vector3.normalized`: Returns a copy of the vector with a magnitude of `1` without changing the original vector.
    *   `vector.Normalize()`: Directly changes the length of the vector itself to `1`. This saves memory because no copy is created.
2.  **`Vector3.Dot(A, B)` (Dot Product)**: Returns a real number (`float`).
    *   If the result is `> 0`: The two vectors point in the same direction (acute angle `< 90°`).
    *   If the result is `= 0`: The two vectors are perpendicular (`90°`).
    *   If the result is `< 0`: The two vectors point in opposite directions (obtuse angle `> 90°`).
    *   *Application:* Determining whether an enemy lies within the player's forward field of view.
3.  **`Vector3.Cross(A, B)` (Cross Product)**: Returns a `Vector3` perpendicular to both A and B.
    *   *Application:* Finding the Up vector when cornering with a racing car, or finding a spiral rotation axis.
4.  **`Vector3.Lerp` vs `Vector3.Slerp`**:
    *   `Lerp` (Linear Interpolation): Interpolates linearly along a straight line. Suitable for translational movement.
    *   `Slerp` (Spherical Linear Interpolation): Interpolates along a spherical curve. Suitable for computing flight trajectories or smooth directional rotation.

---

## 🔄 4. Rotation & the Quaternion System

In game math, using Euler angles (Euler Angles — X, Y, Z from 0 to 360 degrees) very easily leads to the **Gimbal Lock** problem (axis lock: a phenomenon where two rotation axes coincide, losing one degree of rotational freedom).

### Solution: Quaternion (four-dimensional complex numbers)
Unity uses the `Quaternion` struct (consisting of 4 components `x, y, z, w`) to represent every rotation state. You **should not manually edit** these `x, y, z, w` values unless you understand Quaternion math very deeply.

### Practical Quaternion APIs:
*   **`Quaternion.identity`**: Represents the no-rotation state (the default rotation, corresponding to Euler angles `(0, 0, 0)`).
*   **`Quaternion.Euler(x, y, z)`**: Converts the familiar Euler angles into the Quaternion format to assign to `transform.rotation`.
*   **`Quaternion.LookRotation(forwardVector, upVector)`**: Creates a rotation state such that the Z axis (Forward) points straight toward `forwardVector`. Extremely useful for making an AI automatically turn to face the player.
*   **`Quaternion.Slerp(from, to, t)`**: Smoothly rotates from one angle to another over time `t`.

---

## 🎮 Practical Source Code (Unity C#)

Below is a sample script demonstrating how to optimize performance when interacting with the `UnityEngine Core API` by caching references, using `TryGetComponent` to avoid memory garbage, performing Vector math, and rotating direction smoothly with Quaternion.

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
    
    // Cache components to avoid continuous C++/C# cross-boundary calls in Update
    private Transform myTransform;
    private Rigidbody myRigidbody;

    private void Awake()
    {
        // Cache the object's transform and rigidbody
        myTransform = transform;
        
        // Use TryGetComponent to get a safe, high-performance reference
        if (TryGetComponent<Rigidbody>(out Rigidbody rb))
        {
            myRigidbody = rb;
            // Disable gravity because the ship moves in outer space
            myRigidbody.useGravity = false;
        }
        else
        {
            Debug.LogWarning($"[SpaceShip] Missing Rigidbody on {gameObject.name}!");
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
        // Get movement data from the keyboard (W/S and A/D axes)
        float moveInput = Input.GetAxis("Vertical");
        float turnInput = Input.GetAxis("Horizontal");

        // 1. Use the local-space forward translation vector
        // Instead of repeatedly using transform.forward (which incurs P/Invoke cost), we compute locally
        Vector3 direction = myTransform.forward * moveInput;
        myTransform.position += direction * moveSpeed * Time.deltaTime;

        // 2. Compute local rotation around the Up axis
        float rotationAngle = turnInput * rotationSpeed * 10f * Time.deltaTime;
        Quaternion turnRotation = Quaternion.AngleAxis(rotationAngle, Vector3.up);
        
        // Multiply the two Quaternions to accumulate the rotation
        myTransform.rotation = myTransform.rotation * turnRotation;
    }

    private void AimAndCheckEnemy()
    {
        // 1. Compute distance using Vector3.sqrMagnitude (more optimal than Vector3.Distance)
        // Vector3.Distance performs a square root (Mathf.Sqrt), which is very slow.
        // Use the squared distance to compare faster.
        Vector3 toEnemy = targetEnemy.position - myTransform.position;
        float sqrDist = toEnemy.sqrMagnitude;
        float sqrFireRange = fireDistance * fireDistance;

        if (sqrDist <= sqrFireRange)
        {
            // 2. Compute the Dot Product to check the field of view
            Vector3 directionToEnemy = toEnemy.normalized;
            float dotProduct = Vector3.Dot(myTransform.forward, directionToEnemy);

            // If the angular deviation is less than 30 degrees (cos(30°) ≈ 0.86)
            if (dotProduct > 0.86f)
            {
                Debug.Log("[SpaceShip] Enemy is in the crosshairs! Fire!");
                
                // 3. Rotate smoothly toward the enemy using Quaternion.Slerp
                Quaternion targetRotation = Quaternion.LookRotation(toEnemy, Vector3.up);
                myTransform.rotation = Quaternion.Slerp(myTransform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            }
        }
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity Roadmap Overview](../../00-unity-overview.md) |
| → Next | [MonoBehaviour Lifecycle](./02-monobehaviour-lifecycle.md) |
