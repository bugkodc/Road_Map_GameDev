# 🟡 Cấp 2 — Fresher

> ⏱️ **Mốc tham khảo:** 0–1 năm · **Một câu:** *"Làm được việc dưới sự giám sát."*

---

## 🎯 Vai trò

Nhận task **đã được mô tả rõ ràng** và hoàn thành với một chút hướng dẫn. Bắt đầu **tự debug** thay vì hỏi ngay. Code vẫn được review kỹ, nhưng bạn đã chủ động được phần lớn công việc của mình.

---

## 🧠 Kiến thức kỹ thuật cần đạt

### C# trung cấp
* `interface`, lớp `abstract`, `virtual`/`override`.
* `properties` (get/set), `delegate`, `event`, `Action`/`Func`.
* Generics cơ bản; xử lý ngoại lệ `try/catch/finally`.
* **LINQ** cơ bản: `Where`, `Select`, `FirstOrDefault`.

### MonoBehaviour đầy đủ
* Toàn bộ vòng đời: `Awake` · `OnEnable` · `Start` · `FixedUpdate` · `Update` · `LateUpdate` · `OnDisable` · `OnDestroy`.
* Phân biệt rõ **`Update` (logic, render)** vs **`FixedUpdate` (vật lý)**.

### Prefab & quản lý object
* **Prefab Variant**, nested prefab.
* **Object Pooling** cơ bản — vì sao không nên `Instantiate`/`Destroy` liên tục (gây GC spike).

### Input System
* Input System mới: **Action Asset**, binding, control scheme cho keyboard / gamepad / touch.

### UI (UGUI)
* `Canvas`, anchor & pivot, **Layout Group**, `Button`, `Text`/`TMP_Text`, `Image`.
* Bắt sự kiện UI (`onClick`), cập nhật HUD.

### Animation
* **Animator Controller**: state, transition, parameter (bool/trigger/float).
* Animation Clip; blend cơ bản.

### Coroutine
* `IEnumerator`, `yield return`, `WaitForSeconds`, `StartCoroutine`/`StopCoroutine`.
* Khi nào dùng Coroutine thay cho logic trong `Update`.

### ScriptableObject
* Khái niệm; dùng để lưu **config/data** tách khỏi code (ví dụ: chỉ số quái, cấu hình level).

### Audio
* `AudioSource`, `AudioClip`; phát SFX và nhạc nền; quản lý âm lượng.

---

## 🛠️ Sản phẩm minh chứng

Một game 2D/3D **nhiều màn**, có:
* UI đầy đủ (menu → gameplay → game over),
* âm thanh (SFX + nhạc nền),
* animation nhân vật,
* lưu điểm cao đơn giản.

---

## ✅ Tiêu chí lên Junior

- [ ] Tự debug được lỗi thường gặp (null reference, sai logic, sai thứ tự lifecycle).
- [ ] Tách logic thành nhiều script, mỗi script một trách nhiệm rõ ràng — không nhồi tất cả vào 1 file.
- [ ] Dùng được `event`/`delegate` để giảm phụ thuộc trực tiếp giữa các script.
- [ ] Biết khi nào dùng Coroutine và ScriptableObject.

> [!WARNING]
> Cái bẫy lớn nhất ở cấp này: viết **"God script"** — một file ôm hết mọi logic. Hãy tập thói quen hỏi *"component này có đúng một lý do để thay đổi không?"* (Single Responsibility).

---

⬅️ [Cấp 1 — Intern](./01-intern.md) · ➡️ [Cấp 3 — Junior](./03-junior.md)
