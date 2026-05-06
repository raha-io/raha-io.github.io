# syntax=docker/dockerfile:1.7

# ---- Dependencies ----
FROM node:24-alpine AS deps
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Build ----
FROM node:24-alpine AS builder
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
RUN pnpm build

# ---- Runtime ----
FROM nginxinc/nginx-unprivileged:1.29-alpine AS runner

COPY --from=builder /app/out /usr/share/nginx/html

COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;

    # Hashed Next.js build assets — immutable, cache forever
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Other static assets — short cache
    location ~* \.(?:jpg|jpeg|png|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|css|js|map)$ {
        expires 7d;
        add_header Cache-Control "public";
        access_log off;
        try_files $uri =404;
    }

    # HTML routes — no cache; fall back to .html for clean URLs
    location / {
        add_header Cache-Control "no-cache";
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 /404.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss image/svg+xml;
}
EOF

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/ > /dev/null || exit 1
