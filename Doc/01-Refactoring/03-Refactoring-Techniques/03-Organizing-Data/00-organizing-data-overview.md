# 📊 Organizing Data (Tổ chức dữ liệu)

> 📖 **Nguồn:** [Refactoring.Guru — Organizing Data](https://refactoring.guru/refactoring/techniques/organizing-data) | Tác giả: Alexander Shvets

## Giới thiệu

Quản lý dữ liệu là một trong những khía cạnh cốt lõi của phát triển phần mềm. Khi codebase phình to, cách dữ liệu được tổ chức có thể làm cho hệ thống trở nên cực kỳ phức tạp hoặc rất gọn gàng.

Nhóm kỹ thuật **Organizing Data** tập trung vào việc xử lý các mối liên kết dữ liệu, thay thế primitive types bằng các class có ý nghĩa thực tế, và quản lý tính đóng gói (encapsulation) của dữ liệu.

---

## 📋 Các kỹ thuật chính và Khi nào nên dùng

### 1. Replace Data Value with Object (Thay giá trị dữ liệu bằng đối tượng)
- **Vấn đề:** Một class chứa trường dữ liệu primitive (string, int) nhưng trường đó lại mang ý nghĩa phức tạp hoặc có các phép xử lý đặc thù.
- **Giải pháp:** Tạo một class mới chứa trường dữ liệu đó và di chuyển các logic liên quan vào class mới.
- *Ví dụ:* Dùng class `Email` thay vì `string email` để có thể tự validate định dạng email.

### 2. Replace Type Code with Class (Thay mã loại bằng lớp)
- **Vấn đề:** Class chứa một trường int/string đại diện cho loại đối tượng (ví dụ: `int bloodType`).
- **Giải pháp:** Thay thế các giá trị int/string đó bằng một class mới chuyên biệt để đảm bảo tính an toàn kiểu dữ liệu (Type Safety).

### 3. Replace Type Code with Subclasses / State-Strategy
- **Vấn đề:** Một trường mã loại (Type Code) ảnh hưởng trực tiếp đến hành vi của class (ví dụ: dùng nhiều `switch(type)`).
- **Giải pháp:** Tách mã loại thành các subclass kế thừa (nếu loại không thay đổi trong runtime) hoặc áp dụng **State/Strategy Pattern** (nếu loại có thể thay đổi liên tục).

### 4. Encapsulate Field / Encapsulate Collection
- **Vấn đề:** Các trường dữ liệu hoặc List/Array được khai báo `public` cho phép class ngoài truy cập và sửa đổi tự do.
- **Giải pháp:** Đưa biến về `private`, cung cấp các property getter/setter hoặc các hàm thao tác có kiểm soát (ví dụ: `Add()`, `Remove()`).

### 5. Replace Array with Object (Thay mảng bằng đối tượng)
- **Vấn đề:** Sử dụng một Array/List chứa nhiều dữ liệu khác loại (ví dụ: `arr[0]` là tên, `arr[1]` là tuổi).
- **Giải pháp:** Tạo một class/struct có các trường tên rõ ràng để lưu trữ.

---

## 🎮 Trong Game Dev

Trong lập trình game, tổ chức dữ liệu khoa học giúp tối ưu hiệu năng và dễ dàng quản lý thông số:

- **Replace Type Code with Subclasses**:
  - ❌ *Ví dụ chưa tốt:* Tạo class `Enemy` và dùng `enum EnemyType { Melee, Ranged, Boss }`. Trong hàm `Update()` dùng `switch(type)` để đổi logic di chuyển.
  - ✅ *Giải pháp tốt:* Tách thành `MeleeEnemy : Enemy`, `RangedEnemy : Enemy` kế thừa từ class cha để mỗi class tự hiện thực logic di chuyển riêng.

- **Encapsulate Collection**:
  - ❌ *Ví dụ chưa tốt:* `public List<Item> inventory;` của Player được public hoàn toàn. Bất kỳ class nào cũng có thể gọi `player.inventory.Clear()` làm mất hết đồ của người chơi.
  - ✅ *Giải pháp tốt:* Để `private List<Item> inventory;` và cung cấp hàm `public void AddItem(Item item)` có kiểm tra sức chứa tối đa.

- **Introduce Parameter Object**:
  - ❌ *Ví dụ chưa tốt:* `SpawnEnemy(float x, float y, float z, int hp, float speed, string name, int level)`
  - ✅ *Giải pháp tốt:* Gom nhóm các thông số thành class `EnemyConfig` (như ScriptableObject trong Unity) và truyền `SpawnEnemy(EnemyConfig config)`.

---

## 🔗 Liên kết

- ⬆️ [Refactoring Techniques — Tổng quan](../00-techniques-overview.md)
- ⬅️ [Moving Features](../02-Moving-Features/00-moving-features-overview.md)
- ➡️ [Simplifying Conditional Expressions](../04-Simplifying-Conditional/00-simplifying-conditional-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
