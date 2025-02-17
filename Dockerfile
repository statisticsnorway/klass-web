# Step 1: Build the React app
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY .babelrc .
COPY bin/ ./bin/
COPY config/ ./config/
COPY src/ ./src/
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy the build output from builder stage
COPY --from=builder /app/build .

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copy MIME types config
COPY mime.types /etc/nginx/mime.types

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Set user to 1069
USER 1069

EXPOSE 3000
CMD ["/start.sh"]
