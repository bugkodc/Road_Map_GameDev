# 🗺️ Road Map Game Development - Website & Documentation

Chào mừng bạn đến với dự án **Road Map Game Development**! Đây là ứng dụng web tương tác hiện đại giúp các lập trình viên tự học game development một cách bài bản từ nền tảng lập trình đến kỹ thuật chuyên sâu.

Giao diện của ứng dụng được thiết kế tối ưu, lấy cảm hứng và bảng màu ngọc ấm áp từ [Refactoring.Guru](https://refactoring.guru/).

---

## 🚀 Tính năng nổi bật của Website

1.  **Trang chủ (Landing Page):** Tích hợp thanh tìm kiếm tức thời (Instant Search) và các thẻ bài điều hướng trực quan đến 4 phân hệ chính.
2.  **Bộ đọc tài liệu Động (Content Reader):** Tự động phân tích cú pháp và tô sáng code (C#, C++), vẽ các hộp ghi chú alerts dạng GitHub (`[!NOTE]`, `[!WARNING]`, `[!IMPORTANT]`) trực tiếp từ file Markdown.
3.  **Lộ trình tương tác (Interactive Roadmap):** Tích hợp các ô kiểm tự học (Checklist) và thanh tiến trình (Progress Tracking) tự động lưu lại lịch sử học tập vào trình duyệt (`localStorage`).
4.  **Hỗ trợ giao diện kép:** Chuyển đổi linh hoạt giữa giao diện sáng (**Light Mode - Warm Ivory**) và giao diện tối (**Dark Mode - Slate**).
5.  **Responsive:** Trải nghiệm hoàn hảo trên mọi thiết bị di động, máy tính bảng và desktop.

---

## 📂 Cấu trúc thư mục

*   `Doc/` - Thư mục gốc chứa toàn bộ các file tài liệu định dạng Markdown (`.md`) và hình ảnh (`images/`).
*   `public/Doc` - Liên kết Junction tự động ánh xạ đến `Doc/` để phục vụ static fetch cả trong phát triển lẫn đóng gói.
*   `src/` - Toàn bộ mã nguồn React của Website (Components, Pages, Context, Stylesheet).
*   `src/index.css` - Hệ thống CSS tùy biến toàn bộ giao diện và micro-animations.
*   `src/utils/navigation.json` - File cấu hình cây thư mục bài học đồng bộ cho cả Sidebar, SearchBar và Lộ trình.

---

## 🛠️ Hướng dẫn vận hành locally

Yêu cầu máy tính của bạn đã cài đặt **Node.js** (Khuyến nghị phiên bản 18 trở lên).

### 1. Cài đặt các thư viện cần thiết
Mở Terminal tại thư mục gốc của dự án và chạy lệnh sau để khôi phục cấu trúc node modules:
```bash
npm install
```

### 2. Khởi chạy Server phát triển (Development Mode)
Chạy lệnh sau để khởi chạy dev server locally:
```bash
npm run dev
```
Sau đó, truy cập link hiển thị trên terminal (thường là `http://localhost:5173`) để trải nghiệm website.

### 3. Đóng gói cho Production (Build Mode)
Để biên dịch và nén tối ưu toàn bộ website cùng tài liệu thành một bộ file tĩnh nằm trong thư mục `dist/`:
```bash
npm run build
```

---

## 🌐 Hướng dẫn Deploy lên GitHub Pages

Để đưa website của bạn lên internet miễn phí bằng **GitHub Pages**, bạn có thể áp dụng 1 trong 2 cách cực kỳ đơn giản sau:

### Cách 1: Sử dụng thư viện `gh-pages` (Khuyên dùng - Nhanh & Tự động)

1. Cài đặt thư viện `gh-pages` làm dev dependency:
   ```bash
   npm install -D gh-pages
   ```
2. Mở file `package.json` và thêm hai dòng sau vào phần `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Chạy lệnh sau để tự động build và đẩy thư mục `dist/` lên nhánh `gh-pages` trên GitHub của bạn:
   ```bash
   npm run deploy
   ```
4. Truy cập vào phần cài đặt của Repository trên GitHub (`Settings > Pages`), đảm bảo nguồn build được chọn là nhánh `gh-pages`. Website của bạn sẽ hoạt động tại địa chỉ: `https://<username>.github.io/<repository-name>/`.

---

## 📝 Cách bổ sung tài liệu mới trong tương lai

Hệ thống của chúng ta được thiết kế vô cùng thông minh và linh hoạt. Khi bạn viết thêm bài học mới hoặc cập nhật bài cũ:
1. Bạn chỉ cần viết/sửa file `.md` trực tiếp trong thư mục `Doc/`.
2. Mở file [src/utils/navigation.json](file:///d:/Code/Road-Map-GameDev/src/utils/navigation.json) và khai báo thêm tiêu đề cùng đường dẫn `path` tương ứng của file đó vào vị trí mong muốn trong cây thư mục bài viết.
3. Website sẽ **tự động** cập nhật bài viết mới trên Sidebar, công cụ Tìm kiếm và Bản đồ lộ trình ngay lập tức mà không cần bất kỳ thao tác lập trình phức tạp nào!

---

> 📚 **Bản quyền Nội dung:** Các bài học trong dự án được tổng hợp và lược dịch phục vụ mục đích học tập phi thương mại từ nguồn chính thống chất lượng cao [Refactoring.Guru](https://refactoring.guru/) (Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart).
