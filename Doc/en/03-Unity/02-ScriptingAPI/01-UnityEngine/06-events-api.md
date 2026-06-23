# Events & Actions API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.Events](https://docs.unity3d.com/ScriptReference/Events.UnityEvent.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An event-driven architecture helps connect the components in a game through loose coupling. Instead of having classes reference each other directly (for example, the Player class calling directly into the UI, SFX, and Achievements), we use events to broadcast state. This makes the code cleaner, more extensible, and easier to maintain.

This document analyzes the nature of the two event solutions in Unity: **`UnityEvent`** and **C# `System.Action` / `delegate`**, along with techniques for preventing memory leaks.

---

## ⚖️ 1. Comparison: UnityEvent vs C# System.Action

Unity provides its own event class, but you can also use C#'s standard delegate data types.

```
┌────────────────────────────────────────────────────────┐
│                     Event System                       │
├───────────────────────────┬────────────────────────────┤
│        UnityEvent         │     System.Action / Event  │
├───────────────────────────┼────────────────────────────┤
│ - Visual in the Inspector │ - Code-only                │
│ - Easy for Designers      │ - Extremely high perf.     │
│ - Slow due to Reflection  │ - Type-safe                │
│ - Suits UI, game Logic    │ - Suits Core Engine, Loop  │
└───────────────────────────┴────────────────────────────┘
```

### Characteristics in detail:
1.  **UnityEvent (`UnityEngine.Events`):**
    *   *Advantage:* Displayed visually in the Editor Inspector. A Designer can drag and drop GameObjects and choose the function to call when the event fires, without editing code.
    *   *Disadvantage:* Costs more CPU resources because Unity must perform a string-based function lookup mechanism (Reflection) at runtime.
2.  **C# Action / Event (`System`):**
    *   *Advantage:* The call speed is many times faster than UnityEvent because the function binding is created directly at the compiler level (the delegate invocation list).
    *   *Disadvantage:* Completely hidden in the Editor's Inspector.

---

## ⚠️ 2. The Risk of Memory Leaks

A very common bug in event-driven programming is failing to unsubscribe from events.
*   **The problem:** When Object A subscribes to an event from Object B (`B.OnSomeEvent += A.Method`), Object B holds an implicit reference to Object A in its delegate list. Even when you destroy Object A with the `Destroy(A)` command, the Garbage Collector **cannot free the memory** of A because B is still pointing to it. This leads to memory bloat and resource leaks.
*   **The solution:** Always unsubscribe from events in `OnDisable()` or `OnDestroy()`.

---

## 🎮 Practical Source Code (Unity C#)

The sample C# source below demonstrates how to build a character health manager that fires high-performance events using both C# Action and UnityEvent at the same time, together with proper unsubscription to prevent memory leaks.

```csharp
using System;
using UnityEngine;
using UnityEngine.Events;

public class PlayerHealthDemo : MonoBehaviour
{
    [Header("Health Settings")]
    [SerializeField] private int maxHealth = 100;
    private int currentHealth;

    // 1. Declare a high-performance C# Action for programmers (code-only)
    // Automatically passes the current health and max health as parameters
    public static event Action<int, int> OnHealthChangedAction;

    // 2. Declare a UnityEvent for drag-and-drop wiring in the Inspector
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
            // Fire the death event
            onDeathInspector?.Invoke();
        }
    }

    private void NotifyHealthChanged()
    {
        // Fire the C# Action (null-check with ?)
        OnHealthChangedAction?.Invoke(currentHealth, maxHealth);

        // Fire the UnityEvent in the Inspector
        onHealthChangedInspector?.Invoke(currentHealth);
    }
}

// =========================================================================
// 🔌 EVENT LISTENER SCRIPT (UI CONTROLLER)
// =========================================================================
public class HealthUiController : MonoBehaviour
{
    [SerializeField] private TMPro.TextMeshProUGUI healthText;

    private void OnEnable()
    {
        // Required: Subscribe to the event when the script becomes active
        PlayerHealthDemo.OnHealthChangedAction += UpdateHealthUi;
    }

    private void OnDisable()
    {
        // Required: Unsubscribe from the event to avoid a Memory Leak
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
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [SceneManagement API](./05-scene-management-api.md) |
| → Next | [Audio System API](./07-audio-api.md) |
