# Step 1: Build the app
FROM node:23 AS builder

# Expected values: test, prod
ARG target_env=prod

WORKDIR /app
COPY package*.json ./
COPY .npmrc .
RUN npm ci --verbose
COPY .babelrc .
COPY config/ ./config/
COPY src/ ./src/
RUN if [ "$target_env" = "test" ]; then cp src/env/config/test/index.js src/js/config/index.js; else cp src/env/config/prod/index.js src/js/config/index.js ; fi
RUN if [ "$target_env" = "prod" ]; then export NODE_ENV=production; else export NODE_ENV=test; fi
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM cgr.dev/chainguard/nginx@sha256:d166cfff80ac94040ccc52c6a42768486483514f7494ca641a68399655b4a053
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY mime.types /etc/nginx/mime.types
COPY nginx.conf /etc/nginx/nginx.conf
# User set by default on Nais
USER 1069:1069
EXPOSE 3000
