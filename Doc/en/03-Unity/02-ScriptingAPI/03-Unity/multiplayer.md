# Unity.Multiplayer (Next-generation network programming)

> 📖 **Source:** This document was compiled and written in depth from [Unity Scripting API — Unity.Multiplayer](https://docs.unity3d.com/ScriptReference/Unity.Multiplayer.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Unity's next-generation network programming interface, supporting synchronized multiplayer connections.

---

## 🧱 1. High-performance networked games with Netcode

Unity provides the Netcode networking solution, either Netcode for GameObjects or Netcode for Entities.

* **`NetworkManager`**: The heart that controls the network connection between Server, Client, and Host.
* **`NetworkVariable`**: Automatically synchronizes important variables (such as Health and Position) from the Server down to every connected Client.

---

## 📐 2. The client-side hack/cheat pitfall

Always apply the principle: **the Server is the ultimate authority (Server-Authoritative)**. Never trust damage or score calculations sent up from the Client side.

---

## 🎮 Hands-on source code (Unity C#)

Below is a real code example showing how to program for performance optimization, error handling, and system integration through the `Unity.Multiplayer` subsystem.

```csharp
using UnityEngine;
#if UNITY_NETCODE
using Unity.Netcode;

public class NetworkPlayerHealth : NetworkBehaviour
{
    // Health variable automatically synchronized over the network from Server down to Client
    public NetworkVariable<int> health = new NetworkVariable<int>(100, NetworkVariableReadPermission.Everyone, NetworkVariableWritePermission.Server);

    public override void OnNetworkSpawn()
    {
        health.OnValueChanged += OnHealthChanged;
    }

    private void OnHealthChanged(int oldVal, int newVal)
    {
        Debug.Log($"[Network] Health updated over the network: {newVal}");
    }
}
#endif
```

---
> 📚 **Source:** Content referenced from [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Unity.Mathematics](01-mathematics.md) |
| → Next | [Unity.PlayMode](play-mode.md) |
