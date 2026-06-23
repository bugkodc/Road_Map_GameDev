# Middle Man

> 📖 **Source:** [Refactoring.Guru — Middle Man](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Middle Man** occurs when a class in your codebase does no real work other than **delegating all of the client's requests** to another class.

*How to spot it:*
- Almost every method in the class looks like:
```csharp
public void DoSomething() 
{
    otherObject.DoSomething(); 
}
```

> ⚠️ **A delicate balance:** Middle Man is the opposite extreme of **Message Chains**. 
> - If you overuse the *Hide Delegate* technique to hide *Message Chains*, you turn the intermediary class into a useless *Middle Man*.
> - Your job is to find the balance: the intermediary class must genuinely contribute value/logic rather than just acting as a "mail carrier" forwarding letters.

## ❓ Reasons for the Problem

- **A consequence of over-refactoring**: When you try to apply the encapsulation principle too aggressively and create too many delegate methods.
- **Leftovers from old patterns**: A system designed in the style of the Proxy Pattern or Facade Pattern where, over time, the logic was stripped away, leaving only an empty shell.

## 💊 Treatment

The solution is very simple and direct:

1. **Remove Middle Man**: Let the client bypass this intermediary class and call the methods of the actual underlying class directly.
2. **Replace Delegation with Inheritance**: If appropriate, you can turn the intermediary class into a subclass of the implementing class so it inherits those methods directly without having to write forwarding methods manually.

## ✅ Payoff

- **A leaner architecture**: Remove "parasitic" classes that bring no real value.
- **More concise code**: Reduce the number of redundant wrapper methods in the codebase.

## 🎮 In Game Dev

Be careful with empty Wrapper-style manager classes:

### ❌ Example before refactoring:
The `PlayerManager` class is created but does nothing other than forward calls to the `PlayerController` component:
```csharp
public class PlayerManager : MonoBehaviour
{
    private PlayerController playerController;

    // Completely useless forwarding methods!
    public void MovePlayer(Vector3 direction)
    {
        playerController.Move(direction);
    }

    public void MakePlayerJump()
    {
        playerController.Jump();
    }
}
```
**Problem:** `PlayerManager` performs no additional management or computation logic. It is a perfect `Middle Man`. Forcing the client to call through `PlayerManager` only increases the line count and slows down the train of thought.

### ✅ Solution after refactoring:
Apply **Remove Middle Man**, letting the client get a direct reference to `PlayerController` and command it:
```csharp
// In the Client (e.g. InputHandler):
public class InputHandler : MonoBehaviour
{
    private PlayerController player; // Call directly!

    void Update()
    {
        Vector3 moveInput = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        player.Move(moveInput);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            player.Jump();
        }
    }
}
```
We completely remove the empty wrapper methods in `PlayerManager`, or delete the `PlayerManager` class altogether if it no longer has any other responsibility!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Message Chains](./03-message-chains.md) |
| → Next | [Incomplete Library Class](./05-incomplete-library-class.md) |
