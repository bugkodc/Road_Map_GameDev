# Unity.IO (High-speed asynchronous file read/write)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.IO](https://docs.unity3d.com/ScriptReference/Unity.IO.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for performing high-speed asynchronous file read/write operations to disk.

---

## 🧱 1. Non-blocking File I/O

Synchronous file writes (`System.IO.File.WriteAllText`) on mobile devices can cause the game to freeze momentarily (a lag spike) because of slow disk access. `Unity.IO` provides the `AsyncReadManager` tool to load data asynchronously, in parallel with the game's main thread.

---

## 📐 2. Reading directly into Native memory

This lets you load file data from disk directly into native memory structures such as `NativeArray`, without going through an intermediate C# data type. It avoids data-conversion overhead and generates no garbage memory.

---

## 🎮 Hands-on source code (Unity C#)

Below is a real code example showing how to program for performance optimization, error handling, and system integration through the `Unity.IO` subsystem.

```csharp
using UnityEngine;
using System.IO;
using System.Threading.Tasks;

public class SaveLoadSystem : MonoBehaviour
{
    private string savePath;

    void Start()
    {
        savePath = Path.Combine(Application.persistentDataPath, "player_save.json");
    }

    public async Task SaveDataAsync(string jsonContent)
    {
        // Use an asynchronous file write to avoid causing game lag
        using (StreamWriter writer = new StreamWriter(savePath, false))
        {
            await writer.WriteAsync(jsonContent);
            Debug.Log($"[Unity.IO] Đã lưu dữ liệu bất đồng bộ thành công tại: {savePath}");
        }
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.IntegerTime](integer-time.md) |
| → Next | [Unity.Jobs](jobs.md) |
