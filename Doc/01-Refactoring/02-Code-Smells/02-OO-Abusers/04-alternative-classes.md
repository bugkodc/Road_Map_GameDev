# Alternative Classes with Different Interfaces

> 📖 **Nguồn:** [Refactoring.Guru — Alternative Classes with Different Interfaces](https://refactoring.guru/smells/alternative-classes-with-different-interfaces) | Tác giả: Alexander Shvets

## 📋 Dấu hiệu & Triệu chứng (Signs & Symptoms)

Hai class thực hiện **chức năng giống nhau** nhưng method names **khác nhau**. Developer không thể swap giữa hai class vì interface của chúng khác nhau, dù behavior tương đương.

Dấu hiệu nhận biết:
- Hai class có method làm **cùng việc** nhưng tên khác nhau
- Không thể dùng **interface chung** cho hai class dù chúng có cùng mục đích
- Code phải biết chính xác **class nào** đang dùng thay vì dùng abstraction
- Duplicate logic giữa hai class vì không thể tái sử dụng

## ❓ Nguyên nhân (Reasons for the Problem)

- **Developer không biết class kia tồn tại** — Trong team lớn, hai người tạo class tương tự mà không biết
- **Thiếu convention** — Không có quy ước đặt tên thống nhất trong team
- **Library khác nhau** — Dùng hai library có class tương tự nhưng API khác
- **Refactoring nửa chừng** — Đổi tên ở một nơi nhưng quên nơi khác

## 💊 Cách điều trị (Treatment)

Các kỹ thuật refactoring giúp giải quyết:

- **[Rename Method](../../03-Refactoring-Techniques/)** — Đổi tên method để thống nhất interface
- **[Extract Superclass](../../03-Refactoring-Techniques/)** — Tạo superclass/interface chung cho cả hai class
- **[Move Method](../../03-Refactoring-Techniques/)** — Di chuyển method để behavior nằm đúng chỗ
- **[Add Parameter](../../03-Refactoring-Techniques/)** / **[Remove Parameter](../../03-Refactoring-Techniques/)** — Thống nhất method signatures

## ✅ Lợi ích (Payoff)

- 🔄 **Tái sử dụng tốt hơn** — Interface chung cho phép swap implementations
- 🧹 **Giảm duplication** — Gộp logic trùng lặp
- 📐 **Tuân thủ DRY** — Don't Repeat Yourself
- 🔌 **Dễ mở rộng** — Thêm implementation mới qua interface

## 🎮 Trong Game Dev

### Ví dụ phổ biến:
- **AudioPlayer vs SoundManager** — Cả hai đều play/stop/pause sound nhưng method names hoàn toàn khác nhau
- **ObjectPool vs PoolManager** — Cùng chức năng pool objects nhưng API khác
- **EventBus vs MessageSystem** — Cùng publish/subscribe nhưng naming khác

### Cải thiện:

```
❌ Trước:
class AudioPlayer {
    void PlayClip(AudioClip clip) { ... }
    void StopClip() { ... }
    void SetClipVolume(float vol) { ... }
}

class SoundManager {
    void EmitSound(AudioClip sound) { ... }
    void Silence() { ... }
    void AdjustLevel(float level) { ... }
}
// Hai class, cùng việc, nhưng không thể swap!
```

```
✅ Sau:
interface IAudioService {
    void Play(AudioClip clip);
    void Stop();
    void SetVolume(float volume);
}

class AudioPlayer : IAudioService { ... }
class SoundManager : IAudioService { ... }
// Giờ có thể dùng lẫn nhau qua interface!
```

---

> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Refactoring.Guru](https://refactoring.guru/) — Tác giả: Alexander Shvets, Minh họa: Dmitry Zhart

⬅️ [Quay lại: OO Abusers](./00-oo-abusers-overview.md) | ⬅️ [Trước: Refused Bequest](./03-refused-bequest.md)
