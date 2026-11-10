# Typography: как скин находит стиль

Компонент не содержит стилей. Он рендерит класс `vl-typography` и data-атрибуты из контракта
`src/theme/contracts/typography.ts`:

- `data-variant` — `title` | `label` | `paragraph` | `subheading` | `docs`
- `data-size` — размер внутри варианта (`h1`…`h6`, `x-large`…`2x-small`, `label` / `paragraph` для docs)
- `data-weight` — толщина; у `docs` не рендерится (вес зашит в size)

Стили скина `corporate` — в `src/skins/corporate/components/typography.css`. Как и в остальных файлах
скина, все правила лежат в одном блоке `:where([data-vl-skin~='corporate']) { … }`. Стиль задаёт пара
вариант + размер:

```css
:where([data-vl-skin~='corporate']) {
  :where(.vl-typography)[data-weight='medium'] {
    font-weight: 500;
  }

  :where(.vl-typography)[data-variant='label']:where([data-size='x-large']) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.015em;
  }
}
```

Обёртка скина и якорь `:where(.vl-typography)` веса не добавляют, а `data-size` обёрнут в `:where()`,
чтобы специфичность пары была (0,1,0) — как у правил толщины; поэтому толщина и размер разрешаются
порядком правил. Если для пары (variant, size) правила нет, применяются только базовые стили.
Общие правила скина — `src/skins/corporate/README.md`.
