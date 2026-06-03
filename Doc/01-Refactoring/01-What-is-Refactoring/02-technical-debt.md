# 💳 Technical Debt (Nợ kỹ thuật)

> **Nguồn gốc:** Tổng hợp và tham khảo từ [Refactoring.Guru — Technical Debt](https://refactoring.guru/refactoring/technical-debt)
> Tác giả: **Alexander Shvets** · Minh họa: **Dmitry Zhart**
> Đây là tài liệu tóm tắt cho mục đích học tập, mọi quyền thuộc về tác giả gốc.

![Technical Debt](../../images/refactoring/technical-debt.png)

## Technical Debt là gì?

**Technical Debt** (Nợ kỹ thuật) là phép ẩn dụ tài chính cho những gì xảy ra khi bạn chọn giải pháp nhanh thay vì giải pháp đúng.

Giống như **vay ngân hàng** — bạn đi nhanh hơn bây giờ nhưng phải trả nhiều hơn sau:

- **Vốn gốc** = thời gian tiết kiệm được khi chọn cách làm nhanh
- **Lãi suất** = thời gian bị lãng phí trong tương lai vì code khó hiểu, khó thay đổi
- **Trả nợ** = refactoring để sửa lại code cho đúng

> ⚠️ Ai cũng tạo ra technical debt — kể cả những lập trình viên giỏi nhất. Vấn đề không phải là tránh nợ hoàn toàn, mà là **kiểm soát và trả nợ đều đặn**.

---

## Lãi suất của nợ kỹ thuật

Technical debt hoạt động giống lãi kép — nó **tích lũy theo thời gian**:

```
Ban đầu:    Feature mới → 2 ngày  ✅ Nhanh
6 tháng:    Feature mới → 5 ngày  ⚠️ Chậm hơn
1 năm:      Feature mới → 2 tuần  ❌ Rất chậm
2 năm:      Feature mới → ???     💀 Gần như bất khả thi
```

Mỗi lần bạn "đi tắt", tốc độ phát triển **chậm dần theo thời gian**. Lúc đầu không đáng kể, nhưng sau nhiều tháng, nhiều năm — thời gian phát triển feature mới tăng lên đáng kể vì phải chiến đấu với code cũ.

---

## Nguyên nhân gây ra nợ kỹ thuật

### 1. 📊 Áp lực kinh doanh (Business Pressure)

Khi deadline gấp gáp, tính năng phải ship ngay — team chọn giải pháp nhanh nhất thay vì tốt nhất. Code "tạm được" hôm nay trở thành gánh nặng ngày mai.

> *"Cứ ship đi, sau quay lại fix"* — câu nói quen thuộc nhưng "sau" thường không bao giờ đến.

### 2. 🧪 Thiếu test (Lack of Tests)

Không có test coverage khiến team **sợ thay đổi code**:

- Không dám refactor vì không biết có gì bị vỡ
- Mỗi lần sửa phải test thủ công toàn bộ
- Bug lọt ra production vì không có safety net

### 3. 🤷 Thiếu hiểu biết (Lack of Understanding)

Khi team không hiểu rõ technical debt là gì:

- Không nhận ra code đang tích lũy nợ
- Không dành thời gian cho refactoring vì "code vẫn chạy mà"
- Management không thấy giá trị của refactoring → không allocate time

### 4. 🔗 Các component liên kết chặt (Strict Coherence of Components)

Khi các phần của hệ thống **gắn chặt với nhau** (tight coupling):

- Thay đổi một module → phải sửa nhiều module khác
- Không thể test hay deploy riêng lẻ từng phần
- Mỗi thay đổi nhỏ trở thành thay đổi lớn và rủi ro

---

## ⚡ Điểm tới hạn

Có một ngưỡng mà khi nợ kỹ thuật vượt qua, dự án gần như **không thể phát triển tiếp**:

- Thêm bất kỳ feature nào cũng gây ra bug mới
- Fix bug này lại tạo ra bug khác
- Thời gian phát triển tăng theo cấp số nhân
- Developer mới join team mất hàng tuần chỉ để hiểu code

Khi đến điểm này, team thường phải đối mặt với quyết định khó khăn: **tiếp tục chịu đựng hay viết lại từ đầu** (rewrite). Cả hai đều tốn kém, nhưng refactoring thường xuyên từ đầu có thể ngăn chặn tình huống này.

---

## 🎮 Trong Game Dev

Technical debt trong game dev có những dạng đặc trưng:

### 🏃 Game Jam Code
Code viết trong 48-72 giờ game jam hoàn toàn là nợ kỹ thuật. Nếu muốn phát triển tiếp thành game hoàn chỉnh, **bắt buộc phải refactor** — thường là viết lại phần lớn.

### 🧪 Prototype Trap (Bẫy Prototype)
Prototype ban đầu hoạt động tốt → team quyết định "build tiếp trên nền này" → code prototype không được thiết kế để scale → nợ chồng nợ.

> 💡 **Lời khuyên:** Luôn coi prototype code là **throwaway code**. Khi prototype được approve, hãy bắt đầu viết lại với architecture đúng đắn.

### ⏰ Crunch Time
Giai đoạn crunch trước release thường tạo ra lượng lớn technical debt:

- Hardcode giá trị để fix bug nhanh
- Skip code review để ship kịp deadline
- Tắt warning, bỏ qua best practice

Sau mỗi milestone hay release, hãy dành thời gian **sprint 0** để trả nợ kỹ thuật trước khi bắt đầu feature mới.

### 🎮 Ví dụ cụ thể trong Unity

```
❌ Nợ kỹ thuật phổ biến:
├── God class "GameManager" với 3000+ dòng code
├── Find("PlayerObject") hardcode khắp nơi
├── Magic number: if (health < 0.3f) // 0.3f là gì?
├── Singleton lạm dụng cho mọi thứ
└── Update() chứa logic nặng không cần chạy mỗi frame
```

---

## 🗺️ Điều hướng

| Hướng | Liên kết |
|-------|----------|
| ← Trước | [Clean Code](./01-clean-code.md) |
| → Tiếp theo | [When to Refactor](./03-when-to-refactor.md) |

---

> 📝 **Nguồn gốc:** [Refactoring.Guru](https://refactoring.guru/) · Tác giả: Alexander Shvets · Minh họa: Dmitry Zhart
