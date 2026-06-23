# 🟠 Cấp 3 — Junior

> ⏱️ **Mốc tham khảo:** 1–2 năm · **Một câu:** *"Tự hoàn thành một feature trọn vẹn."*

---

## 🎯 Vai trò

Nhận một feature từ **mô tả nghiệp vụ** và tự hoàn thành từ đầu đến cuối. Code được review nhưng ít phải sửa lớn. Bắt đầu quan tâm đến **chất lượng code** và bắt đầu review được code của Intern/Fresher.

---

## 🧠 Kiến thức kỹ thuật cần đạt

### Kiến trúc code
* Áp dụng **SOLID** ở mức thực tế (đặc biệt SRP & Dependency Inversion).
* Tách **Model – View** (dữ liệu tách khỏi hiển thị).
* **State Machine** cho gameplay/AI thay vì rừng `if/else`.
* Tránh "God object"; nhận diện khi nào nên refactor.

### Design Patterns thực chiến
* **Singleton** — và hiểu rõ tác hại khi lạm dụng.
* **Observer / Event Bus** — giao tiếp lỏng lẻo giữa hệ thống.
* **State**, **Strategy**, **Object Pool**, **Component** pattern.

> [!TIP]
> Đối chiếu trực tiếp với phần **Design Patterns** và **Game Programming Patterns** trong roadmap — đây là lúc lý thuyết pattern bắt đầu trả lời các vấn đề bạn gặp thật.

### Quản lý Scene
* `SceneManager`: load **Single** vs **Additive**.
* Load bất đồng bộ (`LoadSceneAsync`) + màn hình loading.

### Data & Save/Load
* JSON (`JsonUtility` / Newtonsoft.Json) để serialize trạng thái.
* `PlayerPrefs` và **giới hạn** của nó (không dùng cho save game lớn).

### Vật lý nâng cao
* `Raycast` / `SphereCast` / `BoxCast`.
* **Layer** & **Layer Mask**; ma trận va chạm (Collision Matrix); Physics Material.

### UI nâng cao
* UI sinh runtime (instantiate item danh sách).
* Bắt đầu tiếp cận **UI Toolkit**; thiết kế responsive nhiều độ phân giải.

### Hiệu năng nhập môn
* Đọc **Profiler**; nhận diện **GC allocation** và vì sao nó gây giật (spike).
* Hiểu **Draw Call** / batching là gì.

### Asset & Git
* **Addressables** nhập môn — load asset bất đồng bộ thay vì nhét hết vào scene.
* Git nâng cao: resolve merge conflict, tạo & review **Pull Request**.

---

## 🛠️ Sản phẩm minh chứng

* Đóng góp **feature chính** trong một dự án thật (đi làm hoặc team), **hoặc**
* Một game cá nhân có **kiến trúc rõ ràng**, đã publish lên store (Google Play / itch.io / App Store).

---

## ✅ Tiêu chí lên Middle

- [ ] Nhận một feature mơ hồ → tự đặt câu hỏi làm rõ → chia nhỏ task → hoàn thành.
- [ ] Code có cấu trúc, dễ đọc, ít coupling; biết refactor khi "code smell" xuất hiện.
- [ ] Tự xử lý được vấn đề hiệu năng đơn giản (giảm GC alloc, gộp draw call).
- [ ] Review được PR của Fresher/Intern và chỉ ra vấn đề cụ thể.

> [!IMPORTANT]
> Bước nhảy Junior → Middle là bước **về tư duy thiết kế**, không chỉ là "code nhanh hơn". Hãy bắt đầu hỏi *"feature này sẽ thay đổi thế nào trong 6 tháng tới?"* trước khi viết.

---

⬅️ [Cấp 2 — Fresher](./02-fresher.md) · ➡️ [Cấp 4 — Middle](./04-middle.md)
