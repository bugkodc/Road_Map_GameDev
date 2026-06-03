# SceneManagement API (Quản lý cảnh chơi)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.SceneManagement](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Phân hệ **UnityEngine.SceneManagement** quản lý trạng thái của các Cảnh chơi (Scenes) trong game. Lập trình chuyển cảnh đòi hỏi kiểm soát tốt thời gian tải (đồng bộ vs bất đồng bộ), quản lý bộ nhớ thông qua cơ chế nạp chồng cảnh (Additive Scenes), và duy trì tính toàn vẹn của dữ liệu thông qua cơ chế không phá hủy đối tượng (`DontDestroyOnLoad`).

---

## 🔁 1. Đồng bộ (Synchronous) vs Bất đồng bộ (Asynchronous)

Có hai phương pháp chính để nạp một Scene trong Unity:

```
              ┌─────────────────────────────────────┐
              │          Cơ chế nạp Cảnh (Load)     │
              └──────────────────┬──────────────────┘
                                 │
          ┌──────────────────────┴──────────────────────┐
          v                                             v
┌─────────────────────────┐                           ┌─────────────────────────┐
│     Synchronous Load    │                           │    Asynchronous Load    │
│  (Tải đồng bộ - Khóa)   │                           │  (Tải bất đồng bộ - Mở) │
└─────────┬───────────────┘                           └─────────┬───────────────┘
          │                                                     │
          v                                                     v
   SceneManager.LoadScene                                SceneManager.LoadSceneAsync
   - Đóng băng khung hình.                                - Chạy ngầm đa luồng.
   - Thích hợp màn chơi nhẹ.                              - Hiển thị thanh tiến trình.
   - Gây giật hình với Scene nặng.                       - Không gây đơ game.
```

### So sánh chi tiết:
*   **SceneManager.LoadScene (Đồng bộ):** Dừng toàn bộ luồng hoạt động chính của game để đọc dữ liệu từ ổ cứng vào RAM. Điều này khiến màn hình game bị đơ (freeze) tạm thời. Chỉ khuyên dùng cho các cảnh rất nhẹ như Main Menu.
*   **SceneManager.LoadSceneAsync (Bất đồng bộ):** Unity nạp dữ liệu ở một luồng phụ ngầm (background thread) và trả về đối tượng `AsyncOperation`. Đối tượng này chứa các thuộc tính như `progress` (tiến trình từ `0` đến `1.0`) và cờ `isDone` để theo dõi tiến độ nạp cảnh.

---

## 🧱 2. Nạp chồng cảnh (Additive Scene Loading)

Trong các trò chơi thế giới mở (Open World) hoặc game có thiết kế UI phức tạp, việc nạp chồng nhiều Scene cùng lúc là giải pháp quản lý tài nguyên tối ưu:
*   **`LoadSceneMode.Single` (Mặc định):** Đóng toàn bộ các Scene hiện tại và giải phóng bộ nhớ của chúng trước khi nạp Scene mới.
*   **`LoadSceneMode.Additive`:** Nạp Scene mới đè lên các Scene đang mở mà không xóa chúng. 

> [!TIP]
> **Ứng dụng thực chiến Additive Loading:**
> Chia dự án thành các Scene nhỏ: `BaseScene` (Chứa GameManager, Camera, UI HUD chính), `Level1_Environment` (Môi trường màn chơi 1), và `Level1_Enemies` (Kẻ địch màn chơi 1). Khi chuyển sang màn 2, bạn chỉ cần gỡ nạp (`UnloadSceneAsync`) môi trường và kẻ địch của màn 1, giữ nguyên `BaseScene` không thay đổi. Việc này giúp giảm tải bộ nhớ và tăng tốc thời gian chuyển tiếp.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script hoàn chỉnh viết bằng C# quản lý tiến trình chuyển màn bất đồng bộ có hỗ trợ vẽ thanh Loading Bar chính xác và cơ chế chuyển cảnh giữ lại dữ liệu an toàn.

```csharp
using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

public class GameManagerDemo : MonoBehaviour
{
    // Áp dụng Singleton Pattern để giữ GameManager duy nhất xuyên suốt các cảnh
    public static GameManagerDemo Instance { get; private set; }

    [Header("UI Loading References")]
    [SerializeField] private GameObject loadingCanvas;
    [SerializeField] private Slider progressBar;
    [SerializeField] private TextMeshProUGUI progressText;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            // Bắt buộc giữ đối tượng GameManager này không bị hủy khi nạp scene mới
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    // Hàm gọi từ ngoài (ví dụ: khi nhấn nút Play ở Menu)
    public void LoadGameLevel(string sceneName)
    {
        StartCoroutine(LoadSceneCoroutine(sceneName));
    }

    private IEnumerator LoadSceneCoroutine(string sceneName)
    {
        // 1. Kích hoạt giao diện màn hình chờ
        if (loadingCanvas != null)
        {
            loadingCanvas.SetActive(true);
        }

        // 2. Gọi API nạp cảnh bất đồng bộ ngầm
        AsyncOperation operation = SceneManager.LoadSceneAsync(sceneName, LoadSceneMode.Single);
        
        // Ngăn không cho scene tự động hiển thị ngay khi nạp xong để quản lý thời gian mở màn
        operation.allowSceneActivation = false;

        // 3. Vòng lặp cập nhật tiến trình tải
        while (!operation.isDone)
        {
            // Unity nạp cảnh chia làm 2 giai đoạn: Tải dữ liệu (0 -> 0.9) và kích hoạt hiển thị (0.9 -> 1.0)
            // Do đó ta chuẩn hóa giá trị về thang đo 0 đến 100%
            float progress = Mathf.Clamp01(operation.progress / 0.9f);
            
            if (progressBar != null)
            {
                progressBar.value = progress;
            }
            if (progressText != null)
            {
                progressText.text = $"ĐANG TẢI: {progress * 100:F0}%";
            }

            // Giai đoạn tải dữ liệu hoàn tất
            if (operation.progress >= 0.9f)
            {
                if (progressText != null)
                {
                    progressText.text = "NHẤN PHÍM BẤT KỲ ĐỂ TIẾP TỤC...";
                }

                // Chờ người chơi tương tác rồi mới mở màn chơi mới
                if (Input.anyKeyDown)
                {
                    operation.allowSceneActivation = true;
                }
            }

            yield return null;
        }

        // 4. Tắt màn hình chờ sau khi nạp hoàn tất
        if (loadingCanvas != null)
        {
            loadingCanvas.SetActive(false);
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Physics & Physics2D API (Vật lý)](./04-physics-api.md) |
| → Tiếp theo | [Events & Actions API (Sự kiện)](./06-events-api.md) |
