# Extract Method

> 📖 **Nguồn:** [Refactoring.Guru — Extract Method](https://refactoring.guru/extract-method) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **đoạn code có thể được nhóm lại** thành một khối logic. Đoạn code đó nằm lẫn trong một method dài, khiến method khó đọc và khó hiểu mục đích tổng thể.

```csharp
// ❌ Trước refactor
void Update()
{
    // Handle input
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");
    Vector3 direction = new Vector3(h, 0, v).normalized;
    
    // Handle movement
    if (direction.magnitude >= 0.1f)
    {
        float targetAngle = Mathf.Atan2(direction.x, direction.z) * Mathf.Rad2Deg;
        transform.rotation = Quaternion.Euler(0, targetAngle, 0);
        controller.Move(direction * speed * Time.deltaTime);
    }
    
    // Handle combat
    if (Input.GetButtonDown("Fire1") && Time.time > lastAttackTime + cooldown)
    {
        // ... 20 dòng combat logic ...
    }
}
```

## ✅ Giải pháp (Solution)

Chuyển đoạn code đó thành **method mới** và đặt tên method theo **MỤC ĐÍCH** (what it does), không phải theo **CÁCH LÀM** (how it does).

```csharp
// ✅ Sau refactor
void Update()
{
    HandleInput();
    HandleMovement();
    HandleCombat();
}

private void HandleInput()
{
    float h = Input.GetAxis("Horizontal");
    float v = Input.GetAxis("Vertical");
    moveDirection = new Vector3(h, 0, v).normalized;
}

private void HandleMovement()
{
    if (moveDirection.magnitude >= 0.1f)
    {
        float targetAngle = Mathf.Atan2(moveDirection.x, moveDirection.z) * Mathf.Rad2Deg;
        transform.rotation = Quaternion.Euler(0, targetAngle, 0);
        controller.Move(moveDirection * speed * Time.deltaTime);
    }
}

private void HandleCombat()
{
    if (Input.GetButtonDown("Fire1") && Time.time > lastAttackTime + cooldown)
    {
        // combat logic
    }
}
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Method càng dài, càng khó hiểu**: Bạn phải đọc toàn bộ method để hiểu nó làm gì
- **Comment là dấu hiệu**: Nếu bạn cần comment để giải thích đoạn code, đó là dấu hiệu cần Extract Method
- **Tái sử dụng**: Code được tách ra có thể dùng lại ở nơi khác
- **Isolation**: Lỗi được cô lập trong method nhỏ, dễ debug hơn

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code dễ đọc hơn** | Method có tên rõ ràng như "documentation sống" |
| 🔄 **Giảm duplication** | Code trùng lặp được thay bằng một method call |
| 🧪 **Dễ test hơn** | Method nhỏ có thể unit test độc lập |
| 🐛 **Dễ debug hơn** | Lỗi được cô lập trong method cụ thể |

## 📝 Cách thực hiện (How to Refactor)

1. **Tạo method mới** và đặt tên mô tả mục đích của đoạn code (what, không phải how)
2. **Copy đoạn code** cần tách vào method mới
3. **Xử lý biến local** trong đoạn code:
   - Biến chỉ đọc trong đoạn code → truyền làm **parameter**
   - Biến được gán giá trị trong đoạn code → **return** giá trị đó
   - Nhiều biến được gán → cân nhắc dùng `out` parameter hoặc tách thành nhiều method
   - Biến tạm chỉ dùng trong đoạn code → **giữ nguyên** trong method mới
4. **Thay thế đoạn code cũ** bằng lời gọi method mới
5. **Biên dịch và test** để đảm bảo không có lỗi

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Tách method dài thành nhiều method ngắn
- 🔗 [Duplicate Code](../../02-Code-Smells/04-Dispensables/01-duplicate-code.md) — Gộp code trùng lặp vào một method
- 🔗 [Feature Envy](../../02-Code-Smells/05-Couplers/01-feature-envy.md) — Tách code "ghen tị" thành method riêng rồi move
- 🔗 [Comments](../../02-Code-Smells/04-Dispensables/05-comments.md) — Method tên rõ ràng thay thế comment

## 🎮 Trong Game Dev

### Unity — Tách Update() phức tạp:
```csharp
// Trong MonoBehaviour
void Update()
{
    HandleInput();
    HandleMovement();
    HandleCombat();
    HandleAnimation();
    UpdateUI();
}
```

### Tách logic spawn:
```csharp
// Thay vì 50 dòng spawn logic trong một method
void SpawnWave()
{
    var spawnPoints = CalculateSpawnPositions();
    var enemies = CreateEnemies(waveConfig);
    PlaceEnemiesAtPositions(enemies, spawnPoints);
    NotifyWaveStarted();
}
```

### Lưu ý trong Game Dev:
- **Không tách quá nhỏ** trong code performance-critical (mỗi method call có overhead nhỏ)
- **Unity Profiler** sẽ dễ đọc hơn khi method được tách rõ ràng
- **Đặt tên theo domain**: `HandleInput()` tốt hơn `ProcessData()`

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ➡️ [Inline Method](./02-inline-method.md)
- 🔗 [Refactoring Techniques](../00-techniques-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
