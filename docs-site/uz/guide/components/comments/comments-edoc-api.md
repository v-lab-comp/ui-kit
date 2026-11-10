---
title: 'Izohlar: EDOC API integratsiyasi'
description: EDOC backend javoblarini CommentThreadItem ga mapping qilish; yuborish / tahrirlash / soft-delete.
---

# Izohlar: EDOC API integratsiyasi

`CommentsSection` ni EDOC backend (`/edocapp/api/edoc/v1/documents/{document_id}/comments`) bilan to‘liq bog‘lash. Kit so‘rov yubormaydi — quyidagilarning hammasi ilova tomonida bajariladi.

## Javobni mapping qilish

EDOC API ro‘yxat uchun `{ data: { comments: [...] } }`, bitta obyekt uchun `{ data: { comment: {...} } }` qaytaradi. Har bir element — `DocumentCommentAPI`:

| API maydon          | Tip      | `CommentThreadItem` maydoni                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `id`                | `string` | `id`                                                                                     |
| `content`           | `string` | `contentHtml`                                                                            |
| `created_at`        | `string` | `createdAt`                                                                              |
| `is_edited`         | `bool`   | `isEdited`                                                                               |
| `is_deleted`        | `bool`   | `isDeleted` (faqat adminga keladi — oddiy foydalanuvchi soft-deleted yozuvlarni olmaydi) |
| `can_edit`          | `bool`   | `canEdit`                                                                                |
| `can_delete`        | `bool`   | `canDelete`                                                                              |
| `author.full_name`  | `string` | `author`                                                                                 |
| `author.avatar_url` | `string` | `avatarUrl`                                                                              |

> **Qoida:** front-end’da rollarni qayta tekshirmang. «Tahrirlash» / «O‘chirish» tugmalari faqat backend yuborgan `can_edit` / `can_delete` bo‘yicha chiziladi.

To‘liq misol (`mapApiToItem`, API klient, va `useState` ulanishi) — ruscha versiyada: [Комментарии: интеграция с EDOC API](/guide/components/comments/comments-edoc-api). Quyida — ushbu sahifaga maxsus farqlar.

## DELETE va admin

- Oddiy foydalanuvchi: DELETE dan keyin element keyingi GET da kelmaydi — uni state dan o‘chiring.
- Admin: keyingi GET da element `is_deleted: true` bilan keladi. UI ni darhol yangilash uchun mahalliy `isDeleted = true`, `canEdit = false`, `canDelete = false`, `contentHtml = ''` qiling.
- DELETE idempotent: ikkinchi chaqiriq ham `{ deleted: true }` qaytaradi.

## Xatoliklar

| Kod | Qachon                                                    | UI javobi                                                                  |
| --- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| 401 | sessiya tugadi                                            | login sahifasiga yo‘naltirish (`fetch` perehvatchigi)                      |
| 403 | foydalanuvchi muallif ham, admin ham emas                 | Edit/Delete tugmalari ko‘rinmagan bo‘lishi kerak; toast «Ruxsat yo‘q»      |
| 404 | hujjat o‘chirilgan / izoh allaqachon soft-deleted (oddiy) | elementni state dan jim olib tashlash                                      |
| 422 | bo‘sh matn / admin PATCH/DELETE allaqachon o‘chirilganga  | xatolik ko‘rsatish; DELETE bo‘lsa — mahalliy `isDeleted` bilan sinxronlash |

## HTML sanitatsiyasi

`content` Desk uslubidagi HTML sifatida keladi. Kit `dangerouslySetInnerHTML` orqali chizadi — **sanitatsiya backend yoki ilova zimmasida** (masalan `DOMPurify.sanitize(api.content)`). Kit faqat `CommentRichInput` orqali yuborishda `<script>` ni chiqarib tashlaydi.

## Tegishli

- [CommentsSection](./comments-section) — proplar va umumiy tuzilma
- [CommentRichInput](./comment-rich-input) — rich maydon, formatlash, tahrirlash rejimi
