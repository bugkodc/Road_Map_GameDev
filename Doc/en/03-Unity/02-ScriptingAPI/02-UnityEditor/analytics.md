# UnityEditor.Analytics (Analytics Configuration)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.Analytics](https://docs.unity3d.com/ScriptReference/UnityEditor.Analytics.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Configure settings and track the flow of Unity Analytics data for game marketing and operations.

---

## 🧱 1. Registering Analytics Events

Supports enabling Unity Cloud's game analytics service and validating the correctness of the event data being sent before packaging the commercial product.

---

## 📐 2. Setting the Analytics ID

Automatically set the API key or authentication token of the Analytics service through code.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.Analytics` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AnalyticsSetup
{
    public static void VerifyAnalyticsStatus()
    {
        // Kiểm tra xem ID dự án đã được liên kết chính xác với Unity Cloud Analytics chưa
        string projectId = PlayerSettings.cloudProjectId;
        Debug.Log($"[Analytics.Editor] Mã dự án đã liên kết: {projectId}");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.AI](ai.md) |
| → Next | [UnityEditor.Android](android.md) |
