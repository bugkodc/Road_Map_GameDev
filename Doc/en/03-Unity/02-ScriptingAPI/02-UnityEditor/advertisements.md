# UnityEditor.Advertisements (Ad Management)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.Advertisements](https://docs.unity3d.com/ScriptReference/UnityEditor.Advertisements.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The API for managing and configuring the integration of the Unity Ads package for mobile platforms in the Editor.

---

## 🧱 1. Automating Unity Ads Integration

This class supports configuring the Unity Ads game ID for the Google Play and Apple App Store platforms directly through Editor C# code, which is very convenient for automated build systems (CI/CD pipelines).

---

## 📐 2. Managing Ad State

Developers can enable ad Test Mode during development to avoid violating the display policies of the ad network provider.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.Advertisements` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AdsBuildSetup : MonoBehaviour
{
    public static void ConfigureAds(string androidGameId, bool testMode)
    {
        // Mã cấu hình phân hệ quảng cáo tự động lúc Build game
        Debug.Log($"[Ads.Editor] Cấu hình Ads GameID: {androidGameId}, Test Mode: {testMode}");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.AdaptivePerformance](adaptive-performance.md) |
| → Next | [UnityEditor.AI](ai.md) |
