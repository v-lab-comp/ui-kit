# VitePress → nginx. Basic Auth: env DOCS_BASIC_AUTH_PASSWORD при запуске контейнера.

FROM node:22-bookworm-slim AS build
WORKDIR /app

# Не запускать тяжёлый postinstall storybook-mcp (playwright install) при сборке образа
ENV CI=true

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG DOCS_BASE=/
ENV DOCS_BASE=${DOCS_BASE}

RUN pnpm run docs:build
RUN pnpm run build-storybook

FROM nginx:1.27-alpine

RUN apk add --no-cache apache2-utils curl

COPY --from=build /app/docs-site/.vitepress/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook
COPY docs-site/docker/default.conf /etc/nginx/conf.d/default.conf
COPY docs-site/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && rm -f /etc/nginx/conf.d/docs-auth-realm.map

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1/healthz || exit 1

ENTRYPOINT ["/entrypoint.sh"]
