# 🎨 Bản đồ Design Pattern theo cấp bậc

> 📖 **Về trang này:** Trả lời chính xác câu hỏi *"cấp này cần nắm pattern nào, để giải vấn đề gì?"*. Mỗi pattern đều link tới trang lý thuyết + code đầy đủ trong mục **Design Patterns** và **Game Programming Patterns** của roadmap.

> [!IMPORTANT]
> **Pattern là công cụ, không phải mục tiêu.** Đừng học thuộc 23 pattern rồi đi tìm chỗ nhét. Hãy học pattern *khi bạn gặp đúng vấn đề nó sinh ra để giải*. Trang này sắp xếp pattern theo **thời điểm bạn thực sự đụng vấn đề đó** trong sự nghiệp.

---

## 🗺️ Bảng tổng quan: pattern xuất hiện ở cấp nào

| Cấp | Pattern bắt đầu cần | Vấn đề nó giải |
|---|---|---|
| **Intern** | *(chưa cần pattern)* | Tập trung 1 script = 1 việc; hiểu **Component** (Unity ép sẵn). |
| **Fresher** | Observer, Object Pool, Component | Tách UI khỏi gameplay; hết giật do `Instantiate`/`Destroy`. |
| **Junior** | State, Strategy, Singleton (thận trọng), Command | Thay "rừng if/else"; AI/gameplay có trạng thái; input tách rời. |
| **Middle** | Factory, Facade, Flyweight, Type Object, Event Queue, Dependency Injection | Module decoupled; data-driven; ranh giới hệ thống rõ ràng. |
| **Senior** | Service Locator, Bytecode, Spatial Partition, Double Buffer, Subclass Sandbox | Kiến trúc toàn cục; hiệu năng quy mô lớn; mở rộng/modding. |
| **Lead** | *(không học pattern mới)* | Dùng kiến thức pattern để **review & định chuẩn** cho người khác. |

> [!TIP]
> Cột "Pattern bắt đầu cần" là **tích lũy** — Middle vẫn dùng mọi thứ của Junior. Mỗi cấp chỉ *thêm* công cụ mới khi vấn đề mới xuất hiện.

---

## 🟢 Intern — chưa vội học pattern

Ở cấp này, **viết code sạch quan trọng hơn pattern**. Cái "pattern" duy nhất bạn cần cảm nhận là cái Unity đã ép sẵn:

* **Component pattern** ([GPP](#gpp-doc:component)) — GameObject = vật chứa, mỗi Component = một hành vi. Đây là lý do ta *gắn nhiều script nhỏ* thay vì viết một script khổng lồ.

👉 **Việc cần làm:** mỗi script chỉ làm **một việc** (`PlayerMovement`, `PlayerHealth` — không gộp). Đó là nền móng cho mọi pattern sau này.

---

## 🟡 Fresher — 3 pattern đầu tiên

| Pattern | Vấn đề thực tế | Khi KHÔNG dùng |
|---|---|---|
| **[Observer](../../02-Design-Patterns/02-Catalog/03-Behavioral/06-observer.md)** ([GPP](#gpp-doc:observer)) | HUD máu/điểm phải cập nhật khi gameplay đổi, nhưng gameplay **không nên biết** UI tồn tại → dùng C# `event`/`Action`. | Khi chỉ 1 nơi nghe và gọi trực tiếp được — đừng event hoá mọi thứ. |
| **Object Pool** ([GPP](#gpp-doc:update-method)) | Bắn đạn/spawn quái liên tục → `Instantiate`/`Destroy` gây **GC spike** giật game. Tái sử dụng object thay vì tạo mới. | Object tạo 1 lần, sống lâu (boss, map). |
| **[Component](#gpp-doc:component)** | Nhân vật cần di chuyển + máu + âm thanh → **ghép** các component nhỏ thay vì kế thừa sâu. | — (đây là tư duy nền, luôn dùng). |

> [!WARNING]
> Bẫy Fresher: lạm dụng `event` đến mức không lần ra ai gọi ai ("spaghetti sự kiện"). Quy tắc: event để **báo việc đã xảy ra** (`OnPlayerDied`), không phải để **ra lệnh** (`KillPlayer`).

---

## 🟠 Junior — quản lý trạng thái & hành vi

Đây là cấp pattern bắt đầu *trả lời các vấn đề bạn gặp thật*.

| Pattern | Vấn đề thực tế | Khi KHÔNG dùng |
|---|---|---|
| **[State](../../02-Design-Patterns/02-Catalog/03-Behavioral/07-state.md)** ([GPP](#gpp-doc:state)) | AI/nhân vật có nhiều trạng thái (Idle/Patrol/Chase/Attack) → thay `switch` khổng lồ trong `Update` bằng **State Machine**. | Chỉ 2 trạng thái bool đơn giản. |
| **[Strategy](../../02-Design-Patterns/02-Catalog/03-Behavioral/08-strategy.md)** | Nhiều cách tính sát thương / nhiều kiểu di chuyển → đổi "thuật toán" lúc runtime mà không sửa lớp gốc. | Chỉ có đúng 1 thuật toán, không đổi. |
| **[Singleton](../../02-Design-Patterns/02-Catalog/01-Creational/05-singleton.md)** ([GPP](#gpp-doc:singleton)) | Cần 1 điểm truy cập toàn cục (`AudioManager`, `GameManager`). | **Hầu hết trường hợp** — đọc cảnh báo bên dưới. |
| **[Command](../../02-Design-Patterns/02-Catalog/03-Behavioral/02-command.md)** ([GPP](#gpp-doc:command)) | Đóng gói "một hành động" thành object → undo/redo, replay, remap phím. | Input đơn giản, không cần lịch sử. |

> [!CAUTION]
> **Singleton là con dao hai lưỡi.** Nó tiện nhưng tạo coupling toàn cục, khó test, khó tách. Ở Junior hãy *dùng được* nó; nhưng từ Middle hãy thay dần bằng **Dependency Injection**. Hiểu **tác hại** quan trọng ngang việc biết cách viết.

---

## 🔵 Middle — decoupling & data-driven

Trọng tâm chuyển từ "một object" sang "một hệ thống". Pattern phục vụ **ranh giới giữa các hệ thống**.

| Pattern | Vấn đề thực tế | Ghi chú |
|---|---|---|
| **[Factory Method](../../02-Design-Patterns/02-Catalog/01-Creational/01-factory-method.md)** / **[Abstract Factory](../../02-Design-Patterns/02-Catalog/01-Creational/02-abstract-factory.md)** | Sinh enemy/item theo loại mà không rải `new`/`Instantiate` khắp code. | Kết hợp với ScriptableObject. |
| **[Facade](../../02-Design-Patterns/02-Catalog/02-Structural/05-facade.md)** | Một hệ thống lớn (Inventory, Audio) phơi ra **một cổng API gọn**, giấu chi tiết bên trong. | Là cách định nghĩa "ranh giới module". |
| **[Flyweight](../../02-Design-Patterns/02-Catalog/02-Structural/06-flyweight.md)** ([GPP](#gpp-doc:flyweight)) | 10.000 cây/quái cùng loại → chia sẻ dữ liệu chung (mesh, chỉ số gốc) thay vì nhân bản. | Tiết kiệm RAM lớn. |
| **Type Object** ([GPP](#gpp-doc:type-object)) | "Goblin", "Orc" là **dữ liệu** (ScriptableObject), không phải lớp con riêng → designer thêm quái không cần lập trình viên. | Xương sống của data-driven design. |
| **Event Queue** ([GPP](#gpp-doc:event-queue)) | Tách người gửi và người nhận theo **thời gian** (xử lý sau, theo lô) — vd hệ thống âm thanh, analytics. | Khác Observer ở chỗ có hàng đợi. |
| **Dependency Injection** | Thay Singleton: truyền phụ thuộc vào qua constructor/inspector (Zenject/VContainer). | Không phải GoF nhưng là pattern *bắt buộc* ở Middle. |

> [!TIP]
> Đối chiếu với mục **Refactoring → Code Smells**: bạn dùng Factory khi thấy "rải `new` khắp nơi", dùng Facade khi thấy "Inappropriate Intimacy" giữa các hệ thống.

---

## 🟣 Senior — kiến trúc & hiệu năng quy mô lớn

Pattern ở đây phục vụ **toàn dự án** và **bài toán hiệu năng/mở rộng**.

| Pattern | Vấn đề thực tế |
|---|---|
| **Service Locator** ([GPP](#gpp-doc:singleton)) | Cung cấp dịch vụ toàn cục (audio, save, log) **có kiểm soát** hơn Singleton — đổi implementation, mock khi test. |
| **Bytecode** ([GPP](#gpp-doc:bytecode)) | Cho phép designer/modder định nghĩa hành vi (skill, event) bằng "data/script" thay vì biên dịch lại engine. |
| **Spatial Partition** ([GPP](#gpp-doc:spatial-partition)) | Hàng nghìn entity cần tìm "ai gần ai" → grid/quadtree thay vì O(n²). Nền của open-world & va chạm quy mô lớn. |
| **Double Buffer** ([GPP](#gpp-doc:double-buffer)) | Cập nhật trạng thái mà không để người đọc thấy trạng thái dở dang (render, mô phỏng). |
| **Subclass Sandbox** ([GPP](#gpp-doc:subclass-sandbox)) | Định nghĩa một bộ "API an toàn" cho hàng loạt lớp con (vd 100 loại skill kế thừa `Ability`). |

👉 Ở Senior, bạn còn chọn **kiến trúc tổng** (layering, ECS, plugin architecture) — xem trang [🏗️ Thiết kế hệ thống](./08-system-design-guide.md).

---

## 🔴 Lead — không học pattern mới, mà *gác cổng* pattern

Lead hiếm khi học pattern mới. Vai trò đổi sang:

* **Review thiết kế:** nhận ra Senior đang lạm dụng/dùng sai pattern (over-engineering cũng là lỗi).
* **Định chuẩn:** quyết định team dùng DI framework nào, convention State Machine ra sao.
* **Dạy lại:** giải thích *vì sao* chọn pattern A — biến kiến thức cá nhân thành chuẩn đội.

> [!NOTE]
> Dấu hiệu trưởng thành về pattern: ban đầu bạn hỏi *"dùng pattern nào?"*, về sau bạn hỏi *"có cần pattern không, hay code thẳng đơn giản hơn?"*. **Pattern dư thừa là một dạng technical debt.**

---

## 🔗 Đọc tiếp

* [🏗️ Hướng dẫn Thiết kế Hệ thống](./08-system-design-guide.md) — cách ghép các pattern này thành hệ thống thật.
* [📐 Tổng quan Design Patterns](../../02-Design-Patterns/00-design-patterns-overview.md) — lý thuyết + code đầy đủ 23 pattern.
* [📖 Game Programming Patterns](#gpp-doc:introduction) — pattern đặc thù game (Nystrom).

---

⬅️ [Tổng quan cấp bậc](./00-career-overview.md) · ➡️ [Thiết kế hệ thống](./08-system-design-guide.md)
