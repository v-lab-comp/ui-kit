# Storybook

Interactive showcase of all components and galleries.

## Local run

From the repository root:

```bash
npm ci
npm run storybook
```

This starts the dev server; the default port is **6006** (see the exact URL in the `npm run storybook` output).

## Static build

For deployment or offline viewing:

```bash
npm run build-storybook
```

The output is the **`storybook-static/`** directory. You can serve it from any static host.

## How this site relates

- **VitePress** (`docs-site/`) — guides and component pages; in **Components**, the left nav mirrors Storybook folders (**Calendar**, **Components**, **Inputs**, **Layout**, **Overlays**).
- **Storybook** — the full catalog of stories, variants, and the Docs panel (**Gallery/**, **Design System/**, **Sidebar/**, etc. live here only).

When you publish the static Storybook build, configure the correct **base path** if the app is not at the domain root.
