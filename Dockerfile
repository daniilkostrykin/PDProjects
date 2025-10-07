# Multi-stage Dockerfile for Vite (React) frontend
# Works with any checked-out git branch. The branch you build is the one in your working tree.

# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source
COPY . .

# Optional: pass build-time envs for Vite (e.g. VITE_API_URL)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build static assets
RUN npm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine AS runtime

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Provide a basic nginx config optimized for SPAs
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
}
EOF

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

# Default command
CMD ["nginx", "-g", "daemon off;"]


