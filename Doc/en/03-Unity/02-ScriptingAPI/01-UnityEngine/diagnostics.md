# UnityEngine.Diagnostics

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Diagnostics](https://docs.unity3d.com/ScriptReference/UnityEngine.Diagnostics.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

APIs for deep measurement and diagnosis of the engine's operating state, including data integrity checks and memory diagnostics.

---

## 🧱 1. Diagnosing and Monitoring System Memory

The `UnityEngine.Diagnostics` namespace provides extremely powerful debugging tools that let developers test the game's stability under harsh conditions.

* **`Utils.ForceCrash`**: Deliberately simulates a game crash to verify that the save system stores checkpoints correctly, or to test the crash reporting system.
* **Use Only for Debugging**: This class should only be enabled in development environments (Development Builds).

---

## 📐 2. Safety Warning

Never leave `ForceCrash` lines in a commercial build released to players on an app store.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Diagnostics` subsystem.

```csharp
using UnityEngine;
using UnityEngine.Diagnostics;

public class SystemDebugger : MonoBehaviour
{
    public void SimulateSystemError()
    {
        if (Debug.isDebugBuild)
        {
            Debug.LogWarning("[Diagnostics] Simulating a memory access error...");
            // Deliberately crash the game to test the log-capturing system
            Utils.ForceCrash(ForcedCrashCategory.AccessViolation);
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.DedicatedServer](dedicated-server.md) |
| → Next | [UnityEngine.Experimental](experimental.md) |
