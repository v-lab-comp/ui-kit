---
name: use-semantic-shadows
description: Enforces use of semantic shadow tokens from src/skins/corporate/shadows.css for all box-shadow in the ui-kit, except Header and Sidebar. Use when adding or changing shadows, elevation, or drop shadows in components or styles.
---

# Semantic shadows only

When any `box-shadow` or elevation is needed in this project, use **only** the CSS variables from `src/skins/corporate/shadows.css`. Do not write raw shadow values (e.g. `rgba(...)`, `0 1px 2px`).

Components ship no CSS: shadows are written in the skin file of the component, `src/skins/corporate/components/<name>.css`, on contract selectors (`.vl-<name>`, `.vl-<name>__<part>`, `[data-…]`) inside the file's single `:where([data-vl-skin~='corporate']) { … }` block (native CSS nesting; the build flattens it to `:where([data-vl-skin~='corporate']) .vl-<name>`). The tokens are declared on `[data-vl-skin~='corporate']`, so they resolve only under the skin. Rules for writing a skin: `docs/architecture/theming.md`.

## Regular (elevation)

| Token                                | Use case                                          |
| ------------------------------------ | ------------------------------------------------- |
| `var(--shadow-regular-x-small)`      | Default subtle elevation (inputs, cards, avatars) |
| `var(--shadow-regular-x-small-soft)` | Soft hover (e.g. calendar day)                    |
| `var(--shadow-regular-small)`        | Hover state (e.g. nav buttons)                    |
| `var(--shadow-regular-medium)`       | Raised panels (e.g. calendar container)           |
| `var(--shadow-dropdown)`             | Dropdowns, popovers, menus                        |

## Custom (multi-layer + optional inner)

Use together: outer + inner. Example: `box-shadow: var(--shadow-x-small), var(--shadow-x-small-inner);`

| Outer              | Inner                    | Use case       |
| ------------------ | ------------------------ | -------------- |
| `--shadow-x-small` | `--shadow-x-small-inner` | Custom x-small |
| `--shadow-small`   | `--shadow-small-inner`   | Custom small   |
| `--shadow-medium`  | `--shadow-medium-inner`  | Custom medium  |
| `--shadow-large`   | `--shadow-large-inner`   | Custom large   |

## Colored (tinted shadows)

| Token                      | Use case                    |
| -------------------------- | --------------------------- |
| `--shadow-colored-gray`    | Gray tint                   |
| `--shadow-colored-primary` | Primary (blue) tint + inner |
| `--shadow-colored-blue`    | Blue tint + inner           |
| `--shadow-colored-purple`  | Purple tint + inner         |
| `--shadow-colored-orange`  | Orange tint + inner         |
| `--shadow-colored-green`   | Green tint + inner          |

## Card

| Token                 | Use case                                     |
| --------------------- | -------------------------------------------- |
| `--shadow-card-large` | Card elevation + `--shadow-card-large-inner` |

## Exceptions

- **Header and Sidebar** — components under `layout/Header` and `layout/Sidebar` (skin files `page-header.css`, `page-header-demo.css`, `sidebar*.css`; including HeaderCard and Sidebar stories) may keep hand-written box-shadow; this rule does not apply to them.
- **Focus rings** (e.g. `0 0 0 2px var(--primary-alpha-16)`) — not elevation; keep as needed.
- **Borders via box-shadow** (e.g. `inset 0 -1px 0`, `1px 0 0`) — decorative borders, not shadows; keep as needed.

## Example

```css
/* src/skins/corporate/components/my-component.css */
:where([data-vl-skin~='corporate']) {
  .vl-my-component {
    box-shadow: var(--shadow-regular-x-small);
  }

  .vl-my-component__dropdown {
    box-shadow: var(--shadow-dropdown);
  }

  :where(.vl-my-component)[data-elevated] {
    box-shadow: var(--shadow-small), var(--shadow-small-inner);
  }
}
```

Real usages: `src/skins/corporate/components/popover.css` and `select-input.css` (`--shadow-dropdown`), `accordion.css` and `table.css` (`--shadow-regular-x-small`), `base-input.variables.css` (`--base-input-shadow: var(--shadow-regular-x-small)`).
