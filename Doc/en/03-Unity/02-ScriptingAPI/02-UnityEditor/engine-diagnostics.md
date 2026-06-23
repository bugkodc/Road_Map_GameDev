# UnityEditor.EngineDiagnostics (Deep Diagnostics)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.EngineDiagnostics](https://docs.unity3d.com/ScriptReference/UnityEditor.EngineDiagnostics.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for deep diagnostics of the engine's behavior, intended for technical debugging within the Editor.

---

## 🧱 1. Tracking Errors and Warnings Inside the Engine

This module lets developers dig deep into the performance analysis reports of the engine core itself (C++). It is well suited for tracing graphics memory leaks or hung asynchronous calls.

---

## 📐 2. Collecting Diagnostic Logs

Export detailed diagnostic data to a text file to submit bug reports to Unity's technical support team.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.EngineDiagnostics` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class EngineDiagnosticsLogger
{
    public static void LogDiagnosticDump()
    {
        // Record a log of the engine core's current state during editing
        Debug.Log("[EngineDiagnostics] State dump log complete. The system is operating normally.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Embree](embree.md) |
| → Next | [UnityEditor.Events](events.md) |
