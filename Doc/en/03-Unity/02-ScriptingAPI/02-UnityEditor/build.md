# UnityEditor.Build (Hooking into the Build Process)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Build](https://docs.unity3d.com/ScriptReference/UnityEditor.Build.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

APIs that hook into the game build process (IPreprocessBuild, IPostprocessBuild). Ideal for automating image optimization or injecting configuration code before a build.

---

## 🧱 1. Managing the Automated Build Pipeline

By implementing interfaces such as `IPreprocessBuildWithReport` and `IPostprocessBuildWithReport`, developers can run custom code immediately before and after Unity compiles the source code into an installable executable.

* **Use case**: Verify that Scenes have been optimized, automatically bump the game's Bundle Version, or clean up temporary files on disk.

---

## 📐 2. Writing Build Scripts for CI/CD

Leveraging these interfaces lets the automated packaging pipeline on a build server (for example, Jenkins or GitHub Actions) run smoothly without any manual intervention.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Build` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;

public class CustomBuildPipeline : IPreprocessBuildWithReport
{
    public int callbackOrder => 0; // Execution order (lower numbers run first)

    public void OnPreprocessBuild(BuildReport report)
    {
        // This code runs automatically right before the game Build starts
        Debug.Log($"[Build.Editor] Preparing to build the game for target: {report.summary.platform}");
        // Example: Run safety checks before packaging
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.AppleTV](apple-tv.md) |
| → Next | [UnityEditor.Callbacks](callbacks.md) |
