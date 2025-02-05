# Step 1: Build the React app
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the production version of your app
RUN npm run build

# Step 2: Serve the built files using a lightweight web server
FROM nginx:latest

RUN mkdir -p /tmp/nginx

COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to Nginx's default public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Change Nginx configuration to listen on port 3000
RUN sed -i 's/80;/3000;/' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
