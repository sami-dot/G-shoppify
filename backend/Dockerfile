# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (the default for many Node.js apps)
EXPOSE 3000

# Set the image name (optional) for Docker registry usage
LABEL image-name="backend-app:latest"

# Default command to run your backend (adjust if different)
CMD ["npm", "start"]
