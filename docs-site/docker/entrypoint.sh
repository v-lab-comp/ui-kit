#!/bin/sh
set -e

HTPASSWD_FILE=/etc/nginx/.htpasswd
REALM_MAP=/etc/nginx/conf.d/docs-auth-realm.map

rm -f "$HTPASSWD_FILE"

if [ -n "${DOCS_BASIC_AUTH_PASSWORD:-}" ]; then
  USER="${DOCS_BASIC_AUTH_USER:-docs}"
  htpasswd -bc "$HTPASSWD_FILE" "$USER" "$DOCS_BASIC_AUTH_PASSWORD"
  cat >"$REALM_MAP" <<'EOF'
map $is_bot $docs_auth_realm {
    default "Documentation";
    1 "off";
}
EOF
else
  printf '# auth_basic off for everyone\n' >"$HTPASSWD_FILE"
  cat >"$REALM_MAP" <<'EOF'
map $is_bot $docs_auth_realm {
    default "off";
}
EOF
fi

exec nginx -g 'daemon off;'
