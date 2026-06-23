# UnityEditor.Callbacks (Editor Events)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Callbacks](https://docs.unity3d.com/ScriptReference/UnityEditor.Callbacks.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Register functions that trigger automatically (callbacks) after Unity finishes compiling code (DidReloadScripts) or after a game build completes (PostProcessBuild).

---

## 🧱 1. Hooking into Editor Lifecycle Events

The `UnityEditor.Callbacks` class provides extremely useful attributes for running configuration and initialization functions automatically.

* **`[DidReloadScripts]`**: Runs automatically every time C# source code finishes compiling in the Editor. Perfect for rebuilding cached data or validating data structure integrity.
* **`[PostProcessBuild]`**: Runs after the game executable has been generated (commonly used to edit the iOS Xcode project file or copy additional configuration files).

---

## 📐 2. The Infinite Loop Pitfall

Inside a function marked with `DidReloadScripts`, avoid calling methods that modify and save Assets (`AssetDatabase.SaveAssets`), because doing so triggers another recompilation and creates an infinite loop.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Callbacks` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Callbacks;

public class EditorCompilationCallback
{
    [DidReloadScripts]
    private static void OnScriptsReloaded()
    {
        // Triggers automatically when the developer returns to Unity after editing code in the IDE
        Debug.Log("[Callbacks.Editor] C# source code compiled successfully! Synchronizing data...");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Build](build.md) |
| → Next | [UnityEditor.Categorization](categorization.md) |
