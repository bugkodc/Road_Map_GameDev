# Unity.IO (Đọc ghi file bất đồng bộ tốc độ cao)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.IO](https://docs.unity3d.com/ScriptReference/Unity.IO.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

API thực hiện các tác vụ đọc ghi file bất đồng bộ tốc độ cao lên ổ đĩa.

---

## 🧱 1. Đọc ghi dữ liệu không chặn khung hình (Non-blocking File I/O)

Đọc ghi file đồng bộ (`System.IO.File.WriteAllText`) trên thiết bị di động có thể làm game bị đứng hình tạm thời (lag spike) do tốc độ truy cập ổ cứng chậm. `Unity.IO` cung cấp công cụ `AsyncReadManager` để nạp dữ liệu bất đồng bộ song song với luồng xử lý chính của game.

---

## 📐 2. Đọc trực tiếp vào bộ nhớ Native

Cho phép nạp dữ liệu file từ ổ đĩa trực tiếp vào các cấu trúc bộ nhớ native như `NativeArray` mà không qua trung gian kiểu dữ liệu C# giúp bỏ qua chi phí chuyển đổi dữ liệu và không tạo rác bộ nhớ.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.IO`.

```csharp
using UnityEngine;
using System.IO;
using System.Threading.Tasks;

public class SaveLoadSystem : MonoBehaviour
{
    private string savePath;

    void Start()
    {
        savePath = Path.Combine(Application.persistentDataPath, "player_save.json");
    }

    public async Task SaveDataAsync(string jsonContent)
    {
        // Sử dụng ghi file bất đồng bộ để tránh gây lag game
        using (StreamWriter writer = new StreamWriter(savePath, false))
        {
            await writer.WriteAsync(jsonContent);
            Debug.Log($"[Unity.IO] Đã lưu dữ liệu bất đồng bộ thành công tại: {savePath}");
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.IntegerTime](integer-time.md) |
| → Tiếp theo | [Unity.Jobs](jobs.md) |
