# UnityEditor.AnimatedValues (Interface Effects)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.AnimatedValues](https://docs.unity3d.com/ScriptReference/UnityEditor.AnimatedValues.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Animated, interpolated value structures (such as AnimFloat and AnimBool) used to smooth interface transition effects in Custom Editor Windows.

---

## 🧱 1. Designing a Smooth Editor Interface

When writing complex Custom Editor Windows, having option panels show and hide abruptly makes the interface feel choppy. Classes like `AnimBool` help create slide and expand effects that look extremely professional through a continuous frame-update mechanism (Repaint).

---

## 📐 2. Using the Value-Changed Event

Register a window repaint callback (`Repaint`) every time the interpolated value changes to ensure the movement effect plays smoothly.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.AnimatedValues` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.AnimatedValues;

public class AnimatedEditorWindow : EditorWindow
{
    private AnimBool showExtraSettings;

    [MenuItem("Tools/Animated Window")]
    public static void Open() => GetWindow<AnimatedEditorWindow>();

    void OnEnable()
    {
        showExtraSettings = new AnimBool(false);
        // Vẽ lại cửa sổ mỗi khi giá trị chuyển đổi thay đổi
        showExtraSettings.valueChanged.AddListener(Repaint);
    }

    void OnGUI()
    {
        showExtraSettings.target = EditorGUILayout.Toggle("Hiện tùy chọn nâng cao", showExtraSettings.target);

        // Hiển thị phần giao diện phụ với hiệu ứng trượt mượt mà
        if (EditorGUILayout.BeginFadeGroup(showExtraSettings.faded))
        {
            EditorGUILayout.LabelField("=> Cài đặt bổ sung ở đây...");
        }
        EditorGUILayout.EndFadeGroup();
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Android](android.md) |
| → Next | [UnityEditor.Animations](animations.md) |
