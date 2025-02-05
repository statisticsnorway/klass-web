# Step 1: Build the React app
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy custom Nginx config (if needed)
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /tmp/nginx/client_body /tmp/nginx/proxy /tmp/nginx/fastcgi /tmp/nginx/uwsgi /tmp/nginx/scgi

# Copy the build output
COPY --from=builder /app/build .

# Expose port 80 (default Nginx port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
