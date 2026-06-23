# UI Toolkit & UGUI API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Manual — User interface (UI)](https://docs.unity3d.com/Manual/UIToolkits.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

In Unity 6.4, developers have two official solutions for building user interfaces: the legacy **UGUI (Unity UI)** system based on GameObject/Canvas objects, and the new **UI Toolkit** system inspired by web technology (HTML/CSS). Clearly understanding the architectural nature and the Scripting API of both systems is essential to choose the right technology for your project, optimize UI render performance, and build flexible interfaces.

---

## ⚖️ 1. Comparing the Two Systems: UGUI vs UI Toolkit

| Property | UGUI (Unity UI - Legacy) | UI Toolkit (Modern) |
| :--- | :--- | :--- |
| **Architecture** | Based on a GameObject tree in the Scene. Each UI element is a separate GameObject. | Based on a single hierarchical document model. The entire UI is stored in a `.uxml` configuration file. |
| **Styling** | Edited manually on each Component in the Inspector (Image, Shadow, Outline). | Uses `.uss` stylesheet files (similar to CSS). Changing a single USS class updates the entire UI. |
| **Layout Engine** | Uses Layout Group components (Vertical, Horizontal, Grid). Fairly slow when there are many children. | Uses **Flexbox** (the W3C web standard). Scales automatically with extremely high performance. |
| **Rendering Nature** | Draws onto the Meshes of Canvas objects. Duplicated meshes waste Draw Calls. | Smart rendering mechanism (Batching Render), only redraws the regions that have changed. |
| **Recommended Use** | Suitable for UI in 3D game world space (World Space Health Bar, etc.). | Suitable for 2D screen-space UI (Menus, HUD, Shop) and extending Editor tools. |

---

## 🖥️ 2. Scripting with UGUI (UnityEngine.UI)

The UGUI system works entirely by accessing GameObject components and listening through the C# event class `UnityEvent`.

### UGUI performance notes:
*   **Avoid updating text every frame:** The code `myText.text = "Score: " + score;` placed inside `Update()` forces the Canvas containing it to rebuild its mesh (Canvas Rebuild) every frame, causing a severe FPS drop. Update it through the Observer Pattern or an event-driven mechanism only when the score actually changes.
*   **Split your Canvases:** Separate static UI (rarely changing, such as backgrounds and titles) and dynamic UI (health, compass that changes continuously) into different Sub-Canvases.

---

## 🌐 3. Scripting with UI Toolkit (UnityEngine.UIElements)

The UI Toolkit system separates the interface (`.uxml`) and the aesthetic design (`.uss`) from the C# logic source code.

```
┌────────────────────────────────────────────────┐
│                   UIDocument                   │
│   (Component holding the UI configuration file) │
├───────────────────────┬────────────────────────┤
│     VisualElement     │     VisualElement      │
│  - Name: "shop-panel" │  - Class: ".btn-style" │
│  - Type: Container    │  - Type: Button        │
└───────────────────────┴────────────────────────┘
```

### The core APIs in UIElements:
1.  **`VisualElement`**: The base class for every UI element tag. Equivalent to the `<div>` tag in HTML.
2.  **`UIDocument`**: A MonoBehaviour component attached to a GameObject that acts as the gateway to the UXML file.
3.  **`rootVisualElement`**: The root access point containing all the child nodes of the UI Document.
4.  **The `Q<T>()` query function**: Searches for a child element by Name ID or CSS Class:
    *   `root.Q<Button>("btn-play")`: Finds the button whose Name property is `btn-play`.
    *   `root.Q<VisualElement>(className: "panel-container")`: Finds the panel by its USS Class.
5.  **Event System**: Program events through the `RegisterCallback<T>` method instead of UGUI's click listener.

---

## 🎮 Practical Source Code (Unity C#)

Below is a complete script that implements both solutions side by side so you can compare how to access elements, update values dynamically, and handle button-click events.

### Example 1: Implementing with UGUI
```csharp
using UnityEngine;
using UnityEngine.UI; // Namespace for UGUI
using TMPro; // Recommended namespace for TextMeshPro

public class UGuiDemoController : MonoBehaviour
{
    [Header("UGUI References")]
    [SerializeField] private Button playButton;
    [SerializeField] private TextMeshProUGUI scoreText;

    private int score;

    private void OnEnable()
    {
        // Subscribe to the button's click event
        if (playButton != null)
        {
            playButton.onClick.AddListener(OnPlayButtonClicked);
        }
    }

    private void OnDisable()
    {
        // Unsubscribe to avoid reference leak bugs
        if (playButton != null)
        {
            playButton.onClick.RemoveListener(OnPlayButtonClicked);
        }
    }

    private void Start()
    {
        score = 0;
        UpdateScoreDisplay();
    }

    private void OnPlayButtonClicked()
    {
        score += 10;
        // Only update the display when the value actually changes
        UpdateScoreDisplay();
    }

    private void UpdateScoreDisplay()
    {
        if (scoreText != null)
        {
            scoreText.text = $"SCORE: {score}";
        }
    }
}
```

### Example 2: Implementing with UI Toolkit (Unity 6.4 Standard)
```csharp
using UnityEngine;
using UnityEngine.UIElements; // Namespace for UI Toolkit

[RequireComponent(typeof(UIDocument))]
public class UiToolkitDemoController : MonoBehaviour
{
    private UIDocument uiDocument;
    private VisualElement rootElement;

    // Variables storing references to the UI Elements
    private Button btnPlay;
    private Label lblScore;
    private VisualElement panelShop;

    private int score;

    private void Awake()
    {
        // Get the UIDocument component connected to the UXML file
        uiDocument = GetComponent<UIDocument>();
    }

    private void OnEnable()
    {
        // 1. Get the root element of the UI document
        rootElement = uiDocument.rootVisualElement;

        if (rootElement != null)
        {
            // 2. Search for the Elements by the Name configured in the UXML
            btnPlay = rootElement.Q<Button>("btn-play");
            lblScore = rootElement.Q<Label>("lbl-score");
            panelShop = rootElement.Q<VisualElement>("panel-shop");

            // 3. Subscribe to the Click event using UI Toolkit's ClickEvent
            if (btnPlay != null)
            {
                btnPlay.RegisterCallback<ClickEvent>(OnPlayButtonClicked);
            }
        }
    }

    private void OnDisable()
    {
        // Unsubscribe from the click event when the component is disabled
        if (btnPlay != null)
        {
            btnPlay.UnregisterCallback<ClickEvent>(OnPlayButtonClicked);
        }
    }

    private void Start()
    {
        score = 0;
        UpdateScoreDisplay();
    }

    private void OnPlayButtonClicked(ClickEvent evt)
    {
        score += 10;
        UpdateScoreDisplay();

        // Dynamic style editing (changing the USS Class)
        if (panelShop != null)
        {
            // Hide the shop panel by toggling the hidden/visible display class
            if (panelShop.ClassListContains("hidden"))
            {
                panelShop.RemoveFromClassList("hidden");
                panelShop.style.display = DisplayStyle.Flex; // Show again
            }
            else
            {
                panelShop.AddToClassList("hidden");
                panelShop.style.display = DisplayStyle.None; // Hide it
            }
        }
    }

    private void UpdateScoreDisplay()
    {
        if (lblScore != null)
        {
            lblScore.text = $"SCORE: {score}";
        }
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Rendering & Materials API](./10-rendering-api.md) |
| → Next | [Device & Platforms API](./12-device-platforms-api.md) |
