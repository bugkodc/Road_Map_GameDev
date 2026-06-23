# AssetDatabase & AssetImporter

> 📖 **Source:** Material compiled and written in detail from the [Unity Scripting Reference — UnityEditor.AssetDatabase](https://docs.unity3d.com/ScriptReference/AssetDatabase.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

In Unity, every file in the `Assets/` folder (Code, Models, Textures, Materials) is managed by the Editor's internal asset database mechanism. The **`AssetDatabase`** and **`AssetImporter`** subsystems provide a programmatic way to create, search, read data from, and automate import settings for assets precisely, without manual clicking.

---

## 📂 1. The AssetDatabase API Class

The `AssetDatabase` class is the main gateway to the asset database. These APIs run only in the Editor environment.

### Common APIs:
*   **`AssetDatabase.LoadAssetAtPath<T>(string path)`**: Loads an asset at a specific path (for example: `"Assets/Prefabs/Player.prefab"`).
*   **`AssetDatabase.CreateAsset(Object asset, string path)`**: Creates a new custom asset file saved to disk (commonly used to save `ScriptableObject` data).
*   **`AssetDatabase.FindAssets(string filter)`**: Searches the project's files extremely fast by keyword or type (for example, finding all texture files).
*   **`AssetDatabase.Refresh()`**: Forces Unity to re-scan the `Assets/` folder on disk to pick up new files added outside of Unity (for example, through Windows Explorer).

---

## 🔄 2. Automating Asset Settings (AssetPostprocessor)

When importing an asset into Unity (such as a 2D character Sprite image), by default the Unity Editor treats it as an ordinary 3D Texture. You have to click and select Sprite (2D and UI) in the Inspector, then press Apply.
*   **The solution:** Write a class that inherits from **`AssetPostprocessor`** to hook into the import process. When a new image file is detected, the code automatically switches the configuration to a 2D Sprite, toggles Crunch compression, and sets the exact Pixels Per Unit you want before the image file is cached into the `Library` folder.

---

## 🎮 Hands-on Source Code (Unity C#)

Below are two C# scripts demonstrating how to automate the asset import workflow, plus code that creates a ScriptableObject data file holding weapon stats and saves it directly to disk through C# tooling.

### Script 1: The data ScriptableObject (placed in `Assets/Scripts/WeaponData.cs`)
```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "NewWeaponData", menuName = "Weapon/Weapon Data")]
public class WeaponData : ScriptableObject
{
    public string weaponName = "Iron Sword";
    public int damage = 25;
    public float fireRate = 1.2f;
}
```

### Script 2: The Editor script that creates the Asset (placed in the `Editor/WeaponAssetCreator.cs` folder)
```csharp
using UnityEngine;
using UnityEditor;

public class WeaponAssetCreator
{
    [MenuItem("Tools/Weapons/Create Default Weapon")]
    public static void CreateDefaultWeaponAsset()
    {
        // 1. Create the data object in RAM
        WeaponData newWeapon = ScriptableObject.CreateInstance<WeaponData>();
        newWeapon.weaponName = "Excalibur Divine Sword";
        newWeapon.damage = 999;
        newWeapon.fireRate = 0.5f;

        string folderPath = "Assets/Data/Weapons";
        string assetPath = $"{folderPath}/Excalibur.asset";

        // Automatically create the folder if it does not exist
        if (!AssetDatabase.IsValidFolder(folderPath))
        {
            // Split parent and child folders to create them safely
            AssetDatabase.CreateFolder("Assets", "Data");
            AssetDatabase.CreateFolder("Assets/Data", "Weapons");
        }

        // 2. Save the data object as a physical *.asset file on disk
        AssetDatabase.CreateAsset(newWeapon, assetPath);
        
        // 3. Commit the file to storage
        AssetDatabase.SaveAssets();
        
        // Refresh the Project Window UI so the player sees it right away
        AssetDatabase.Refresh();

        // Automatically highlight the newly created file in the Project window
        EditorUtility.FocusProjectWindow();
        Selection.activeObject = newWeapon;

        Debug.Log($"[AssetDatabase] Successfully created the weapon configuration file at: {assetPath}");
    }
}
```

### Script 3: The automatic Sprite configurator (placed in the `Editor/SpriteAutoConfigurator.cs` folder)
```csharp
using UnityEditor;
using UnityEngine;

// Inherit from AssetPostprocessor to hook the file import event in the Editor
public class SpriteAutoConfigurator : AssetPostprocessor
{
    // This method runs AUTOMATICALLY right BEFORE an image file (Texture) is loaded into the project
    private void OnPreprocessTexture()
    {
        // Check whether the image file is inside the 2D Sprites folder
        // assetPath is the relative path of the file being imported (for example: "Assets/Textures/Sprites/Player.png")
        if (assetPath.Contains("/Sprites/"))
        {
            // Get a reference to the import settings of the current image file
            TextureImporter textureImporter = (TextureImporter)assetImporter;

            // Automatically switch the Texture type to 2D Sprite
            textureImporter.textureType = TextureImporterType.Sprite;
            textureImporter.spriteImportMode = SpriteImportMode.Single;
            
            // Set the standard PPU (Pixels Per Unit) for a 2D game to 16 pixels per Unit
            textureImporter.spritePixelsPerUnit = 16;
            
            // Disable Generate Mip Maps because a 2D game does not need Mipmaps
            textureImporter.mipmapEnabled = false;

            // Set the sharp Point filter (No Filter) for Pixel Art graphics
            textureImporter.filterMode = FilterMode.Point;

            Debug.Log($"[AssetPostprocessor] Automatically configured Pixel Art Sprite for: {assetPath}");
        }
    }
}
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Editor Scene Management](./02-editor-scene-management.md) |
| → Next | [Unity.Mathematics API](../03-Unity/01-mathematics.md) |
