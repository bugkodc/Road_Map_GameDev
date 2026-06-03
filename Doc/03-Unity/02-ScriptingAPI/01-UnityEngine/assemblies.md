# UnityEngine.Assemblies

> 📖 **Nguồn gốc:** Tài liệu được tổng hợp và biên soạn chuyên sâu từ [Unity Scripting API — UnityEngine.Assemblies](https://docs.unity3d.com/ScriptReference/UnityEngine.Assemblies.html) dựa trên phiên bản **Unity 6.4 (LTS) ổn định**.

---

## 🎯 Ý định (Intent)

Lớp quản lý và tra cứu thông tin của tất cả các cụm mã nguồn đã biên dịch (Assemblies) đang nạp chạy trong bộ nhớ RAM lúc runtime.

---

## 🧱 1. Tra cứu và Reflection Assembly lúc Runtime

Lớp này cho phép truy cập thông tin về cấu trúc mã nguồn đã được đóng gói thành các tệp `.dll` (Assembly). Hữu ích cho việc phát hiện các modding, plugin tải động hoặc kiểm tra phiên bản của thư viện.

* **Reflection Chi phí cao**: Tra cứu Reflection qua Assembly tốn tài nguyên CPU và bộ nhớ (GC Alloc), chỉ nên thực hiện một lần duy nhất lúc khởi động game (Awake/Start).

---

## 📐 2. Cạm bẫy hiệu năng

Hạn chế quét mọi Type trong tất cả Assembly lúc runtime. Hãy sử dụng cơ chế gán thuộc tính (Attribute) để đánh dấu các lớp cần tìm kiếm nhằm tăng tốc độ quét.

---

## 🎮 Mã nguồn thực chiến (Unity C#)

Dưới đây là đoạn mã thực tế cho thấy cách lập trình tối ưu hóa hiệu năng, xử lý lỗi và tích hợp hệ thống thông qua phân hệ `UnityEngine.Assemblies`.

```csharp
using System;
using UnityEngine;

public class AssemblyInspector : MonoBehaviour
{
    void Start()
    {
        // Lấy danh sách các Assemblies đang chạy trong AppDomain
        var assemblies = AppDomain.CurrentDomain.GetAssemblies();
        Debug.Log($"[Assemblies] Tổng số assembly đang chạy: {assemblies.Length}");
        
        foreach (var assembly in assemblies)
        {
            if (assembly.FullName.Contains("Assembly-CSharp"))
            {
                Debug.Log($"[Assemblies] Tìm thấy assembly chính: {assembly.FullName}");
                break;
            }
        }
    }
}
```

---
> 📚 **Nguồn gốc:** Nội dung tham khảo từ [Unity Documentation](https://docs.unity3d.com/Manual/index.html) — Bản quyền của Unity Technologies.

| Hướng | Liên kết |
|-------|----------|
| ← Quay lại | [UnityEngine.Apple](apple.md) |
| → Tiếp theo | [UnityEngine.Assertions](assertions.md) |
