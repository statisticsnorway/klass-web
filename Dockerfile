# Step 1: Build the app
FROM node:20 AS builder

# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --verbose
COPY .babelrc .
COPY bin/ ./bin/
COPY config/ ./config/
COPY src/ ./src/
RUN npm run build

# Step 2: Serve the built files using Nginx
FROM nginx:1.27.4-alpine
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
