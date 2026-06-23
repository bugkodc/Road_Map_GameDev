# UnityEditor.Animations (Editing the Animator through code)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.Animations](https://docs.unity3d.com/ScriptReference/UnityEditor.Animations.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API that lets you edit, create, and configure Animator Controllers, Blend Trees, and State Machine Transitions entirely through Editor C# code.

---

## 🧱 1. Automating Animation Structure Generation

For characters with hundreds of different animations (for example, fighting games or sports games), manually dragging each animation into the Animator window is very error-prone. The `UnityEditor.Animations.AnimatorController` class lets you build the animation State Machine through code.

---

## 📐 2. Configuring Automatic Transitions

Automatically set the animation blend time (Transition Duration) and the switching conditions (Parameters) of the Animator.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.Animations` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Animations;

public class AnimatorGenerator
{
    [MenuItem("Tools/Create Custom Animator")]
    public static void CreateAnimator()
    {
        // Create a new Animator Controller file on disk
        var controller = AnimatorController.CreateAnimatorControllerAtPath("Assets/PlayerAnimator.controller");
        
        // Add a Float control parameter
        controller.AddParameter("Speed", AnimatorControllerParameterType.Float);
        
        // Get the root State Machine and add an "Idle" state
        var rootStateMachine = controller.layers[0].stateMachine;
        var idleState = rootStateMachine.AddState("Idle");
        
        Debug.Log($"[Animations.Editor] Automatically created Animator Controller at: {AssetDatabase.GetAssetPath(controller)}");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.AnimatedValues](animated-values.md) |
| → Next | [UnityEditor.AppleTV](apple-tv.md) |
