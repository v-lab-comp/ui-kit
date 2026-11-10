# Док-сайт (VitePress) в Docker

В образе: **`pnpm docs:build`** и **`pnpm build-storybook`** → статика в **`nginx`** (`/usr/share/nginx/html`, Storybook — в `/usr/share/nginx/html/storybook`).

## Локально

```bash
pnpm run docs:docker
# или в фоне
docker compose -f docs-site/docker/docker-compose.yml up --build -d
```

Порт на хосте Docker выбирает сам (`'0:80'` в `docker-compose.yml`). Узнать его:

```bash
docker compose -f docs-site/docker/docker-compose.yml port docs 80
```

### Basic Auth

Пароль задаётся переменной **`DOCS_BASIC_AUTH_PASSWORD`** при запуске контейнера, логин — **`DOCS_BASIC_AUTH_USER`** (по умолчанию `docs`). Без пароля доступ открыт. Поисковые боты (список User-Agent в `default.conf`) и **`/healthz`** пускаются без пароля.

```bash
DOCS_BASIC_AUTH_PASSWORD=secret docker compose -f docs-site/docker/docker-compose.yml up --build -d
```

## Деплой

Автоматического деплоя док-сайта сейчас нет. Пайплайн GitLab CI, который пересобирал и перезапускал контейнер на сервере, удалён при переезде репозитория на GitHub, а замена ещё не настроена — статус в `docs/tech-debt/package-registry.md`. Workflow `.github/workflows/ci.yml` собирает сайт и Storybook только для проверки и никуда их не выкладывает.

Чтобы обновить доки на сервере, соберите образ и перезапустите контейнер вручную, из корня репозитория:

```bash
docker build -f docs-site/docker/Dockerfile --build-arg DOCS_BASE=/ -t docs-site .
docker rm -f v-lab-docs 2>/dev/null || true
docker run -d --restart unless-stopped --name v-lab-docs -p 8080:80 docs-site
```

Basic Auth включается так же, как локально: добавьте `-e DOCS_BASIC_AUTH_PASSWORD=…` в `docker run`.

## Домен (nginx на сервере)

Контейнер из примера выше слушает **`8080`** на машине. Чтобы открывать доки по домену, на хосте ставится **nginx** с `proxy_pass` на **`http://127.0.0.1:8080`**. Готовый пример server-блока (для примерного домена **`docs.example.com`**): **`nginx-host-reverse-proxy.conf.example`** (скопировать в `/etc/nginx/sites-available/`, при другом домене поправить `server_name`, включить сайт, `nginx -t`, reload). В DNS — **A**-запись домена на IP сервера.

Отдельный домен для Storybook не нужен: он собирается в образ и отдаётся по **`/storybook/`** на том же хосте.

## Префикс (`DOCS_BASE`)

Сборка VitePress кладёт ассеты по префиксу **`base`**. Если доки висят **в корне** (`http://host:8080/`) — нужно **`DOCS_BASE=/`** (так по умолчанию в `Dockerfile` и `docker-compose.yml`). Если сайт по адресу **`…/имя-проекта/`** (например, статический хостинг в подкаталоге) — задай **`DOCS_BASE=/имя-проекта/`** при сборке:

```bash
DOCS_BASE=/my-prefix/ docker compose -f docs-site/docker/docker-compose.yml up --build -d
```
