# Repozitoriydagi hujjatlar

Loyiha ildizidagi **`docs/`** katalogi — paketni qo‘llab-quvvatlovchi jamoa uchun markdown: arxitektura, jarayonlar bo‘yicha qo‘llanmalar, ma’lumotnomalar. U ushbu VitePress saytiga avtomatik nusxa ko‘chirilmaydi: fayllar git’da turadi va ularni IDE yoki repozitoriyning veb-interfeysida o‘qish qulayroq.

## Qayerdan boshlash

| Fayl                   | Tarkib                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/README.md`       | Mundarija: kirish nuqtalari va tashqi havolalar                                                                                                         |
| `docs/CONTRIBUTING.md` | Jarayon (branch’lar, PR, reliz) va hujjatlarni yuritish qoidalari: nima qayerga yoziladi, bog‘lanishlar daraxti                                         |
| `docs/architecture/`   | Arxitektura: input, overlay, layout, stillar, mavzular (skinlar va kontraktlar), bundling, adapter shablonlari                                          |
| `docs/guides/`         | Qo‘llanmalar: o‘rnatish, nashr qilish, migratsiyalar, yangi komponent, accessibility                                                                    |
| `docs/reference/`      | Ma’lumotnomalar: komponentlar katalogi, sub-entry, hook’lar, token’lar                                                                                  |
| `docs/changes/`        | Oylar bo‘yicha ichki o‘zgarishlar jurnali (batafsil, paket jamoasi uchun)                                                                               |
| `docs/tech-debt/`      | Texnik qarz: hal qilinishi kerak bo‘lgan ma’lum muammolar, har bir vazifa — alohida fayl (masalan, Next.js App Router uchun `'use client'` direktivasi) |

Ushbu VitePress sayti — paketni **ishlatadigan** jamoalar uchun loyihaning ochiq yuzasi. Repozitoriydagi hujjatlar — paketni **yuritadigan** jamoa uchun.
