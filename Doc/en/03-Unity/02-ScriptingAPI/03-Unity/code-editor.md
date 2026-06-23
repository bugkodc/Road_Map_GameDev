# Unity.CodeEditor (Code Editor IDE Integration)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.CodeEditor](https://docs.unity3d.com/ScriptReference/Unity.CodeEditor.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for connecting to and configuring integration with external source-code editors (such as Visual Studio, VS Code, and Rider).

---

## 🧱 1. Synchronizing source code with an external IDE

Lets you write scripts that automate the setup of a developer's preferred IDE configuration, or automatically generate the appropriate `.sln` solution and `.csproj` files after external asset changes occur outside the system.

---

## 📐 2. Configuring the default editor

Change the Unity Editor's default code editor setting through the preferences configuration.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code that shows how to program for performance optimization, error handling, and system integration through the `Unity.CodeEditor` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using Unity.CodeEditor;

public class IDEIntegrator
{
    public static void SyncSolution()
    {
        // Synchronize the source-code configuration files with the external IDE via the CodeEditor API
        CodeEditor.Editor.CurrentCodeEditor.SyncAll();
        Debug.Log($"[CodeEditor] Triggered solution synchronization with IDE: {CodeEditor.Editor.CurrentCodeEditor.Name}");
    }
}
#endif
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Burst](burst.md) |
| → Next | [Unity.Collections](02-collections.md) |
