# UnityEditor.Android (Android Build Configuration)

> 📖 **Source:** Material compiled and written in depth from the [Unity Scripting API — UnityEditor.Android](https://docs.unity3d.com/ScriptReference/UnityEditor.Android.html), based on the stable **Unity 6.4 (LTS)** release.

---

## 🎯 Intent

Configure Android builds in detail: set up a secure Keystore, choose the CPU architecture (ARM64, ARMv7), and manage exporting AAB/APK files.

---

## 🧱 1. Automating Android Build Configuration

To publish a game to the Google Play Store, developers must correctly configure the app signing certificate (Keystore) and choose the right export format, AAB (Android App Bundle). This can be configured automatically through source code.

---

## 📐 2. Configuring the Mobile CPU Architecture

Choose the ARM64 architecture instead of ARMv7 to meet Google Play's current mandatory 64-bit performance requirement.

---

## 🎮 Hands-on Source Code (Unity C#)

Below is real-world code showing how to program performance optimization, error handling, and system integration through the `UnityEditor.Android` subsystem.

```csharp
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;

public class AndroidBuildSetup
{
    public static void SetAndroidKeystore()
    {
        // Tự động gán thông tin chứng chỉ ký tệp cho Android Build
        PlayerSettings.Android.useCustomKeystore = true;
        PlayerSettings.Android.keystoreName = "mygame.keystore";
        PlayerSettings.Android.keyaliasName = "mykey";
        
        // Cấu hình build định dạng AAB thay vì APK thông thường
        EditorUserBuildSettings.buildAppBundle = true;
        
        Debug.Log("[Android.Editor] Đã cấu hình xong Keystore & AAB cho build Android.");
    }
}
#endif
```

---
> 📚 **Source:** Reference content from the [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Copyright Unity Technologies.

| Direction | Link |
|-------|----------|
| ← Back | [UnityEditor.Analytics](analytics.md) |
| → Next | [UnityEditor.AnimatedValues](animated-values.md) |
