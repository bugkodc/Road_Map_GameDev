# UnityEditor.CrashReporting (Crash Reporting)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.CrashReporting](https://docs.unity3d.com/ScriptReference/UnityEditor.CrashReporting.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Configure the automatic collection of crash report data for the game directly from the Editor.

---

## 🧱 1. Configuring the Crash Collection Service

Lets you enable or disable the Cloud Diagnostics Crash Reporting service from code. This helps keep the crash reporting configuration consistent across every member of the game development team.

---

## 📐 2. Automating the Setup

Automatically override the crash reporting configuration when switching between the Development and Production environments.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.CrashReporting` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class CrashReportingSettings
{
    public static void EnableReportingInEditor()
    {
        // Enable the diagnostics service that automatically sends crash reports to the cloud server
        PlayerSettings.enableCrashReportAPI = true;
        Debug.Log("[CrashReporting.Editor] Enabled the API that automatically sends crash reports to the developer.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Connect](connect.md) |
| → Next | [UnityEditor.DeviceSimulation](device-simulation.md) |
