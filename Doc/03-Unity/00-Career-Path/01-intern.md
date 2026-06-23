# 🟢 Cấp 1 — Intern (Thực tập sinh)

> ⏱️ **Mốc tham khảo:** 0–6 tháng · **Một câu:** *"Học cách học."*

---

## 🎯 Vai trò

Làm task nhỏ, có **mentor kèm cặp** review từng bước. Mục tiêu không phải tạo giá trị sản xuất, mà là làm quen **quy trình làm việc**, công cụ, và cách tư duy của một developer. Sai là chuyện bình thường — quan trọng là biết hỏi đúng lúc và học nhanh.

---

## 🧠 Kiến thức kỹ thuật cần đạt

### C# nền tảng
* Biến, kiểu dữ liệu, toán tử, `if/else`, `switch`, vòng lặp `for`/`foreach`/`while`.
* `class` vs `struct`, method, tham số, giá trị trả về.
* Collection cơ bản: `List<T>`, `Dictionary<K,V>`, mảng, `enum`.
* OOP cơ bản: kế thừa, đa hình, đóng gói (`public`/`private`).

### Unity Editor
* Thành thạo các cửa sổ: **Scene · Game · Hierarchy · Inspector · Project · Console**.
* Di chuyển/xoay/scale GameObject; dùng Gizmo; snapping.
* Phân biệt **Edit mode** và **Play mode** (và cái bẫy "sửa lúc Play mode bị mất").

### GameObject & Component
* Mô hình **Entity–Component**: GameObject là vật chứa, Component là hành vi.
* `Transform`: position, rotation, scale; quan hệ cha–con (parenting).
* Thêm/xóa component; **Prefab** cơ bản (tạo, kéo vào scene, `Instantiate`).

### MonoBehaviour
* Vòng đời cơ bản: `Awake()` → `Start()` → `Update()`.
* `[SerializeField]` và gán reference qua Inspector.
* `Update` chạy **mỗi frame** → dùng `Time.deltaTime` để độc lập tốc độ máy.

### Vật lý nhập môn
* `Rigidbody`, `Collider` (Box/Sphere/Capsule), `isTrigger`.
* Bắt va chạm: `OnCollisionEnter`, `OnTriggerEnter`.

### Công cụ
* **Git** cơ bản: `clone`, `commit`, `pull`, `push`, tạo branch.
* Đọc lỗi trong **Console**, biết stack trace trỏ về dòng nào.

---

## 🎨 Pattern & thiết kế ở cấp này

Ở Intern **chưa cần học design pattern**. Việc quan trọng hơn: cảm nhận **Component pattern** mà Unity ép sẵn — *mỗi script làm đúng một việc*, không gộp tất cả vào một file.

* ❌ `Player.cs` ôm di chuyển + máu + âm thanh + UI.
* ✅ Tách `PlayerMovement`, `PlayerHealth`, `PlayerAudio` — mỗi cái một trách nhiệm.

> Đây là nền móng cho mọi pattern về sau. Xem [🎨 Bản đồ Pattern theo cấp](./07-patterns-by-level.md) để biết bức tranh toàn cảnh.

---

## 🛠️ Sản phẩm minh chứng

Một **game mini hoàn chỉnh** tự làm từ đầu đến **build ra file chạy**:
> Flappy Bird · Pong · Roll-a-ball · Breakout.

---

## ✅ Tiêu chí lên Fresher

- [ ] Tự dựng scene đơn giản và viết script điều khiển object mà không cần cầm tay từng dòng.
- [ ] Hiểu `Update` chạy mỗi frame và dùng `Time.deltaTime` đúng.
- [ ] Commit code lên Git theo quy ước nhóm.
- [ ] Hoàn thành 1 game mini từ ý tưởng đến build.

> [!TIP]
> Ở cấp này, **biết hỏi đúng cách** quan trọng hơn biết tất cả. Trước khi hỏi mentor: đã thử Google/đọc Console chưa? Mô tả được vấn đề + những gì đã thử chưa?

---

⬅️ [Tổng quan cấp bậc](./00-career-overview.md) · ➡️ [Cấp 2 — Fresher](./02-fresher.md)
