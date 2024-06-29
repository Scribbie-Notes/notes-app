```markdown
# Scribbie

Scribbie is a notes application that allows users to create, read, update, and delete notes. It also supports user authentication using Google OAuth.

## Features

- User authentication with Google OAuth
- Create, read, update, and delete notes
- Pin notes
- Tag notes with hashtags
- Responsive UI

## Tech Stack

- Frontend: React, Vite, Mantine
- Backend: Node.js, Express, MongoDB
- Deployment: Vercel

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Clone the Repository

```bash
git clone https://github.com/your-username/scribbie.git
cd scribbie
```

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory and add your environment variables:

```plaintext
VITE_REACT_APP_GOOGLE_API_TOKEN=<Your-Google-Client-ID>
VITE_API_BASE_URL=http://localhost:8000
```

4. Run the development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.development` file in the `backend` directory and add your environment variables:

```plaintext
ACCESS_TOKEN_SECRET=your_secret_key
MONGO_URI=your_mongo_uri
GOOGLE_API_TOKEN=your_google_api_token
```

4. Run the server:

```bash
npm start
```

## Usage

After setting up the project, you can access the frontend at `http://localhost:5173` and the backend at `http://localhost:8000`.

## Environment Variables

### Frontend

- `VITE_REACT_APP_GOOGLE_API_TOKEN`: Google Client ID
- `VITE_API_BASE_URL`: API base URL (e.g., `http://localhost:8000` for development)

### Backend

- `ACCESS_TOKEN_SECRET`: Secret key for JWT
- `MONGO_URI`: MongoDB connection string
- `GOOGLE_API_TOKEN`: Google API token

## Testing

To test the project, you can use the following commands:

### Frontend

```bash
npm run test
```

### Backend

```bash
npm run test
```

## Deployment

The project is deployed on Vercel.

- Frontend: [https://scribbie-notes.vercel.app/](https://scribbie-notes.vercel.app/)
- Backend: [https://scribbie-api.vercel.app/](https://scribbie-api.vercel.app/)

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.