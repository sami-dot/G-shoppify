# Use official Node.js image as the base image for building
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for better caching
COPY package*.json ./

# Install dependencies efficiently
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image for serving the static files
FROM nginx:alpine

# Copy Nginx configuration (if you have a custom one)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Set an image label for easy identification
LABEL description="Frontend React app served with Nginx"

# Default command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
