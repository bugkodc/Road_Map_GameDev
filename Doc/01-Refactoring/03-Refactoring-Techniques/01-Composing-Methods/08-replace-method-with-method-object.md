# Replace Method with Method Object

> 📖 **Nguồn:** [Refactoring.Guru — Replace Method with Method Object](https://refactoring.guru/replace-method-with-method-object) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn có một **method dài** với rất nhiều biến local đan xen nhau, khiến việc áp dụng [Extract Method](./01-extract-method.md) trở nên bất khả thi vì các biến local phụ thuộc lẫn nhau.

```csharp
// ❌ Method dài, nhiều biến local phụ thuộc lẫn nhau
float CalculateComplexDamage(Character attacker, Character defender, Weapon weapon)
{
    float baseDmg = attacker.strength * weapon.multiplier;
    float elementBonus = GetElementBonus(weapon.element, defender.weakness);
    float critChance = attacker.luck / 100f + weapon.critBonus;
    bool isCrit = Random.value < critChance;
    float critMultiplier = isCrit ? 2.5f : 1f;
    float rawDamage = (baseDmg + elementBonus) * critMultiplier;
    float armorReduction = defender.armor / (defender.armor + 100f);
    float finalDamage = rawDamage * (1f - armorReduction);
    float levelDiff = attacker.level - defender.level;
    float levelBonus = Mathf.Clamp(levelDiff * 0.05f, -0.5f, 0.5f);
    finalDamage *= (1f + levelBonus);
    // ... còn nhiều nữa
    return Mathf.Max(finalDamage, 1f);
}
```

## ✅ Giải pháp (Solution)

**Chuyển method thành một class riêng** — các biến local trở thành field, và bạn có thể thoải mái tách thành các method nhỏ bên trong class đó.

```csharp
// ✅ Tạo class riêng cho logic phức tạp
public class DamageCalculator
{
    private readonly Character attacker;
    private readonly Character defender;
    private readonly Weapon weapon;
    
    private float baseDmg;
    private float elementBonus;
    private float critMultiplier;
    private float rawDamage;
    private float finalDamage;
    
    public DamageCalculator(Character attacker, Character defender, Weapon weapon)
    {
        this.attacker = attacker;
        this.defender = defender;
        this.weapon = weapon;
    }
    
    public float Calculate()
    {
        ComputeBaseDamage();
        ApplyCritical();
        ApplyArmor();
        ApplyLevelBonus();
        return Mathf.Max(finalDamage, 1f);
    }
    
    private void ComputeBaseDamage()
    {
        baseDmg = attacker.strength * weapon.multiplier;
        elementBonus = GetElementBonus(weapon.element, defender.weakness);
    }
    
    private void ApplyCritical()
    {
        float critChance = attacker.luck / 100f + weapon.critBonus;
        critMultiplier = Random.value < critChance ? 2.5f : 1f;
        rawDamage = (baseDmg + elementBonus) * critMultiplier;
    }
    
    private void ApplyArmor()
    {
        float armorReduction = defender.armor / (defender.armor + 100f);
        finalDamage = rawDamage * (1f - armorReduction);
    }
    
    private void ApplyLevelBonus()
    {
        float levelDiff = attacker.level - defender.level;
        float levelBonus = Mathf.Clamp(levelDiff * 0.05f, -0.5f, 0.5f);
        finalDamage *= (1f + levelBonus);
    }
}

// Sử dụng:
float damage = new DamageCalculator(attacker, defender, weapon).Calculate();
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Method dài không thể Extract Method**: Quá nhiều biến local phụ thuộc lẫn nhau
- **Tách responsibility**: Logic phức tạp xứng đáng có class riêng
- **Dễ mở rộng**: Class mới có thể có subclass, interface, unit test
- **Biến local → field**: Chuyển biến local thành field giúp truy cập từ mọi method trong class

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 🧩 **Tách responsibility** | Logic phức tạp có "nhà" riêng |
| 🔧 **Dễ refactor tiếp** | Có thể Extract Method thoải mái trong class mới |
| 🧪 **Dễ unit test** | Test class riêng biệt, không phụ thuộc class gốc |
| 📖 **Code dễ đọc** | Method `Calculate()` cho thấy luồng rõ ràng |

## 📝 Cách thực hiện (How to Refactor)

1. **Tạo class mới** đặt tên theo mục đích của method
2. **Tạo field private** cho mỗi biến local và parameter của method gốc
3. **Tạo constructor** nhận các parameter gốc (và reference đến class gốc nếu cần)
4. **Tạo method chính** (thường đặt tên `Compute()`, `Calculate()`, `Execute()`)
5. **Copy code** từ method gốc vào method chính
6. **Thay method gốc** bằng việc tạo object mới và gọi method chính
7. **Giờ thoải mái Extract Method** trong class mới — không còn vấn đề biến local

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Giải quyết method dài mà Extract Method không xử lý được

## 🎮 Trong Game Dev

### AI Decision Making:
```csharp
// Class riêng cho logic AI phức tạp
public class AIDecisionMaker
{
    private readonly AIAgent agent;
    private readonly List<Enemy> visibleEnemies;
    private readonly EnvironmentData environment;
    
    public AIAction Decide()
    {
        EvaluateThreats();
        ConsiderResources();
        CheckObjectives();
        return SelectBestAction();
    }
}
```

### Procedural Generation:
```csharp
// Class riêng cho dungeon generation
public class DungeonGenerator
{
    private Room[,] grid;
    private List<Room> rooms;
    private List<Corridor> corridors;
    
    public Dungeon Generate(DungeonConfig config)
    {
        InitializeGrid(config);
        PlaceRooms();
        ConnectRooms();
        AddEnemies();
        AddLoot();
        return BuildDungeon();
    }
}
```

### Lưu ý:
- Pattern này rất phổ biến trong game dev: `DamageCalculator`, `PathFinder`, `LootGenerator`
- Kết hợp tốt với **Strategy Pattern** — có thể tạo subclass cho các biến thể

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Remove Assignments to Parameters](./07-remove-assignments-to-parameters.md)
- ➡️ [Substitute Algorithm](./09-substitute-algorithm.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
