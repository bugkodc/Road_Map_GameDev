# UnityEngine.InputSystem API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Input System Package Documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The **New Input System** (`UnityEngine.InputSystem`) is a complete replacement for the legacy Input Manager class (`UnityEngine.Input`). Thanks to its event-driven architecture and the way it fully decouples physical devices from logic code through the intermediate **Input Actions** layer, the new system makes it easy for developers to build multi-device control schemes (Keyboard, Mouse, Gamepad, Touch, VR Controllers), supports runtime key rebinding, and optimizes the performance of the input processing pipeline.

---

## 🔌 1. Direct Device Polling

When you need to write quick tooling scripts or run experimental tests without creating a `.inputactions` configuration file, you can directly query the state of the connected devices.

### APIs for reading keys directly:
```csharp
using UnityEngine;
using UnityEngine.InputSystem; // You must import this namespace

public class DirectInputDemo : MonoBehaviour
{
    private void Update()
    {
        // 1. Check the current keyboard
        if (Keyboard.current != null)
        {
            // Check whether the key was pressed during the current frame (similar to GetKeyDown)
            if (Keyboard.current.spaceKey.wasPressedThisFrame)
            {
                Debug.Log("Pressed Space!");
            }

            // Check whether the key is being held down (similar to GetKey)
            if (Keyboard.current.wKey.isPressed)
            {
                Debug.Log("Holding the W key");
            }
        }

        // 2. Check the current Gamepad
        if (Gamepad.current != null)
        {
            // Read the left joystick value as a Vector2
            Vector2 stickVal = Gamepad.current.leftStick.ReadValue();
            
            // Read the right trigger button
            if (Gamepad.current.rightTrigger.isPressed)
            {
                Debug.Log("Squeezed the right trigger of the gamepad!");
            }
        }
    }
}
```

---

## ⚙️ 2. Event-Driven Action API

The standard approach in large-scale production is to use **Input Actions**. Here we declare an `InputAction` variable and configure its bindings.

```
┌────────────────────────────────────────┐
│             InputAction                │
│  - Name: "Move"                        │
│  - Type: Value (Vector2)               │
├───────────────────┬────────────────────┤
│   Keyboard WASD   │   Gamepad Joystick │
│   (Vector2 Comp)  │   (Stick Control)  │
└───────────────────┴────────────────────┘
```

### The lifecycle states of an InputAction:
Each time an interaction occurs, the `InputAction` transitions through several event phases:
1.  **`started`**: The button begins to be touched/pressed down (the value starts to become nonzero).
2.  **`performed`**: The button press is complete, or the movement axis value changes. This state is called continuously while you hold or move the joystick.
3.  **`canceled`**: The button is fully released (the value returns to 0).

---

## 🤖 3. Using the C# Generated Wrapper Class

When you create an Action Asset configuration file (for example, `GameControls.inputactions`), Unity lets you check **Generate C# Class** to generate a C# class with the same name. Programming through the generated class minimizes the use of hard-coded strings, avoids typos, and takes advantage of the IDE's autocompletion feature.

---

## 🎮 Practical Source Code (Unity C#)

Below is a complete script demonstrating the two most important features in production:
1.  Subscribing to control events through the generated C# class (`GameControls`).
2.  Implementing **runtime key rebinding** and saving the new key configuration to the user's `PlayerPrefs`.

### Preparation step:
This assumes you have created a `GameControls.inputactions` file with an Action Map named `Player` and actions named `Move` (Vector2) and `Jump` (Button).

```csharp
using UnityEngine;
using UnityEngine.InputSystem;
using System.IO;

public class PlayerInputController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float speed = 5f;

    // An instance of the generated class
    private GameControls controls;
    private Vector2 moveInput;

    private void Awake()
    {
        // 1. Initialize the input manager object
        controls = new GameControls();

        // 2. Subscribe a callback for the Jump event (Button)
        // Use a lambda operator (ctx =>) to subscribe a listener
        controls.Player.Jump.performed += ctx => PerformJump();
        
        // 3. Read data continuously for the Move event (Vector2)
        //performed fires every time the Vector2 value changes
        controls.Player.Move.performed += ctx => moveInput = ctx.ReadValue<Vector2>();
        //canceled fires when WASD is fully released (returns 0)
        controls.Player.Move.canceled += ctx => moveInput = Vector2.zero;

        // Load the user's custom key configuration if one exists from before
        LoadCustomBindings();
    }

    private void OnEnable()
    {
        // You must enable the Action Map before using it
        controls.Player.Enable();
    }

    private void OnDisable()
    {
        // Disable the Action Map when the object is inactive
        controls.Player.Disable();
    }

    private void Update()
    {
        // Perform translational movement
        Vector3 movement = new Vector3(moveInput.x, 0f, moveInput.y) * speed * Time.deltaTime;
        transform.Translate(movement, Space.Self);
    }

    private void PerformJump()
    {
        Debug.Log("[InputSystem] Performing a hop!");
    }

    // =========================================================================
    // 🛠️ RUNTIME KEY REBINDING SYSTEM
    // =========================================================================
    
    // Function that reassigns the key for a specific Action
    public void StartRebinding(InputAction actionToRebind, int bindingIndex)
    {
        Debug.Log($"[Rebind] Waiting for a new key for the action: {actionToRebind.name}...");
        
        // Temporarily lock the controls while the user is choosing a new key
        controls.Player.Disable();

        // Run the asynchronous rebinding process
        var rebindOperation = actionToRebind.PerformInteractiveRebinding(bindingIndex)
            // Exclude the Esc key so the exit key is not accidentally assigned
            .WithControlsExcluding("<Keyboard>/escape")
            // Limit the wait time for a key press to 10 seconds
            .WithTimeout(10f)
            // Callback when the configuration succeeds
            .OnComplete(operation => 
            {
                Debug.Log($"[Rebind] Success! New key: {actionToRebind.GetBindingDisplayString(bindingIndex)}");
                
                // Release the rebind operation resources
                operation.Dispose();
                
                // Re-enable the controls
                controls.Player.Enable();
                
                // Save the new configuration
                SaveCustomBindings();
            })
            // Callback when canceled or timed out
            .OnCancel(operation => 
            {
                Debug.Log("[Rebind] The rebinding process was canceled.");
                operation.Dispose();
                controls.Player.Enable();
            });

        // Start scanning peripheral devices for input
        rebindOperation.Start();
    }

    private void SaveCustomBindings()
    {
        // Convert the entire modified key map into a JSON string
        string bindingsJson = controls.SaveBindingOverridesAsJson();
        PlayerPrefs.SetString("CustomInputBindings", bindingsJson);
        PlayerPrefs.Save();
        Debug.Log("[InputSystem] Key configuration saved.");
    }

    private void LoadCustomBindings()
    {
        if (PlayerPrefs.HasKey("CustomInputBindings"))
        {
            string bindingsJson = PlayerPrefs.GetString("CustomInputBindings");
            // Load the data back, overriding the default configuration
            controls.LoadBindingOverridesFromJson(bindingsJson);
            Debug.Log("[InputSystem] Loaded the custom key configuration from storage.");
        }
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [MonoBehaviour Lifecycle](./02-monobehaviour-lifecycle.md) |
| → Next | [Physics & Physics2D API](./04-physics-api.md) |
