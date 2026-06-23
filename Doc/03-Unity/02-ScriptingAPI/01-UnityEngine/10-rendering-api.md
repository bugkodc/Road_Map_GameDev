# Rendering & Materials API (Hệ thống Đồ họa và Vật liệu)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Rendering](https://docs.unity3d.com/ScriptReference/Rendering.CommandFolder.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống kết xuất đồ họa trong Unity (`UnityEngine.Rendering`) điều khiển cách thức hiển thị hình ảnh từ 3D mesh thành điểm ảnh trên màn hình. Lập trình đồ họa nâng cao yêu cầu kiểm soát tốt sự tương tác động với **Material** (vật liệu), thay đổi thuộc tính Shader lúc runtime mà không gây rò rỉ bộ nhớ (Memory leaks), và tối ưu hóa hiệu năng render qua cơ chế gom cụm đối tượng (Instancing).

---

## 🎨 1. Tương tác động với Materials qua C#

Khi muốn thay đổi màu sắc, độ bóng hoặc các thuộc tính Shader của một đối tượng trong runtime, ta truy xuất qua component `Renderer` (ví dụ: `MeshRenderer`).

### Lỗi Rò rỉ Material nghiêm trọng:
Khi bạn gọi `renderer.material`, Unity sẽ tự động **tạo ra một bản sao (clone)** của Material đó trên RAM và gán riêng cho đối tượng. 
*   **Vấn đề:** Nếu bạn có 1000 kẻ địch và gọi `renderer.material.color = Color.red` khi chúng bị trúng đạn, Unity sẽ sinh ra 1000 Material độc lập. Việc này phá vỡ cơ chế gom cụm draw calls (Batching) khiến game bị giật lag và làm phình bộ nhớ nếu không giải phóng thủ công.
*   **Giải pháp:** 
    1.  Nếu muốn đổi màu chung cho tất cả các đối tượng dùng chung Material đó, dùng **`renderer.sharedMaterial`**.
    2.  Nếu muốn đổi riêng từng đứa mà không tạo bản sao rác, sử dụng **`MaterialPropertyBlock`** (Không tạo thêm Material clone mới, giữ nguyên cơ chế Batching đồ họa tối ưu).

---

## ⚡ 2. Cơ chế GPU Instancing qua Code

GPU Instancing là kỹ thuật vẽ hàng ngàn đối tượng giống hệt nhau về lưới Mesh (như lá cây, cỏ, viên đạn) chỉ trong **duy nhất 1 Draw Call** bằng cách đẩy toàn bộ dữ liệu vị trí, màu sắc của chúng thành một mảng dữ liệu trực tiếp lên card đồ họa xử lý song song.
*   **API C#:** Sử dụng phương thức **`Graphics.RenderMeshInstanced`** trong Unity 6.4 để vẽ thủ công hàng ngàn đối tượng mesh hiệu năng cực cao mà không cần tạo GameObject đại diện (tiết kiệm CPU Overhead).

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là mã nguồn C# thực chiến thể hiện cách đổi màu sắc đỏ nhấp nháy khi trúng đạn sử dụng `MaterialPropertyBlock` cực kỳ tối ưu (không tạo bản sao vật liệu) và cách vẽ hàng loạt đá thạch anh (Instanced Mesh Rendering) hiệu năng cao.

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

    // Đối tượng lưu trữ thuộc tính Material mà không nhân bản vật liệu
    private MaterialPropertyBlock propertyBlock;
    private int colorShaderId;

    private void Awake()
    {
        propertyBlock = new MaterialPropertyBlock();
        // Băm tên thuộc tính Shader sang ID để tối ưu hiệu năng truy xuất
        colorShaderId = Shader.StringToHash("_BaseColor"); // Hoặc "_Color" tùy Shader
    }

    private void Update()
    {
        // 1. Kiểm tra nhấp chuột trái để giả lập trúng đạn nhấp nháy đỏ
        if (Input.GetMouseButtonDown(0))
        {
            StartCoroutine(FlashDamageEffect());
        }

        // 2. Vẽ hàng trăm viên đá thạch anh bằng GPU Instancing
        if (crystalMesh != null && crystalMaterial != null)
        {
            RenderCrystalsInstanced();
        }
    }

    private System.Collections.IEnumerator FlashDamageEffect()
    {
        if (targetMeshRenderer == null) yield break;

        // Tải thiết lập hiện tại của Renderer vào PropertyBlock
        targetMeshRenderer.GetPropertyBlock(propertyBlock);
        
        // Đặt màu đỏ vào PropertyBlock
        propertyBlock.SetColor(colorShaderId, damageColor);
        
        // Áp dụng thuộc tính mới lên Renderer
        targetMeshRenderer.SetPropertyBlock(propertyBlock);

        yield return new WaitForSeconds(flashDuration);

        // Trả lại màu trắng mặc định (hoặc reset)
        targetMeshRenderer.GetPropertyBlock(propertyBlock);
        propertyBlock.SetColor(colorShaderId, Color.white);
        targetMeshRenderer.SetPropertyBlock(propertyBlock);
    }

    private void RenderCrystalsInstanced()
    {
        // Khởi tạo các ma trận vị trí xoay cho các khối đá
        Matrix4x4[] matrices = new Matrix4x4[crystalCount];
        
        // Khởi tạo hạt giống ngẫu nhiên cố định để tránh thay đổi vị trí mỗi frame
        Random.InitState(42);

        for (int i = 0; i < crystalCount; i++)
        {
            Vector3 pos = transform.position + Random.insideUnitSphere * 15f;
            // Cho các viên đá nằm trên mặt đất (y = 0)
            pos.y = 0f;

            Quaternion rot = Quaternion.Euler(0f, Random.Range(0f, 360f), 0f);
            Vector3 scale = Vector3.one * Random.Range(0.5f, 1.5f);

            matrices[i] = Matrix4x4.TRS(pos, rot, scale);
        }

        // Tạo tham số cấu hình dựng hình cho Unity 6.4
        RenderParams renderParams = new RenderParams(crystalMaterial);
        
        // Gọi lệnh vẽ trực tiếp lên GPU
        // Vẽ toàn bộ 500 viên đá chỉ tốn duy nhất 1-2 Draw Calls!
        Graphics.RenderMeshInstanced(renderParams, crystalMesh, 0, matrices);
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Animations API (Hoạt họa)](./09-animations-api.md) |
| → Tiếp theo | [UI Toolkit & UGUI API (Hệ thống giao diện)](./11-ui-api.md) |
