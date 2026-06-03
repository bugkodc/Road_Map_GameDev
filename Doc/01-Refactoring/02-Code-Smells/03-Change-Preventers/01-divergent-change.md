# Divergent Change (Thay đổi phân kỳ)

> 📖 **Nguồn:** [Refactoring.Guru — Divergent Change](https://refactoring.guru/smells/divergent-change) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

**Divergent Change** xảy ra khi bạn nhận thấy mình phải thay đổi **nhiều phương thức không liên quan** của **cùng một class** mỗi khi có một thay đổi nhỏ về logic nghiệp vụ từ bên ngoài.

*Ví dụ:* Khi bạn thêm một loại item mới vào game, bạn vừa phải sửa hàm hiển thị của class `Inventory`, vừa sửa hàm lưu trữ (save) của nó, vừa sửa hàm tính toán khối lượng của nó.

> 💡 **Khái niệm cốt lõi:** Khi một class có nhiều lý do để thay đổi (vi phạm **Single Responsibility Principle - SRP**), class đó đang bị dính Divergent Change.

## ❓ Nguyên nhân (Reasons for the Problem)

Smell này thường xuất phát từ việc thiết kế class thiếu định hình rõ ràng, dẫn đến việc "tiện tay" thêm các hành vi và dữ liệu không trực tiếp thuộc về trách nhiệm chính của class:
- Phát triển nhanh, chắp vá mà không chịu tái cấu trúc.
- Gom quá nhiều tính năng khác nhau vào một class duy nhất (thường là các class trung tâm như `GameManager`, `PlayerController`).

## 💊 Cách điều trị (Treatment)

Để giải quyết Divergent Change, chúng ta cần phân rã class cồng kềnh đó dựa trên các nhóm hành vi:

1. **Extract Class**: Tách các thuộc tính và hành vi có chung mục đích/trách nhiệm ra một class mới.
2. **Extract Superclass / Extract Interface**: Nếu các hành vi khác nhau có thể được trừu tượng hóa, hãy tạo một parent class hoặc interface để định nghĩa chúng.
3. **Move Method**: Chuyển các method không trực tiếp liên quan đến class hiện tại sang các class phù hợp hơn.

## ✅ Lợi ích (Payoff)

- **Cải thiện tính module hóa**: Code của bạn có cấu trúc rõ ràng, mỗi class làm một việc và làm tốt việc đó (SRP).
- **Dễ bảo trì**: Khi cần sửa một logic (ví dụ: cách hiển thị UI), bạn chỉ cần tìm đúng class UI để sửa, hoàn toàn không đụng đến class lưu dữ liệu hay logic điều khiển.
- **Tái sử dụng code tốt hơn**: Các class nhỏ, chuyên biệt sẽ dễ dàng được tái sử dụng trong các ngữ cảnh khác nhau của game.

## 🎮 Trong Game Dev

Trong lập trình game, Divergent Change cực kỳ phổ biến ở các class chính:

### ❌ Ví dụ chưa refactor:
Class `Player` kiêm nhiệm quá nhiều nhiệm vụ:
```csharp
public class Player : MonoBehaviour
{
    // Dữ liệu Player
    public int hp;
    public float speed;

    // Logic di chuyển
    void Update() { /* Xử lý di chuyển */ }

    // Logic âm thanh
    public void PlayFootstepSound() { /* Phát tiếng bước chân */ }

    // Logic UI
    public void UpdateHealthBar() { /* Cập nhật thanh máu trên màn hình */ }

    // Logic Save/Load
    public string ExportSaveData() { /* Chuyển dữ liệu thành JSON để save */ }
}
```
**Vấn đề:** Khi Designer muốn sửa UI hiển thị thanh máu → Bạn sửa class `Player`. Khi Sound Designer muốn đổi cách phát tiếng bước chân → Bạn sửa class `Player`. Khi coder muốn đổi format file save sang binary → Bạn sửa class `Player`. Đây chính là **Divergent Change**.

### ✅ Giải pháp sau refactor:
Tách biệt các trách nhiệm bằng cách dùng **Extract Class**:
- Tạo `PlayerMovement` đảm nhận di chuyển.
- Tạo `PlayerAudio` đảm nhận âm thanh.
- Tạo `PlayerUI` đảm nhận cập nhật giao diện.
- Tạo `PlayerSaveSystem` đảm nhận lưu trữ dữ liệu.
Class `Player` lúc này chỉ là một bộ điều phối gọn nhẹ hoặc chỉ lưu trữ dữ liệu trạng thái cốt lõi.

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Change Preventers Overview](./00-change-preventers-overview.md) |
| → Tiếp theo | [Shotgun Surgery](./02-shotgun-surgery.md) |
