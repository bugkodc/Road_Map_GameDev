# 🎮 Lộ trình Học tập Unity 6.4 (LTS)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp, chọn lọc và biên soạn chuyên sâu từ tài liệu chính thống [Unity Manual](https://docs.unity3d.com/Manual/index.html) và [Unity Scripting API](https://docs.unity3d.com/ScriptReference/index.html) phiên bản **Unity 6.4 (LTS) ổn định**.

Chào mừng bạn đến với lộ trình tự học và làm chủ Unity 6.4. Tài liệu này được xây dựng nhằm cung cấp cái nhìn thực chiến, giải thích bản chất kiến trúc và cách lập trình chuyên sâu, khắc phục điểm yếu "chỉ mô tả chung chung" của tài liệu gốc.

Lộ trình được chia làm 2 nhánh bổ trợ chặt chẽ cho nhau:

---

## 📖 1. Unity User Manual (Hướng dẫn sử dụng & Khái niệm)

Nhánh này tập trung vào các khái niệm cốt lõi, cách vận hành các công cụ, editor và thiết lập hệ thống trong Unity Editor:

*   **🎬 Get started:** Cài đặt, Hub, quản lý dự án ban đầu.
*   **🖥️ Unity Editor interface:** Giao diện và các cửa sổ chức năng của Unity 6.4.
*   **📦 Packages and package management:** Quản lý thư viện qua Package Manager (UPM).
*   **📁 Assets and media:** Nhập khẩu (import) và tối ưu hóa Mesh, Texture, Audio.
*   **🎨 2D game development:** Bộ công cụ làm game 2D (Tilemap, Physics 2D, Sprite).
*   **🧠 Unity AI:** Hệ thống AI tìm đường thông minh NavMesh.
*   **🕶️ XR (AR/VR):** Lập trình thực tế ảo đa nền tảng.
*   **🌐 Multiplayer:** Lập trình game mạng với Netcode for GameObjects.
*   **📱 Platform development:** Cấu hình build đa nền tảng (PC, Mobile, WebGL, Console).
*   **🧱 GameObjects & Components:** Mô hình thực thể thành phần (Entity Component Model).
*   **🎬 Scenes:** Quản lý cảnh chơi và cơ chế tải bất đồng bộ.
*   **📷 Cameras:** Thiết lập góc quay và Cinemachine thông minh.
*   **🏞️ World building:** Thiết kế địa hình, ProBuilder và Grid.
*   **⚡ Physics:** Mô phỏng vật lý, Rigidbody, Collider và Raycasting.
*   **🔌 Input:** Lắp ráp và tiếp nhận điều khiển phần cứng của người chơi.
    *   👉 **Bài học đầu tiên:** [Introduction to Input (Giới thiệu về Input)](./01-Manual/15-Input/01-introduction-to-input.md)

---

## 💻 2. Scripting API C# (Giao diện Lập trình)

Nhánh này đi sâu vào mã nguồn C#, phân tích chi tiết vòng đời class, luồng thực thi và các namespace API của Unity 6.4:

*   **UnityEngine Core API:** Làm việc với GameObject, Component, Transform, Vector3, Quaternion qua code.
*   **MonoBehaviour Lifecycle:** Chi tiết cơ chế kích hoạt các event method (`Awake`, `Start`, `Update`, `FixedUpdate`...) của Engine.
*   **UnityEngine.InputSystem API:** Cách tương tác trực tiếp với các Action Asset và thiết bị điều khiển bằng code C#.
*   **UI Toolkit & UGUI API:** Lập trình UI hiện đại (UI Toolkit) và giao diện canvas truyền thống.

---

> 📚 **Lời khuyên học tập:** Khi nghiên cứu một chủ đề, bạn nên đọc hiểu khái niệm bên nhánh **Unity Manual** trước, sau đó đối chiếu sang nhánh **Scripting API** tương ứng để nắm rõ cách lập trình nó bằng C#.
