# 🔵 Cấp 4 — Middle (Mid-level)

> ⏱️ **Mốc tham khảo:** 2–4 năm · **Một câu:** *"Làm chủ một hệ thống lớn."*

---

## 🎯 Vai trò

Làm chủ **một hệ thống/module lớn** trong dự án (combat, inventory, networking, economy, save system…). Tự chịu trách nhiệm **thiết kế kỹ thuật** cho phần mình phụ trách. Ít cần giám sát; là người Junior tìm đến để hỏi.

---

## 🧠 Kiến thức kỹ thuật cần đạt

### Kiến trúc hệ thống game
* Thiết kế **module decoupled** với ranh giới rõ ràng (interface giữa các hệ thống).
* **Dependency Injection** (Zenject / VContainer) thay cho Singleton tràn lan.
* **MVVM / MVC** cho UI; **data-driven design** bằng ScriptableObject.

### Tối ưu hiệu năng chuyên sâu
* **Profiler + Memory Profiler + Frame Debugger** — đọc và truy ra nguyên nhân.
* **Batching**: static / dynamic / SRP Batcher; giảm **overdraw**; texture **atlas**.
* Quản lý **GC** triệt để: cache reference, dùng `struct`, tránh boxing, tránh `foreach` cấp phát, dùng `StringBuilder`.

### Async & đa luồng
* `async/await`, thư viện **UniTask** (thay Coroutine khi cần).
* **Job System + Burst Compiler** nhập môn cho phần nặng tính toán; khái niệm **DOTS/ECS**.

### Rendering & Shader
* Phân biệt **Built-in vs URP vs HDRP**; cấu trúc render pipeline.
* **Shader Graph**; viết shader cơ bản (HLSL); lighting, post-processing (Volume).

### Multiplayer
* **Netcode for GameObjects** hoặc Mirror / Photon.
* Mô hình client–server, **state sync**, **RPC**, xử lý độ trễ (latency) & dự đoán.

### Addressables & Build
* Content delivery, remote bundle, quản lý phụ thuộc asset.
* Build pipeline đa nền tảng: PC · Mobile · Console · WebGL.

### Testing
* **Unit test** (NUnit + Unity Test Framework); **Play Mode test**.

### Editor Tooling
* Viết **Custom Editor**, `EditorWindow`, `PropertyDrawer` để tăng năng suất team.

### CI/CD
* Hiểu build tự động: Unity Cloud Build / GameCI / Jenkins.

---

## 🏗️ Thiết kế ở cấp này

Trọng tâm chuyển từ "một object" sang **làm chủ một hệ thống** với ranh giới rõ. Pattern chủ đạo (chi tiết ở [🎨 Pattern theo cấp](./07-patterns-by-level.md)):

* **[Factory](../../02-Design-Patterns/02-Catalog/01-Creational/01-factory-method.md)** — sinh enemy/item theo loại, không rải `new` khắp nơi.
* **[Facade](../../02-Design-Patterns/02-Catalog/02-Structural/05-facade.md)** — phơi một cổng API gọn cho hệ thống lớn, giấu nội bộ.
* **[Flyweight](../../02-Design-Patterns/02-Catalog/02-Structural/06-flyweight.md)** + **Type Object** — data-driven bằng ScriptableObject; chia sẻ dữ liệu chung.
* **Dependency Injection** (Zenject/VContainer) — thay Singleton tràn lan.

🏗️ **Thử thiết kế trọn vẹn:** một hệ thống **Inventory** hoặc **Combat pipeline** — xem case study đầy đủ kèm sơ đồ ở [🏗️ Thiết kế hệ thống](./08-system-design-guide.md).

---

## 🛠️ Sản phẩm minh chứng

* Sở hữu **kiến trúc của một hệ thống lõi** trong một dự án đã ship.
* Có **tool nội bộ** do mình viết, được team khác sử dụng.

---

## ✅ Tiêu chí lên Senior

- [ ] Thiết kế kiến trúc cho module lớn, **lường trước thay đổi tương lai**, viết tài liệu kỹ thuật.
- [ ] Giải quyết được bug hiệu năng/đồng bộ phức tạp mà người khác bó tay.
- [ ] Ra quyết định kỹ thuật có **trade-off rõ ràng** (giải thích được vì sao chọn A thay vì B).
- [ ] Mentor được Junior; góp phần định hình coding convention của team.

> [!IMPORTANT]
> Middle là cấp **"thợ cả"**: bạn không chỉ làm đúng, mà phải làm cho **bền** và **dễ mở rộng**. Trade-off (đánh đổi) trở thành từ khóa trung tâm — không còn câu trả lời "đúng tuyệt đối".

---

⬅️ [Cấp 3 — Junior](./03-junior.md) · ➡️ [Cấp 5 — Senior](./05-senior.md)
