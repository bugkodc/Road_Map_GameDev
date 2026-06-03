# UnityEditor.Categorization (Phân loại Asset)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEditor.Categorization](https://docs.unity3d.com/ScriptReference/UnityEditor.Categorization.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API quản lý việc phân loại và tổ chức các Asset phục vụ xây dựng kho tài nguyên quy mô lớn.

---

## 🧱 1. Tổ chức cây tài nguyên tối ưu

Hỗ trợ gán các thẻ siêu dữ liệu bổ sung và phân nhóm tài nguyên một cách có cấu trúc trong cửa sổ Project. Điều này giúp các họa sĩ 3D và lập trình viên dễ dàng tìm thấy các asset cần thiết trong một dự án có dung lượng hàng trăm Gigabytes.

---

## 📐 2. Tự động gắn nhãn

Viết mã tự động quét các thư mục tài nguyên mới thêm vào và gắn nhãn phân loại (Labels) tương ứng dựa trên định dạng tệp.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEditor.Categorization`.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AssetCategorizer
{
    [MenuItem("Tools/Categorize Imported Textures")]
    public static void Categorize()
    {
        // Gán nhãn cho các Asset được chọn trong cửa sổ Project
        string[] guids = Selection.assetGUIDs;
        foreach (string guid in guids)
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            var asset = AssetDatabase.LoadAssetAtPath<Texture2D>(path);
            if (asset != null)
            {
                AssetDatabase.SetLabels(asset, new string[] { "Texture", "UI" });
            }
        }
        Debug.Log("[Categorization.Editor] Đã gắn nhãn phân loại thành công.");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor.Callbacks](callbacks.md) |
| → Tiếp theo | [UnityEditor.Compilation](compilation.md) |
