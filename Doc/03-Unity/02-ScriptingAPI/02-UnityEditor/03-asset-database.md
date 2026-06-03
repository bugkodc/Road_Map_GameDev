# AssetDatabase & AssetImporter (Quản lý Tài nguyên)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEditor.AssetDatabase](https://docs.unity3d.com/ScriptReference/AssetDatabase.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Trong Unity, tất cả các tệp tin trong thư mục `Assets/` (Code, Models, Textures, Materials) được quản lý bởi cơ chế cơ sở dữ liệu tài nguyên nội bộ của Editor. Phân hệ **`AssetDatabase`** và **`AssetImporter`** cung cấp giải pháp lập trình để tạo mới, tìm kiếm, đọc dữ liệu, và tự động hóa các thiết lập import tài nguyên một cách chuẩn xác mà không cần click chuột thủ công.

---

## 📂 1. Lớp AssetDatabase API

Lớp `AssetDatabase` là cổng kết nối chính đến cơ sở dữ liệu tài nguyên. Các API này chỉ chạy được trong môi trường Editor.

### Các API phổ biến:
*   **`AssetDatabase.LoadAssetAtPath<T>(string path)`**: Nạp một tài nguyên tại đường dẫn cụ thể (ví dụ: `"Assets/Prefabs/Player.prefab"`).
*   **`AssetDatabase.CreateAsset(Object asset, string path)`**: Tạo ra một file tài sản tùy biến mới lưu lên ổ cứng (thường dùng để lưu dữ liệu của `ScriptableObject`).
*   **`AssetDatabase.FindAssets(string filter)`**: Tìm kiếm các tệp tin trong dự án cực nhanh bằng từ khóa hoặc kiểu loại (ví dụ: tìm tất cả các file texture).
*   **`AssetDatabase.Refresh()`**: Ép Unity quét lại thư mục `Assets/` trên đĩa cứng để cập nhật các file mới được thêm ngoài Windows Explorer vào trong dự án.

---

## 🔄 2. Tự động hóa Thiết lập Tài nguyên (AssetPostprocessor)

Khi nhập khẩu tài nguyên vào Unity (như ảnh nhân vật Sprite 2D), mặc định Unity Editor sẽ nhận diện là ảnh 3D Texture thông thường. Bạn phải click chọn Sprite (2D and UI) ở Inspector rồi nhấn Apply.
*   **Giải pháp:** Viết một lớp kế thừa từ **`AssetPostprocessor`** để can thiệp vào quá trình nạp. Khi phát hiện file ảnh mới được thêm vào, code sẽ tự động chuyển cấu hình thành Sprite 2D, bật/tắt nén Crunch, thiết lập Pixels Per Unit chuẩn xác theo ý muốn trước khi file ảnh được lưu cache vào thư mục `Library`.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là hai script C# thể hiện cách tự động hóa quy trình nhập khẩu Assets và code tạo một file ScriptableObject dữ liệu chứa thông số vũ khí lưu trực tiếp lên ổ cứng thông qua C# Tooling.

### Script 1: ScriptableObject dữ liệu (Đặt trong `Assets/Scripts/WeaponData.cs`)
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

### Script 2: Editor Script tạo Asset (Đặt trong thư mục `Editor/WeaponAssetCreator.cs`)
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

### Script 3: Bộ tự động cấu hình ảnh Sprite (Đặt trong thư mục `Editor/SpriteAutoConfigurator.cs`)
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
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Editor Scene Management (Quản lý cảnh ở Editor)](./02-editor-scene-management.md) |
| → Tiếp theo | [Unity.Mathematics API (Toán học hiệu năng cao)](../03-Unity/01-mathematics.md) |
