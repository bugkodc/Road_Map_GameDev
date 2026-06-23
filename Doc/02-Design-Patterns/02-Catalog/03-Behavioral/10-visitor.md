# Visitor (Bá»™ truy cáº­p)

> ðŸ“– **Nguá»“n:** [Refactoring.Guru â€” Visitor](https://refactoring.guru/design-patterns/visitor) | TÃ¡c giáº£: Alexander Shvets

---

## ðŸŽ¯ Ã Ä‘á»‹nh (Intent)

**Visitor** lÃ  má»™t máº«u thiáº¿t káº¿ thuá»™c nhÃ³m hÃ nh vi (behavioral), cho phÃ©p báº¡n tÃ¡ch biá»‡t cÃ¡c thuáº­t toÃ¡n vÃ  hÃ nh vi khá»i cÃ¡c Ä‘á»‘i tÆ°á»£ng mÃ  chÃºng hoáº¡t Ä‘á»™ng trÃªn Ä‘Ã³, giÃºp báº¡n thÃªm cÃ¡c hoáº¡t Ä‘á»™ng má»›i vÃ o cÃ¡c cáº¥u trÃºc Ä‘á»‘i tÆ°á»£ng hiá»‡n cÃ³ mÃ  khÃ´ng cáº§n sá»­a Ä‘á»•i cÃ¡c lá»›p Ä‘Ã³.

---

## âŒ Váº¥n Ä‘á» (Problem)

HÃ£y tÆ°á»Ÿng tÆ°á»£ng báº¡n Ä‘ang thiáº¿t káº¿ má»™t trÃ² chÆ¡i Ä‘i cáº£nh (Platformer) vá»›i há»‡ thá»‘ng **Váº­t pháº©m bá»• trá»£ (Power-up / Buff System)**:
- Game cá»§a báº¡n cÃ³ má»™t sá»‘ loáº¡i thá»±c thá»ƒ chÃ­nh káº¿ thá»«a tá»« `IEntity`: **Player** (ngÆ°á»i chÆ¡i), **Enemy** (káº» Ä‘á»‹ch), vÃ  **Obstacle** (chÆ°á»›ng ngáº¡i váº­t nhÆ° thÃ¹ng gá»—, tÆ°á»ng Ä‘Ã¡).
- BÃ¢y giá» báº¡n muá»‘n viáº¿t tÃ­nh nÄƒng cho váº­t pháº©m **Freeze Power-up (BÃºa Ä‘Ã³ng bÄƒng)**:
  - Khi tÃ¡c Ä‘á»™ng lÃªn **Player**: ÄÃ³ng bÄƒng di chuyá»ƒn cá»§a ngÆ°á»i chÆ¡i trong 2 giÃ¢y.
  - Khi tÃ¡c Ä‘á»™ng lÃªn **Enemy**: LÃ m cháº­m quÃ¡i váº­t 50% trong 5 giÃ¢y.
  - Khi tÃ¡c Ä‘á»™ng lÃªn **Obstacle**: Khiáº¿n chÆ°á»›ng ngáº¡i váº­t giÃ²n Ä‘i vÃ  dá»… bá»‹ Ä‘áº­p vá»¡.
- Náº¿u báº¡n giáº£i quyáº¿t báº±ng cÃ¡ch thÃªm hÃ m `ApplyFreeze()` trá»±c tiáº¿p vÃ o interface `IEntity` vÃ  triá»ƒn khai trong táº¥t cáº£ cÃ¡c class con, code sáº½ hoáº¡t Ä‘á»™ng. Tuy nhiÃªn, vÃ i tuáº§n sau Designer láº¡i muá»‘n thÃªm: **Lava Power-up (Lá»­a Ä‘á»)**, **Electricity Power-up (SÃ©t Ä‘Ã¡nh)**.
- Báº¡n láº¡i pháº£i má»Ÿ toÃ n bá»™ cÃ¡c file `Player`, `Enemy`, `Obstacle` ra Ä‘á»ƒ viáº¿t thÃªm cÃ¡c hÃ m `ApplyLava()`, `ApplyLightning()`. Äiá»u nÃ y vi pháº¡m nghiÃªm trá»ng nguyÃªn lÃ½ **Open/Closed Principle** (lá»›p thá»±c thá»ƒ bá»‹ chá»‰nh sá»­a liÃªn tá»¥c cho cÃ¡c tÃ­nh nÄƒng khÃ´ng pháº£i cá»‘t lÃµi cá»§a nÃ³).
- Náº¿u dÃ¹ng kiá»ƒm tra kiá»ƒu dá»¯ liá»‡u thá»§ cÃ´ng dáº¡ng `if (entity is Player)`, báº¡n sáº½ táº¡o ra Ä‘á»‘ng code kiá»ƒm tra rÆ°á»m rÃ , máº¥t Ä‘i tÃ­nh hÆ°á»›ng Ä‘á»‘i tÆ°á»£ng vÃ  dá»… bá» sÃ³t khi thÃªm thá»±c thá»ƒ má»›i.

---

## âœ… Giáº£i phÃ¡p (Solution)

Máº«u **Visitor** Ä‘á» xuáº¥t báº¡n Ä‘Ã³ng gÃ³i toÃ n bá»™ logic cá»§a cÃ¡c hÃ nh vi bá»• trá»£ (Power-up) vÃ o cÃ¡c lá»›p riÃªng biá»‡t gá»i lÃ  **Visitors (Bá»™ truy cáº­p)**. Báº£n thÃ¢n cÃ¡c thá»±c thá»ƒ cÅ© chá»‰ cung cáº¥p má»™t Ä‘iá»ƒm mÃ³c ná»‘i nhá» nháº­n Visitor.

1.  Táº¡o interface `IVisitor` Ä‘á»‹nh nghÄ©a cÃ¡c hÃ m truy cáº­p cho tá»«ng loáº¡i thá»±c thá»ƒ cá»¥ thá»ƒ:
    *   `Visit(Player player)`
    *   `Visit(Enemy enemy)`
    *   `Visit(Obstacle obstacle)`
2.  Táº¡o interface `IEntity` khai bÃ¡o phÆ°Æ¡ng thá»©c: `Accept(IVisitor visitor)`.
3.  Trong má»—i thá»±c thá»ƒ cá»¥ thá»ƒ, triá»ƒn khai hÃ m `Accept` cá»±c ká»³ Ä‘Æ¡n giáº£n báº±ng ká»¹ thuáº­t **Double Dispatch**:
    ```csharp
    public void Accept(IVisitor visitor) {
        visitor.Visit(this); // Gá»i Ä‘Ãºng hÃ m overload cá»§a Visitor tÆ°Æ¡ng á»©ng vá»›i kiá»ƒu cá»§a 'this'
    }
    ```
4.  BÃ¢y giá», khi muá»‘n thÃªm hiá»‡u á»©ng BÃºa Ä‘Ã³ng bÄƒng, báº¡n chá»‰ cáº§n táº¡o class `FreezeVisitor` káº¿ thá»«a `IVisitor` vÃ  viáº¿t logic xá»­ lÃ½ riÃªng cho Player, Enemy, Obstacle táº¡i Ä‘Ã³. Báº¡n khÃ´ng cáº§n sá»­a Ä‘á»•i báº¥t ká»³ dÃ²ng code cá»‘t lÃµi nÃ o cá»§a cÃ¡c lá»›p thá»±c thá»ƒ ná»¯a!

---

## ðŸŽ¨ Cáº¥u trÃºc (Structure)

Thay vÃ¬ Ä‘á»c má»™t UML lá»›n ngay tá»« Ä‘áº§u, hÃ£y Ä‘á»c pattern theo 3 lá»›p: **Ã½ tÆ°á»Ÿng nhanh â†’ luá»“ng cháº¡y thá»±c táº¿ â†’ UML rÃºt gá»n**.

### 1. Ã tÆ°á»Ÿng nhanh

```mermaid
flowchart TD
  Visitor["Visitor operation"] --> Enemy["Enemy"]
  Visitor --> Chest["Chest"]
  Visitor --> NPC["NPC"]
  ObjectStructure["Object list"] --> Visitor
```

### 2. Luá»“ng cháº¡y thá»±c táº¿

```mermaid
flowchart TD
  Client["Client chá»n Visitor"] --> List["Object structure"]
  List --> Accept["Element.Accept(visitor)"]
  Accept --> Visit["VisitElement(this)"]
  Visit --> Result["Operation má»›i cháº¡y"]
```

### 3. UML rÃºt gá»n

```mermaid
classDiagram
  direction TB
  class Visitor {
    <<interface>>
    +VisitElementA(ElementA)
    +VisitElementB(ElementB)
  }
  class ConcreteVisitor
  class Element {
    <<interface>>
    +Accept(Visitor)
  }
  class ElementA
  class ElementB
  Visitor <|.. ConcreteVisitor
  Element <|.. ElementA
  Element <|.. ElementB
  ElementA ..> Visitor : accepts
  ElementB ..> Visitor : accepts
```

### CÃ¡ch Ä‘á»c sÆ¡ Ä‘á»“

| ThÃ nh pháº§n | Ã nghÄ©a |
|---|---|
| NhÃ¬n nhanh | ThÃªm operation má»›i báº±ng Visitor thay vÃ¬ sá»­a tá»«ng class element. |
| Luá»“ng chÃ­nh | Double dispatch: element gá»i Ä‘Ãºng VisitX cá»§a visitor. |
| Trong game | Export/save, buff effect, damage calculation qua nhiá»u entity type. |
| MÅ©i tÃªn nÃ©t liá»n | Object Ä‘ang giá»¯ tham chiáº¿u hoáº·c gá»i trá»±c tiáº¿p object khÃ¡c. |
| MÅ©i tÃªn tam giÃ¡c / nÃ©t Ä‘á»©t trong UML | Káº¿ thá»«a hoáº·c thá»±c thi interface. |

> Máº¹o Ä‘á»c nhanh: trÆ°á»›c háº¿t hÃ£y tÃ¬m **Client/Context**, sau Ä‘Ã³ Ä‘i theo mÅ©i tÃªn Ä‘áº¿n interface chÃ­nh. CÃ¡c class cá»¥ thá»ƒ chá»‰ lÃ  biáº¿n thá»ƒ Ä‘Æ°á»£c thay vÃ o khi cháº¡y.

---

## ðŸ’» MÃ£ giáº£ (Pseudocode)

```csharp
// Giao diá»‡n Visitor chá»©a cÃ¡c hÃ m overload cho tá»«ng thá»±c thá»ƒ
interface IVisitor
{
    void VisitConcreteElementA(ElementA element);
    void VisitConcreteElementB(ElementB element);
}

// Giao diá»‡n Element cháº¥p nháº­n Visitor
interface IElement
{
    void Accept(IVisitor visitor);
}

// Element cá»¥ thá»ƒ A
class ElementA : IElement
{
    public void Accept(IVisitor visitor) => visitor.VisitConcreteElementA(this);
    public void FeatureA() => Print("TÃ­nh nÄƒng cá»§a A");
}

// Visitor cá»¥ thá»ƒ xá»­ lÃ½ tÃ­nh nÄƒng má»›i
class ConcreteVisitor : IVisitor
{
    public void VisitConcreteElementA(ElementA element)
    {
        element.FeatureA(); // Thá»±c thi hÃ nh vi má»›i trÃªn A
    }

    public void VisitConcreteElementB(ElementB element)
    {
        // Thá»±c thi hÃ nh vi má»›i trÃªn B
    }
}
```

---

## âš™ï¸ Kháº£ nÄƒng Ã¡p dá»¥ng (Applicability)

DÃ¹ng Visitor khi:
- Báº¡n cáº§n thá»±c hiá»‡n má»™t hoáº¡t Ä‘á»™ng trÃªn táº¥t cáº£ cÃ¡c pháº§n tá»­ cá»§a má»™t cáº¥u trÃºc Ä‘á»‘i tÆ°á»£ng phá»©c táº¡p (nhÆ° má»™t cÃ¢y thá»±c thá»ƒ game, Scene Hierarchy) vÃ  cÃ¡c pháº§n tá»­ nÃ y cÃ³ cÃ¡c lá»›p cá»¥ thá»ƒ khÃ¡c nhau.
- Báº¡n muá»‘n lÃ m sáº¡ch mÃ£ nguá»“n cá»§a cÃ¡c lá»›p thá»±c thá»ƒ báº±ng cÃ¡ch loáº¡i bá» cÃ¡c hÃ nh vi phá»¥ trá»£ khÃ´ng liÃªn quan Ä‘áº¿n nhiá»‡m vá»¥ chÃ­nh cá»§a chÃºng.
- Báº¡n thÆ°á»ng xuyÃªn pháº£i thÃªm cÃ¡c tÃ­nh nÄƒng má»›i cho cÃ¡c lá»›p trong cáº¥u trÃºc Ä‘á»‘i tÆ°á»£ng hiá»‡n cÃ³, nhÆ°ng cáº¥u trÃºc cá»§a cÃ¡c lá»›p thá»±c thá»ƒ nÃ y ráº¥t á»•n Ä‘á»‹nh vÃ  hiáº¿m khi thay Ä‘á»•i (chá»‰ cÃ³ Player, Enemy, Obstacle, khÃ´ng phÃ¡t sinh thÃªm kiá»ƒu thá»±c thá»ƒ má»›i).

---

## ðŸ“ CÃ¡c bÆ°á»›c thá»±c hiá»‡n (How to Implement)

1.  Äá»‹nh nghÄ©a interface `IVisitor` vá»›i táº­p há»£p cÃ¡c phÆ°Æ¡ng thá»©c `Visit...` tÆ°Æ¡ng á»©ng cho má»—i lá»›p Concrete Element cÃ³ sáºµn trong game.
2.  Äá»‹nh nghÄ©a phÆ°Æ¡ng thá»©c `Accept(IVisitor visitor)` trong interface cá»§a Element gá»‘c.
3.  Triá»ƒn khai phÆ°Æ¡ng thá»©c `Accept` trong táº¥t cáº£ cÃ¡c lá»›p Element cá»¥ thá»ƒ. Code triá»ƒn khai luÃ´n lÃ : `visitor.Visit(this);` (trong Ä‘Ã³ `this` tá»± Ä‘á»™ng trá» vá» kiá»ƒu dá»¯ liá»‡u chÃ­nh xÃ¡c cá»§a class hiá»‡n táº¡i nhá» cÆ¡ cháº¿ biÃªn dá»‹ch).
4.  Táº¡o ra cÃ¡c class Concrete Visitor káº¿ thá»«a `IVisitor` Ä‘á»ƒ cÃ i Ä‘áº·t cÃ¡c thuáº­t toÃ¡n/hÃ nh vi má»›i.
5.  Khi cáº§n Ã¡p dá»¥ng hÃ nh vi, Client gá»i: `element.Accept(visitor)`.

---

## âš–ï¸ Æ¯u & NhÆ°á»£c Ä‘iá»ƒm (Pros and Cons)

*   **ðŸ‘ Æ¯u Ä‘iá»ƒm:**
    *   *Open/Closed Principle:* Dá»… dÃ ng thÃªm cÃ¡c hiá»‡u á»©ng/thuáº­t toÃ¡n má»›i (Visitor má»›i) tÃ¡c Ä‘á»™ng lÃªn cÃ¡c Ä‘á»‘i tÆ°á»£ng mÃ  khÃ´ng cáº§n sá»­a Ä‘á»•i cÃ¡c Ä‘á»‘i tÆ°á»£ng Ä‘Ã³.
    *   *Single Responsibility Principle:* Gom táº¥t cáº£ cÃ¡c biáº¿n thá»ƒ cá»§a má»™t thuáº­t toÃ¡n má»›i cho nhiá»u lá»›p vÃ o má»™t nÆ¡i duy nháº¥t.
    *   *Double Dispatch:* Giáº£i quyáº¿t sáº¡ch sáº½ váº¥n Ä‘á» Ä‘a hÃ¬nh theo tham sá»‘ Ä‘áº§u vÃ o mÃ  khÃ´ng cáº§n Ã©p kiá»ƒu (`casting`).
*   **ðŸ‘Ž NhÆ°á»£c Ä‘iá»ƒm:**
    *   *KhÃ³ thay Ä‘á»•i cáº¥u trÃºc Element:* Náº¿u báº¡n thÃªm má»™t loáº¡i thá»±c thá»ƒ má»›i (vÃ­ dá»¥: `Npc`), báº¡n báº¯t buá»™c pháº£i má»Ÿ toÃ n bá»™ cÃ¡c file interface `IVisitor` vÃ  táº¥t cáº£ cÃ¡c Concrete Visitor hiá»‡n cÃ³ Ä‘á»ƒ viáº¿t thÃªm hÃ m `VisitNpc(...)`.

---

## ðŸŽ® Trong Game Dev: C# Code Example (Unity)

DÆ°á»›i Ä‘Ã¢y lÃ  há»‡ thá»‘ng tÆ°Æ¡ng tÃ¡c **Power-up (Freeze & Fire)** tÃ¡c Ä‘á»™ng lÃªn cÃ¡c thá»±c thá»ƒ khÃ¡c nhau trong Unity báº±ng Visitor Pattern:

### 1. Interfaces chÃ­nh
```csharp
// Giao diá»‡n Bá»™ truy cáº­p
public interface IEntityVisitor
{
    void Visit(PlayerCharacter player);
    void Visit(EnemyCharacter enemy);
    void Visit(DestructibleObstacle obstacle);
}

// Giao diá»‡n Thá»±c thá»ƒ cháº¥p nháº­n Bá»™ truy cáº­p
public interface IGameEntity
{
    void Accept(IEntityVisitor visitor);
}
```

### 2. CÃ¡c thá»±c thá»ƒ Element cá»¥ thá»ƒ (Player, Enemy, Obstacle)
```csharp
using UnityEngine;

// 1. Thá»±c thá»ƒ NgÆ°á»i chÆ¡i
public class PlayerCharacter : MonoBehaviour, IGameEntity
{
    public float movementSpeed = 5f;

    public void Accept(IEntityVisitor visitor)
    {
        visitor.Visit(this); // Double Dispatch Ä‘á»‹nh tuyáº¿n Ä‘Ãºng hÃ m cá»§a Visitor
    }

    public void ApplySpeedDebuff(float factor, float duration)
    {
        Debug.Log($"ðŸ‘¤ [Player] Tá»‘c Ä‘á»™ cháº¡y bá»‹ giáº£m Ä‘i {factor * 100}% trong {duration} giÃ¢y!");
    }

    public void BurnPlayer(float damage)
    {
        Debug.Log($"ðŸ‘¤ [Player] Bá»‹ bá»ng lá»­a! Nháº­n {damage} sÃ¡t thÆ°Æ¡ng thiÃªu Ä‘á»‘t.");
    }
}

// 2. Thá»±c thá»ƒ Káº» Ä‘á»‹ch
public class EnemyCharacter : MonoBehaviour, IGameEntity
{
    public void Accept(IEntityVisitor visitor)
    {
        visitor.Visit(this);
    }

    public void FreezeEnemy(float stunDuration)
    {
        Debug.Log($"ðŸ¤– [Enemy] Bá»‹ ÄÃ“NG BÄ‚NG hoÃ n toÃ n! ChoÃ¡ng trong {stunDuration} giÃ¢y.");
    }

    public void BurnEnemy(float damage)
    {
        Debug.Log($"ðŸ¤– [Enemy] Bá»‹ thiÃªu rá»¥i bá»Ÿi lá»­a! Nháº­n {damage} sÃ¡t thÆ°Æ¡ng.");
    }
}

// 3. Thá»±c thá»ƒ ChÆ°á»›ng ngáº¡i váº­t
public class DestructibleObstacle : MonoBehaviour, IGameEntity
{
    public void Accept(IEntityVisitor visitor)
    {
        visitor.Visit(this);
    }

    public void MakeShatterable()
    {
        Debug.Log("ðŸ“¦ [Obstacle] ThÃ¹ng gá»— hÃ³a giÃ²n dá»… vá»¡!");
    }

    public void MeltObstacle()
    {
        Debug.Log("ðŸ“¦ [Obstacle] RÃ o cháº¯n gá»— bá»‹ Ä‘á»‘t chÃ¡y tiÃªu há»§y hoÃ n toÃ n.");
    }
}
```

### 3. CÃ¡c Concrete Visitors (Freeze & Fire Power-up)
```csharp
using UnityEngine;

// 1. Hiá»‡u á»©ng ÄÃ³ng bÄƒng
public class FreezePowerUp : IEntityVisitor
{
    public void Visit(PlayerCharacter player)
    {
        // Player bá»‹ lÃ m cháº­m
        player.ApplySpeedDebuff(0.5f, 2.0f);
    }

    public void Visit(EnemyCharacter enemy)
    {
        // Enemy bá»‹ stun hoÃ n toÃ n
        enemy.FreezeEnemy(3.0f);
    }

    public void Visit(DestructibleObstacle obstacle)
    {
        // ThÃ¹ng gá»— hÃ³a giÃ²n
        obstacle.MakeShatterable();
    }
}

// 2. Hiá»‡u á»©ng Lá»­a chÃ¡y
public class FirePowerUp : IEntityVisitor
{
    private readonly float _damage = 25f;

    public void Visit(PlayerCharacter player)
    {
        player.BurnPlayer(_damage);
    }

    public void Visit(EnemyCharacter enemy)
    {
        enemy.BurnEnemy(_damage * 1.5f); // Lá»­a kháº¯c quÃ¡i váº­t nÃªn gÃ¢y sÃ¡t thÆ°Æ¡ng nhÃ¢n Ä‘Ã´i
    }

    public void Visit(DestructibleObstacle obstacle)
    {
        obstacle.MeltObstacle();
    }
}
```

### 4. Client code (Va cháº¡m váº­t lÃ½ Ã¡p dá»¥ng Visitor)
```csharp
using UnityEngine;

public class PowerUpTrigger : MonoBehaviour
{
    // Cáº¥u hÃ¬nh loáº¡i PowerUp qua Inspector
    public enum PowerUpType { Freeze, Fire }
    public PowerUpType activePowerUp;

    private void OnTriggerEnter(Collider other)
    {
        // TÃ¬m xem Ä‘á»‘i tÆ°á»£ng va cháº¡m cÃ³ thá»±c thi IGameEntity khÃ´ng
        IGameEntity entity = other.GetComponent<IGameEntity>();
        
        if (entity != null)
        {
            IEntityVisitor visitor = null;

            switch (activePowerUp)
            {
                case PowerUpType.Freeze:
                    visitor = new FreezePowerUp();
                    Debug.Log("â„ï¸ KÃ­ch hoáº¡t va cháº¡m ÄÃ“NG BÄ‚NG!");
                    break;
                case PowerUpType.Fire:
                    visitor = new FirePowerUp();
                    Debug.Log("ðŸ”¥ KÃ­ch hoáº¡t va cháº¡m Lá»¬A Äá»Ž!");
                    break;
            }

            if (visitor != null)
            {
                // Thá»±c thi máº«u thiáº¿t káº¿ Visitor
                entity.Accept(visitor);
            }
        }
    }
}
```

---
> ðŸ“š **Nguá»“n gá»‘c:** Ná»™i dung tham kháº£o tá»« [Refactoring.Guru](https://refactoring.guru/) â€” TÃ¡c giáº£: Alexander Shvets, Minh há»a: Dmitry Zhart

| HÆ°á»›ng | LiÃªn káº¿t |
|-------|----------|
| â† Quay láº¡i | [Template Method](./09-template-method.md) |
| â†’ Tiáº¿p theo | [Behavioral Patterns Overview](./00-behavioral-overview.md) |
