# UnityEngine.DedicatedServer

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.DedicatedServer](https://docs.unity3d.com/ScriptReference/UnityEngine.DedicatedServer.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Optimization settings dedicated to building for a dedicated server (Dedicated Server), disconnecting image rendering to minimize CPU load.

---

## 🧱 1. Optimizing a Dedicated Server (Headless Server)

When you build a game as a Dedicated Server (running without a screen — Headless Mode), you need to disable all graphics and audio processing to save system resources.

* **`DedicatedServer`**: An API that helps check for and disable resources that aren't used on the server.
* **Saving CPU**: Turning off Mesh Renderers and Animator image updates lets the server handle many times more game rooms.

---

## 📐 2. NullReference Pitfalls in Shared Code

If your code runs on both the Client and the Server (Shared Code), calling methods related to `Camera.main` or `AudioSource` directly on the Server will cause a crash. Always check the environment before calling them.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.DedicatedServer` subsystem.

```csharp
using UnityEngine;

public class ServerVisualStripper : MonoBehaviour
{
    void Awake()
    {
        // Check whether the game is running in dedicated Server mode
        #if DEDICATED_SERVER || UNITY_SERVER
        Debug.Log("[Server] Detected a Dedicated Server environment. Stripping graphics...");
        
        // Disable the object's MeshRenderer to free up GPU/CPU rendering
        if (TryGetComponent<MeshRenderer>(out MeshRenderer mr))
        {
            Destroy(mr);
        }
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.CrashReportHandler](crash-report-handler.md) |
| → Next | [UnityEngine.Diagnostics](diagnostics.md) |
