# Incomplete Library Class

> 📖 **Source:** [Refactoring.Guru — Incomplete Library Class](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Incomplete Library Class** occurs when you use a third-party library (or the native Game Engine API itself, such as Unity/Unreal) and discover that it **lacks a few specific methods/features** that you really need for your project.

The difficulty is: **You cannot directly modify the source code of that library** because it has already been packaged into a DLL file, a package, or belongs to the engine.

*How to spot it:*
- You constantly have to write external helper functions to transform or process that library's data before using it.
- Your code ends up with static functions that process the library object's data over and over again.

## ❓ Reasons for the Problem

The authors of libraries or game engines cannot possibly anticipate every specific need of each individual game project. They only provide the most general and basic features.

## 💊 Treatment

To extend a library class cleanly, we have two main approaches:

1. **Introduce Foreign Method**: If you only need to add **one or two** simple methods, write them as static utility functions in your project (in C#, this is the extremely powerful **Extension Methods** mechanism).
2. **Introduce Local Extension**: If you need to add **many** complex features or want to change the original behavior, create a subclass that inherits from that library class (if the class is not marked `sealed`), or create a wrapper class that wraps it.

## ✅ Payoff

- **Well-organized code**: The extension functions are gathered in one dedicated place (for example, `VectorExtensions`), helping you avoid writing patchy code scattered all over the project.
- **Increased reusability**: You can call the extension functions directly on the library object as if they were its native functions.

## 🎮 In Game Dev

In Unity, C# provides the **Extension Methods** mechanism, which is extremely well suited to completely solving this smell:

### ❌ Example before refactoring:
You constantly have to compute the horizontal distance (ignoring the Y axis) between two objects and write static functions scattered around:
```csharp
public class EnemyAI : MonoBehaviour
{
    void Update()
    {
        // Have to write the verbose formula manually, ignoring the Y axis
        Vector3 diff = player.transform.position - transform.position;
        float distance2D = Mathf.Sqrt(diff.x * diff.x + diff.z * diff.z);

        if (distance2D < 5f) { /* Chase */ }
    }
}
```
**Problem:** If in the `Projectile` or `Spawner` class you also need to compute a similar 2D distance, you have to copy this formula or write static helper functions everywhere. Unity's native `Vector3` class has no built-in `Distance2D()` method.

### ✅ Solution after refactoring:
Write an **Extension Method** for `Vector3` in C#:
```csharp
public static class Vector3Extensions
{
    // Add an elegant method to Unity's native Vector3 class!
    public static float Distance2D(this Vector3 origin, Vector3 target)
    {
        Vector3 diff = target - origin;
        return Mathf.Sqrt(diff.x * diff.x + diff.z * diff.z);
    }
}

// Now, in EnemyAI or anywhere else, you call it very naturally:
public class EnemyAI : MonoBehaviour
{
    void Update()
    {
        // Call it directly as if Distance2D were a built-in Unity function!
        float distance2D = transform.position.Distance2D(player.transform.position);

        if (distance2D < 5f) { /* Chase */ }
    }
}
```
The Extension Method solution lets you add features to Unity's API in an incredibly clean, elegant, and professional way!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Middle Man](./04-middle-man.md) |
| 🦨 Return | [Code Smells List](../00-code-smells-overview.md) |
