# UnityEditor.Events (Editing UnityEvent)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Events](https://docs.unity3d.com/ScriptReference/UnityEditor.Events.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for editing the configuration of drag-and-drop UnityEvent handlers in the Inspector through Editor scripts.

---

## 🧱 1. Editing UnityEvent Handlers with Code

UnityEvent lets you set up drag-and-drop events in a highly intuitive way. However, if you want to automatically wire up button click handlers across 100 UI screens, you must use the `UnityEditor.Events.UnityEventTools` class.

* **Persisting changes to disk**: Event configuration changes made through Editor code are saved directly into the Scene/Prefab file.

---

## 📐 2. Pitfalls When Editing Events

Always use `UnityEventTools.AddPersistentListener` instead of the regular `AddListener`, because `AddListener` only takes effect temporarily at runtime and is not saved to the Prefab.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Events` module.

```csharp
using UnityEngine;
using UnityEngine.Events;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Events;
using UnityEngine.UI;

public class UIEventAutomator
{
    public static void LinkButtonEvent(Button button, MonoBehaviour targetScript)
    {
        // Remove previously linked events to avoid duplicates
        while (button.onClick.GetPersistentEventCount() > 0)
        {
            UnityEventTools.RemovePersistentListener(button.onClick, 0);
        }

        // Create a custom Action/Method call to invoke when the button is clicked
        UnityAction methodCall = new UnityAction(targetScript.gameObject.SetActiveToggle);
        UnityEventTools.AddPersistentListener(button.onClick, methodCall);
        
        Debug.Log($"[Events.Editor] Automatically linked the Click event for the button on {button.gameObject.name}.");
    }
}

// Declare a helper class so the code compiles with the correct structure
public static class EventExtensions
{
    public static void SetActiveToggle(this GameObject go) => go.SetActive(!go.activeSelf);
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.EngineDiagnostics](engine-diagnostics.md) |
| → Next | [UnityEditor.Experimental](experimental.md) |
