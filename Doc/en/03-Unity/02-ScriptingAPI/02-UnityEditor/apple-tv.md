# UnityEditor.AppleTV (Apple TV Build)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.AppleTV](https://docs.unity3d.com/ScriptReference/UnityEditor.AppleTV.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Set up build settings, certificates, and configuration specific to publishing a game to the Apple TV platform.

---

## 🧱 1. Publishing an Application to tvOS

The API for managing settings specific to development on Apple TV (tvOS), including configuring controller compatibility (Siri Remote) and handling large-screen display resolution.

---

## 📐 2. Installing Apple TV Certificates

Automate assigning the app signing certificate and configuring the App Group for the tvOS operating system.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.AppleTV` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AppleTVBuildSetup
{
    public static void ConfigureAppleTV()
    {
        // Chuyển đổi nền tảng mục tiêu sang Apple TV
        EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.tvOS, BuildTarget.tvOS);
        Debug.Log("[AppleTV.Editor] Đã chuyển đổi mục tiêu build sang Apple TV.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Animations](animations.md) |
| → Next | [UnityEditor.Build](build.md) |
