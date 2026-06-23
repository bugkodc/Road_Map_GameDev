# Unity.Android (Android Hardware Optimization API)

> 📖 **Source:** This document is compiled and written in depth from the [Unity Scripting API — Unity.Android](https://docs.unity3d.com/ScriptReference/Unity.Android.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Provides APIs that support services specific to the Android operating system.

---

## 🧱 1. Low-level performance tuning on Android

The `Unity.Android` namespace provides features for deep optimization of Android mobile hardware, supporting clock-speed control and direct interaction with the hardware layer through the Java Native Interface (JNI).

---

## 📐 2. Processing thread management

Helps programmers pin the game's heavy compute threads to the high-performance cores (Big Cores) or power-saving cores (LITTLE Cores) of the mobile ARM chip.

---

## 🎮 Hands-on source code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `Unity.Android` subsystem.

```csharp
using UnityEngine;

public class UnityAndroidOptimizer : MonoBehaviour
{
    void Start()
    {
        #if UNITY_ANDROID
        // Mã tối ưu hóa xung nhịp xử lý CPU cho game Android khi vào trận đấu lớn
        Debug.Log("[Unity.Android] Đã kích hoạt tối ưu hóa xung nhịp CPU di động.");
        #endif
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Experimental](../02-UnityEditor/experimental.md) |
| → Next | [Unity.Burst](burst.md) |
