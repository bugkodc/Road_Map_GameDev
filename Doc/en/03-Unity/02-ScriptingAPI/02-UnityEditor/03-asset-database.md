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

[CreateAssetMenu(fileName = "NewWeaponData", menuName = "Weapon/Dữ Liệu Vũ Khí")]
public class WeaponData : ScriptableObject
{
    public string weaponName = "Kiếm Sắt";
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
    [MenuItem("Tools/Vũ Khí/Tạo Vũ Khí Mặc Định")]
    public static void CreateDefaultWeaponAsset()
    {
        // 1. Tạo đối tượng dữ liệu trong bộ nhớ RAM
        WeaponData newWeapon = ScriptableObject.CreateInstance<WeaponData>();
        newWeapon.weaponName = "Thần Kiếm Excalibur";
        newWeapon.damage = 999;
        newWeapon.fireRate = 0.5f;

        string folderPath = "Assets/Data/Weapons";
        string assetPath = $"{folderPath}/Excalibur.asset";

        // Tự động tạo thư mục nếu chưa tồn tại
        if (!AssetDatabase.IsValidFolder(folderPath))
        {
            // Tách thư mục cha và con để tạo an toàn
            AssetDatabase.CreateFolder("Assets", "Data");
            AssetDatabase.CreateFolder("Assets/Data", "Weapons");
        }

        // 2. Lưu đối tượng dữ liệu thành tệp tin *.asset vật lý trên đĩa cứng
        AssetDatabase.CreateAsset(newWeapon, assetPath);
        
        // 3. Khóa lưu trữ tệp tin
        AssetDatabase.SaveAssets();
        
        // Cập nhật giao diện Project Window để người chơi nhìn thấy ngay
        AssetDatabase.Refresh();

        // Tự động highlight file mới tạo ở Project window
        EditorUtility.FocusProjectWindow();
        Selection.activeObject = newWeapon;

        Debug.Log($"[AssetDatabase] Đã tạo thành công file cấu hình vũ khí tại: {assetPath}");
    }
}
```

### Script 3: The automatic Sprite configurator (placed in the `Editor/SpriteAutoConfigurator.cs` folder)
```csharp
using UnityEditor;
using UnityEngine;

// Kế thừa AssetPostprocessor để bắt sự kiện import file trong Editor
public class SpriteAutoConfigurator : AssetPostprocessor
{
    // Hàm này chạy TỰ ĐỘNG ngay TRƯỚC KHI một file ảnh (Texture) được nạp vào dự án
    private void OnPreprocessTexture()
    {
        // Kiểm tra xem file ảnh có nằm trong thư mục Sprites 2D hay không
        // assetPath là đường dẫn tương đối của file đang import (ví dụ: "Assets/Textures/Sprites/Player.png")
        if (assetPath.Contains("/Sprites/"))
        {
            // Lấy tham chiếu đến bộ cấu hình import của file ảnh hiện tại
            TextureImporter textureImporter = (TextureImporter)assetImporter;

            // Tự động chuyển kiểu Texture sang Sprite 2D
            textureImporter.textureType = TextureImporterType.Sprite;
            textureImporter.spriteImportMode = SpriteImportMode.Single;
            
            // Thiết lập PPU (Pixels Per Unit) chuẩn cho 2D game là 16 pixel trên 1 Unit
            textureImporter.spritePixelsPerUnit = 16;
            
            // Tắt sinh ảnh nhỏ dần (Generate Mip Maps) vì game 2D không cần Mipmaps
            textureImporter.mipmapEnabled = false;

            // Thiết lập bộ lọc sắc nét Point (No Filter) cho đồ họa Pixel Art
            textureImporter.filterMode = FilterMode.Point;

            Debug.Log($"[AssetPostprocessor] Đã tự động cấu hình Pixel Art Sprite cho: {assetPath}");
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
