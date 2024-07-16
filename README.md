## 🚀 Introduction
Scribbie is a powerful note-taking website designed for working professionals. (Visit: https://scribbie-notes.vercel.app)

## 🔥 Tech Stack
- React.js
- Node.js
- MongoDB
- Express.js
- TailwindCSS
- React Hot Toast
- Vercel
- Google Auth

## 💻 Getting started

### Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js: Ensure you have Node.js installed. You can download it from Node.js official website.

MongoDB: Ensure you have MongoDB installed and running. You can download it from MongoDB official website.

Git: Ensure you have Git installed. You can download it from Git official website.

### Run on your local machine

#### 1. Clone the repository

```
git clone https://github.com/yashmandi/notes-app.git
```

#### 2. Navigate to the project directory:
```
cd notes-app
```

#### 3. Install dependencies for both backend and frontend:
```
cd backend
npm install
cd ..frontend
npm install
```
#### 4. Create .env files for both backend and frontend with the necessary environment variables.

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

## Contribution Guidelines
We welcome contributions from the community! To ensure a smooth process for everyone, please follow these guidelines:

1. Fork the repository: Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.
2. Clone your fork: Clone your forked repository to your local machine.
3. Create a new branch: Create a new branch for your feature or bug fix. Use a descriptive name for your branch.
4. Make your changes: Implement your feature or fix the bug.
5. Write tests: If applicable, write tests to cover your changes.
6. Commit your changes: Write clear, concise commit messages.
7. Push your changes: Push your changes to your forked repository.
8. Submit a pull request: Open a pull request to merge your changes into the main repository.

### 🍰 Steps to contribute 
1. Fork the Repository: Click the "Fork" button on the top right of this page to fork this repository to your GitHub account.

2. Clone Your Fork: Clone your forked repository to your local machine.
```
git clone https://github.com/yashmandi/notes-app.git
```

3. Create a New Branch: Create a new branch for your feature or bug fix.
```
git checkout -b feature-name
```

4. Make Your Changes: Implement your feature or fix the bug.
Commit Your Changes: Commit your changes with a clear and concise message.
```
git commit -m "Add feature or fix bug"
```

5. Push Your Changes: Push your changes to your forked repository.
```
git push origin feature-name
```

6. Submit a Pull Request: Open a pull request to merge your changes into the main repository. Provide a clear description of the changes you made and why they are necessary.