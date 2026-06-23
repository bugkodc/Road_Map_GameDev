# Message Chains

> 📖 **Source:** [Refactoring.Guru — Message Chains](https://refactoring.guru/refactoring/smells/couplers) | Author: Alexander Shvets

## 📋 Signs & Symptoms

**Message Chains** occur when you see a piece of code making a long, consecutive series of getter calls to perform a single action:

`objectA.GetB().GetC().GetD().ExecuteSomething();`

Or in game dev:
`GameManager.Instance.GetPlayer().GetEquipment().GetActiveWeapon().Shoot();`

> [!WARNING]
> This smell directly violates the **Law of Demeter** — the principle of "Only talk to your closest friends." Class A should not go through too many intermediaries to talk to class D.

## ❓ Reasons for the Problem

- The programmer designed an object hierarchy that is too deep but did not hide that navigation structure.
- The client needs to use a feature of an object buried deep inside and freely navigates through getters instead of delegating the responsibility to the object at the upper level.

## 💊 Treatment

To break this dangerous chain of links, we use:

1. **Hide Delegate**: Ask the upper-level object to provide a delegate method that fetches the lower-level information itself and returns the final result to the client.
2. **Extract Method & Move Method**: Consider which class the `ExecuteSomething()` action at the end of the chain truly belongs to, then move it upward so the client can simply call it directly.

## ✅ Payoff

- **Drastically reduced Coupling**: The client becomes completely independent of the object's internal hierarchy. If tomorrow you change the structure (for example, the weapon is no longer inside `Equipment` but directly inside `Player`), you only need to fix `Player`, and the client is not affected at all.
- **Easier to read, more concise**: The calling code is tidy and avoids crashes from null references in the middle of the chain (NullReferenceException).

## 🎮 In Game Dev

This smell is the number one enemy of UIs that display character stats:

### ❌ Example before refactoring:
The `AmmoUI` class wants to draw the ammo count on screen and navigates through the entire chain:
```csharp
public class AmmoUI : MonoBehaviour
{
    void Update()
    {
        // Message Chain that seriously violates the Law of Demeter!
        int ammo = Player.Instance.GetWeaponSystem().GetInventory().GetActiveWeapon().ammoCount;
        UpdateAmmoText(ammo);
    }
}
```
**Damage caused:** If somewhere in the middle of the chain the player is not holding any weapon (`GetActiveWeapon()` returns `null`), the game immediately throws a **NullReferenceException** and freezes the UI! Furthermore, `AmmoUI` ends up depending on the structure of 4-5 different classes.

### ✅ Solution after refactoring:
Apply **Hide Delegate** on the `Player` class:
```csharp
public class Player : MonoBehaviour
{
    private WeaponSystem weaponSystem;

    // Provide a tidy delegate method
    public int GetCurrentWeaponAmmo()
    {
        if (weaponSystem == null) return 0;
        var activeWeapon = weaponSystem.GetActiveWeapon();
        return activeWeapon != null ? activeWeapon.ammoCount : 0;
    }
}

// Now AmmoUI simply calls:
public class AmmoUI : MonoBehaviour
{
    void Update()
    {
        // AmmoUI only talks directly to its "close friend" Player
        int ammo = Player.Instance.GetCurrentWeaponAmmo();
        UpdateAmmoText(ammo);
    }
}
```
The UI is now incredibly clean, safe (null checks are handled internally), and no longer cares how the weapon is managed!

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

| Direction | Link |
|-------|----------|
| ← Back | [Inappropriate Intimacy](./02-inappropriate-intimacy.md) |
| → Next | [Middle Man](./04-middle-man.md) |
