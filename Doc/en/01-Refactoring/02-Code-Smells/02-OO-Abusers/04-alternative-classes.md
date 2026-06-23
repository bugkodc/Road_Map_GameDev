# Alternative Classes with Different Interfaces

> 📖 **Source:** [Refactoring.Guru — Alternative Classes with Different Interfaces](https://refactoring.guru/smells/alternative-classes-with-different-interfaces) | Author: Alexander Shvets

## 📋 Signs & Symptoms

Two classes perform the **same function** but have **different method names**. A developer can't swap between the two classes because their interfaces differ, even though their behavior is equivalent.

How to recognize it:
- Two classes have methods that do the **same thing** but with different names
- You can't use a **common interface** for the two classes even though they serve the same purpose
- The code has to know exactly **which class** it's using instead of relying on an abstraction
- Logic is duplicated between the two classes because it can't be reused

## ❓ Reasons for the Problem

- **The developer didn't know the other class existed** — On a large team, two people create similar classes without knowing about each other
- **Lack of conventions** — There's no consistent naming convention within the team
- **Different libraries** — Using two libraries that have similar classes but different APIs
- **Half-finished refactoring** — A rename was done in one place but forgotten in another

## 💊 Treatment

Refactoring techniques that help:

- **[Rename Method](../../03-Refactoring-Techniques/)** — Rename methods to unify the interface
- **[Extract Superclass](../../03-Refactoring-Techniques/)** — Create a shared superclass/interface for both classes
- **[Move Method](../../03-Refactoring-Techniques/)** — Move methods so behavior sits in the right place
- **[Add Parameter](../../03-Refactoring-Techniques/)** / **[Remove Parameter](../../03-Refactoring-Techniques/)** — Unify method signatures

## ✅ Payoff

- 🔄 **Better reuse** — A common interface lets you swap implementations
- 🧹 **Less duplication** — Merge duplicated logic
- 📐 **Honors DRY** — Don't Repeat Yourself
- 🔌 **Easy to extend** — Add new implementations through the interface

## 🎮 In Game Dev

### Common examples:
- **AudioPlayer vs SoundManager** — Both play/stop/pause sound, but their method names are completely different
- **ObjectPool vs PoolManager** — Same function of pooling objects, but different APIs
- **EventBus vs MessageSystem** — Same publish/subscribe, but different naming

### Improvement:

```
❌ Before:
class AudioPlayer {
    void PlayClip(AudioClip clip) { ... }
    void StopClip() { ... }
    void SetClipVolume(float vol) { ... }
}

class SoundManager {
    void EmitSound(AudioClip sound) { ... }
    void Silence() { ... }
    void AdjustLevel(float level) { ... }
}
// Two classes, same job, but you can't swap them!
```

```
✅ After:
interface IAudioService {
    void Play(AudioClip clip);
    void Stop();
    void SetVolume(float volume);
}

class AudioPlayer : IAudioService { ... }
class SoundManager : IAudioService { ... }
// Now you can use them interchangeably through the interface!
```

---

> 📚 **Origin:** Content adapted from [Refactoring.Guru](https://refactoring.guru/) — Author: Alexander Shvets, Illustrations: Dmitry Zhart

⬅️ [Back: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Previous: Refused Bequest](./03-refused-bequest.md)
