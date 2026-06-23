# Comments (Excessive Comments)

> 📖 **Source:** [Refactoring.Guru — Comments](https://refactoring.guru/smells/comments) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Comments** is a smell when a method is packed with lines that explain in detail what the code is doing. This usually happens because **the code itself is too complex, messy, and hard to understand**.

> 💬 **The heart of the problem:** Comments are like make-up trying to hide the blemished face of "dirty code."
> *"Don't comment dirty code — refactor it."*

## ❓ Reasons for the Problem

Programmers often write comments with the good intention of helping others understand the code. However, they forget that:
- Code changes constantly, but comments are rarely updated. An outdated comment becomes a harmful "lie" within the codebase.
- Needing a comment to explain something proves that the code's structure is poor and that variables/methods are named unclearly.

## 💊 Treatment

If you feel the need to write a comment to explain a piece of code, try refactoring first:

1. **Extract Method**: If a comment is used to explain what a block of code does, extract that block into its own method named after the **purpose** of the block. A good method name completely replaces the comment.
2. **Rename Method / Rename Variable**: If a method or variable name is too vague, rename it to something meaningful and self-explanatory.
3. **Introduce Assertion**: If a comment explains required conditions (pre-conditions), replace it with an Assert statement in the code.

## ✅ Payoff

- **Self-documenting code**: Just reading the method and variable names makes the intent clear, with no need to read comments.
- **Easier to maintain**: There is no risk of comments becoming outdated relative to the actual code.
- **Shorter, cleaner code**: Fewer redundant lines of text in the file.

## 🎮 In Game Dev

### ❌ Example before refactoring:
Using comments to explain messy physics calculation steps:
```csharp
void Update()
{
    // Step 1: Calculate the distance to the ground to see whether the player is grounded
    RaycastHit hit;
    bool isGrounded = Physics.Raycast(transform.position, Vector3.down, out hit, 1.1f);

    // Step 2: If the player is grounded and presses Space, perform a jump
    if (isGrounded && Input.GetKeyDown(KeyCode.Space))
    {
        // Add an upward force so the character jumps
        rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
    }
}
```

### ✅ Solution after refactoring:
Split it into dedicated methods with self-explanatory names:
```csharp
void Update()
{
    if (IsTouchingGround() && UserPressedJumpButton())
    {
        PerformJump();
    }
}

private bool IsTouchingGround()
{
    return Physics.Raycast(transform.position, Vector3.down, 1.1f);
}

private bool UserPressedJumpButton()
{
    return Input.GetKeyDown(KeyCode.Space);
}

private void PerformJump()
{
    rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
}
```
After refactoring, the code becomes extremely clear, coherent, and self-explanatory without a single comment!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Dispensables Overview](./00-dispensables-overview.md) |
| → Next | [Duplicate Code](./02-duplicate-code.md) |
