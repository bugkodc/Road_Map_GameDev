# Decorator (Trang trÃ­)

> ðŸ“– **Nguá»“n:** [Refactoring.Guru â€” Decorator](https://refactoring.guru/design-patterns/decorator) | TÃ¡c giáº£: Alexander Shvets

---

## ðŸŽ¯ Ã Ä‘á»‹nh (Intent)

**Decorator** lÃ  má»™t máº«u thiáº¿t káº¿ cáº¥u trÃºc cho phÃ©p báº¡n gáº¯n thÃªm cÃ¡c hÃ nh vi, tÃ­nh nÄƒng má»›i vÃ o má»™t Ä‘á»‘i tÆ°á»£ng má»™t cÃ¡ch Ä‘á»™ng (at runtime) báº±ng cÃ¡ch Ä‘áº·t Ä‘á»‘i tÆ°á»£ng nÃ y bÃªn trong cÃ¡c Ä‘á»‘i tÆ°á»£ng "bao bá»c" (wrapper) Ä‘áº·c biá»‡t chá»©a cÃ¡c hÃ nh vi Ä‘Ã³.

---

## âŒ Váº¥n Ä‘á» (Problem)

HÃ£y tÆ°á»Ÿng tÆ°á»£ng báº¡n Ä‘ang viáº¿t mÃ£ cho má»™t há»‡ thá»‘ng VÅ© khÃ­ trong game báº¯n sÃºng sinh tá»“n (Shooter) hoáº·c game RPG.
- Báº¡n cÃ³ má»™t lá»›p vÅ© khÃ­ cÆ¡ báº£n lÃ  `SimpleWeapon` (SÃºng trÆ°á»ng tiÃªu chuáº©n) gÃ¢y ra 20 sÃ¡t thÆ°Æ¡ng.
- NgÆ°á»i chÆ¡i cÃ³ thá»ƒ nháº·t Ä‘Æ°á»£c cÃ¡c phá»¥ kiá»‡n nÃ¢ng cáº¥p (attachments) hoáº·c bÃ¹a phÃ©p (enchantments) Ä‘á»ƒ gáº¯n lÃªn vÅ© khÃ­ nhÆ°:
  *   `Silencer` (á»ng giáº£m thanh): Giáº£m tiáº¿ng á»“n, giáº£m nháº¹ 2 sÃ¡t thÆ°Æ¡ng cÆ¡ báº£n nhÆ°ng tÄƒng Ä‘á»™ chÃ­ máº¡ng.
  *   `FireAmmo` (Äáº¡n lá»­a): ThÃªm hiá»‡u á»©ng thiÃªu Ä‘á»‘t, cá»™ng thÃªm 5 sÃ¡t thÆ°Æ¡ng lá»­a.
  *   `PoisonAmmo` (Äáº¡n Ä‘á»™c): ThÃªm hiá»‡u á»©ng Ä‘á»™c rÃºt mÃ¡u, cá»™ng thÃªm 3 sÃ¡t thÆ°Æ¡ng Ä‘á»™c.
- Náº¿u dÃ¹ng phÆ°Æ¡ng phÃ¡p káº¿ thá»«a, báº¡n sáº½ pháº£i táº¡o ra hÃ ng loáº¡t class Ä‘á»ƒ phá»¥c vá»¥ táº¥t cáº£ cÃ¡c tá»• há»£p láº¯p ghÃ©p cÃ³ thá»ƒ: `SilencedWeapon`, `FireWeapon`, `PoisonWeapon`, `SilencedFireWeapon`, `SilencedPoisonWeapon`, `FirePoisonWeapon`, `SilencedFirePoisonWeapon`...
- Viá»‡c nÃ y dáº«n Ä‘áº¿n sá»± bÃ¹ng ná»• sá»‘ lÆ°á»£ng lá»›p con (subclass explosion) khÃ´ng thá»ƒ kiá»ƒm soÃ¡t. Äá»“ng thá»i, báº¡n khÃ´ng thá»ƒ dá»… dÃ ng thÃ¡o láº¯p phá»¥ kiá»‡n hoáº·c thay Ä‘á»•i hiá»‡u á»©ng vÅ© khÃ­ ngay trong tráº­n Ä‘áº¥u khi ngÆ°á»i chÆ¡i nháº¥n nÃºt thÃ¡o phá»¥ kiá»‡n.

---

## âœ… Giáº£i phÃ¡p (Solution)

Máº«u **Decorator** Ä‘á» xuáº¥t thay tháº¿ viá»‡c káº¿ thá»«a trá»±c tiáº¿p báº±ng cÃ¡ch sá»­ dá»¥ng **Bao bá»c (Wrapping)**.

1.  **Component (`IWeapon`):** Äá»‹nh nghÄ©a má»™t interface chung cho cáº£ vÅ© khÃ­ cÆ¡ báº£n vÃ  cÃ¡c phá»¥ kiá»‡n trang trÃ­.
2.  **Concrete Component (`SimpleWeapon`):** VÅ© khÃ­ thÃ´, cÆ¡ báº£n ban Ä‘áº§u thá»±c thi `IWeapon`.
3.  **Base Decorator (`WeaponDecorator`):** Thá»±c thi interface `IWeapon` vÃ  chá»©a má»™t tham chiáº¿u Ä‘áº¿n Ä‘á»‘i tÆ°á»£ng `IWeapon` khÃ¡c. Lá»›p nÃ y Ä‘Ã³ng vai trÃ² chuyá»ƒn tiáº¿p má»i cuá»™c gá»i hÃ m (nhÆ° tÃ­nh sÃ¡t thÆ°Æ¡ng, láº¥y mÃ´ táº£) Ä‘áº¿n Ä‘á»‘i tÆ°á»£ng Ä‘Æ°á»£c bao bá»c bÃªn trong.
4.  **Concrete Decorators (`FireEnchantment`, `SilencerDecorator`):** Ghi Ä‘Ã¨ cÃ¡c hÃ m cá»§a Decorator cha Ä‘á»ƒ cá»™ng thÃªm logic riÃªng (vÃ­ dá»¥: láº¥y sÃ¡t thÆ°Æ¡ng cá»§a sÃºng bÃªn trong rá»“i cá»™ng thÃªm sÃ¡t thÆ°Æ¡ng nguyÃªn tá»‘ lá»­a).

Khi cháº¡y game, ta cÃ³ thá»ƒ láº¯p rÃ¡p vÅ© khÃ­ nhÆ° nhá»¯ng lá»›p vá» hÃ nh tÃ¢y lá»“ng vÃ o nhau:
*   Báº¯t Ä‘áº§u vá»›i: `IWeapon myWeapon = new SimpleWeapon();` (SÃ¡t thÆ°Æ¡ng: 20)
*   Gáº¯n thÃªm giáº£m thanh: `myWeapon = new SilencerDecorator(myWeapon);` (SÃ¡t thÆ°Æ¡ng: 20 - 2 = 18)
*   Gáº¯n thÃªm Ä‘áº¡n lá»­a: `myWeapon = new FireEnchantment(myWeapon);` (SÃ¡t thÆ°Æ¡ng: 18 + 5 = 23)

Má»—i khi ta gá»i hÃ m `myWeapon.GetDamage()`, cuá»™c gá»i sáº½ cháº¡y xuyÃªn suá»‘t qua táº¥t cáº£ cÃ¡c lá»›p Decorator Ä‘á»ƒ tÃ­nh ra káº¿t quáº£ cuá»‘i cÃ¹ng.

---

## ðŸŽ¨ Cáº¥u trÃºc (Structure)

Thay vÃ¬ Ä‘á»c má»™t UML lá»›n ngay tá»« Ä‘áº§u, hÃ£y Ä‘á»c pattern theo 3 lá»›p: **Ã½ tÆ°á»Ÿng nhanh â†’ luá»“ng cháº¡y thá»±c táº¿ â†’ UML rÃºt gá»n**.

### 1. Ã tÆ°á»Ÿng nhanh

```mermaid
flowchart TD
  Weapon["Base weapon"] --> Silencer["Silencer decorator"]
  Silencer --> Fire["Fire decorator"]
  Fire --> Result["Weapon cÃ³ nhiá»u hiá»‡u á»©ng"]
```

### 2. Luá»“ng cháº¡y thá»±c táº¿

```mermaid
flowchart TD
  Client["Client gá»i GetDamage()"] --> Outer["Decorator ngoÃ i cÃ¹ng"]
  Outer --> Inner["Chuá»—i wrappee"]
  Inner --> Base["Base weapon"]
  Base --> Result["Damage gá»‘c + hiá»‡u á»©ng"]
```

### 3. UML rÃºt gá»n

```mermaid
classDiagram
  direction TB
  class Component {
    <<interface>>
    +Operation()
  }
  class ConcreteComponent
  class BaseDecorator {
    -wrappee Component
    +Operation()
  }
  class ConcreteDecoratorA
  class ConcreteDecoratorB
  Component <|.. ConcreteComponent
  Component <|.. BaseDecorator
  BaseDecorator o--> Component
  BaseDecorator <|-- ConcreteDecoratorA
  BaseDecorator <|-- ConcreteDecoratorB
```

### CÃ¡ch Ä‘á»c sÆ¡ Ä‘á»“

| ThÃ nh pháº§n | Ã nghÄ©a |
|---|---|
| NhÃ¬n nhanh | Decorator bá»c object Ä‘á»ƒ thÃªm behavior runtime. |
| Luá»“ng chÃ­nh | Call Ä‘i tá»« lá»›p bá»c ngoÃ i vÃ o trong rá»“i cá»™ng logic khi tráº£ ra. |
| Trong game | Power-up, buff/debuff, weapon attachment. |
| MÅ©i tÃªn nÃ©t liá»n | Object Ä‘ang giá»¯ tham chiáº¿u hoáº·c gá»i trá»±c tiáº¿p object khÃ¡c. |
| MÅ©i tÃªn tam giÃ¡c / nÃ©t Ä‘á»©t trong UML | Káº¿ thá»«a hoáº·c thá»±c thi interface. |

> Máº¹o Ä‘á»c nhanh: trÆ°á»›c háº¿t hÃ£y tÃ¬m **Client/Context**, sau Ä‘Ã³ Ä‘i theo mÅ©i tÃªn Ä‘áº¿n interface chÃ­nh. CÃ¡c class cá»¥ thá»ƒ chá»‰ lÃ  biáº¿n thá»ƒ Ä‘Æ°á»£c thay vÃ o khi cháº¡y.

---

## ðŸ’» MÃ£ giáº£ (Pseudocode)

```csharp
// Giao diá»‡n Component
interface IComponent
{
    string Operation();
}

// Lá»›p Ä‘á»‘i tÆ°á»£ng gá»‘c
class ConcreteComponent : IComponent
{
    public string Operation() => "Gá»‘c";
}

// Decorator cÆ¡ báº£n
abstract class Decorator : IComponent
{
    protected IComponent _component;

    public Decorator(IComponent component)
    {
        this._component = component;
    }

    public virtual string Operation() => _component.Operation();
}

// Bá»™ trang trÃ­ cá»¥ thá»ƒ A
class ConcreteDecoratorA : Decorator
{
    public ConcreteDecoratorA(IComponent comp) : base(comp) {}

    public override string Operation()
    {
        return $"Trang trÃ­ A({base.Operation()})";
    }
}
```

---

## âš™ï¸ Kháº£ nÄƒng Ã¡p dá»¥ng (Applicability)

DÃ¹ng Decorator khi:
- Báº¡n muá»‘n thÃªm cÃ¡c thuá»™c tÃ­nh hoáº·c hÃ nh vi má»›i cho cÃ¡c Ä‘á»‘i tÆ°á»£ng má»™t cÃ¡ch Ä‘á»™ng mÃ  khÃ´ng lÃ m áº£nh hÆ°á»Ÿng Ä‘áº¿n cÃ¡c Ä‘á»‘i tÆ°á»£ng khÃ¡c.
- Báº¡n cáº§n má»™t giáº£i phÃ¡p thay tháº¿ linh hoáº¡t cho cÆ¡ cháº¿ káº¿ thá»«a vá»‘n Ä‘ang gáº·p tÃ¬nh tráº¡ng bÃ¹ng ná»• sá»‘ lÆ°á»£ng lá»›p con quÃ¡ má»©c.
- Äiá»ƒn hÃ¬nh trong game: Há»‡ thá»‘ng trang trÃ­ bÃ¹a phÃ©p vÅ© khÃ­, há»‡ thá»‘ng Buff/Debuff cá»§a nhÃ¢n váº­t (má»—i buff lÃ  má»™t decorator bao bá»c chá»‰ sá»‘ nhÃ¢n váº­t), há»‡ thá»‘ng nÃ¢ng cáº¥p chá»‰ sá»‘ trang bá»‹.

---

## ðŸ“ CÃ¡c bÆ°á»›c thá»±c hiá»‡n (How to Implement)

1.  Äá»‹nh nghÄ©a interface chung (Component) Ä‘áº¡i diá»‡n cho thá»±c thá»ƒ cá»‘t lÃµi vÃ  cÃ¡c bá»™ trang trÃ­.
2.  Táº¡o lá»›p cá»¥ thá»ƒ (Concrete Component) thá»±c thi interface nÃ y Ä‘á»ƒ lÃ m Ä‘á»‘i tÆ°á»£ng ná»n táº£ng.
3.  Táº¡o lá»›p Base Decorator thá»±c thi interface Component vÃ  chá»©a má»™t trÆ°á»ng tham chiáº¿u Ä‘áº¿n kiá»ƒu Component Ä‘Ã³.
4.  á»¦y quyá»n táº¥t cáº£ cÃ¡c phÆ°Æ¡ng thá»©c cá»§a Component sang Ä‘á»‘i tÆ°á»£ng Ä‘Æ°á»£c wrap bÃªn trong.
5.  Táº¡o cÃ¡c Concrete Decorator káº¿ thá»«a tá»« Base Decorator. á»ž má»—i phÆ°Æ¡ng thá»©c cáº§n trang trÃ­, hÃ£y gá»i phÆ°Æ¡ng thá»©c tÆ°Æ¡ng tá»± cá»§a lá»›p cha (hoáº·c Ä‘á»‘i tÆ°á»£ng bÃªn trong) rá»“i thá»±c hiá»‡n cá»™ng dá»“n/bá»• sung logic má»›i.

---

## âš–ï¸ Æ¯u & NhÆ°á»£c Ä‘iá»ƒm (Pros and Cons)

*   **ðŸ‘ Æ¯u Ä‘iá»ƒm:**
    *   *Linh hoáº¡t vÆ°á»£t trá»™i:* CÃ³ thá»ƒ káº¿t há»£p nhiá»u hiá»‡u á»©ng/phá»¥ kiá»‡n khÃ¡c nhau cÃ¹ng má»™t lÃºc táº¡i runtime (vÃ­ dá»¥: sÃºng vá»«a giáº£m thanh vá»«a báº¯n Ä‘áº¡n Ä‘á»™c).
    *   *Single Responsibility Principle:* Chia nhá» cÃ¡c hiá»‡u á»©ng (lá»­a, Ä‘á»™c, giáº£m thanh) ra thÃ nh cÃ¡c class riÃªng biá»‡t.
    *   *TrÃ¡nh káº¿ thá»«a tÄ©nh:* Cáº¯t giáº£m tá»‘i Ä‘a sá»‘ lÆ°á»£ng class con cáº§n duy trÃ¬.
*   **ðŸ‘Ž NhÆ°á»£c Ä‘iá»ƒm:**
    *   KhÃ³ gá»¡ bá» má»™t Decorator cá»¥ thá»ƒ á»Ÿ giá»¯a chuá»—i bao bá»c (vÃ­ dá»¥: muá»‘n thÃ¡o á»‘ng giáº£m thanh nhÆ°ng giá»¯ nguyÃªn Ä‘áº¡n lá»­a vÃ  Ä‘áº¡n Ä‘á»™c).
    *   Thá»© tá»± lá»“ng ghÃ©p Decorator cÃ³ thá»ƒ áº£nh hÆ°á»Ÿng Ä‘áº¿n logic (vÃ­ dá»¥: nhÃ¢n sÃ¡t thÆ°Æ¡ng trÆ°á»›c hay cá»™ng sÃ¡t thÆ°Æ¡ng trÆ°á»›c).
    *   MÃ£ nguá»“n cÃ³ thá»ƒ khÃ³ debug ban Ä‘áº§u vÃ¬ Ä‘á»‘i tÆ°á»£ng cuá»‘i cÃ¹ng thá»±c táº¿ lÃ  má»™t chuá»—i lá»“ng ghÃ©p sÃ¢u.

---

## ðŸŽ® Trong Game Dev: C# Code Example (Unity)

DÆ°á»›i Ä‘Ã¢y lÃ  cÃ¡ch xÃ¢y dá»±ng há»‡ thá»‘ng Trang trÃ­ VÅ© khÃ­ vá»›i hiá»‡u á»©ng Äáº¡n lá»­a vÃ  á»ng giáº£m thanh trong Unity:

### 1. Interface Component vÃ  Concrete Component
```csharp
namespace DesignPatterns.Decorator
{
    // Interface chung cho táº¥t cáº£ cÃ¡c loáº¡i vÅ© khÃ­ vÃ  phá»¥ kiá»‡n nÃ¢ng cáº¥p
    public interface IWeapon
    {
        string GetDescription();
        float GetDamage();
    }

    // VÅ© khÃ­ cÆ¡ báº£n ban Ä‘áº§u
    public class SimpleWeapon : IWeapon
    {
        private string weaponName;
        private float baseDamage;

        public SimpleWeapon(string name, float damage)
        {
            weaponName = name;
            baseDamage = damage;
        }

        public string GetDescription() => weaponName;
        public float GetDamage() => baseDamage;
    }
}
```

### 2. Base Decorator (WeaponDecorator)
```csharp
namespace DesignPatterns.Decorator
{
    // Lá»›p cÆ¡ sá»Ÿ cho má»i phá»¥ kiá»‡n trang trÃ­ vÅ© khÃ­
    public abstract class WeaponDecorator : IWeapon
    {
        protected IWeapon wrappedWeapon;

        protected WeaponDecorator(IWeapon weapon)
        {
            this.wrappedWeapon = weapon;
        }

        // Chuyá»ƒn tiáº¿p cuá»™c gá»i Ä‘áº¿n vÅ© khÃ­ Ä‘Æ°á»£c bao bá»c bÃªn trong
        public virtual string GetDescription()
        {
            return wrappedWeapon.GetDescription();
        }

        public virtual float GetDamage()
        {
            return wrappedWeapon.GetDamage();
        }
    }
}
```

### 3. Concrete Decorators (CÃ¡c phá»¥ kiá»‡n cá»¥ thá»ƒ)
```csharp
namespace DesignPatterns.Decorator
{
    // Phá»¥ kiá»‡n: á»ng giáº£m thanh (Silencer)
    public class SilencerDecorator : WeaponDecorator
    {
        public SilencerDecorator(IWeapon weapon) : base(weapon) { }

        public override string GetDescription()
        {
            return base.GetDescription() + " + á»ng Giáº£m Thanh (Silencer)";
        }

        public override float GetDamage()
        {
            // Giáº£m thanh lÃ m giáº£m nháº¹ sÃ¡t thÆ°Æ¡ng cÆ¡ báº£n Ä‘i 2 Ä‘Æ¡n vá»‹
            return base.GetDamage() - 2f;
        }
    }

    // NÃ¢ng cáº¥p: Äáº¡n Lá»­a (Fire Enchantment)
    public class FireEnchantment : WeaponDecorator
    {
        public FireEnchantment(IWeapon weapon) : base(weapon) { }

        public override string GetDescription()
        {
            return base.GetDescription() + " & Äáº¡n Lá»­a (Fire)";
        }

        public override float GetDamage()
        {
            // Cá»™ng thÃªm 5 sÃ¡t thÆ°Æ¡ng lá»­a
            return base.GetDamage() + 5f;
        }
    }
}
```

### 4. Client Test Component trong Unity
```csharp
using UnityEngine;

namespace DesignPatterns.Decorator
{
    public class WeaponModTest : MonoBehaviour
    {
        private void Start()
        {
            // 1. Táº¡o kháº©u sÃºng trÆ°á»ng M4A1 cÆ¡ báº£n
            IWeapon myRifle = new SimpleWeapon("SÃºng trÆ°á»ng M4A1", 20f);
            PrintWeaponInfo(myRifle);

            // 2. Gáº¯n thÃªm á»‘ng giáº£m thanh (Silencer) vÃ o kháº©u M4A1
            Debug.Log("\n--- NgÆ°á»i chÆ¡i gáº¯n thÃªm á»ng giáº£m thanh ---");
            myRifle = new SilencerDecorator(myRifle);
            PrintWeaponInfo(myRifle);

            // 3. PhÃ¹ phÃ©p thÃªm Äáº¡n lá»­a (Fire Enchantment) lÃªn kháº©u M4A1 Ä‘ang cÃ³ giáº£m thanh
            Debug.Log("\n--- NgÆ°á»i chÆ¡i náº¡p thÃªm Äáº¡n lá»­a ---");
            myRifle = new FireEnchantment(myRifle);
            PrintWeaponInfo(myRifle);

            // 4. CÃ³ thá»ƒ lá»“ng ghÃ©p thÃªm má»™t lá»›p Ä‘áº¡n lá»­a ná»¯a náº¿u game cho phÃ©p stack hiá»‡u á»©ng
            Debug.Log("\n--- NgÆ°á»i chÆ¡i stack thÃªm má»™t lá»›p Äáº¡n lá»­a ná»¯a ---");
            myRifle = new FireEnchantment(myRifle);
            PrintWeaponInfo(myRifle);
        }

        private void PrintWeaponInfo(IWeapon weapon)
        {
            Debug.Log($"VÅ© khÃ­: {weapon.GetDescription()}");
            Debug.Log($"Tá»•ng sÃ¡t thÆ°Æ¡ng: {weapon.GetDamage()} DPS");
        }
    }
}
```

---

> ðŸ“š **Nguá»“n gá»‘c:** Ná»™i dung tham kháº£o tá»« [Refactoring.Guru](https://refactoring.guru/) â€” TÃ¡c giáº£: Alexander Shvets, Minh há»a: Dmitry Zhart

| HÆ°á»›ng | LiÃªn káº¿t |
|-------|----------|
| â† Quay láº¡i | [Composite](./03-composite.md) |
| â†’ Tiáº¿p theo | [Facade](./05-facade.md) |
