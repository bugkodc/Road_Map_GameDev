# Animations API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.Animator](https://docs.unity3d.com/ScriptReference/Animator.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Unity's Mecanim animation system (`UnityEngine.Animator`) manages how a 2D/3D character's motions transition between one another. Professional animation programming requires understanding the dynamic interaction between code logic (C#) and the animation state machine (Animator Controller), including setting parameters efficiently, using Animation Events, and synchronizing motion through Blend Trees and Root Motion.

---

## ⚙️ 1. Communicating with the Animator Controller via C#

C# code controls animation by changing the values of parameters that are pre-configured in the Animator Controller.

### Methods for setting parameters:
*   **`animator.SetFloat("Speed", value)`**: Used for smooth movement (Blend Trees).
*   **`animator.SetBool("IsGrounded", true)`**: Used for stable binary states (standing on the ground vs. flying).
*   **`animator.SetTrigger("Attack")`**: Used for actions that happen instantly and once (sword slash, gunshot, death).

> [!WARNING]
> **Optimizing string performance (String hashing):**
> Calling `animator.SetTrigger("Attack")` every time forces Unity to convert the string `"Attack"` into a hash integer in order to look up the parameter. Compute the hash just once in `Awake()` using **`Animator.StringToHash()`** to speed up execution:
> `private static readonly int attackHash = Animator.StringToHash("Attack");`
> `animator.SetTrigger(attackHash);`

---

## ⚡ 2. Synchronizing Physical Motion & Animation

*   **Animation Events:** Allow you to trigger a specific C# function at an exact point on the timeline of an animation clip (for example, playing a footstep sound when the heel touches the ground in a running animation, or creating a damage Collider when the blade slashes down in an attack animation).
*   **Root Motion:** A mechanism that takes the actual displacement data from a 3D animation file and applies it directly to the GameObject's position (instead of moving via C# code, the character travels exactly as many meters as the footsteps in the animation file dictate). Use the `OnAnimatorMove()` event to customize this mechanism.

---

## 🎮 Practical Source Code (Unity C#)

Below is a C# character movement controller that accurately synchronizes the Rigidbody's physical movement velocity into the Animator's Blend Tree using performance-optimized hashes.

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

    // Optimize performance by hashing the parameter strings to integers just once
    private int speedPercentHash;
    private int isMovingHash;
    private int attackTriggerHash;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        rb = GetComponent<Rigidbody>();

        // Hash the parameter strings
        speedPercentHash = Animator.StringToHash("SpeedPercent");
        isMovingHash = Animator.StringToHash("IsMoving");
        attackTriggerHash = Animator.StringToHash("Attack");
    }

    private void Update()
    {
        // Check for an attack command from the player
        if (Input.GetMouseButtonDown(0))
        {
            // Call the Trigger using the performance-optimized hash
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
            // Move the character physically
            Vector3 movement = moveDir * currentTargetSpeed * Time.deltaTime;
            rb.MovePosition(transform.position + movement);

            // Rotate to face the direction of movement
            Quaternion targetRot = Quaternion.LookRotation(moveDir, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRot, 10f * Time.deltaTime);

            // Update the animation Blend Tree value (0 = Idle, 0.3 = Walk, 1.0 = Run)
            float speedPercent = isRunning ? 1.0f : 0.3f;
            animator.SetFloat(speedPercentHash, speedPercent, 0.1f, Time.deltaTime); // 0.1f is the value smoothing time (dampTime)
            animator.SetBool(isMovingHash, true);
        }
        else
        {
            // Return to Idle
            animator.SetFloat(speedPercentHash, 0f, 0.1f, Time.deltaTime);
            animator.SetBool(isMovingHash, false);
        }
    }

    // ==========================================
    // 🔔 ANIMATION EVENT CALLBACK
    // This function is called automatically from the animation file (Animation Clip timeline)
    // ==========================================
    public void OnFootstep(string footSide)
    {
        Debug.Log($"[AnimEvent] {footSide} foot touched the ground. Play footstep sound!");
        // In practice: SoundManagerDemo.Instance.PlaySfx(footstepSound, transform.position);
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [AI & Navigation API](./08-ai-api.md) |
| → Next | [Rendering & Materials API](./10-rendering-api.md) |
