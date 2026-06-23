# Substitute Algorithm

> 📖 **Nguồn:** [Refactoring.Guru — Substitute Algorithm](https://refactoring.guru/substitute-algorithm) | Tác giả: Alexander Shvets

## ❌ Vấn đề (Problem)

Bạn muốn **thay thế một thuật toán** hiện tại bằng phiên bản mới — rõ ràng hơn, hiệu quả hơn, hoặc đơn giản hơn.

```csharp
// ❌ Thuật toán cũ — phức tạp, khó đọc
string FindPersonByName(string[] people, string name)
{
    for (int i = 0; i < people.Length; i++)
    {
        if (people[i].Equals("Don"))
            return "Don";
        if (people[i].Equals("John"))
            return "John";
        if (people[i].Equals("Kent"))
            return "Kent";
    }
    return "";
}
```

## ✅ Giải pháp (Solution)

**Thay thế body của method** bằng thuật toán mới, rõ ràng và hiệu quả hơn.

```csharp
// ✅ Thuật toán mới — đơn giản, rõ ràng
string FindPersonByName(string[] people, string name)
{
    var candidates = new HashSet<string> { "Don", "John", "Kent" };
    
    foreach (string person in people)
    {
        if (candidates.Contains(person))
            return person;
    }
    return "";
}
```

## 🔍 Tại sao cần Refactor (Why Refactor)

- **Thuật toán cũ phức tạp**: Có cách làm đơn giản hơn đã được phát hiện
- **Hiểu sâu hơn vấn đề**: Sau khi hiểu rõ requirement, nhận ra có approach tốt hơn
- **Library/Framework hỗ trợ**: Có sẵn giải pháp tốt hơn trong thư viện
- **Performance**: Thuật toán mới nhanh hơn (ví dụ: từ O(n²) xuống O(n log n))
- **Requirement thay đổi**: Yêu cầu mới cần thuật toán khác

## 👍 Lợi ích (Benefits)

| Lợi ích | Mô tả |
|---------|-------|
| 📖 **Code đơn giản hơn** | Thuật toán mới thường rõ ràng hơn |
| ⚡ **Performance tốt hơn** | Thuật toán tối ưu hơn |
| 🔧 **Dễ bảo trì** | Code đơn giản = ít bug tiềm ẩn |

## 📝 Cách thực hiện (How to Refactor)

1. **Đảm bảo method đã được tách biệt** (đã Extract Method nếu cần). Thuật toán nên nằm gọn trong một method
2. **Viết thuật toán mới** bên cạnh (hoặc thay thế trực tiếp)
3. **Chạy tất cả test** để đảm bảo kết quả giống nhau
4. **So sánh kết quả**: Nếu cả hai cho cùng output với mọi input, chuyển sang thuật toán mới
5. **Xóa thuật toán cũ** nếu không cần nữa

> 💡 **Mẹo**: Viết unit test kỹ trước khi thay thuật toán. Test giúp đảm bảo thuật toán mới hoạt động đúng.

## 🦨 Giúp điều trị các Code Smells

- 🔗 [Long Method](../../02-Code-Smells/01-Bloaters/01-long-method.md) — Thuật toán mới thường ngắn hơn
- 🔗 [Duplicate Code](../../02-Code-Smells/04-Dispensables/01-duplicate-code.md) — Thuật toán mới có thể gộp logic trùng lặp

## 🎮 Trong Game Dev

### Pathfinding — nâng cấp thuật toán:
```csharp
// ❌ Trước — BFS đơn giản
List<Node> FindPath(Node start, Node end)
{
    // BFS — không tối ưu cho grid lớn
    Queue<Node> queue = new Queue<Node>();
    // ... 30 dòng code BFS
}

// ✅ Sau — A* hiệu quả hơn
List<Node> FindPath(Node start, Node end)
{
    // A* — tối ưu hơn nhiều
    var openSet = new PriorityQueue<Node>();
    // ... A* algorithm
}
```

### Sorting — dùng API có sẵn:
```csharp
// ❌ Trước — tự viết sort
void SortLeaderboard(List<PlayerScore> scores)
{
    // Bubble sort tự viết — 20 dòng
    for (int i = 0; i < scores.Count; i++)
        for (int j = 0; j < scores.Count - 1; j++)
            // ...
}

// ✅ Sau — dùng LINQ/API
void SortLeaderboard(List<PlayerScore> scores)
{
    scores.Sort((a, b) => b.score.CompareTo(a.score));
}
```

### Collision Detection:
```csharp
// ❌ Trước — check tất cả pairs O(n²)
// ✅ Sau — dùng spatial partitioning (QuadTree, Grid) O(n log n)
```

### Lưu ý trong Game Dev:
- **Profile trước khi optimize**: Đừng thay thuật toán chỉ vì "có vẻ chậm"
- **A/B testing**: Có thể giữ cả hai thuật toán và so sánh performance
- **Unity có sẵn nhiều thứ**: Physics, NavMesh, DOTS — dùng built-in thay vì tự viết

---

## 🔗 Liên kết

- ⬆️ [Composing Methods — Tổng quan](./00-composing-methods-overview.md)
- ⬅️ [Replace Method with Method Object](./08-replace-method-with-method-object.md)
- 🔗 [Refactoring Techniques](../00-techniques-overview.md)

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart
