# Audio System API (Hệ thống Âm thanh)

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chi tiết từ [Unity Scripting Reference — UnityEngine.Audio](https://docs.unity3d.com/ScriptReference/AudioSource.html) tương thích với **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Hệ thống âm thanh của Unity điều khiển việc phát nhạc nền (BGM) và hiệu ứng âm thanh (SFX). Lập trình âm thanh tối ưu yêu cầu hiểu đúng bản chất tương tác giữa **AudioListener** (tai nghe của người chơi), **AudioSource** (loa phát nguồn âm), **AudioMixer** (bàn trộn lọc âm), và kỹ thuật tối ưu hóa bộ nhớ RAM bằng cách tái sử dụng nguồn phát qua cơ chế Object Pooling.

---

## 🔊 1. Bản chất: AudioSource vs AudioListener

Hệ thống âm thanh hoạt động tương tự ngoài đời thực:
*   **AudioListener (Người nghe):** Đóng vai trò là đôi tai. Chỉ được phép tồn tại **duy nhất một AudioListener hoạt động** trong toàn bộ Scene (thường gắn trên Main Camera). Nếu có 2 listener hoạt động cùng lúc, Unity sẽ cảnh báo và âm thanh 3D sẽ bị tính toán sai hướng.
*   **AudioSource (Nguồn phát):** Đóng vai trò là chiếc loa. Có thể có hàng trăm AudioSource trong thế giới game.
*   **3D Spatial Sound:** Âm thanh 3D dựa vào khoảng cách giữa AudioSource và AudioListener để tự động giảm âm lượng (Rolloff curve) và phân kênh stereo (trái/phải) tạo cảm giác không gian thực tế.

---

## 🎛️ 2. Bàn trộn âm AudioMixer & Điều khiển Động

`AudioMixer` là tài sản lưu cấu hình các luồng âm thanh đầu ra (như Master, Music, SFX). Lập trình tương tác với AudioMixer cho phép:
*   **Điều chỉnh âm lượng động:** Người chơi kéo thanh trượt (slider) trong Settings để chỉnh tiếng game.
*   **Hiệu ứng âm thanh đặc biệt:** Khi nhân vật rơi xuống nước, áp dụng bộ lọc Lowpass Filter lên luồng AudioMixer để tạo hiệu ứng âm thanh bị nghẹt mượt mà.
*   **Slow-motion Pitch:** Khi làm chậm thời gian (Time.timeScale < 1), bạn có thể chỉnh thuộc tính `pitch` của AudioMixer để âm thanh trầm xuống tương ứng.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là một Sound Manager viết bằng C# quản lý phát âm thanh hiệu ứng (SFX) sử dụng Object Pool để tránh rác RAM và cơ chế chuyển bài nhạc nền (BGM) chuyển tiếp giảm âm lượng mượt mà (Crossfade).

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class SoundManagerDemo : MonoBehaviour
{
    public static SoundManagerDemo Instance { get; private set; }

    [Header("Audio Mixer References")]
    [SerializeField] private AudioMixer mainMixer;
    
    [Header("BGM Channels (For Crossfading)")]
    [SerializeField] private AudioSource bgmSourceA;
    [SerializeField] private AudioSource bgmSourceB;

    [Header("SFX Pool Settings")]
    [SerializeField] private AudioSource sfxSourcePrefab;
    [SerializeField] private int poolSize = 10;

    private List<AudioSource> sfxPool;
    private bool isUsingSourceA = true;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            InitializeSfxPool();
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void InitializeSfxPool()
    {
        sfxPool = new List<AudioSource>();
        for (int i = 0; i < poolSize; i++)
        {
            AudioSource source = Instantiate(sfxSourcePrefab, transform);
            source.gameObject.SetActive(false);
            sfxPool.Add(source);
        }
    }

    // ==========================================
    // 🔊 PHÁT HIỆU ỨNG ÂM THANH (SFX POOLING)
    // ==========================================
    public void PlaySfx(AudioClip clip, Vector3 position, float volume = 1.0f)
    {
        if (clip == null) return;

        // Tìm AudioSource đang rảnh trong Pool
        AudioSource source = sfxPool.Find(s => !s.gameObject.activeSelf);

        if (source != null)
        {
            source.transform.position = position;
            source.gameObject.SetActive(true);
            source.clip = clip;
            source.volume = volume;
            source.Play();

            // Tự động tắt sau khi phát xong clip
            StartCoroutine(DisableSourceAfterPlay(source, clip.length));
        }
        else
        {
            Debug.LogWarning("[SoundManager] Hết AudioSource rảnh trong Pool!");
        }
    }

    private IEnumerator DisableSourceAfterPlay(AudioSource source, float delay)
    {
        yield return new WaitForSeconds(delay);
        source.Stop();
        source.gameObject.SetActive(false);
    }

    // ==========================================
    // 🎛️ ĐIỀU KHIỂN NHẠC NỀN (BGM CROSSFADE)
    // ==========================================
    public void PlayBgm(AudioClip newClip, float fadeDuration = 1.0f)
    {
        AudioSource activeSource = isUsingSourceA ? bgmSourceA : bgmSourceB;
        AudioSource newSource = isUsingSourceA ? bgmSourceB : bgmSourceA;

        isUsingSourceA = !isUsingSourceA;
        newSource.clip = newClip;
        newSource.Play();

        StartCoroutine(CrossfadeCoroutine(activeSource, newSource, fadeDuration));
    }

    private IEnumerator CrossfadeCoroutine(AudioSource fadeOutSource, AudioSource fadeInSource, float duration)
    {
        float timer = 0f;
        float startVolumeVal = fadeOutSource.volume;

        while (timer < duration)
        {
            timer += Time.deltaTime;
            float percent = timer / duration;

            // fadeOutSource giảm dần âm lượng, fadeInSource tăng dần
            fadeOutSource.volume = Mathf.Lerp(startVolumeVal, 0f, percent);
            fadeInSource.volume = Mathf.Lerp(0f, 1.0f, percent);

            yield return null;
        }

        fadeOutSource.Stop();
    }

    // Chỉnh âm lượng Mixer động (Ví dụ gọi từ Slider cài đặt âm thanh)
    // mixerParameterName có thể là "BGMVolume" hoặc "SFXVolume"
    public void SetGroupVolume(string mixerParameterName, float volumePercent)
    {
        // dB = 20 * log10(percent)
        // dB nằm trong khoảng -80dB (tắt tiếng) đến 0dB (âm lượng tối đa)
        float decibel = volumePercent <= 0.0001f ? -80f : Mathf.Log10(volumePercent) * 20f;
        mainMixer.SetFloat(mixerParameterName, decibel);
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [Events & Actions API (Sự kiện)](./06-events-api.md) |
| → Tiếp theo | [AI & Navigation API (Tìm đường)](./08-ai-api.md) |
