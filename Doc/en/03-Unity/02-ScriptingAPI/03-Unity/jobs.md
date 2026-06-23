# Unity.Jobs (Thread-safe multithreaded C# Job System)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.Jobs](https://docs.unity3d.com/ScriptReference/Unity.Jobs.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API for driving the C# Job System: writing thread-safe, multithreaded compute Jobs that run in parallel on the CPU.

---

## 🧱 1. Extremely safe multithreaded programming on the CPU

The C# Job System lets you write highly efficient multithreaded code without worrying about resource conflicts between threads (race conditions). It automatically distributes heavy work to idle CPU cores in an optimal way.

* **`IJobParallelFor`**: Splits a massive compute loop into many smaller groups to be processed in parallel.
* **Safety System**: Unity's safety-checking system throws an error immediately in the Editor if it detects that you are trying to write to the same data concurrently from two different threads.

---

## 📐 2. The Native memory disposal pitfall

The data structures passed into a Job must be a `NativeArray` or one of Unity's native memory structures. Always call `.Dispose()` after the Job completes to avoid memory leaks.

---

## 🎮 Hands-on source code (Unity C#)

Below is a real code example showing how to program for performance optimization, error handling, and system integration through the `Unity.Jobs` subsystem.

```csharp
using UnityEngine;
using Unity.Jobs;
using Unity.Collections;

public class JobSystemTest : MonoBehaviour
{
    struct SpeedMultiplyJob : IJobParallelFor
    {
        public NativeArray<float> speeds;
        public float multiplier;

        public void Execute(int index)
        {
            speeds[index] *= multiplier;
        }
    }

    void Start()
    {
        // Initialize native memory
        NativeArray<float> playerSpeeds = new NativeArray<float>(1000, Allocator.TempJob);
        for (int i = 0; i < playerSpeeds.Length; i++) playerSpeeds[i] = 5f;

        SpeedMultiplyJob job = new SpeedMultiplyJob
        {
            speeds = playerSpeeds,
            multiplier = 1.5f
        };

        // Schedule the job to run multithreaded across all available CPU cores
        JobHandle handle = job.Schedule(playerSpeeds.Length, 64);
        
        // Wait for the Job to complete at the end of the frame
        handle.Complete();

        Debug.Log($"[Jobs] Đã nhân đôi tốc độ cho 1000 thực thể. Kết quả phần tử 0: {playerSpeeds[0]}");
        
        // You must release the native memory
        playerSpeeds.Dispose();
    }
}
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.IO](io.md) |
| → Next | [Unity.Loading](loading.md) |
