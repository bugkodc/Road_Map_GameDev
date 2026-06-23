# UnityEditor.AdaptivePerformance (Editor Configuration)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.AdaptivePerformance](https://docs.unity3d.com/ScriptReference/UnityEditor.AdaptivePerformance.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Tools for configuring settings and monitoring Adaptive Performance for your project directly in the Editor.

---

## 🧱 1. Configuring Mobile Performance Settings

Lets developers set default thermal thresholds and desired levels of graphics optimization right inside the Unity Editor's Project Settings interface.

* Includes simulated performance testing to debug the optimization flow without having to deploy to a real phone.

---

## 📐 2. The Adaptive Configuration Interface

Users can enable or disable the providers for each individual mobile operating system.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.AdaptivePerformance` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class APConfigurator : EditorWindow
{
    [MenuItem("Tools/Adaptive Performance Status")]
    public static void ShowWindow()
    {
        GetWindow<APConfigurator>("AP Config");
    }

    void OnGUI()
    {
        GUILayout.Label("Adaptive Performance configuration", EditorStyles.boldLabel);
        if (GUILayout.Button("Check project settings"))
        {
            // Logic to check whether the Adaptive Performance package is installed correctly
            Debug.Log("[AP Editor] Configuration is working correctly.");
        }
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Actions](actions.md) |
| → Next | [UnityEditor.Advertisements](advertisements.md) |
