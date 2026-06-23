# 🎮 Unity 6.4 (LTS) Learning Roadmap

> 📖 **Source:** This material is compiled, curated, and written in depth from the official [Unity Manual](https://docs.unity3d.com/Manual/index.html) and [Unity Scripting API](https://docs.unity3d.com/ScriptReference/index.html) documentation for the stable **Unity 6.4 (LTS)** release.

Welcome to your self-study roadmap for mastering Unity 6.4. This material is built to give you a practical, hands-on perspective, explaining the underlying architecture and in-depth programming techniques, and addressing the "only describes things in general terms" weakness of the original documentation.

The roadmap is split into two branches that tightly complement each other:

---

## 📖 1. Unity User Manual (Usage Guide & Concepts)

This branch focuses on the core concepts, how the tools and editor work, and system setup within the Unity Editor:

*   **🎬 Get started:** Installation, the Hub, and initial project management.
*   **🖥️ Unity Editor interface:** The interface and functional windows of Unity 6.4.
*   **📦 Packages and package management:** Managing libraries through the Package Manager (UPM).
*   **📁 Assets and media:** Importing and optimizing Mesh, Texture, and Audio assets.
*   **🎨 2D game development:** The 2D game toolset (Tilemap, Physics 2D, Sprite).
*   **🧠 Unity AI:** The intelligent NavMesh pathfinding AI system.
*   **🕶️ XR (AR/VR):** Cross-platform virtual reality programming.
*   **🌐 Multiplayer:** Networked game programming with Netcode for GameObjects.
*   **📱 Platform development:** Cross-platform build configuration (PC, Mobile, WebGL, Console).
*   **🧱 GameObjects & Components:** The Entity Component Model.
*   **🎬 Scenes:** Scene management and asynchronous loading mechanisms.
*   **📷 Cameras:** Setting up camera angles and the intelligent Cinemachine.
*   **🏞️ World building:** Terrain design, ProBuilder, and Grid.
*   **⚡ Physics:** Physics simulation, Rigidbody, Collider, and Raycasting.
*   **🔌 Input:** Wiring up and receiving the player's hardware input.
    *   👉 **First lesson:** [Introduction to Input](./01-Manual/15-Input/01-introduction-to-input.md)

---

## 💻 2. Scripting API C# (Programming Interface)

This branch dives deep into C# source code, analyzing class lifecycles, execution flow, and the Unity 6.4 API namespaces in detail:

*   **UnityEngine Core API:** Working with GameObject, Component, Transform, Vector3, and Quaternion through code.
*   **MonoBehaviour Lifecycle:** Details of how the Engine triggers event methods (`Awake`, `Start`, `Update`, `FixedUpdate`...).
*   **UnityEngine.InputSystem API:** How to interact directly with Action Assets and input devices using C# code.
*   **UI Toolkit & UGUI API:** Modern UI programming (UI Toolkit) and the traditional canvas interface.

---

> 📚 **Study tip:** When researching a topic, you should first understand the concept in the **Unity Manual** branch, then cross-reference the corresponding **Scripting API** branch to fully grasp how to program it in C#.
