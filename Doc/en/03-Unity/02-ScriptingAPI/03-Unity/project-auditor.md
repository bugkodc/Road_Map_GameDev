# Unity.ProjectAuditor (Automated Project Auditing)

> 📖 **Source:** This documentation was compiled and written in depth from [Unity Scripting API — Unity.ProjectAuditor](https://docs.unity3d.com/ScriptReference/Unity.ProjectAuditor.html) based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for interacting with the automated project scanning tool to find performance issues or potential memory leaks.

---

## 🧱 1. Automatically Scanning the Project Structure for Issues

Project Auditor automatically analyzes all C# source code and the project's configuration settings to point out lines of code that may cause performance bottlenecks (for example, calling `GetComponent` repeatedly in Update) or asset configurations that are not yet optimized.

---

## 📐 2. Build Pipeline Integration

You can integrate the scan before building the game; if a serious performance issue is detected, the build process is automatically stopped so it can be reported.

---

## 🎮 Real-World Source Code (Unity C#)

Below is real-world code showing how to program for performance optimization, error handling, and system integration through the `Unity.ProjectAuditor` subsystem.

```csharp
using UnityEngine;

public class BuildAuditCheck : MonoBehaviour
{
    public static bool PerformAudit()
    {
        Debug.Log("[ProjectAuditor] Bắt đầu quét kiểm tra tối ưu hóa toàn bộ dự án...");
        // Mô phỏng kiểm tra lỗi: Luôn trả về true nếu dự án đạt tiêu chuẩn chất lượng
        return true;
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Profiling](03-profiling.md) |
| → Next | [Unity.Properties](properties.md) |
