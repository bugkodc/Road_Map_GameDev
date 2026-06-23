# 📊 Organizing Data

> 📖 **Source:** [Refactoring.Guru — Organizing Data](https://refactoring.guru/refactoring/techniques/organizing-data) | Author: Alexander Shvets

## Introduction

Managing data is one of the core aspects of software development. As a codebase grows, the way data is organized can make a system either extremely complex or very tidy.

The **Organizing Data** group of techniques focuses on handling data associations, replacing primitive types with classes that have real-world meaning, and managing the encapsulation of data.

---

## 📋 Key techniques and when to use them

### 1. Replace Data Value with Object
- **Problem:** A class contains a primitive data field (string, int), but that field carries complex meaning or has specialized handling.
- **Solution:** Create a new class to hold that data field and move the related logic into the new class.
- *Example:* Use an `Email` class instead of `string email` so it can validate the email format itself.

### 2. Replace Type Code with Class
- **Problem:** A class contains an int/string field that represents the type of object (for example, `int bloodType`).
- **Solution:** Replace those int/string values with a dedicated new class to ensure type safety.

### 3. Replace Type Code with Subclasses / State-Strategy
- **Problem:** A type code field directly affects the behavior of the class (for example, lots of `switch(type)`).
- **Solution:** Split the type code into inheriting subclasses (if the type doesn't change at runtime), or apply the **State/Strategy Pattern** (if the type can change frequently).

### 4. Encapsulate Field / Encapsulate Collection
- **Problem:** Data fields or a List/Array are declared `public`, allowing outside classes to access and modify them freely.
- **Solution:** Make the variable `private` and provide getter/setter properties or controlled operations (for example, `Add()`, `Remove()`).

### 5. Replace Array with Object
- **Problem:** Using an Array/List to hold heterogeneous data (for example, `arr[0]` is the name, `arr[1]` is the age).
- **Solution:** Create a class/struct with clearly named fields to store the data.

---

## 🎮 In Game Dev

In game programming, well-organized data improves performance and makes parameters easier to manage:

- **Replace Type Code with Subclasses**:
  - ❌ *Poor example:* Create an `Enemy` class and use `enum EnemyType { Melee, Ranged, Boss }`. Inside `Update()`, use `switch(type)` to change the movement logic.
  - ✅ *Better solution:* Split it into `MeleeEnemy : Enemy` and `RangedEnemy : Enemy` inheriting from the parent class so each one implements its own movement logic.

- **Encapsulate Collection**:
  - ❌ *Poor example:* `public List<Item> inventory;` on the Player is fully public. Any class can call `player.inventory.Clear()` and wipe out all of the player's items.
  - ✅ *Better solution:* Keep `private List<Item> inventory;` and provide a `public void AddItem(Item item)` method that checks the maximum capacity.

- **Introduce Parameter Object**:
  - ❌ *Poor example:* `SpawnEnemy(float x, float y, float z, int hp, float speed, string name, int level)`
  - ✅ *Better solution:* Group the parameters into an `EnemyConfig` class (such as a ScriptableObject in Unity) and pass `SpawnEnemy(EnemyConfig config)`.

---

## 🔗 Links

- ⬆️ [Refactoring Techniques — Overview](../00-techniques-overview.md)
- ⬅️ [Moving Features](../02-Moving-Features/00-moving-features-overview.md)
- ➡️ [Simplifying Conditional Expressions](../04-Simplifying-Conditional/00-simplifying-conditional-overview.md)

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart
