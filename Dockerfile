# Step 1: Build the app
FROM node:20 AS builder

# Expected values: test, prod
ARG target_env=prod

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --verbose
COPY .babelrc .
COPY config/ ./config/
COPY src/ ./src/
RUN if [ "$target_env" = "test" ]; then cp src/env/config/test/index.js src/js/config/index.js; else cp src/env/config/prod/index.js src/js/config/index.js ; fi
RUN if [ "$target_env" = "prod" ]; then export NODE_ENV=production; else export NODE_ENV=test; fi
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:1.27.4-alpine-slim
WORKDIR /usr/share/nginx/html

# Copy the build output from builder stage
COPY --from=builder /app/build .

COPY start.sh /start.sh
RUN chmod +x /start.sh
COPY mime.types /etc/nginx/mime.types
COPY nginx.conf /etc/nginx/nginx.conf

# Set user to 1069
USER 1069

EXPOSE 3000
CMD ["/start.sh"]
