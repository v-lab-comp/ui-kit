# [2026-07-29] Кнопки — hover-ореол, motion-токены, `customColor` у Button

### Что изменено

**Added**

- **Hover-ореол для кнопок.** Новая утилита `src/styles/interactions.module.css`, класс `halo`, подключается через CSS Modules `composes`. При наведении вокруг кнопки раскрывается кольцо в цвет палитры; геометрия и размер не меняются — кольцо живёт на `::after` и не влияет на layout. Тайминг асимметричный: появление 130 мс, уход 280 мс, нажатие 60 мс (на нажатии свечение уходит, остаётся кромка). `prefers-reduced-motion` снимает анимацию, состояние остаётся считываемым.
- **Трактовка по варианту `Button`.** Ключевое правило: кольцо всегда контрастирует с телом кнопки, иначе сливается с заливкой и кнопка читается как «раздувшаяся». Насыщенное тело (`filled`, `lighter`) → бледная аура 3px; бледное или прозрачное тело (`stroke`, `ghost`, иконочные кнопки) → кромка 1px в акцентном цвете вплотную к краю. Кромка не имеет отступа намеренно — чтобы не путаться с `:focus-visible` (у того `outline-offset: 2px`).
- **Исключение для нейтральной палитры.** У `.color-neutral` для кольца непригодны обе переменные: `--pal-base` это `--bg-surface-800` (#262626, читается как чёрная обводка), а `--pal-bg-hover` это `--bg-weak-50` (#f7f7f7, совпадает с типовым фоном страницы и кольцо пропадает). Введён токен `--halo-neutral` среднего тона (`--neutral-400` в светлой теме, `--neutral-500` в тёмной): он контрастирует и с тёмным телом нейтральной кнопки, и со светлым фоном страницы, и с белой карточкой. Правило `.btn:global(.color-neutral)` со специфичностью (0,2,0) перекрывает переменные вариантов (0,1,0) независимо от порядка правил в бандле.
- **Motion-токены** в `tokens.css`: `--motion-duration-fast`, `--motion-ease-standard`, `--motion-duration-halo-in` / `-out` / `-press`, `--halo-neutral`. До этого в ките не было ни одного motion-токена — длительности были захардкожены в компонентах (де-факто стандарт `0.15s ease`, ~43 места).
- **`Button`** — проп `customColor?: string` (произвольный hex). Реализован по уже существующей в ките конвенции: `customColor` перекрывает `color`, класс палитры снимается, `--pal-*` приходят инлайном через `customPaletteStyle` из `src/utils/customPalette.ts`. Ровно так же устроены `Badge` и `Tag` — у `Button` этого просто не было. Ореол подхватывает кастомный цвет автоматически, потому что читает `--pal-base` / `--pal-bg-hover`.

**Changed**

- **`Button`** — `transition` переведён с захардкоженного `0.15s ease` на токены; значение сохранено (150 мс), чтобы не выбиваться из остального кита. Добавлен блок `prefers-reduced-motion`, которого у компонента не было.

### Решения по реализации

- **Ореол на псевдоэлементе, а не `box-shadow` на самой кнопке.** У `.navBtn` (Calendar), `.pageBtn` (Table), `.fileItemAction` (FileUpload), `.triggerGrid` (AppSwitcher) уже есть собственные `box-shadow` и `transition`. Правило утилиты затирало бы их целиком — `box-shadow` не складывается между правилами, — и победитель зависел бы от порядка в собранном CSS. У `::after` собственные тень и переход, пересечений нет.
- **`composes`, а не глобальный класс.** В репозитории `composes` до этого не использовался, обмен стилями шёл через глобальные классы палитры (`color-*`) и импорт чужого `styles`-объекта в TSX. Выбран `composes`, потому что он строже соответствует правилу «CSS Modules only» из `CLAUDE.md`: имена остаются хешированными и не конфликтуют в приложении-потребителе, а править нужно только CSS — ни один TSX не затронут. Механизм проверен на сборке: в выходе `btn: "_btn_… _halo_…"`, media-query `prefers-reduced-motion` не разворачивается минификатором.

### Затронутые файлы

- `src/styles/interactions.module.css` — **новый**: утилита `halo` (кольцо, тайминги, reduced-motion).
- `src/styles/tokens.css` — motion-токены и `--halo-neutral` (парное объявление для тёмной темы).
- `src/components/Button/Button.module.css` — `composes: halo`, переменные ореола по вариантам, исключение `.btn:global(.color-neutral)`, токены в `transition`, `prefers-reduced-motion`.
- `src/components/Button/Button.tsx` / `Button.types.ts` — проп `customColor`, `customPaletteStyle`, снятие класса палитры.
- `src/components/Button/Button.stories.tsx` — стори «Кастомный цвет (customColor)»: три hex × четыре варианта + кейс с невалидным значением.
- `composes: halo` добавлен в иконочные кнопки: `overlays/Modal/components/ModalHeader`, `Toast/ui`, `Tag`, `Calendar/CalendarHeader`, `PdfPreview`, `Table`, `inputs/SelectInput`, `inputs/PasswordInput`, `inputs/ShareLinkInput`, `inputs/DateInput`, `Comments/CommentRichInput` (3 класса), `Comments/CommentsSection`, `FileUpload`, `layout/Sidebar/Sidebar`, `AppSwitcher`.
- Доки — `docs-site/guide/components/button.md` (+ `en/`, `uz/`), публичный changelog `docs-site/guide/changelog.md` (+ `en/`, `uz/`).

### Известные ограничения

- Ореол обрезается там, где у родителя свой `overflow: hidden`: `.btnGroup` в `Table` (пагинация) и `.trigger` в `AppSwitcher`. Осознанно не трогали — это чужой layout, правка может сломать скругления группы.
- Визуальная проверка в браузере не выполнялась (расширение Chrome не было подключено): проверка статическая — `prettier`, `typecheck`, `eslint`, `build` и инспекция скомпилированного `dist/style.css`. Подбор тонов (`--halo-neutral`, ширина кромки) сделан по hex-значениям примитивов и требует подтверждения глазами в Storybook.

### Как вернуть

`git revert` коммита `feat(buttons): hover halo + motion tokens + Button customColor`.
