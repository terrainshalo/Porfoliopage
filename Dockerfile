# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps (uses package-lock.json for reproducible installs; devDeps needed for the Vite/TS build)
COPY package*.json ./
RUN npm ci || npm install

# Build the production bundle -> /app/dist
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine AS serve

# Railway provides $PORT at runtime. Default for local `docker run`; Railway overrides it.
ENV PORT=8080
# Restrict the image's envsubst templating to ONLY $PORT so Nginx vars ($uri, $host) are left intact.
ENV NGINX_ENVSUBST_FILTER=PORT

# SPA config as a template; the nginx entrypoint renders ${PORT} into /etc/nginx/conf.d/default.conf on start.
RUN mkdir -p /etc/nginx/templates && printf 'server {\n\
    listen ${PORT};\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    location = /healthz { return 200 "ok"; add_header Content-Type text/plain; }\n\
}\n' > /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
# Default nginx entrypoint runs the template substitution, then starts nginx.
CMD ["nginx", "-g", "daemon off;"]
