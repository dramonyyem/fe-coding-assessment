# 📝 To-Do List App – Frontend Coding Assessment

This is a full-stack CRUD To-Do List App built with **Next.js (App Router)**. It demonstrates creating and managing tasks with API routes handled as middleware-style functions via `app/api`.

---

## 📌 Overview

This assessment is designed to evaluate your frontend skills in the following areas:

- Creating a structure, component-based UI
- Handling asynchronous data with API endpoints
- Implementing CRUD operations (Create, Read, Update, Delete)
- Writing clean, maintainable code
- Making the UI responsive and mobile-friendly

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v20 or later)

### Setup & Running the App

1. **Fork this repository to your own GitHub account**  
   Click the “Fork” button at the top right of this page.

2. **Clone your forked repository**

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## ✅ Your Tasks

- [ ] Add new tasks via an input field
- [ ] Display a list of tasks
- [ ] Mark tasks as complete/incomplete
- [ ] Edit task titles
- [ ] Delete tasks
- [ ] Responsive UI with Tailwind

---

## 🧪 API Endpoints

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/api/todos` | Fetch all todos        |
| POST   | `/api/todos` | Create a new todo      |
| PUT    | `/api/todos` | Update title/completed |
| DELETE | `/api/todos` | Delete a todo          |

### ✅ Example Payloads

**POST**

```json
{ "title": "Write documentation" }
```

**PUT**

```json
{ "id": 123, "title": "Edit task title" }
```

**PUT (Toggle)**

```json
{ "id": 123, "title": "Edit documentation", "completed": true }
```

**DELETE**

```json
{ "id": 123 }
```

---

## 🧑‍💻 Submission

Please submit:

- GitHub repository link with your implementation
- Short summary of what features were completed and what could be improved

---

Good luck! We’re excited to see what you build.
