# Rendering & Materials API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.Rendering](https://docs.unity3d.com/ScriptReference/Rendering.CommandFolder.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

The rendering system in Unity (`UnityEngine.Rendering`) controls how images are displayed from a 3D mesh into pixels on the screen. Advanced graphics programming requires good control over the dynamic interaction with **Material**, changing Shader properties at runtime without causing memory leaks, and optimizing render performance through object batching (Instancing).

---

## 🎨 1. Interacting Dynamically with Materials via C#

When you want to change the color, glossiness, or other Shader properties of an object at runtime, you access them through the `Renderer` component (for example, `MeshRenderer`).

### The serious Material leak bug:
When you call `renderer.material`, Unity automatically **creates a clone** of that Material in RAM and assigns it exclusively to the object.
*   **The problem:** If you have 1,000 enemies and call `renderer.material.color = Color.red` when they get hit, Unity will spawn 1,000 independent Materials. This breaks the draw-call batching mechanism, causing the game to stutter and bloating memory if it is not freed manually.
*   **The solution:**
    1.  If you want to change the color globally for all objects sharing that Material, use **`renderer.sharedMaterial`**.
    2.  If you want to change each one individually without creating garbage copies, use **`MaterialPropertyBlock`** (it does not create a new Material clone, preserving the optimal graphics batching mechanism).

---

## ⚡ 2. The GPU Instancing Mechanism via Code

GPU Instancing is a technique for drawing thousands of objects that share the same Mesh (such as tree leaves, grass, or projectiles) in just **a single Draw Call**, by pushing all of their position and color data as a data array directly onto the graphics card for parallel processing.
*   **C# API:** Use the **`Graphics.RenderMeshInstanced`** method in Unity 6.4 to manually draw thousands of mesh objects with extremely high performance, without needing to create representative GameObjects (saving CPU Overhead).

---

## 🎮 Practical Source Code (Unity C#)

Below is practical C# source code demonstrating how to flash a red color when hit using the extremely optimal `MaterialPropertyBlock` (without creating material copies), and how to draw a large batch of quartz crystals (Instanced Mesh Rendering) with high performance.

```csharp
using UnityEngine;

public class RenderingOptimizationDemo : MonoBehaviour
{
    [Header("Material Flash Settings")]
    [SerializeField] private MeshRenderer targetMeshRenderer;
    [SerializeField] private Color damageColor = Color.red;
    [SerializeField] private float flashDuration = 0.2f;

    [Header("GPU Instancing Settings")]
    [SerializeField] private Mesh crystalMesh;
    [SerializeField] private Material crystalMaterial;
    [SerializeField] private int crystalCount = 500;

    // Object that stores Material properties without cloning the material
    private MaterialPropertyBlock propertyBlock;
    private int colorShaderId;

    private void Awake()
    {
        propertyBlock = new MaterialPropertyBlock();
        // Hash the Shader property name to an ID to optimize lookup performance
        colorShaderId = Shader.StringToHash("_BaseColor"); // Or "_Color" depending on the Shader
    }

    private void Update()
    {
        // 1. Check for a left mouse click to simulate a red flash when hit
        if (Input.GetMouseButtonDown(0))
        {
            StartCoroutine(FlashDamageEffect());
        }

        // 2. Draw hundreds of quartz crystals using GPU Instancing
        if (crystalMesh != null && crystalMaterial != null)
        {
            RenderCrystalsInstanced();
        }
    }

    private System.Collections.IEnumerator FlashDamageEffect()
    {
        if (targetMeshRenderer == null) yield break;

        // Load the Renderer's current settings into the PropertyBlock
        targetMeshRenderer.GetPropertyBlock(propertyBlock);
        
        // Set the red color into the PropertyBlock
        propertyBlock.SetColor(colorShaderId, damageColor);
        
        // Apply the new properties to the Renderer
        targetMeshRenderer.SetPropertyBlock(propertyBlock);

        yield return new WaitForSeconds(flashDuration);

        // Restore the default white color (or reset)
        targetMeshRenderer.GetPropertyBlock(propertyBlock);
        propertyBlock.SetColor(colorShaderId, Color.white);
        targetMeshRenderer.SetPropertyBlock(propertyBlock);
    }

    private void RenderCrystalsInstanced()
    {
        // Initialize the position/rotation matrices for the crystal blocks
        Matrix4x4[] matrices = new Matrix4x4[crystalCount];
        
        // Initialize a fixed random seed to avoid changing positions every frame
        Random.InitState(42);

        for (int i = 0; i < crystalCount; i++)
        {
            Vector3 pos = transform.position + Random.insideUnitSphere * 15f;
            // Place the crystals on the ground (y = 0)
            pos.y = 0f;

            Quaternion rot = Quaternion.Euler(0f, Random.Range(0f, 360f), 0f);
            Vector3 scale = Vector3.one * Random.Range(0.5f, 1.5f);

            matrices[i] = Matrix4x4.TRS(pos, rot, scale);
        }

        // Create the render configuration parameters for Unity 6.4
        RenderParams renderParams = new RenderParams(crystalMaterial);
        
        // Issue the draw command directly to the GPU
        // Drawing all 500 crystals costs only 1-2 Draw Calls!
        Graphics.RenderMeshInstanced(renderParams, crystalMesh, 0, matrices);
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Animations API](./09-animations-api.md) |
| → Next | [UI Toolkit & UGUI API](./11-ui-api.md) |
