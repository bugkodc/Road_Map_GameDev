# Inappropriate Intimacy

> 📖 **Source:** [Refactoring.Guru — Inappropriate Intimacy](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Inappropriate Intimacy** occurs when two classes **know too much about each other's internal details**. One class reaches directly into the attributes and methods of the other that should have been private (private/protected).

*How to spot it:*
- One class continuously accesses the non-public data fields of another class directly.
- Two classes depend on each other so tightly that changing any variable in one class crashes the logic of the other.

> [!CAUTION]
> Good classes should keep their distance and communicate only through official public channels. "Inappropriate Intimacy" directly violates the principle of **Information Hiding** in OOP.

## ❓ Reasons for the Problem

- The system was designed without modularity from the start.
- A subclass accesses too deeply into the concrete implementation details of its superclass instead of only using the predefined APIs.

## 💊 Treatment

To re-establish healthy boundaries between classes, we use the following techniques:

1. **Move Method** and **Move Field**: Move the heavily accessed attributes or methods to the class that is actually using them, gathering the logic in one place.
2. **Extract Class**: Split the shared details into a new intermediary class to reduce direct coupling between the two original classes.
3. **Hide Delegate**: Instead of letting an outside class access your child object directly, provide a wrapper method that hides it.
4. **Replace Inheritance with Delegation**: If the excessive intimacy occurs between a parent and a child class, convert the inheritance relationship into a composition relationship.

## ✅ Payoff

- **Independent classes**: You can easily change the data structure of one class without worrying about affecting other classes in the game.
- **Better code reuse**: You can carry the `Player` class over to another game project without being forced to drag along the `Enemy` or `SaveSystem` class as well.

## 🎮 In Game Dev

In game programming, this smell often appears between the character control system and the UI/Physics system:

### ❌ Example before refactoring:
The `Player` class holds private physics details, and the `EnemyAI` class jumps in to read and modify those values directly:
```csharp
public class Player : MonoBehaviour
{
    // Recklessly exposing internal physics details as public
    public Rigidbody rb;
    public Vector3 internalVelocity; 
    public float privateSpeedModifier;
}

public class EnemyAI : MonoBehaviour
{
    public void RepelPlayer(Player player)
    {
        // EnemyAI freely reaches deep into the Player's Rigidbody and velocity variables!
        player.rb.velocity = Vector3.zero;
        player.internalVelocity = Vector3.back * 10f;
        player.privateSpeedModifier = 0.5f; // Slow the player down
    }
}
```
**Problem:** `EnemyAI` is meddling too deeply in how `Player` moves physically. If you later switch `Player`'s Rigidbody to a `CharacterController` (which no longer uses the Rigidbody's `velocity` variable directly), the `EnemyAI` class immediately breaks at compile time and stops working.

### ✅ Solution after refactoring:
Hide the `Player`'s physics details and provide an official API for the outside to interact with:
```csharp
public class Player : MonoBehaviour
{
    private Rigidbody rb;
    private Vector3 internalVelocity;
    private float speedModifier = 1f;

    // Provide an official API that encapsulates the physics details
    public void ApplyKnockback(Vector3 direction, float force, float slowFactor)
    {
        rb.velocity = Vector3.zero;
        internalVelocity = direction * force;
        speedModifier = slowFactor;
    }
}

public class EnemyAI : MonoBehaviour
{
    public void RepelPlayer(Player player)
    {
        // EnemyAI just commands the Player to perform the knockback itself
        player.ApplyKnockback(Vector3.back, 10f, 0.5f);
    }
}
```
Now, no matter how `Player` changes its internal knockback implementation, `EnemyAI` keeps working perfectly without needing to edit a single line of code!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Feature Envy](./01-feature-envy.md) |
| → Next | [Message Chains](./03-message-chains.md) |
