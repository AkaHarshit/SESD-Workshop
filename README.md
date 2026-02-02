# SESD Employee Management System

A complete full-stack CRUD web application for **Employee Management** built with Node.js, Express, TypeScript, MongoDB, and React. Created for the SESD Workshop.

## Features

### Core CRUD
- **Create** - Add new employees with validation
- **Read** - Get single employee + paginated list
- **Update** - Edit employee details
- **Delete** - Remove employees

### Advanced Features
- **Search** - By name, email, department, position
- **Filter** - By department, status, salary range
- **Sort** - By any field (asc/desc)
- **Pagination** - Page-based with configurable limit
- **Validation** - Request validation with express-validator
- **Error Handling** - Centralized, clean error responses

### Bonus Features
- **JWT Authentication** - Secure login
- **Protected Routes** - Create/Update/Delete require auth
- **Role-Based Access** - Admin & HR can manage employees

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Validation | express-validator |

## Project Structure

```
├── backend/                 # Express API
│   ├── src/
│   │   ├── config/          # Environment, database
│   │   ├── controllers/     # HTTP handlers
│   │   ├── middlewares/     # Auth, validation, errors
│   │   ├── models/          # Mongoose schemas
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript interfaces
│   │   ├── utils/           # AppError, etc.
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── types/
│   │   └── ...
│   └── package.json
└── README.md
```

## Architecture

**OOP & Clean Architecture** (Controllers → Services → Repositories)

- **Controllers** - Handle HTTP request/response, validation
- **Services** - Business logic, orchestration
- **Repositories** - Data access (MongoDB via Mongoose)
- **Models** - Domain entities (Employee, User)
- **Interfaces** - Contract definitions (IEmployeeRepository, IEmployeeService)

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login (returns JWT) |
| GET | `/api/auth/me` | Yes | Current user |

### Employees
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/employees` | No | List (search, filter, sort, paginate) |
| GET | `/api/employees/departments` | No | Get departments |
| GET | `/api/employees/:id` | No | Get single employee |
| POST | `/api/employees` | Yes (Admin/HR) | Create employee |
| PUT | `/api/employees/:id` | Yes (Admin/HR) | Update employee |
| DELETE | `/api/employees/:id` | Yes (Admin/HR) | Delete employee |

### Query Params (GET /employees)
- `search` - Search in name, email, department, position
- `department` - Filter by department
- `status` - active | on_leave | terminated
- `minSalary`, `maxSalary` - Salary range
- `sortBy` - name, email, department, salary, hireDate, status, createdAt
- `sortOrder` - asc | desc
- `page`, `limit` - Pagination

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/AkaHarshit/SESD-Workshop.git
cd SESD-Workshop

# Install all dependencies
npm run install:all
```

### Environment Variables

Create `backend/.env` (or copy from `.env.example`):

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sesd_employees
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### Run Backend

```bash
npm run backend
# Or: cd backend && npm run dev
```

Backend runs at **http://localhost:5001**

### Run Frontend

```bash
npm run frontend
# Or: cd frontend && npm run dev
```

Frontend runs at **http://localhost:3000** (proxies /api to backend)

### Default Login
- **Email:** admin@sesd.com  
- **Password:** admin123  

(Admin user is auto-created on first backend start if MongoDB is empty)

## Build for Production

```bash
npm run build:backend
npm run build:frontend
```

- Backend output: `backend/dist/`
- Frontend output: `frontend/dist/`

## Design Choices

1. **Employee Management** - Chosen for real-world relevance (HR systems, org management)
2. **MongoDB** - Flexible schema, good for rapid iteration
3. **Repository Pattern** - Abstracts data access for testability & DB swaps
4. **Role-Based Access** - Admin/HR manage employees; employees can view
5. **TypeScript** - End-to-end type safety
6. **Vite** - Fast React dev experience
7. **Tailwind** - Utility-first, responsive UI

## License

MIT
