# Data Clumps

> 📖 **Nguồn:** [Refactoring.Guru — Data Clumps](https://refactoring.guru/smells/data-clumps) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Nhóm dữ liệu **luôn xuất hiện cùng nhau** ở nhiều nơi trong code. Ví dụ: `(x, y, z)` cho tọa độ, `(host, port, database)` cho kết nối database, `(red, green, blue, alpha)` cho màu sắc.

Dấu hiệu nhận biết:
- Cùng một nhóm **3-4 field** xuất hiện trong nhiều class
- Cùng một nhóm **tham số** được truyền vào nhiều method
- Xóa một field trong nhóm khiến các field còn lại **mất ý nghĩa**
- Khi thay đổi nhóm dữ liệu, phải sửa ở **nhiều nơi**

> [!TIP]
> **Cách kiểm tra**: Xóa thử một trong các giá trị trong nhóm. Nếu các giá trị còn lại mất ý nghĩa → đây là Data Clump cần tạo object riêng.

## ❓ Nguyên nhân (Reasons for the Problem)

- **Copy-paste code** — Sao chép nhóm field/parameter từ nơi này sang nơi khác
- **Thiếu nhận biết** — Không nhận ra rằng nhóm dữ liệu liên quan cần được gom lại
- **Phát triển dần dần** — Ban đầu chỉ có 1-2 field, thêm dần thành nhóm
- **Thiếu thiết kế domain** — Không mô hình hóa domain concepts thành objects

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Extract Class](../../03-Refactoring-Techniques/)** — Tạo class mới chứa nhóm dữ liệu liên quan
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Nhóm tham số liên quan thành object
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Truyền toàn bộ object thay vì từng field

## ✅ Lợi ích (Payoff)

- 🧹 **Code gọn gàng hơn** — Một object thay vì nhiều field rời rạc
- 📖 **Dễ hiểu hơn** — `Transform data` rõ nghĩa hơn `(posX, posY, posZ, rotX, rotY, rotZ)`
- 📦 **Tổ chức tốt hơn** — Behavior liên quan đến nhóm dữ liệu nằm cùng class
- 🔄 **Giảm duplication** — Logic xử lý nhóm dữ liệu chỉ viết một lần

## 🎮 Trong Game Dev

### Ví dụ phổ biến:

```
❌ Trước:
// Nhóm position + rotation luôn đi cùng nhau ở NHIỀU nơi
void TeleportPlayer(float posX, float posY, float posZ,
                    float rotX, float rotY, float rotZ) { ... }

void SaveCheckpoint(float posX, float posY, float posZ,
                    float rotX, float rotY, float rotZ) { ... }

void SpawnEffect(float posX, float posY, float posZ,
                 float rotX, float rotY, float rotZ) { ... }
```

```
✅ Sau:
// Tạo TransformData class chứa nhóm dữ liệu liên quan
class TransformData {
    Vector3 position;
    Vector3 rotation;
}

void TeleportPlayer(TransformData transform) { ... }
void SaveCheckpoint(TransformData transform) { ... }
void SpawnEffect(TransformData transform) { ... }
```

### Các trường hợp khác trong game:
- **Damage data**: `(amount, type, isCritical, source)` → `DamageInfo` class
- **Spawn config**: `(position, rotation, prefab, delay)` → `SpawnConfig` class
- **Audio settings**: `(clip, volume, pitch, spatialBlend)` → `AudioConfig` class
- **UI layout**: `(x, y, width, height)` → `Rect` struct

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: Bloaters](./00-bloaters-overview.md) | ⬅️ [Trước: Long Parameter List](./04-long-parameter-list.md)
