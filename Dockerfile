# Step 1: Build the React app
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copy the build output from builder stage
COPY --from=builder /app/build .

# Set user to 1069
USER 1069

EXPOSE 3000
CMD ["/start.sh"]