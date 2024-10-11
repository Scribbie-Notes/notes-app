# 🚀 Introduction

**Scribbie** is a powerful, intuitive note-taking website built specifically for working professionals who want to manage their notes seamlessly and effectively.

---

## 🔥 Tech Stack

- **Frontend**: React.js, TailwindCSS, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Google Auth
- **Deployment**: Vercel

---

## 💻 Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed:

1. **Node.js**: [Download Node.js](https://nodejs.org)
2. **MongoDB**: [Download MongoDB](https://www.mongodb.com)
3. **Git**: [Download Git](https://git-scm.com)

### 🚀 Running Scribbie on Your Local Machine

Follow these steps to get Scribbie running on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yashmandi/notes-app.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd notes-app
    ```

3. **Install dependencies for both backend and frontend**:

    - Install backend dependencies:
      ```bash
      cd backend
      npm install
      ```

    - Install frontend dependencies:
      ```bash
      cd ../frontend
      npm install
      ```

4. **Set up environment variables**: Create `.env` files in both backend and frontend directories with the necessary values.  
   Here's a sample configuration:

    **Backend `.env`:**
    ```bash
    # Backend Environment Variables
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    GOOGLE_API_TOKEN=your_google_api_token_here
    ```

    **Frontend `.env`:**
    ```bash
    # Frontend Environment Variables
    VITE_BACKEND_URL=http://localhost:5000
    VITE_REACT_APP_GOOGLE_API_TOKEN=your_google_api_token_here
    ```

5. **Run the project**:
    - Run the backend server:
      ```bash
      cd backend
      npm start
      ```
    - Run the frontend:
      ```bash
      cd ../frontend
      npm run dev
      ```

---

# 📚 Contribution Guidelines
We welcome contributions from the community! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

---


# 👀 Our Contributors

- We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating Ratna-Supermarket to greater heights.
- Make sure you show some love by giving ⭐ to our repository.

<div align="center">

  <a href="https://github.com/Scribbie-Notes/notes-app">
    <img src="https://contrib.rocks/image?repo=Scribbie-Notes/notes-app&&max=1000" />
  </a>
</div>

---

# 🤝 Code of Conduct
All contributors must adhere to our [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) to ensure a positive collaboration environment.

---

🎉 Happy Contributing!
Let’s work together to make Scribbie an even better tool!

