# Step 1: Build the React app
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create necessary directories and set permissions
RUN mkdir -p /tmp/nginx/client_body \
    /tmp/nginx/proxy \
    /tmp/nginx/fastcgi \
    /tmp/nginx/uwsgi \
    /tmp/nginx/scgi \
    && chown -R 1069:1069 /tmp/nginx \
    && chmod -R 755 /tmp/nginx \
    && chown -R 1069:1069 /usr/share/nginx/html \
    && chown -R 1069:1069 /etc/nginx \
    && touch /tmp/nginx.pid \
    && chown -R 1069:1069 /tmp/nginx.pid

# Copy the build output from builder stage
COPY --from=builder /app/build .

# Set user to 1069
USER 1069

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]