# UnityEditor.Compilation (Compilation Management)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Compilation](https://docs.unity3d.com/ScriptReference/UnityEditor.Compilation.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Manage the compilation of C# source files in the Editor, control compilation order, and load dynamic libraries.

---

## 🧱 1. Controlling the C# Source Compilation Process

Unity automatically splits your source files into multiple separate Assemblies based on `.asmdef` (Assembly Definition) files. The `UnityEditor.Compilation` module lets you register events that track the start and completion of compilation for each individual Assembly.

---

## 📐 2. Use in CI/CD and Testing

This is very useful for measuring a project's compilation time and for optimizing the `.asmdef` file structure to minimize the wait time developers experience.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Compilation` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Compilation;

public class CompilationListener
{
    [InitializeOnLoadMethod]
    private static void ListenCompilation()
    {
        // Register a listener for when an Assembly finishes compiling
        CompilationPipeline.assemblyCompilationFinished += (path, messages) =>
        {
            Debug.Log($"[Compilation.Editor] Assembly finished compiling: {path}. Error message count: {messages.Length}");
        };
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Categorization](categorization.md) |
| → Next | [UnityEditor.Connect](connect.md) |
