# 🚀 Introduction

**Scribbie** is a powerful, intuitive note-taking website built specifically for working professionals who want to manage their notes seamlessly and effectively.

📌 **Visit:** [Scribbie Notes](https://scribbie-notes.vercel.app)

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

## 📚 Contribution Guidelines

We welcome contributions from the community to enhance **Scribbie**! If you're a GSSoC contributor, follow these guidelines to ensure a smooth contribution process:

### 👨‍💻 **For GSSoC Contributors**

1. **Get Assigned to an Issue**:  
   Ensure that you are assigned to a GitHub issue before working on it. This prevents duplication of effort.

2. **Fork the Repository**:  
   Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

3. **Clone Your Fork**:  
   Clone your forked repository to your local machine using the following command:
   ```bash
   git clone https://github.com/<your-username>/notes-app.git
   ```
   
4. **Create a New Branch**:  
   Create a new branch for your feature or bug fix using a descriptive name:
   ```bash
   git checkout -b feature-name
   ```
5. **Make Your Changes**:  
   Implement your feature or fix the bug. Please follow the coding standards and add comments where necessary.

6. **Write Tests**:  
   If applicable, write tests for the new feature or bug fix to ensure everything works as expected.

7. **Commit Your Changes**:  
   Write clear and concise commit messages:
   ```bash
   git commit -m "Add feature or fix bug"
   ```

8. **Push Your Changes**:  
   Push your changes to your forked repository:
   ```bash
   git push origin feature-name
   ```

9. **Submit a Pull Request***:
Open a pull request (PR) to merge your changes into the main repository. Be sure to provide a detailed description of the changes you made and why they are necessary. If applicable, link the GitHub issue that your PR resolves.


### 🍰 **General Contribution Steps**
For non-GSSoC contributors, the process is mostly the same, except you don’t need to be assigned an issue before starting:

1. Fork the Repository.
2. Clone Your Fork.
3. Create a New Branch.
4. Make Your Changes.
5. Write Tests (if applicable).
6. Commit and Push Your Changes.
7. Submit a Pull Request.
   
Please ensure that your pull request follows our contribution guidelines and that the feature or fix you’re submitting aligns with the project's goals.

## 🎉 **Happy Contributing!** 🚀
Whether you're contributing through GirlScript Summer of Code (GSSoC) or as an independent contributor, we welcome your help in making Scribbie a better tool for professionals everywhere. 

#### Let’s build something great together! 🌟
