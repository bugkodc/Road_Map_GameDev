# UnityEngine.iOS

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.iOS](https://docs.unity3d.com/ScriptReference/UnityEngine.iOS.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Programmatic interaction specific to iOS: controlling Haptic Feedback, creating Local Notifications, and configuring the iOS virtual keyboard.

---

## 🧱 1. Deep Interaction with the iOS System

The `UnityEngine.iOS` class provides features that help a game integrate better with the Apple iOS ecosystem.

* **`Device.RequestStoreReview`**: Displays the app rating dialog directly in the game without opening the App Store.
* **Haptic Feedback**: Uses the force-feedback vibration system to enhance the tactile experience when a player fights or clicks on the UI.

---

## 📐 2. Cross-Platform Pitfalls

Avoid calling `UnityEngine.iOS` methods directly on Android or PC to prevent compile errors. Always wrap the code in `#if UNITY_IOS`.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.iOS` subsystem.

```csharp
using UnityEngine;

public class iOSManager : MonoBehaviour
{
    public void RequestAppRating()
    {
        #if UNITY_IOS
        // Ask the user to rate the game on the App Store (safe and non-intrusive)
        UnityEngine.iOS.Device.RequestStoreReview();
        Debug.Log("[iOS] Sent the app rating request.");
        #else
        Debug.Log("[iOS] The rating request is only available on iOS devices.");
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.Identifiers](identifiers.md) |
| → Next | [UnityEditor Core API](../02-UnityEditor/01-editor-core.md) |
