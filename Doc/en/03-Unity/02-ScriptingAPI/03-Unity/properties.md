# Unity.Properties (Advanced Serialization Management)

> 📖 **Source:** This documentation was compiled and written in depth from [Unity Scripting API — Unity.Properties](https://docs.unity3d.com/ScriptReference/Unity.Properties.html) based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An advanced mechanism for managing an object's properties that supports data serialization.

---

## 🧱 1. Next-Generation Serialization and Data Binding

The `Unity.Properties` subsystem provides a programming solution for dynamically accessing an object's properties in a way that is safer and far more performance-optimized than using traditional Reflection.

---

## 📐 2. Application in the UI Toolkit Interface

It helps automate data binding between C# variables and the UI (Data Binding) without having to write manual synchronization functions.

---

## 🎮 Real-World Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Unity.Properties` subsystem.

```csharp
using UnityEngine;

public class PropertyBindingTest : MonoBehaviour
{
    // Khai báo cấu trúc dữ liệu sử dụng Property để giao diện UI tự bắt giá trị
    public int PlayerScore { get; set; }

    void Start()
    {
        PlayerScore = 1500;
        Debug.Log($"[Properties] Điểm số đã thiết lập: {PlayerScore}. UI có thể tự động liên kết đọc giá trị này.");
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.ProjectAuditor](project-auditor.md) |
| → Next | [Unity.VectorGraphics](vector-graphics.md) |
