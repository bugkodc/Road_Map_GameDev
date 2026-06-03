# Unity.Multiplayer (Lập trình Mạng thế hệ mới)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — Unity.Multiplayer](https://docs.unity3d.com/ScriptReference/Unity.Multiplayer.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Giao diện lập trình mạng thế hệ mới của Unity hỗ trợ kết nối đồng bộ đa người chơi.

---

## 🧱 1. Lập trình Game mạng hiệu năng cao với Netcode

Unity cung cấp giải pháp lập trình mạng Netcode cho GameObjects hoặc Netcode cho Entities.

* **`NetworkManager`**: Trái tim điều khiển kết nối mạng giữa Server, Client và Host.
* **`NetworkVariable`**: Tự động đồng bộ các biến quan trọng (như Máu, Vị trí) từ Server xuống tất cả các máy Client kết nối.

---

## 📐 2. Cạm bẫy Hack/Cheat ở phía Client

Luôn áp dụng nguyên tắc: **Server là người quyết định tối cao (Server-Authoritative)**. Không bao giờ tin cậy dữ liệu tính toán lượng sát thương hoặc điểm số gửi lên từ phía Client.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `Unity.Multiplayer`.

```csharp
using UnityEngine;
#if UNITY_NETCODE
using Unity.Netcode;

public class NetworkPlayerHealth : NetworkBehaviour
{
    // Biến máu tự động đồng bộ qua mạng từ Server xuống Client
    public NetworkVariable<int> health = new NetworkVariable<int>(100, NetworkVariableReadPermission.Everyone, NetworkVariableWritePermission.Server);

    public override void OnNetworkSpawn()
    {
        health.OnValueChanged += OnHealthChanged;
    }

    private void OnHealthChanged(int oldVal, int newVal)
    {
        Debug.Log($"[Network] Máu cập nhật qua mạng: {newVal}");
    }
}
#endif
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Unity.Mathematics](01-mathematics.md) |
| → Tiếp theo | [Unity.PlayMode](play-mode.md) |
