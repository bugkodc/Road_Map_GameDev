# Editor Scene Management (Quản lý Cảnh ở Editor)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEditor.SceneManagement](https://docs.unity3d.com/ScriptReference/SceneManagement.EditorSceneManager.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Khi phát triển game, việc nạp, chỉnh sửa, lưu trữ các file Cảnh chơi (`.unity`) trong Editor thông qua các mã lệnh script tự động giúp nâng cao đáng kể năng suất. Phân hệ **UnityEditor.SceneManagement** cung cấp các lớp APIs để kiểm soát Scene trong Editor. Lập trình Editor Scene Management yêu cầu nắm rõ cơ chế đánh dấu đối tượng thay đổi (`SetDirty`), quản lý cờ lưu trữ để chống mất mát dữ liệu, và thực thi các kiểm tra cảnh tự động.

---

## ⚠️ 1. Bản chất: Editor vs Runtime Scene Management

*   **`UnityEngine.SceneManagement` (Runtime):** Chỉ dùng để quản lý chuyển cảnh trong quá trình game chạy thực tế (Load, Unload). Không có khả năng lưu file, tạo mới file hay chỉnh sửa file cấu hình cảnh từ ổ cứng.
*   **`UnityEditor.SceneManagement` (Editor-only):** Cung cấp toàn bộ công cụ can thiệp sâu vào cấu trúc file của Scene: tạo mới Scene trống (`NewScene`), mở Scene ở Editor (`OpenScene`), lưu Scene (`SaveScene`), và đánh dấu thay đổi trên Scene.

---

## 💾 2. Cơ chế Đánh dấu thay đổi (Dirty Flag)

Khi bạn chỉnh sửa một thuộc tính của một Component trên Scene thông qua code Editor (ví dụ: một tool tự động rải cây trên mặt đất):
*   **Vấn đề:** Unity Editor không tự nhận biết thay đổi này để kích hoạt dấu sao `*` báo hiệu Scene đã bị sửa đổi bên cạnh tên File. Nếu người chơi bấm Ctrl+S hoặc tắt Unity Editor, các thay đổi do Code tạo ra sẽ **bị mất hoàn toàn** vì Unity coi là Scene chưa được chỉnh sửa.
*   **Giải pháp:** Bắt buộc gọi hàm **`EditorSceneManager.MarkSceneDirty()`** sau khi thực hiện sửa đổi qua code để ép Unity đánh dấu Scene đã bị thay đổi (Dirty). Khi đó hệ thống mới cho phép lưu các thay đổi đó lên ổ cứng.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script Editor hoàn chỉnh (bắt buộc đặt trong thư mục `Editor`) giúp tự động kiểm tra xem các Scene trong dự án có thiếu đối tượng Main Camera hay không và tự động sửa lỗi.

```csharp
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement; // Namespace quản lý Scene Editor

public class EditorSceneManagementDemo : MonoBehaviour
{
    // Đăng ký menu chạy công cụ tự động kiểm tra
    [MenuItem("Tools/Quản lý Cảnh/Kiểm tra lỗi Scene Hiện Tại")]
    public static void CheckActiveSceneErrors()
    {
        // 1. Lấy thông tin Scene hiện đang mở ở Editor
        UnityEngine.SceneManagement.Scene activeScene = EditorSceneManager.GetActiveScene();
        Debug.Log($"[SceneTool] Đang kiểm tra Scene: {activeScene.name} tại đường dẫn: {activeScene.path}");

        // 2. Tìm kiếm Camera chính
        GameObject mainCamera = GameObject.FindWithTag("MainCamera");

        if (mainCamera == null)
        {
            // Hiển thị hộp thoại cảnh báo người dùng và hỏi ý kiến tự sửa
            bool autoFix = EditorUtility.DisplayDialog(
                "Phát hiện lỗi Scene",
                "Scene hiện tại của bạn không có GameObject nào được gán Tag 'MainCamera'! Bạn có muốn công cụ tự động tạo mới Camera chính không?",
                "Có, Tự Động Sửa",
                "Không"
            );

            if (autoFix)
            {
                // Thực thi tạo camera mới
                GameObject cameraObj = new GameObject("Main Camera");
                Camera cam = cameraObj.AddComponent<Camera>();
                cameraObj.tag = "MainCamera";
                
                // Gán vị trí mặc định cho Camera nhìn màn chơi
                cameraObj.transform.position = new Vector3(0f, 1f, -10f);

                // 3. Bắt buộc: Đăng ký Undo hành động tạo này
                Undo.RegisterCreatedObjectUndo(cameraObj, "Auto Create Main Camera");

                // 4. Bắt buộc: Đánh dấu Scene đã bị chỉnh sửa (Dirty) để kích hoạt dấu sao * cho phép lưu
                EditorSceneManager.MarkSceneDirty(activeScene);
                
                Debug.Log("[SceneTool] Đã tự động tạo mới Main Camera và đánh dấu Dirty Scene.");

                // Hỏi người dùng xem có muốn lưu lại ngay lập tức không
                bool saveImmediately = EditorUtility.DisplayDialog(
                    "Lưu Cảnh",
                    "Bạn có muốn lưu các thay đổi vừa thực hiện vào file Scene ngay lập tức?",
                    "Lưu ngay",
                    "Không"
                );

                if (saveImmediately)
                {
                    // 5. Lưu trực tiếp cảnh đang mở
                    EditorSceneManager.SaveScene(activeScene);
                    Debug.Log("[SceneTool] Đã lưu tệp cảnh thành công lên ổ cứng.");
                }
            }
        }
        else
        {
            EditorUtility.DisplayDialog("Thông báo", "Cảnh của bạn hoàn toàn bình thường, có chứa Main Camera!", "Đóng");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEditor Core API (Lập trình Công cụ)](./01-editor-core.md) |
| → Tiếp theo | [AssetDatabase & Importer (Quản lý Tài nguyên)](./03-asset-database.md) |
