# Unity.Burst (Burst Compiler high-performance compiler)

> 📖 **Source:** This document is compiled and written in depth from the [Unity Scripting API — Unity.Burst](https://docs.unity3d.com/ScriptReference/Unity.Burst.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

An API that interacts with the Burst Compiler, deeply optimizing C# IL code into high-performance machine code.

---

## 🧱 1. The power of the Burst Compiler

The Burst Compiler is a core component of Unity's high-performance technology stack (DOTS). It automatically translates intermediate C# code (IL) into deeply optimized machine code by taking advantage of the multi-core processor architecture and the chip's SIMD (Single Instruction, Multiple Data) instruction set.

* **`[BurstCompile]`**: Apply this attribute to Job structs to tell the Burst compiler to optimize them.

---

## 📐 2. Conditions for successful Burst compilation

Burst requires that the code written inside a Job contain only value types (struct), with no references (reference types / class) and no garbage memory allocation (GC garbage).

---

## 🎮 Hands-on source code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `Unity.Burst` subsystem.

```csharp
using UnityEngine;
using Unity.Burst;
using Unity.Jobs;
using Unity.Collections;

public class BurstCompilationTest : MonoBehaviour
{
    void Start()
    {
        NativeArray<float> numbers = new NativeArray<float>(100, Allocator.TempJob);
        
        CalculateJob job = new CalculateJob { data = numbers };
        JobHandle handle = job.Schedule();
        handle.Complete();
        
        Debug.Log($"[Burst] Tính toán thành công. Phần tử đầu tiên: {numbers[0]}");
        numbers.Dispose();
    }

    // Gán nhãn để Burst Compiler tối ưu hóa cấu trúc này sang mã máy siêu nhanh
    [BurstCompile]
    struct CalculateJob : IJob
    {
        public NativeArray<float> data;

        public void Execute()
        {
            for (int i = 0; i < data.Length; i++)
            {
                data[i] = Mathf.Sqrt(i * 12.5f);
            }
        }
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Android](android.md) |
| → Next | [Unity.CodeEditor](code-editor.md) |
