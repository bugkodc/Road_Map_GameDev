# UnityEngine.Android

> 📖 **Source:** This document is compiled and edited in depth from the [Unity Scripting API — UnityEngine.Android](https://docs.unity3d.com/ScriptReference/UnityEngine.Android.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for interacting specifically with the Android operating system: calling Activities, checking and requesting runtime Permissions, invoking the Android keyboard, or connecting to Java native plugins.

---

## 🧱 1. Requesting Runtime Permissions on Android

Since Android 6.0, sensitive permissions such as Camera, Microphone, or Location must be granted by the user while the app is running (Runtime Permission). The `UnityEngine.Android.Permission` class provides a mechanism for checking permissions and displaying the permission request dialog directly.

* **`Permission.HasUserAuthorizedPermission`**: Checks whether the user has already granted the permission.
* **`Permission.RequestUserPermission`**: Displays the permission request dialog.

---

## 📐 2. Pitfalls When Requesting Permissions

Requesting a permission happens asynchronously. Don't try to use a feature (for example, opening the camera) immediately after calling `RequestUserPermission`; instead, check the permission via a callback or poll it periodically in Update.

---

## 🎮 Hands-on Code (Unity C#)

The snippet below shows in practice how to optimize performance, handle errors, and integrate systems through the `UnityEngine.Android` subsystem.

```csharp
using UnityEngine;
using UnityEngine.Android;

public class AndroidPermissionsHandler : MonoBehaviour
{
    void Start()
    {
        #if UNITY_ANDROID
        if (!Permission.HasUserAuthorizedPermission(Permission.Camera))
        {
            // Request Android Camera access permission
            Permission.RequestUserPermission(Permission.Camera);
        }
        else
        {
            Debug.Log("[Android] Camera permission was already granted.");
        }
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEngine.AMD](amd.md) |
| → Next | [UnityEngine.Apple](apple.md) |
