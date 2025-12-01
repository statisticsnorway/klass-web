# Step 1: Build the app
FROM node:20 AS builder

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
FROM cgr.dev/chainguard/nginx@sha256:50b986b188c26457d060c9e16665b51d2e5e252019ba4e921cb990c71cd24802
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY mime.types /etc/nginx/mime.types
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
