# Documentation in the repository

The project root has a **`docs/`** directory — markdown for the team maintaining the package: architecture, process guides, references. It is **not** mirrored automatically on this site: files live in git and are easiest to read in the IDE or in the repository web UI.

## Where to start

| File                   | Contents                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `docs/README.md`       | Table of contents: entry points and external artefacts                                                                            |
| `docs/CONTRIBUTING.md` | Process (branches, PRs, releases) and documentation rules: what goes where, link tree                                             |
| `docs/architecture/`   | Architecture: inputs, overlays, layout, styling, theming (skins and contracts), bundling, adapters patterns                       |
| `docs/guides/`         | Guides: installation, publishing, migrations, new component, accessibility                                                        |
| `docs/reference/`      | References: components catalogue, sub-entry points, hooks, tokens                                                                 |
| `docs/changes/`        | Internal change log by month (detailed, for the package team)                                                                     |
| `docs/tech-debt/`      | Technical debt: known issues still to be solved, one file per task (e.g. the `'use client'` directive for the Next.js App Router) |

This VitePress site is the project’s public face for teams **consuming** the package. The repository documentation is for the team **maintaining** the package.
