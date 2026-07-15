# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Vite env vars are baked in at build time; Railway passes service
# variables as build args when declared with ARG.
ARG VITE_WEB3FORMS_KEY
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY

COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine AS serve
ENV PORT=8080
ENV NGINX_ENVSUBST_FILTER=PORT

RUN mkdir -p /etc/nginx/templates && printf 'server {\n\
    listen ${PORT};\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    gzip on;\n\
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;\n\
    gzip_min_length 1024;\n\
\n\
    # Hashed Vite assets are immutable -> cache aggressively\n\
    location /assets/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
        try_files $uri =404;\n\
    }\n\
\n\
    # Never cache the HTML shell so deploys show up immediately\n\
    location / {\n\
        add_header Cache-Control "no-cache";\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    location = /healthz { return 200 "ok"; add_header Content-Type text/plain; }\n\
}\n' > /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
