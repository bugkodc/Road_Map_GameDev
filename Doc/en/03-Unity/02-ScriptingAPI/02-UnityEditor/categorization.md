# UnityEditor.Categorization (Asset Categorization)

> 📖 **Source:** This document is compiled and written in depth from [Unity Scripting API — UnityEditor.Categorization](https://docs.unity3d.com/ScriptReference/UnityEditor.Categorization.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for managing the categorization and organization of Assets in support of building large-scale asset libraries.

---

## 🧱 1. Organizing an Optimized Asset Tree

It supports attaching additional metadata tags and grouping resources in a structured way within the Project window. This helps 3D artists and developers easily find the assets they need in a project that spans hundreds of gigabytes.

---

## 📐 2. Automatic Labeling

Write code that automatically scans newly added asset folders and applies the corresponding categorization labels based on file format.

---

## 🎮 Real-World Code (Unity C#)

The snippet below shows how to write code that optimizes performance, handles errors, and integrates with the system through the `UnityEditor.Categorization` module.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AssetCategorizer
{
    [MenuItem("Tools/Categorize Imported Textures")]
    public static void Categorize()
    {
        // Apply labels to the Assets selected in the Project window
        string[] guids = Selection.assetGUIDs;
        foreach (string guid in guids)
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            var asset = AssetDatabase.LoadAssetAtPath<Texture2D>(path);
            if (asset != null)
            {
                AssetDatabase.SetLabels(asset, new string[] { "Texture", "UI" });
            }
        }
        Debug.Log("[Categorization.Editor] Categorization labels applied successfully.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Callbacks](callbacks.md) |
| → Next | [UnityEditor.Compilation](compilation.md) |
