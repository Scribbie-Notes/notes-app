### Introduction
Scribbie is a powerful note-taking website designed for working professionals. 

### Tech Stack
- React.js
- Node.js
- MongoDB
- Express.js
- TailwindCSS
- React Hot Toast
- Vercel
- Google Auth

### Getting started

#### Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js: Ensure you have Node.js installed. You can download it from Node.js official website.

MongoDB: Ensure you have MongoDB installed and running. You can download it from MongoDB official website.

Git: Ensure you have Git installed. You can download it from Git official website.

#### Run on your local machine

##### 1. Clone the repository

```
git clone https://github.com/yashmandi/notes-app.git
```

##### 2. Navigate to the project directory:
```
cd notes-app
```

##### 3. Install dependencies for both backend and frontend:
```
cd backend
npm install
cd ..frontend
npm install
```
##### 4. Create .env files for both backend and frontend with the necessary environment variables.

Sample ```.env``` for backend:
```
# Backend Environment Variables

# Port number for the backend server
PORT=5000

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/your-database-name

# API key for Indeed Jobs API
GOOGLE_API_TOKEN=your_google_api_token_here
```

Sample ```.env``` for frontend:
```
# Frontend Environment Variables

# Base URL of the backend server
VITE_BACKEND_URL=http://localhost:5000

# API key for Google services (if used in frontend)
VITE_REACT_APP_GOOGLE_API_TOKEN=your_google_api_token_here
```
