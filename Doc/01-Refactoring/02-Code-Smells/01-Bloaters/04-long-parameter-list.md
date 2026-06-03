# Long Parameter List

> 📖 **Nguồn:** [Refactoring.Guru — Long Parameter List](https://refactoring.guru/smells/long-parameter-list) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Method nhận **hơn 3-4 tham số**. Danh sách tham số dài khiến method trở nên **khó đọc, khó gọi, và dễ nhầm lẫn** thứ tự các tham số.

Dấu hiệu nhận biết:
- Method signature dài chiếm nhiều dòng
- Phải nhớ **thứ tự** các tham số khi gọi method
- Nhiều tham số có **cùng kiểu** (dễ nhầm lẫn vị trí)
- Phải truyền `null` hoặc giá trị mặc định cho tham số không cần
- Method thường bị gọi sai do nhầm thứ tự tham số

## ❓ Nguyên nhân (Reasons for the Problem)

Danh sách tham số dài xảy ra khi:
- **Gộp nhiều thuật toán** vào một method — mỗi thuật toán cần input riêng
- **Cố gắng giảm coupling** bằng cách truyền data riêng lẻ thay vì truyền object (nhưng lại tạo ra vấn đề mới)
- **Method làm quá nhiều việc** và cần nhiều input cho các trách nhiệm khác nhau
- **Refactoring nửa chừng** — Tách method nhưng chưa nhóm tham số

> [!NOTE]
> Danh sách tham số dài đôi khi là kết quả của việc cố gắng tránh dependency giữa các class. Nhưng giải pháp này thường tệ hơn vấn đề.

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Replace Parameter with Method Call](../../03-Refactoring-Techniques/)** — Khi giá trị tham số có thể lấy từ object khác mà method đã biết
- **[Preserve Whole Object](../../03-Refactoring-Techniques/)** — Truyền toàn bộ object thay vì lấy từng field ra truyền riêng
- **[Introduce Parameter Object](../../03-Refactoring-Techniques/)** — Nhóm các tham số liên quan thành object mới

## ✅ Lợi ích (Payoff)

- 📖 **Code dễ đọc hơn** — Method signature gọn gàng, rõ ràng
- 🔧 **Dễ gọi hơn** — Ít tham số = ít sai sót khi sử dụng
- 🧹 **Code gọn gàng** — Bớt clutter, tập trung vào logic chính
- 🔍 **Phát hiện duplication** — Nhóm tham số thường phát hiện ra Data Clumps

## 🎮 Trong Game Dev

### Ví dụ phổ biến:

```
❌ Trước:
void SpawnEnemy(
    float x, float y, float z,
    int hp, float speed,
    string name, int level,
    bool isBoss, float attackRange,
    int dropGold, string lootTable
) { ... }

// Gọi method — dễ nhầm lẫn thứ tự!
SpawnEnemy(10f, 0f, 5f, 100, 3.5f, "Goblin", 5, false, 2f, 50, "common");
```

```
✅ Sau:
void SpawnEnemy(EnemyConfig config) { ... }

// Gọi method — rõ ràng, không nhầm lẫn
SpawnEnemy(new EnemyConfig {
    Position = new Vector3(10f, 0f, 5f),
    Stats = new EnemyStats(hp: 100, speed: 3.5f),
    Name = "Goblin",
    Level = 5,
    IsBoss = false
});
```

### Các trường hợp khác:
- `CreateParticleEffect(pos, rot, scale, color, lifetime, speed, count, shape, ...)`
- `PlaySound(clip, volume, pitch, loop, delay, mixerGroup, spatialBlend, ...)`
- `ApplyDamage(target, amount, type, isCrit, source, element, ...)`

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: Bloaters](./00-bloaters-overview.md) | ⬅️ [Trước: Primitive Obsession](./03-primitive-obsession.md) | ➡️ [Tiếp: Data Clumps](./05-data-clumps.md)
