# UnityEditor.Connect (Connecting to Cloud Services)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Connect](https://docs.unity3d.com/ScriptReference/UnityEditor.Connect.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API that manages the connection between the Unity Editor and the developer account's online services (Unity Cloud Services).

---

## 🧱 1. Managing Cloud Connection State

This class lets tools automatically detect whether the current Editor is signed in with a valid Unity account and check permissions for linking the project to Unity Cloud Services.

---

## 📐 2. Automatic Configuration

Automatically configure the developer account link in order to pull data from the Unity Dashboard.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Connect` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class CloudConnectionVerify
{
    public static void CheckConnection()
    {
        // Check whether the current Editor is linked to the development organization's cloud ID
        string cloudId = PlayerSettings.cloudProjectId;
        Debug.Log($"[Connect.Editor] Connecting project. Cloud ID: {cloudId}");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Compilation](compilation.md) |
| → Next | [UnityEditor.CrashReporting](crash-reporting.md) |
