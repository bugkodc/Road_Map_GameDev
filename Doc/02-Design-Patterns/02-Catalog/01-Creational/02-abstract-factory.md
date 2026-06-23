# Abstract Factory (NhÃ  mÃ¡y Trá»«u tÆ°á»£ng)

> ðŸ“– **Nguá»“n:** [Refactoring.Guru â€” Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory) | TÃ¡c giáº£: Alexander Shvets

---

## ðŸŽ¯ Ã Ä‘á»‹nh (Intent)

**Abstract Factory** lÃ  má»™t máº«u thiáº¿t káº¿ thuá»™c nhÃ³m khá»Ÿi táº¡o (creational), cung cáº¥p cÆ¡ cháº¿ khá»Ÿi táº¡o má»™t **há» (family) cÃ¡c Ä‘á»‘i tÆ°á»£ng cÃ³ liÃªn quan hoáº·c phá»¥ thuá»™c láº«n nhau** mÃ  khÃ´ng cáº§n chá»‰ Ä‘á»‹nh rÃµ rÃ ng cÃ¡c concrete class cá»¥ thá»ƒ cá»§a chÃºng.

---

## âŒ Váº¥n Ä‘á» (Problem)

HÃ£y tÆ°á»Ÿng tÆ°á»£ng báº¡n Ä‘ang viáº¿t má»™t tá»±a game tháº¿ giá»›i má»Ÿ (Sandbox) cÃ³ nhiá»u vÃ¹ng Ä‘áº¥t sinh thÃ¡i khÃ¡c nhau (**Biomes**):
- VÃ¹ng Ä‘áº¥t **Rá»«ng ráº­m (Forest Biome)** cÃ³: *CÃ¢y Sá»“i (Oak Tree)*, *ÄÃ¡ RÃªu (Mossy Rock)* vÃ  *Tháº£m Cá» xanh (Grass)*.
- VÃ¹ng Ä‘áº¥t **Sa máº¡c (Desert Biome)** cÃ³: *CÃ¢y XÆ°Æ¡ng Rá»“ng (Cactus)*, *ÄÃ¡ CÃ¡t (Sandstone)* vÃ  *Äáº¥t CÃ¡t (Sand)*.
- Báº¡n cáº§n má»™t há»‡ thá»‘ng táº¡o báº£n Ä‘á»“ (Map Generator) tá»± Ä‘á»™ng sinh ngáº«u nhiÃªn thá»±c váº­t vÃ  Ä‘áº¥t Ä‘Ã¡ khi ngÆ°á»i chÆ¡i di chuyá»ƒn.
- **Váº¥n Ä‘á» xáº£y ra:** Náº¿u báº¡n viáº¿t code gÃ¡n thá»§ cÃ´ng tá»«ng class:
  ```csharp
  if (currentBiome == BiomeType.Forest) {
      Instantiate(oakTreePrefab);
      Instantiate(mossyRockPrefab);
  }
  ```
  Code cá»§a báº¡n sáº½ nhanh chÃ³ng trá»Ÿ nÃªn cháº±ng chá»‹t cÃ¡c cÃ¢u lá»‡nh ráº½ nhÃ¡nh khá»•ng lá»“. 
- HÆ¡n tháº¿ ná»¯a, sáº½ ráº¥t dá»… xáº£y ra lá»—i "lá»‡ch theme" (vÃ­ dá»¥: Map Generator vÃ´ tÃ¬nh sinh ra má»™t cÃ¢y XÆ°Æ¡ng Rá»“ng Sa Máº¡c náº±m giá»¯a Tháº£m Cá» Xanh cá»§a Rá»«ng Ráº­m) do thiáº¿u tÃ­nh Ä‘á»“ng bá»™ cá»§a há» sáº£n pháº©m. Khi thÃªm má»™t Biome má»›i (vÃ­ dá»¥: BÄƒng Tuyáº¿t), báº¡n pháº£i láº­t tung toÃ n bá»™ code Map Generator ra Ä‘á»ƒ sá»­a.

---

## âœ… Giáº£i phÃ¡p (Solution)

Máº«u **Abstract Factory** Ä‘á» xuáº¥t:

1.  Äá»‹nh nghÄ©a cÃ¡c interface riÃªng biá»‡t cho tá»«ng loáº¡i thá»±c thá»ƒ trong há»‡ thá»‘ng: `ITree` (CÃ¢y), `IRock` (ÄÃ¡), `IGround` (Äáº¥t).
2.  Táº¥t cáº£ cÃ¡c biáº¿n thá»ƒ cá»¥ thá»ƒ sáº½ thá»±c thi cÃ¡c interface nÃ y (vÃ­ dá»¥: `OakTree` vÃ  `Cactus` Ä‘á»u thá»±c thi `ITree`).
3.  Táº¡o ra interface **Abstract Factory** lÃ  `IBiomeFactory` khai bÃ¡o cÃ¡c phÆ°Æ¡ng thá»©c táº¡o láº­p cho tá»«ng sáº£n pháº©m trong há»:
    ```csharp
    interface IBiomeFactory {
        ITree CreateTree();
        IRock CreateRock();
        IGround CreateGround();
    }
    ```
4.  Táº¡o cÃ¡c concrete factory chuyÃªn biá»‡t cho tá»«ng Biome:
    - `ForestBiomeFactory` chá»‰ táº¡o ra `OakTree`, `MossyRock`, `Grass`.
    - `DesertBiomeFactory` chá»‰ táº¡o ra `Cactus`, `Sandstone`, `Sand`.

BÃ¢y giá», class Map Generator chá»‰ cáº§n giá»¯ má»™t tham chiáº¿u Ä‘áº¿n interface `IBiomeFactory` chung. Khi ngÆ°á»i chÆ¡i bÆ°á»›c vÃ o vÃ¹ng Forest, Map Generator Ä‘Æ°á»£c gáº¯n `ForestBiomeFactory` vÃ  tá»± Ä‘á»™ng sinh ra Ä‘Ãºng há» thá»±c váº­t Rá»«ng ráº­m má»™t cÃ¡ch hoÃ n háº£o, khÃ´ng bao giá» lo lá»‡ch theme!

---

## ðŸŽ¨ Cáº¥u trÃºc (Structure)

Thay vÃ¬ Ä‘á»c má»™t UML lá»›n ngay tá»« Ä‘áº§u, hÃ£y Ä‘á»c pattern theo 3 lá»›p: **Ã½ tÆ°á»Ÿng nhanh â†’ luá»“ng cháº¡y thá»±c táº¿ â†’ UML rÃºt gá»n**.

### 1. Ã tÆ°á»Ÿng nhanh

```mermaid
flowchart TB
  Client["Map Generator / Client"] --> Factory["IBiomeFactory"]
  Factory --> Forest["ForestFactory"]
  Factory --> Desert["DesertFactory"]
  Forest --> FFamily["OakTree + MossyRock + Grass"]
  Desert --> DFamily["Cactus + Sandstone + Sand"]
```

### 2. Luá»“ng cháº¡y thá»±c táº¿

```mermaid
flowchart TD
  A["Chá»n biome"] --> B["Inject factory phÃ¹ há»£p"]
  B --> C["createTree()"]
  B --> D["createRock()"]
  B --> E["createGround()"]
  C --> F["Tree cÃ¹ng family"]
  D --> G["Rock cÃ¹ng family"]
  E --> H["Ground cÃ¹ng family"]
```

### 3. UML rÃºt gá»n

```mermaid
classDiagram
  direction TB
  class AbstractFactory {
    <<interface>>
    +CreateProductA() ProductA
    +CreateProductB() ProductB
  }
  class ConcreteFactory1
  class ConcreteFactory2
  class ProductA {
    <<interface>>
  }
  class ProductB {
    <<interface>>
  }
  AbstractFactory <|.. ConcreteFactory1
  AbstractFactory <|.. ConcreteFactory2
  ConcreteFactory1 ..> ProductA : creates A1
  ConcreteFactory1 ..> ProductB : creates B1
  ConcreteFactory2 ..> ProductA : creates A2
  ConcreteFactory2 ..> ProductB : creates B2
```

### CÃ¡ch Ä‘á»c sÆ¡ Ä‘á»“

| ThÃ nh pháº§n | Ã nghÄ©a |
|---|---|
| NhÃ¬n nhanh | Má»—i factory táº¡o nguyÃªn má»™t family object Ä‘á»“ng bá»™. |
| Luá»“ng chÃ­nh | Client chá»n factory má»™t láº§n, sau Ä‘Ã³ gá»i cÃ¡c hÃ m táº¡o qua interface. |
| Trong game | Forest biome khÃ´ng bao giá» láº«n cactus/sand cá»§a Desert biome. |
| MÅ©i tÃªn nÃ©t liá»n | Object Ä‘ang giá»¯ tham chiáº¿u hoáº·c gá»i trá»±c tiáº¿p object khÃ¡c. |
| MÅ©i tÃªn tam giÃ¡c / nÃ©t Ä‘á»©t trong UML | Káº¿ thá»«a hoáº·c thá»±c thi interface. |

> Máº¹o Ä‘á»c nhanh: trÆ°á»›c háº¿t hÃ£y tÃ¬m **Client/Context**, sau Ä‘Ã³ Ä‘i theo mÅ©i tÃªn Ä‘áº¿n interface chÃ­nh. CÃ¡c class cá»¥ thá»ƒ chá»‰ lÃ  biáº¿n thá»ƒ Ä‘Æ°á»£c thay vÃ o khi cháº¡y.

---

## ðŸ’» MÃ£ giáº£ (Pseudocode)

```csharp
// DÃ²ng sáº£n pháº©m A
interface IAbstractProductA { string UsefulFunctionA(); }
class ConcreteProductA1 : IAbstractProductA { public string UsefulFunctionA() => "Sáº£n pháº©m A1"; }
class ConcreteProductA2 : IAbstractProductA { public string UsefulFunctionA() => "Sáº£n pháº©m A2"; }

// DÃ²ng sáº£n pháº©m B
interface IAbstractProductB { string UsefulFunctionB(); }
class ConcreteProductB1 : IAbstractProductB { public string UsefulFunctionB() => "Sáº£n pháº©m B1"; }
class ConcreteProductB2 : IAbstractProductB { public string UsefulFunctionB() => "Sáº£n pháº©m B2"; }

// Abstract Factory Ä‘á»‹nh nghÄ©a cÃ¡c hÃ m táº¡o há» sáº£n pháº©m
interface IAbstractFactory
{
    IAbstractProductA CreateProductA();
    IAbstractProductB CreateProductB();
}

// CÃ¡c Concrete Factory táº¡o há» sáº£n pháº©m tÆ°Æ¡ng thÃ­ch
class ConcreteFactory1 : IAbstractFactory
{
    public IAbstractProductA CreateProductA() => new ConcreteProductA1();
    public IAbstractProductB CreateProductB() => new ConcreteProductB1();
}

class ConcreteFactory2 : IAbstractFactory
{
    public IAbstractProductA CreateProductA() => new ConcreteProductA2();
    public IAbstractProductB CreateProductB() => new ConcreteProductB2();
}
```

---

## âš™ï¸ Kháº£ nÄƒng Ã¡p dá»¥ng (Applicability)

DÃ¹ng Abstract Factory khi:
- Code cá»§a báº¡n cáº§n lÃ m viá»‡c vá»›i nhiá»u há» sáº£n pháº©m liÃªn quan khÃ¡c nhau, nhÆ°ng báº¡n khÃ´ng muá»‘n code phá»¥ thuá»™c trá»±c tiáº¿p vÃ o cÃ¡c concrete class cá»¥ thá»ƒ cá»§a chÃºng Ä‘á»ƒ dá»… má»Ÿ rá»™ng trong tÆ°Æ¡ng lai.
- Há»‡ thá»‘ng cáº§n Ä‘áº£m báº£o tÃ­nh tÆ°Æ¡ng thÃ­ch vÃ  Ä‘á»“ng bá»™ tuyá»‡t Ä‘á»‘i giá»¯a cÃ¡c Ä‘á»‘i tÆ°á»£ng trong cÃ¹ng má»™t nhÃ³m (vÃ­ dá»¥: cÃ¹ng má»™t theme UI, cÃ¹ng má»™t vÃ¹ng sinh thÃ¡i).

---

## ðŸ“ CÃ¡c bÆ°á»›c thá»±c hiá»‡n (How to Implement)

1.  XÃ¢y dá»±ng ma tráº­n phÃ¢n loáº¡i sáº£n pháº©m: Cá»™t dá»c lÃ  loáº¡i sáº£n pháº©m (Tree, Rock, Ground), hÃ ng ngang lÃ  cÃ¡c biáº¿n thá»ƒ theme (Forest, Desert, Snow).
2.  Khai bÃ¡o interface chung cho táº¥t cáº£ cÃ¡c loáº¡i sáº£n pháº©m.
3.  Khai bÃ¡o interface Abstract Factory vá»›i táº­p há»£p cÃ¡c phÆ°Æ¡ng thá»©c táº¡o láº­p cho táº¥t cáº£ cÃ¡c loáº¡i sáº£n pháº©m trá»«u tÆ°á»£ng.
4.  Hiá»‡n thá»±c cÃ¡c Concrete Factory tÆ°Æ¡ng á»©ng cho tá»«ng biáº¿n thá»ƒ á»Ÿ hÃ ng ngang, ghi Ä‘Ã¨ cÃ¡c hÃ m táº¡o Ä‘á»ƒ tráº£ vá» Ä‘Ãºng concrete class cá»§a biáº¿n thá»ƒ Ä‘Ã³.
5.  Trong client code, inject concrete factory tÆ°Æ¡ng á»©ng vÃ o Ä‘á»ƒ sá»­ dá»¥ng thÃ´ng qua interface Abstract Factory.

---

## âš–ï¸ Æ¯u & NhÆ°á»£c Ä‘iá»ƒm (Pros and Cons)

*   **ðŸ‘ Æ¯u Ä‘iá»ƒm:**
    *   *TÃ­nh Ä‘á»“ng bá»™ tuyá»‡t Ä‘á»‘i:* Báº£o Ä‘áº£m cÃ¡c sáº£n pháº©m táº¡o ra tá»« cÃ¹ng má»™t factory luÃ´n tÆ°Æ¡ng thÃ­ch vÃ  khá»›p theme 100% vá»›i nhau.
    *   *TrÃ¡nh Coupling:* Client code hoÃ n toÃ n Ä‘á»™c láº­p vá»›i cÃ¡c concrete class cá»¥ thá»ƒ cá»§a sáº£n pháº©m.
    *   *Open/Closed Principle:* Dá»… dÃ ng bá»• sung má»™t há» sáº£n pháº©m má»›i (vÃ­ dá»¥: SnowBiome) mÃ  khÃ´ng cáº§n chá»‰nh sá»­a code lÃµi cá»§a Map Generator.
*   **ðŸ‘Ž NhÆ°á»£c Ä‘iá»ƒm:**
    *   Kiáº¿n trÃºc code trá»Ÿ nÃªn khÃ¡ cá»“ng ká»nh, phá»©c táº¡p do phÃ¡t sinh quÃ¡ nhiá»u interface vÃ  class má»›i cho tá»«ng loáº¡i thá»±c thá»ƒ.

---

## ðŸŽ® Trong Game Dev: C# Code Example (Unity)

Hiá»‡n thá»±c há»‡ thá»‘ng **Biome Asset Spawner** trong tháº¿ giá»›i má»Ÿ:

### 1. Khai bÃ¡o cÃ¡c dÃ²ng sáº£n pháº©m trá»«u tÆ°á»£ng vÃ  cá»¥ thá»ƒ
```csharp
using UnityEngine;

// 1. DÃ²ng sáº£n pháº©m CÃ¢y (Tree)
public interface ITree { void Grow(); }

public class OakTree : ITree
{
    public void Grow() => Debug.Log("CÃ¢y sá»“i Rá»«ng ráº­m má»c lÃªn um tÃ¹m!");
}

public class Cactus : ITree
{
    public void Grow() => Debug.Log("CÃ¢y xÆ°Æ¡ng rá»“ng Sa máº¡c gai gÃ³c má»c lÃªn!");
}

// 2. DÃ²ng sáº£n pháº©m ÄÃ¡ (Rock)
public interface IRock { void Spawn(); }

public class MossyRock : IRock
{
    public void Spawn() => Debug.Log("ÄÃ¡ phá»§ rÃªu xanh xuáº¥t hiá»‡n!");
}

public class Sandstone : IRock
{
    public void Spawn() => Debug.Log("ÄÃ¡ cÃ¡t sa máº¡c mÃ u vÃ ng xuáº¥t hiá»‡n!");
}
```

### 2. Äá»‹nh nghÄ©a Abstract Factory vÃ  cÃ¡c Concrete Factory
```csharp
// Interface Abstract Factory chung cho cÃ¡c Biomes
public interface IBiomeFactory
{
    ITree CreateTree();
    IRock CreateRock();
}

// Factory chuyÃªn biá»‡t cho Rá»«ng Ráº­m
public class ForestBiomeFactory : IBiomeFactory
{
    public ITree CreateTree() => new OakTree();
    public IRock CreateRock() => new MossyRock();
}

// Factory chuyÃªn biá»‡t cho Sa Máº¡c
public class DesertBiomeFactory : IBiomeFactory
{
    public ITree CreateTree() => new Cactus();
    public IRock CreateRock() => new Sandstone();
}
```

### 3. Client Code sá»­ dá»¥ng Abstract Factory
```csharp
public class MapGenerator : MonoBehaviour
{
    private IBiomeFactory biomeFactory;

    // Thay Ä‘á»•i Biome Factory linh hoáº¡t trong runtime
    public void SetBiome(IBiomeFactory newBiomeFactory)
    {
        biomeFactory = newBiomeFactory;
    }

    // Sinh ngáº«u nhiÃªn thá»±c váº­t vÃ  Ä‘á»‹a hÃ¬nh Ä‘á»“ng bá»™
    public void GenerateZone()
    {
        if (biomeFactory == null) return;

        ITree tree = biomeFactory.CreateTree();
        IRock rock = biomeFactory.CreateRock();

        // Cháº¡y logic
        tree.Grow();
        rock.Spawn();
    }
}
```

---

> ðŸ“š **Nguá»“n gá»‘c:** Ná»™i dung tham kháº£o tá»« [Refactoring.Guru](https://refactoring.guru/) â€” TÃ¡c giáº£: Alexander Shvets, Minh há»a: Dmitry Zhart

| HÆ°á»›ng | LiÃªn káº¿t |
|-------|----------|
| â† Quay láº¡i | [Factory Method](./01-factory-method.md) |
| â†’ Tiáº¿p theo | [Builder](./03-builder.md) |
