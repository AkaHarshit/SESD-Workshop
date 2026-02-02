# SESD-Workshop

This project is a full-stack web application designed for the SESD Workshop. It consists of a Node.js/Express backend and a React/Vite frontend.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Vite
- **Database:** MongoDB

## Project Structure

```
SESD-Workshop/
├── backend/          # Node.js/Express backend
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middlewares/  # Express middlewares
│   ├── models/       # Mongoose models
│   ├── repositories/ # Data access layer
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── dist/         # Compiled backend code
├── frontend/         # React/Vite frontend
│   └── dist/         # Built frontend assets
└── README.md         # Project documentation
```

## Setup & Running

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Ensure you have the necessary dependencies installed (note: `package.json` was detected as missing, ensure environment is set up correctly).

3.  Configure environment variables in `.env`:
    ```env
    PORT=5001
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost:27017/sesd_employees
    JWT_SECRET=sesd-workshop-secret-change-in-production
    JWT_EXPIRES_IN=7d
    ```

4.  Start the backend server:
    ```bash
    node dist/server.js
    ```
    (Or `npm start` if scripts are available)

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Serve the built application (from `dist`):
    ```bash
    npx vite preview
    ```
    Or if running development server:
    ```bash
    npm run dev
    ```

## API Documentation

The backend connects to a MongoDB database at `mongodb://localhost:27017/sesd_employees`.
The server runs on port `5001` by default.

## License

[Add License Information Here]
