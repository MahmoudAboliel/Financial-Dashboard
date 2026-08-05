# Economics Dashboard

A full-stack financial dashboard for managing clients, importing monthly financial data, generating financial reports, and visualizing financial performance.

## Project Structure

```text
economics-dashboard/
├── frontend/       # Next.js frontend
├── backend/        # Flask backend
└── README.md
```

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Axios
- Lucide React

### Backend
- Flask
- SQLAlchemy
- Alembic / Flask-Migrate
- SQLite
- Python

## Features

- Dashboard with financial statistics and charts
- Client management
- Client financial history
- Monthly financial reports
- Income and expense analysis
- Savings and savings-rate analysis
- Expense category breakdown
- Client performance comparison
- Financial verdicts
- Recent activity
- JSON financial data import
- Financial report JSON download
- Responsive dashboard layout

## API Endpoints

### Dashboard
```text
GET /api/dashboard
```

### Clients
```text
GET /api/clients
GET /api/clients/<client_id>
GET /api/clients/<client_id>/months
```

### Financial Months
```text
GET /api/financial-months
GET /api/financial-months/<month_id>
GET /api/financial-months/<financial_month_id>/report
GET /api/financial-months/<financial_month_id>/report/download
```

### Import
```text
POST /api/import
```

The import endpoint accepts a JSON file using `multipart/form-data`:

```text
file=<JSON file>
```

## Getting Started

### Backend

```bash
cd backend

python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
flask db upgrade
```

Start the backend:

```bash
flask run
```

Default address:

```text
http://127.0.0.1:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Default address:

```text
http://localhost:3000
```

## Example Import Data

```json
{
  "clients": [
    {
      "client_name": "Example Family",
      "month": "2026-01",
      "income": [
        {
          "source": "Salary",
          "amount": 3500000
        }
      ],
      "expenses": [
        {
          "category": "Rent",
          "amount": 1200000
        }
      ]
    }
  ]
}
```

## Database

The project currently uses SQLite for development.

Database migrations are managed using Flask-Migrate/Alembic.

The application can later be migrated to PostgreSQL with the appropriate database configuration.

## Environment Variables

Do not commit real secrets or environment files to GitHub.

Use local environment files such as:

```text
frontend/.env.local
backend/.env
```

Recommended example files:

```text
frontend/.env.example
backend/.env.example
```

without real credentials.

## Architecture

```text
Next.js Frontend
       │
       │ Axios / REST API
       ▼
Flask Backend
       │
       │ SQLAlchemy
       ▼
SQLite Database
```

## License

This project is for educational, development, and portfolio purposes.
