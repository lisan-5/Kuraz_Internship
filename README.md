# Kuraz_Internship

# 🧠 Task Manager API

A simple and lightweight REST API built with **Express.js** that allows you to manage a list of tasks stored in a **JSON file**. Perfect for small apps, practice projects, or demonstrations.

---

## 🚀 Features

- ✅ View all tasks
- ➕ Add a new task
- ✔️ Mark a task as completed
- ❌ Delete a task
- 🔍 Filter tasks by status (completed or pending)
- 🛡 Validates task input (title must not be empty)

---

## 📂 Project Structure




---

## 📬 API Endpoints

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/tasks`               | Get all tasks                    |
| GET    | `/api/tasks?status=completed` | Get only completed tasks         |
| GET    | `/api/tasks?status=pending`   | Get only pending tasks           |
| POST   | `/api/tasks`               | Add a new task                   |
| PUT    | `/api/tasks/:id`           | Mark a task as completed         |
| DELETE | `/api/tasks/:id`           | Delete a task                    |

---

## 🧪 Example Request

### ➕ Add Task

**POST** `/api/tasks`

**Request Body:**
```json
{
  "title": "Finish homework"
}


🛠 Tech Stack
Node.js
Express.js
UUID (for unique task IDs)
File system (fs) for JSON storage
CORS (enabled for frontend use)


Run Locally
1. Clone the repository
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend/backend
2. Install dependencies
npm install
3. Start the server
Add this to package.json:

"scripts": {
  "dev": "nodemon app.js"
}
Then run:

npm run dev
The server will run on: http://localhost:3000

📌 Notes
The tasks reset if the tasks.json file is deleted or corrupted.

This is a minimal backend — use it with any frontend or mobile app.

No database is required.
