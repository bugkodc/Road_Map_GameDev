# UI Toolkit & UGUI API (Hệ thống giao diện UI)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Manual — User interface (UI)](https://docs.unity3d.com/Manual/UIToolkits.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Trong Unity 6.4, nhà phát triển có hai giải pháp xây dựng giao diện người dùng chính thức: hệ thống cũ **UGUI (Unity UI)** dựa trên các đối tượng GameObject/Canvas, và hệ thống mới **UI Toolkit** lấy cảm hứng từ công nghệ web (HTML/CSS). Hiểu rõ bản chất kiến trúc và cách thức tương tác mã nguồn (Scripting API) của cả hai hệ thống là bắt buộc để lựa chọn đúng công nghệ cho dự án, tối ưu hóa hiệu năng render UI và xây dựng giao diện linh hoạt.

---

## ⚖️ 1. So sánh bản chất hệ thống: UGUI vs UI Toolkit

| Tính chất | UGUI (Unity UI - Cũ) | UI Toolkit (Hiện đại) |
| :--- | :--- | :--- |
| **Kiến trúc** | Dựa trên cây GameObject trong Scene. Mỗi thành phần UI là một GameObject riêng lẻ. | Dựa trên mô hình tài liệu phân cấp đơn lẻ. Toàn bộ UI được lưu trong file cấu hình `.uxml`. |
| **Styling (Định dạng)** | Chỉnh tay thủ công trên từng Component ở Inspector (Image, Shadow, Outline). | Sử dụng tệp định dạng `.uss` (tương tự CSS). Thay đổi một lớp USS sẽ cập nhật toàn bộ UI. |
| **Layout Engine** | Dùng component Layout Group (Vertical, Horizontal, Grid). Khá chậm khi có nhiều con. | Sử dụng **Flexbox** (chuẩn web W3C). Tự động co giãn cực kỳ tối ưu hiệu năng. |
| **Bản chất Render** | Vẽ lên các lưới Mesh của các đối tượng Canvas. Trùng lặp Mesh gây tốn Draw Calls. | Cơ chế kết xuất thông minh (Batching Render), chỉ vẽ lại các vùng có sự thay đổi. |
| **Mục đích khuyên dùng** | Phù hợp với UI trong không gian 3D thế giới game (World Space Health Bar, v.v...). | Phù hợp với UI màn hình hiển thị 2D (Menus, HUD, Shop) và mở rộng công cụ Editor. |

---

## 🖥️ 2. Scripting với UGUI (UnityEngine.UI)

Hệ thống UGUI hoạt động hoàn toàn bằng cách truy cập các thành phần GameObject và lắng nghe thông qua lớp sự kiện C# `UnityEvent`.

### Các lưu ý về hiệu năng UGUI:
*   **Tránh cập nhật text mỗi frame:** Đoạn code `myText.text = "Score: " + score;` đặt trong `Update()` sẽ ép Canvas chứa nó phải build lại lưới mesh (Canvas Rebuild) trên mỗi khung hình, gây tụt FPS nghiêm trọng. Hãy cập nhật qua cơ chế Observer Pattern hoặc Event-driven khi điểm số thực sự thay đổi.
*   **Tách Canvas:** Chia nhỏ các UI tĩnh (ít thay đổi như hình nền, tiêu đề) và các UI động (máu, la bàn thay đổi liên tục) sang các Canvas con (Sub-Canvases) khác nhau.

---

## 🌐 3. Scripting với UI Toolkit (UnityEngine.UIElements)

Hệ thống UI Toolkit tách biệt giao diện (`.uxml`), thiết kế thẩm mỹ (`.uss`) ra khỏi mã nguồn logic C#. 

```
┌────────────────────────────────────────────────┐
│                   UIDocument                   │
│   (Component chứa file cấu hình giao diện)       │
├───────────────────────┬────────────────────────┤
│     VisualElement     │     VisualElement      │
│  - Name: "shop-panel" │  - Class: ".btn-style" │
│  - Type: Container    │  - Type: Button        │
└───────────────────────┴────────────────────────┘
```

### Các API cốt lõi trong UIElements:
1.  **`VisualElement`**: Lớp cơ sở cho mọi thẻ giao diện UI. Tương đương với thẻ `<div>` trong HTML.
2.  **`UIDocument`**: Component MonoBehaviour gắn trên GameObject làm cổng kết nối đến tệp UXML.
3.  **`rootVisualElement`**: Cổng truy cập gốc chứa toàn bộ các node con của UI Document.
4.  **Hàm Query `Q<T>()`**: Tìm kiếm một element con theo Tên ID hoặc Class CSS:
    *   `root.Q<Button>("btn-play")`: Tìm nút bấm có thuộc tính Name là `btn-play`.
    *   `root.Q<VisualElement>(className: "panel-container")`: Tìm panel theo Class USS.
5.  **Event System**: Lập trình sự kiện qua phương thức `RegisterCallback<T>` thay vì click listener của UGUI.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Script hoàn chỉnh triển khai song song cả hai giải pháp để bạn so sánh cách truy xuất, cập nhật giá trị động và xử lý sự kiện bấm nút.

### Ví dụ 1: Triển khai mã nguồn bằng UGUI
```csharp
using UnityEngine;
using UnityEngine.UI; // Namespace cho UGUI
using TMPro; // Namespace cho TextMeshPro khuyên dùng

public class UGuiDemoController : MonoBehaviour
{
    [Header("UGUI References")]
    [SerializeField] private Button playButton;
    [SerializeField] private TextMeshProUGUI scoreText;

    private int score;

    private void OnEnable()
    {
        // Đăng ký sự kiện click của button
        if (playButton != null)
        {
            playButton.onClick.AddListener(OnPlayButtonClicked);
        }
    }

    private void OnDisable()
    {
        // Hủy đăng ký để tránh lỗi leak tham chiếu
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
        // Chỉ cập nhật hiển thị khi giá trị thay đổi thực sự
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

### Ví dụ 2: Triển khai mã nguồn bằng UI Toolkit (Unity 6.4 Chuẩn)
```csharp
using UnityEngine;
using UnityEngine.UIElements; // Namespace cho UI Toolkit

[RequireComponent(typeof(UIDocument))]
public class UiToolkitDemoController : MonoBehaviour
{
    private UIDocument uiDocument;
    private VisualElement rootElement;

    // Các biến lưu trữ tham chiếu đến UI Elements
    private Button btnPlay;
    private Label lblScore;
    private VisualElement panelShop;

    private int score;

    private void Awake()
    {
        // Lấy component UIDocument kết nối với file UXML
        uiDocument = GetComponent<UIDocument>();
    }

    private void OnEnable()
    {
        // 1. Lấy root element của tài liệu UI
        rootElement = uiDocument.rootVisualElement;

        if (rootElement != null)
        {
            // 2. Tìm kiếm các Element theo Name cấu hình trong UXML
            btnPlay = rootElement.Q<Button>("btn-play");
            lblScore = rootElement.Q<Label>("lbl-score");
            panelShop = rootElement.Q<VisualElement>("panel-shop");

            // 3. Đăng ký sự kiện Click sử dụng ClickEvent của UI Toolkit
            if (btnPlay != null)
            {
                btnPlay.RegisterCallback<ClickEvent>(OnPlayButtonClicked);
            }
        }
    }

    private void OnDisable()
    {
        // Hủy đăng ký sự kiện click khi tắt component
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

        // Thao tác chỉnh sửa Style động (Thay đổi USS Class)
        if (panelShop != null)
        {
            // Ẩn panel shop bằng cách chuyển đổi class hiển thị ẩn/hiển
            if (panelShop.ClassListContains("hidden"))
            {
                panelShop.RemoveFromClassList("hidden");
                panelShop.style.display = DisplayStyle.Flex; // Hiển thị lại
            }
            else
            {
                panelShop.AddToClassList("hidden");
                panelShop.style.display = DisplayStyle.None; // Ẩn đi
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
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.InputSystem API (Input mới)](../../03-InputSystem/00-inputsystem-api.md) |
| → Tiếp theo | [Quay lại Tổng quan Lộ trình](../../00-unity-overview.md) |
