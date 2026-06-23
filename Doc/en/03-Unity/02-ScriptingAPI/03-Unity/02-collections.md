# Unity.Collections API (Unmanaged Native Memory)

> 📖 **Source:** This document is compiled and written in detail from the [Unity Collections Package Documentation](https://docs.unity3d.com/Packages/com.unity.collections@2.1/manual/index.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

In C#, ordinary array data types (such as `List<T>`, `T[]`) are managed by the **Garbage Collector (GC)**. When using a large number of elements, the GC must continuously sweep memory, causing the game to stutter (GC spikes).

The **`Unity.Collections`** library provides high-performance data structures that live directly in **Native (Unmanaged) Memory** outside the control of the GC, helping to eliminate garbage entirely and optimize for the C# Job System.

---

## 💾 1. Native Collections data structures

Instead of using traditional C# data structures, we use the corresponding Native structures that begin with the `Native` prefix:
1.  **`NativeArray<T>`**: A fixed-length static array stored in native memory.
2.  **`NativeList<T>`**: A dynamic array that can resize itself (equivalent to `List<T>`).
3.  **`NativeHashMap<TKey, TValue>`**: A hash table that looks up data by Key-Value pairs.
4.  **`NativeQueue<T>`**: A first-in, first-out (FIFO) data queue.

---

## ⚡ 2. Memory management mechanism & Allocation lifecycle (Allocators)

Because the data lives in unmanaged Native memory, you **must free the memory yourself** by calling the `Dispose()` function when you are done. If you don't call `Dispose()`, the game will suffer a serious memory leak that freezes the player's machine.

To ensure performance and safety, Unity provides 3 types of **Allocator** that define the lifetime of the memory:

| Allocator Type | Lifetime | Speed | Suitable for |
| :--- | :--- | :--- | :--- |
| **`Allocator.Temp`** | Very short (within 1 frame or less). Cannot be passed into Jobs. | Super fast (allocated on the stack) | Temporary computation within a single function. No need to call `Dispose` (Unity cleans it up at the end of the frame). |
| **`Allocator.TempJob`** | Short (up to 4 frames). Usually used for C# Jobs. | Fast | Passing data into a Job to run a background computation and freeing it immediately after the Job completes. |
| **`Allocator.Persistent`** | Indefinite (lives until the game closes or self-destructs). | Slower | Storing data long-term (for example: map data, items, player data). Must call `Dispose()`. |

---

## 🎮 Hands-on source code (Unity C#)

Below is a complete sample C# script that demonstrates how to initialize, use, and pass NativeArray data into the multithreaded background C# Job System for performance optimization, along with standard memory cleanup.

```csharp
using UnityEngine;
using Unity.Collections; // Bắt buộc để dùng Native Collections
using Unity.Jobs; // Bắt buộc để dùng Job System
using Unity.Burst; // Bắt buộc để dùng Burst Compiler

public class NativeCollectionsDemo : MonoBehaviour
{
    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ExecuteNativeJob();
        }
    }

    private void ExecuteNativeJob()
    {
        int elementCount = 100000;

        // 1. Cấp phát NativeArray trên vùng nhớ ngoài GC sử dụng TempJob Allocator
        // Mảng này lưu kết quả tính toán bình phương của các số thực
        NativeArray<float> numbers = new NativeArray<float>(elementCount, Allocator.TempJob);
        NativeArray<float> results = new NativeArray<float>(elementCount, Allocator.TempJob);

        // Khởi tạo dữ liệu ban đầu
        for (int i = 0; i < elementCount; i++)
        {
            numbers[i] = i;
        }

        // 2. Tạo đối tượng Job và truyền dữ liệu Native vào
        SquareCalculationJob job = new SquareCalculationJob
        {
            inputData = numbers,
            outputData = results
        };

        // 3. Lên lịch chạy Job trên các luồng phụ của CPU (Multithreading)
        // ScheduleParallel chia nhỏ 100.000 phần tử thành các cụm (batch) chạy song song trên mọi nhân CPU
        JobHandle jobHandle = job.Schedule(elementCount, 64); // 64 là batch size

        // 4. Đợi Job hoàn tất tính toán (Block luồng chính nếu chưa xong)
        jobHandle.Complete();

        // Đọc thử kết quả đầu tiên sau khi tính toán đa luồng thành công
        Debug.Log($"[NativeJob] Bình phương của 5 là: {results[5]}");

        // 5. Bắt buộc: Giải phóng bộ nhớ Native sau khi sử dụng để tránh Rò rỉ RAM (Memory Leak)
        numbers.Dispose();
        results.Dispose();
        Debug.Log("[NativeJob] Đã giải phóng bộ nhớ Native Array thành công.");
    }
}

// =========================================================================
// 🦾 C# JOB SYSTEM STRUCTURE
// Định nghĩa thuật toán chạy đa luồng tối ưu bởi Burst Compiler
// =========================================================================
[BurstCompile] // Ép Burst biên dịch sang mã máy tối ưu
public struct SquareCalculationJob : IJobParallelFor
{
    // Cờ ReadOnly chỉ cho phép đọc để tăng tốc độ truy cập dữ liệu
    [ReadOnly] public NativeArray<float> inputData;
    
    // Cờ WriteOnly dùng để ghi kết quả đầu ra
    [WriteOnly] public NativeArray<float> outputData;

    // Hàm Execute chạy song song trên các luồng phụ
    public void Execute(int index)
    {
        outputData[index] = inputData[index] * inputData[index];
    }
}
```

---
> 📚 **Source:** Reference content from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Mathematics API (High-performance Math)](./01-mathematics.md) |
| → Next | [Unity.Profiling API (Performance Measurement)](./03-profiling.md) |
