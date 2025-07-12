# 👩‍💼 Employee Dashboard (Full Stack App)

A full-stack Employee Dashboard that allows admins to log in and view, search, filter, and inspect employee details. The backend is built with Node.js + Express and stores data locally in a JSON file. The frontend is developed with React, Vite, and Tailwind CSS.

---

## 📁 Project Structure

```text
Assignment/
├── backend/                   # Backend code (Node.js + Express)
│   ├── data/
│   │   └── employees.json     # Local employee data (acts like a database)
│   ├── routes/
│   │   └── employeeRoutes.js  # REST API routes for employee data
│   └── server.js              # Entry point for the backend server
│
├── frontend/                  # Frontend (React + Vite + Tailwind CSS)
│   └── src/
│       ├── pages/             # Login, Dashboard, EmployeeDetails pages
│       ├── components/        # Reusable UI components
│       └── App.jsx            # Root component with route setup
│
└── README.md                  # Project documentation (this file)


---

## 🧰 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router DOM
- Lucide Icons

### Backend
- Node.js
- Express
- CORS
- Local JSON file as database

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KARANMAJILA/Assignment.git
cd Assignment
cd backend
npm install
node server.js


cd frontend
npm install
npm run dev

Email: admin@example.com
Password: admin123



🔎 Features
✅ Secure login

👨‍💻 Dashboard with employee cards

🔍 Search by name, email, or role

📊 Filters for department, status, location

📄 Detail page on card click

⚡ Live search and filter experience

🛠️ Backend API powered by Express
