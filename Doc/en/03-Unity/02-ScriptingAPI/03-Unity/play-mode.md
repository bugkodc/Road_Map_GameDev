# Unity.PlayMode (Controlling PlayMode in the Editor)

> 📖 **Source:** This documentation was compiled and written in depth from [Unity Scripting API — Unity.PlayMode](https://docs.unity3d.com/ScriptReference/Unity.PlayMode.html) based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for controlling the PlayMode state (Start, Stop, Pause) in the Editor through code.

---

## 🧱 1. Automating Game Playtesting

To automate testing, we can use the Editor's control functions to switch the game state from editing to playtesting on its own (`EditorApplication.isPlaying = true`).

---

## 📐 2. The Pitfall of Forgetting to Save

Before triggering PlayMode through code, always make sure you have called a scene save (`EditorSceneManager.SaveOpenScenes`) to avoid losing your design data.

---

## 🎮 Real-World Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Unity.PlayMode` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class PlayModeAutomator
{
    public static void ForceStartGame()
    {
        if (!EditorApplication.isPlaying)
        {
            Debug.Log("[PlayMode.Editor] Đang tự động lưu cảnh và chạy thử game...");
            EditorApplication.SaveCurrentSceneIfUserWantsTo();
            EditorApplication.isPlaying = true;
        }
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Multiplayer](multiplayer.md) |
| → Next | [Unity.Profiling](03-profiling.md) |
