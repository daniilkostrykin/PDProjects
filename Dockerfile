# ----------------------------------------------------
# STAGE 1: BUILDER (Сборка статических файлов)
# ----------------------------------------------------
# Используем Node.js SDK для установки зависимостей и сборки проекта.
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# [Оптимизация кэширования]: Сначала копируем только файлы зависимостей
# Если package.json и package-lock.json не меняются, Docker использует этот слой из кэша.
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Копируем остальные файлы проекта (исходный код)
COPY . .

# Получаем переменную VITE_API_URL, переданную из docker-compose
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Запускаем сборку проекта (Vite собирает файлы в папку /dist)
RUN npm run build

# ----------------------------------------------------
# STAGE 2: RUNTIME (Запуск Nginx)
# ----------------------------------------------------
# Используем минимальный образ Nginx (очень легкий и безопасный)
FROM nginx:1.27-alpine AS runtime

# Копируем собранные статические файлы из стадии 'builder'
# Важно: копируем только результат, а не весь Node.js SDK
COPY --from=builder /app/dist /usr/share/nginx/html

# Предоставляем конфигурацию Nginx для Single Page Application (SPA).
# Это гарантирует, что при прямом заходе по URL (например, /login) Nginx вернет index.html.
# Мы используем COPY <<'EOF' для встраивания конфигурации прямо в Dockerfile.
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Главное правило для SPA: если файл не найден, возвращаем index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Оптимизация кэширования статических активов
    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
}
EOF

# Документируем порт, который слушает контейнер
EXPOSE 80

# (Необязательно, но полезно) Добавляем проверку здоровья
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

# Команда по умолчанию для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]