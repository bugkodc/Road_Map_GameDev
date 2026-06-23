# UnityEditor.DeviceSimulation (Device Simulation)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.DeviceSimulation](https://docs.unity3d.com/ScriptReference/UnityEditor.DeviceSimulation.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for controlling the Device Simulator through C# code, allowing automated testing of screen rotation and resolution.

---

## 🧱 1. Automating Tests on the Mobile Simulator

The Device Simulator is an excellent tool for seeing how the game's interface looks on the notched and punch-hole screens of devices like the iPhone and Samsung phones. This API lets you change the simulated device from code.

---

## 📐 2. Simulating Screen Rotation (Orientation)

Automatically switch the screen orientation from landscape to portrait and back to verify that the Responsive UI Layout adapts correctly.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.DeviceSimulation` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#if UNITY_DEVICE_SIMULATOR
using UnityEditor.DeviceSimulation;
#endif

public class SimulatorAutomation
{
    public static void TestRotateScreen()
    {
        #if UNITY_DEVICE_SIMULATOR
        // Change the simulated screen orientation to Portrait
        var simulator = DeviceSimulator.GetWindow();
        if (simulator != null)
        {
            simulator.SetOrientation(ScreenOrientation.Portrait);
            Debug.Log("[DeviceSimulation.Editor] Switched the simulated screen orientation to Portrait.");
        }
        #endif
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.CrashReporting](crash-reporting.md) |
| → Next | [UnityEditor.EditorTools](editor-tools.md) |
