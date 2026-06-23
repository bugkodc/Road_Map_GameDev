# UnityEngine.CrashReportHandler

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.CrashReportHandler](https://docs.unity3d.com/ScriptReference/UnityEngine.CrashReportHandler.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Programmatic interaction with the crash reporting system (Crash Reporting). It lets you customize the attached information and send error data directly to Unity Cloud Diagnostics.

---

## 🧱 1. Collecting Error Report Data Automatically

The `CrashReportHandler` class lets you collect information when the application hits a serious error or crashes.

* **`CrashReportHandler.SetUserMetadata`**: Attaches custom metadata (for example, the game version, room ID, or actual device configuration), which makes debugging on Cloud Diagnostics much easier.

---

## 📐 2. Security Pitfalls

Do not store sensitive personal information (such as passwords, emails, or credit card details) in crash report metadata, in order to comply with privacy regulations (such as GDPR).

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.CrashReportHandler` subsystem.

```csharp
using UnityEngine;
using UnityEngine.CrashReportHandler;

public class CrashReportConfigurator : MonoBehaviour
{
    void Start()
    {
        // Attach the player ID and current game mode to the crash report data
        CrashReportHandler.SetUserMetadata("player_id", "user_198273");
        CrashReportHandler.SetUserMetadata("game_mode", "battle_royale");
        
        Debug.Log("[CrashReport] Successfully set metadata for the crash report.");
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Categorization](categorization.md) |
| → Next | [UnityEngine.DedicatedServer](dedicated-server.md) |
