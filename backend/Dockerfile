# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Run the backend server in development mode
CMD ["npm", "start"]
