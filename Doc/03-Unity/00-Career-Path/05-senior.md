# 🟣 Cấp 5 — Senior

> ⏱️ **Mốc tham khảo:** 4–7 năm · **Một câu:** *"Thiết kế kiến trúc & làm chủ engine."*

---

## 🎯 Vai trò

Chịu trách nhiệm **kiến trúc kỹ thuật toàn dự án** hoặc nhiều hệ thống lớn. Ra quyết định ảnh hưởng cả team. Giải quyết những vấn đề khó nhất. Là "kỹ thuật trưởng" về mặt chuyên môn — người gỡ rối khi production có khủng hoảng.

---

## 🧠 Kiến thức kỹ thuật cần đạt

### Kiến trúc toàn cục
* Chia tầng rõ ràng: **gameplay / core / platform / services**.
* **Assembly Definitions** (`.asmdef`) để giảm thời gian compile và quản lý phụ thuộc.
* Thiết kế cho khả năng **mở rộng & bảo trì 3–5 năm**, cho nhiều người làm song song.

### Hiệu năng ở quy mô lớn
* Đặt **ngân sách hiệu năng** (frame budget ms, memory budget) theo từng nền tảng.
* Tối ưu cho thiết bị **low-end**; profiling **trên device thật**, không chỉ trong Editor.
* **DOTS/ECS** ở mức sản xuất khi bài toán đòi hỏi (hàng nghìn entity); native memory.

### Hiểu sâu engine (engine-level)
* Cơ chế **serialization** của Unity; **asset import pipeline**.
* **Scripting backend**: Mono vs **IL2CPP**; chế độ GC (incremental); ảnh hưởng tới build & hiệu năng.
* Biết khi nào cần **native plugin (C++)** và cách tích hợp.

### Đa nền tảng & xuất bản
* Đặc thù **Console** (yêu cầu cert), **Mobile** (pin, nhiệt, kích thước build).
* **Live-ops**, A/B testing, tích hợp analytics, remote config.

### Security & live game
* **Server-authoritative** design; anti-cheat cơ bản.
* **Hot-update content** (cập nhật nội dung không cần build lại store).

### Định hướng công nghệ
* Đánh giá & chọn **package / SDK / phiên bản engine**.
* Quản lý **technical debt** ở cấp dự án; lập kế hoạch trả nợ kỹ thuật.

---

## 🛠️ Sản phẩm minh chứng

* Đã **ship ≥1 sản phẩm thương mại** với vai trò kiến trúc chính.
* Đã xử lý được **khủng hoảng kỹ thuật** trong production (crash hàng loạt, hiệu năng tụt sâu, sự cố live).

---

## ✅ Tiêu chí lên Lead

- [ ] Tầm ảnh hưởng **vượt ngoài code của bản thân** — nâng năng lực cả team.
- [ ] Cân bằng nhu cầu kinh doanh ↔ ràng buộc kỹ thuật; giao tiếp tốt với non-tech (PM, designer, publisher).
- [ ] Xây dựng được **process/chuẩn kỹ thuật** cho team áp dụng.
- [ ] Được team & quản lý tin tưởng giao các quyết định kỹ thuật quan trọng.

> [!NOTE]
> Senior là điểm mà nhiều người dừng lại và vẫn rất giá trị (Senior IC — Individual Contributor). Lên Lead **không bắt buộc** — đó là một lựa chọn hướng đi, không phải "cấp cao hơn đương nhiên tốt hơn".

---

⬅️ [Cấp 4 — Middle](./04-middle.md) · ➡️ [Cấp 6 — Technical Lead](./06-lead.md)
