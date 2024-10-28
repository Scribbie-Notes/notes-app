# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 5173 for the frontend in development mode
EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev"]
