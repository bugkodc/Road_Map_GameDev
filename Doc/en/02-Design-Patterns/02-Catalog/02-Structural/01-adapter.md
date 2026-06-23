# Adapter

> 📖 **Source:** [Refactoring.Guru — Adapter](https://refactoring.guru/design-patterns/adapter) | Author: Alexander Shvets

---

## 🎯 Intent

**Adapter** is a structural design pattern that allows objects with incompatible interfaces to collaborate and work together. It acts as a converter between two systems, translating requests from the client into a format that the service system expects.

---

## ❌ Problem

Imagine you are upgrading a large MMORPG game project from an old version to a new one.
- The game's old achievement-tracking system is managed by the `LegacyAchievementSystem` class. This class has run stably for the past 5 years, using methods such as `RecordScore(string id, int points)` and `UnlockBadge(string badgeName)`.
- In the new version, you integrate a unified, cross-platform Achievements API (Steam, Google Play, iOS Game Center) through the `IAchievementsManager` interface. This new system requires a very different parameter format: it uses a percentage progress `TrackProgress(string achievementId, float progressPercent)` and completion via `CompleteAchievement(string achievementId)`.
- You cannot modify `LegacyAchievementSystem` directly because it is closed-source code from an old library or has become too complex, and you fear causing regressions in other systems. However, all of the new gameplay logic is written to communicate directly with `IAchievementsManager`.

---

## ✅ Solution

The **Adapter** pattern suggests creating a special class called an **Adapter** that acts as an intermediary:

1.  The Adapter class implements the interface of the new system (`IAchievementsManager`).
2.  The Adapter class holds a reference to an object of the old class (`LegacyAchievementSystem`).
3.  When the gameplay calls `TrackProgress` on the Adapter, this class automatically converts the logic: it calculates the corresponding concrete score from the percentage progress and calls the old system's `RecordScore` method.

As a result, the Client (the new gameplay) can communicate smoothly with the old system through the Adapter without ever needing to know that the old system exists.

---

## 🎨 Structure

Instead of reading one big UML diagram from the start, read the pattern in 3 layers: **quick idea → real execution flow → simplified UML**.

### 1. Quick Idea

```mermaid
flowchart TD
  Client["Client needs ITarget"] --> Target["ITarget"]
  Target --> Adapter["Adapter"]
  Adapter --> Adaptee["Legacy API / external plugin"]
```

### 2. Real Execution Flow

```mermaid
flowchart TD
  A["Client calls Target.Request()"] --> B["Adapter receives the standard request"]
  B --> C["Convert parameters / format"]
  C --> D["Call Adaptee.SpecificRequest()"]
  D --> E["Return the result to the Client"]
```

### 3. Simplified UML

```mermaid
classDiagram
  direction TB
  class Target {
    <<interface>>
    +Request()
  }
  class Adapter {
    -adaptee
    +Request()
  }
  class Adaptee {
    +SpecificRequest()
  }
  class Client
  Target <|.. Adapter
  Adapter --> Adaptee
  Client --> Target
```

### How to Read the Diagram

| Component | Meaning |
|---|---|
| Quick glance | The Adapter is the converter between the desired interface and an existing API. |
| Main flow | The Client doesn't know the Adaptee has a different format. |
| In games | Wrapping an old SDK, input plugin, analytics, or asset loader. |
| Solid-line arrow | An object holds a reference to or directly calls another object. |
| Triangle / dashed arrow in UML | Inheritance or interface implementation. |

> Quick-reading tip: first find the **Client/Context**, then follow the arrow to the main interface. The concrete classes are just variants plugged in at runtime.

---

## 💻 Pseudocode

```csharp
// The Target interface that the Client expects
interface ITarget
{
    void Request();
}

// The Adaptee class contains useful methods but is interface-incompatible
class Adaptee
{
    public void SpecificRequest()
    {
        Print("Specific request of the legacy system.");
    }
}

// The Adapter class connects Target and Adaptee
class Adapter : ITarget
{
    private Adaptee _adaptee;

    public Adapter(Adaptee adaptee)
    {
        this._adaptee = adaptee;
    }

    public void Request()
    {
        // Convert the call into the Adaptee's format
        this._adaptee.SpecificRequest();
    }
}
```

---

## ⚙️ Applicability

Use Adapter when:
- You want to use an existing class but its interface is not compatible with the rest of your project.
- You want to create a reusable class that is compatible with unknown or unrelated classes in the future (creating a buffer layer — an abstraction layer).
- You need to integrate third-party SDKs/plugins (ads, payments, analytics) whose interfaces change constantly across updates into the core of your game.

---

## 📝 How to Implement

1.  Identify the interface that the client expects (Target).
2.  Identify the existing but incompatible class that needs converting (Adaptee).
3.  Create the Adapter class that implements the Target interface.
4.  Declare a field in the Adapter class that holds the Adaptee instance (Composition). Initialize it through the Constructor.
5.  Implement the Target's methods in the Adapter by calling the corresponding methods of the Adaptee, along with appropriate data-format conversion logic.

---

## ⚖️ Pros and Cons

*   **👍 Pros:**
    *   *Single Responsibility Principle:* Separates the interface-conversion code from the game's main business logic.
    *   *Open/Closed Principle:* You can add new adapters without affecting the code of the Client or the Adaptee.
    *   *High reusability:* Allows you to reuse old classes extremely safely.
*   **👎 Cons:**
    *   Increases the overall complexity of the code because you have to introduce additional new interfaces and intermediary classes.

---

## 🎮 In Game Dev: C# Code Example (Unity)

Below is how to convert the old achievement-saving system to the game's new Achievements API in Unity:

### 1. The Old System (Adaptee - Legacy Achievement System)
```csharp
using UnityEngine;

namespace DesignPatterns.Adapter
{
    // Legacy class that cannot be edited directly for maintenance or closed-source reasons
    public class LegacyAchievementSystem
    {
        public void RecordScore(string id, int points)
        {
            Debug.Log($"[Legacy System] Recorded achievement '{id}' with {points} points.");
        }

        public void UnlockBadge(string badgeName)
        {
            Debug.Log($"[Legacy System] Unlocked badge: '{badgeName}'!");
        }
    }
}
```

### 2. New Interface (Target) and the Adapter Class
```csharp
namespace DesignPatterns.Adapter
{
    // The new standard interface that Gameplay and UI are using
    public interface IAchievementsManager
    {
        void TrackProgress(string achievementId, float progressPercent);
        void CompleteAchievement(string achievementId);
    }

    // The Adapter class bridges and converts the data
    public class LegacyAchievementAdapter : IAchievementsManager
    {
        private readonly LegacyAchievementSystem _legacySystem;
        private const int MAX_POINTS = 100;

        public LegacyAchievementAdapter(LegacyAchievementSystem legacySystem)
        {
            _legacySystem = legacySystem;
        }

        public void TrackProgress(string achievementId, float progressPercent)
        {
            // Convert the percentage (0.0f -> 1.0f) into the old score scale (0 -> 100)
            int points = Mathf.RoundToInt(Mathf.Clamp01(progressPercent) * MAX_POINTS);
            
            // Call the legacy system's method
            _legacySystem.RecordScore(achievementId, points);
        }

        public void CompleteAchievement(string achievementId)
        {
            // Completing an achievement is equivalent to unlocking a badge in the legacy system
            _legacySystem.UnlockBadge(achievementId);
        }
    }
}
```

### 3. How to Use It in the Game (Client - GameplayManager)
```csharp
using UnityEngine;

namespace DesignPatterns.Adapter
{
    public class GamePlayManager : MonoBehaviour
    {
        private IAchievementsManager _achievementsManager;

        private void Start()
        {
            // 1. Initialize the legacy system
            LegacyAchievementSystem legacySystem = new LegacyAchievementSystem();

            // 2. Wrap the legacy system with the Adapter converter
            _achievementsManager = new LegacyAchievementAdapter(legacySystem);

            // 3. The new gameplay uses the new interface seamlessly
            Debug.Log("--- Gameplay starts slaying monsters ---");
            
            // The player has slain 50% of the required number of monsters
            _achievementsManager.TrackProgress("MONSTER_SLAYER", 0.5f);

            // The player completes the challenge
            _achievementsManager.CompleteAchievement("MONSTER_SLAYER");
        }
    }
}
```

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Structural Patterns Overview](./00-structural-overview.md) |
| → Next | [Bridge](./02-bridge.md) |
