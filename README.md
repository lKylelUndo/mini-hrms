# Mini HRMS System

A simple Human Resource Management System for managing employees, salaries, attendance, and payroll.

## Tech Stack

- **Frontend:** React + TypeScript + Vite + React Router
- **Backend:** Node.js + Express + TypeScript
- **Database:** MySQL
- **Validation:** Zod

## Features

- Admin login
- Employee CRUD
- Salary management with net salary computation
- Attendance recording
- Payroll summary generation and printable view
- Dashboard with employee and payroll metrics

## Project Structure

```
mini-hrms/
├── client/                 # React frontend
├── server/                 # Express API
└── database/schema.sql     # MySQL schema and seed data
```

## Prerequisites

- Node.js 18+
- MySQL 8+

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mini-hrms
```

### 2. Set up the database

Import the SQL schema:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `mini_hrms_db` database, all required tables, and the default admin user:

- Email: `admin@test.com`
- Password: `admin123`

### 3. Configure the backend

```bash
cd server
cp .env.example .env
npm install
```

Update `server/.env` if your MySQL credentials differ from the defaults.

### 4. Configure the frontend

```bash
cd ../client
npm install
```

The client uses a Vite proxy to call the backend at `http://localhost:8000`.

## Running the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open the app at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend health check: [http://localhost:8000](http://localhost:8000)

## API Endpoints

All routes are prefixed with `/api`.

### Auth

- `POST /auth/v1/login`

### Employees

- `GET /employee/v1/all-employee`
- `GET /employee/v1/active-employees`
- `GET /employee/v1/on-leave-employees`
- `POST /employee/v1/view-employee`
- `POST /employee/v1/add-employee`
- `PUT /employee/v1/edit-employee`
- `DELETE /employee/v1/delete-employee`

### Salary

- `GET /salary/v1/all-salary`
- `POST /salary/v1/view-salary`
- `POST /salary/v1/add-salary`
- `PUT /salary/v1/update-salary`

### Attendance

- `GET /attendance/v1/all-attendance`
- `POST /attendance/v1/record-attendance`

### Payroll

- `GET /payroll/v1/summary`
- `POST /payroll/v1/generate-payroll`

### Dashboard

- `GET /dashboard/v1/stats`

## Salary Formula

```text
Net Salary = Basic Salary + Allowance - Deductions
```

## Suggested Demo Flow

1. Log in with the default admin credentials.
2. Add employees from the Employees page.
3. Set salary details on the Salary page.
4. Record attendance on the Attendance page.
5. Generate payroll on the Payroll page.
6. Review dashboard metrics and print the payroll summary if needed.

## Architecture

The backend follows a layered pattern:

```text
Route -> validateSchema -> Controller -> Service -> Repository -> MySQL
```

Each module uses Zod schemas for request validation and returns a consistent API response shape:

```json
{
  "status": "success",
  "code": 200,
  "message": "Operation completed"
}
```
