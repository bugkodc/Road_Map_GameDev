# Audio System API

> 📖 **Source:** This document was compiled and written in detail from the [Unity Scripting Reference — UnityEngine.Audio](https://docs.unity3d.com/ScriptReference/AudioSource.html), compatible with the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Unity's audio system controls the playback of background music (BGM) and sound effects (SFX). Optimal audio programming requires correctly understanding the interaction between the **AudioListener** (the player's ears), the **AudioSource** (the speaker that emits the sound source), the **AudioMixer** (the mixing and filtering board), and the technique of optimizing RAM by reusing sound emitters through Object Pooling.

---

## 🔊 1. The Nature of AudioSource vs AudioListener

The audio system works much like the real world:
*   **AudioListener:** Plays the role of the ears. Only **one active AudioListener** is allowed to exist in the entire Scene (usually attached to the Main Camera). If two listeners are active at the same time, Unity will warn you and the 3D audio will be computed with the wrong direction.
*   **AudioSource:** Plays the role of the speaker. There can be hundreds of AudioSources in the game world.
*   **3D Spatial Sound:** 3D audio relies on the distance between the AudioSource and the AudioListener to automatically reduce the volume (the Rolloff curve) and split the stereo channels (left/right), creating a sense of realistic space.

---

## 🎛️ 2. The AudioMixer & Dynamic Control

The `AudioMixer` is an asset that stores the configuration of the output audio streams (such as Master, Music, and SFX). Programmatically interacting with the AudioMixer allows you to:
*   **Adjust volume dynamically:** The player drags a slider in the Settings to adjust the game's volume.
*   **Special audio effects:** When the character falls into water, apply a Lowpass Filter to the AudioMixer stream to smoothly create a muffled sound effect.
*   **Slow-motion Pitch:** When slowing down time (Time.timeScale < 1), you can adjust the AudioMixer's `pitch` property so the audio drops in tone accordingly.

---

## 🎮 Practical Source Code (Unity C#)

Below is a Sound Manager written in C# that manages sound effect (SFX) playback using an Object Pool to avoid RAM garbage, along with a background music (BGM) switching mechanism that transitions smoothly by fading the volume (Crossfade).

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
    // 🔊 PLAY SOUND EFFECTS (SFX POOLING)
    // ==========================================
    public void PlaySfx(AudioClip clip, Vector3 position, float volume = 1.0f)
    {
        if (clip == null) return;

        // Find a free AudioSource in the Pool
        AudioSource source = sfxPool.Find(s => !s.gameObject.activeSelf);

        if (source != null)
        {
            source.transform.position = position;
            source.gameObject.SetActive(true);
            source.clip = clip;
            source.volume = volume;
            source.Play();

            // Automatically disable it after the clip finishes playing
            StartCoroutine(DisableSourceAfterPlay(source, clip.length));
        }
        else
        {
            Debug.LogWarning("[SoundManager] No free AudioSource left in the Pool!");
        }
    }

    private IEnumerator DisableSourceAfterPlay(AudioSource source, float delay)
    {
        yield return new WaitForSeconds(delay);
        source.Stop();
        source.gameObject.SetActive(false);
    }

    // ==========================================
    // 🎛️ BACKGROUND MUSIC CONTROL (BGM CROSSFADE)
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

            // fadeOutSource gradually lowers its volume, fadeInSource gradually raises it
            fadeOutSource.volume = Mathf.Lerp(startVolumeVal, 0f, percent);
            fadeInSource.volume = Mathf.Lerp(0f, 1.0f, percent);

            yield return null;
        }

        fadeOutSource.Stop();
    }

    // Adjust the Mixer volume dynamically (e.g. called from an audio settings Slider)
    // mixerParameterName can be "BGMVolume" or "SFXVolume"
    public void SetGroupVolume(string mixerParameterName, float volumePercent)
    {
        // dB = 20 * log10(percent)
        // dB ranges from -80dB (muted) to 0dB (maximum volume)
        float decibel = volumePercent <= 0.0001f ? -80f : Mathf.Log10(volumePercent) * 20f;
        mainMixer.SetFloat(mixerParameterName, decibel);
    }
}
```

---
> 📚 **Source:** Content referenced from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [Events & Actions API](./06-events-api.md) |
| → Next | [AI & Navigation API](./08-ai-api.md) |
