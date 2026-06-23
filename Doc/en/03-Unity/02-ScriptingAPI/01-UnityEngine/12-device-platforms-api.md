# Device & Platforms API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.Device](https://docs.unity3d.com/ScriptReference/Device.Application.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

When shipping a cross-platform game (PC, Mobile, WebGL, Console), the source code needs to be able to automatically detect and adapt to the hardware specifications of the device (battery level, screen size, operating system). At the same time, the programmer needs to master platform-conditional compilation techniques to separate logic between different platforms safely and to optimize the size of the installation package.

---

## 📱 1. UnityEngine.Device vs SystemInfo

Starting from recent Unity versions, the **`UnityEngine.Device`** class is recommended to replace some of the older APIs of the `Application` class when running on mobile devices:
*   **`Device.Application.identifier`**: Returns the unique Application ID (Package name on Android, Bundle Identifier on iOS).
*   **`Device.SystemInfo.batteryLevel`**: Returns the remaining battery level (from `0.0` to `1.0`). Very useful for automatically enabling a power-saving mode (reducing FPS, lowering graphics quality) in the game.
*   **`Device.SystemInfo.systemMemorySize`**: Returns the system RAM size. Based on this, you can automatically adjust the graphics configuration (Low/Medium/High) to suit low-end phones.

---

## ⚙️ 2. Conditional Compilation

When writing code that interacts with the operating system (for example, calling Android's payment SDK, or invoking WebGL's virtual keyboard), those code sections will trigger a compile error immediately when you switch the target platform to PC if you do not use a preprocessor filter.

### Common Platform preprocessor flags:
*   `UNITY_EDITOR`: Code runs only while testing inside the Unity Editor environment on a computer.
*   `UNITY_STANDALONE`: Code runs on PC builds (Windows/macOS/Linux).
*   `UNITY_ANDROID` & `UNITY_IOS`: Code runs on mobile phones.
*   `UNITY_WEBGL`: Code runs on the Web platform.

```csharp
#if UNITY_ANDROID
    // This code is only compiled by the compiler when building for Android
    AndroidJavaClass upmClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
#elif UNITY_IOS
    // This code is only compiled when building for iOS
    _iosRegisterSDK();
#else
    // Runs on other platforms
    Debug.Log("Running on PC or Editor");
#endif
```

---

## 🎮 Practical Source Code (Unity C#)

Below is a complete sample C# script demonstrating how to read device specifications to automatically adjust the game's graphics quality, and how to handle platform-conditional code safely.

```csharp
using UnityEngine;

#if UNITY_ANDROID || UNITY_IOS
using UnityEngine.Device; // Import the mobile-device optimization library
#endif

public class PlatformSettingsManager : MonoBehaviour
{
    private void Start()
    {
        ConfigureGraphicsByHardware();
        InitializePlatformSpecifics();
    }

    private void ConfigureGraphicsByHardware()
    {
        // 1. Check the system RAM to configure the initial graphics
        int ramMb = SystemInfo.systemMemorySize;
        Debug.Log($"[Hardware] Device RAM size: {ramMb} MB");

        if (ramMb < 2048) // Low-end machine under 2GB RAM
        {
            // Set the lowest graphics quality level
            QualitySettings.SetQualityLevel(0, true);
            // Cap the FPS at 30 to keep the device cooler and save battery
            Application.targetFrameRate = 30;
            Debug.Log("[Hardware] Graphics configuration: LOW (30 FPS Limit)");
        }
        else // High-end machine
        {
            QualitySettings.SetQualityLevel(2, true);
            Application.targetFrameRate = 60;
            Debug.Log("[Hardware] Graphics configuration: HIGH (60 FPS Limit)");
        }

        // 2. Read the battery status on mobile devices to enable power-saving mode
#if UNITY_ANDROID || UNITY_IOS
        float battery = SystemInfo.batteryLevel;
        if (battery > 0 && battery < 0.2f) // Battery below 20%
        {
            // Lower the rendering resolution to 0.75 to reduce GPU load
            ScalableBufferManager.ResizeBuffers(0.75f, 0.75f);
            Debug.Log("[Hardware] Low battery! Power-saving mode activated.");
        }
#endif
    }

    private void InitializePlatformSpecifics()
    {
        // 3. Use preprocessor flags to call platform-specific APIs
#if UNITY_EDITOR
        Debug.Log("[Platform] Running in the Unity Editor Test environment.");
#elif UNITY_WEBGL
        Debug.Log("[Platform] Running in a WebGL browser. Disabling direct local file saving.");
#elif UNITY_ANDROID
        Debug.Log("[Platform] Launching the Google Play Services SDK.");
#elif UNITY_IOS
        Debug.Log("[Platform] Launching the Apple Game Center SDK.");
#endif
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright of Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UI Toolkit & UGUI API](./11-ui-api.md) |
| → Next | [Unity Roadmap Overview](../../00-unity-overview.md) |
