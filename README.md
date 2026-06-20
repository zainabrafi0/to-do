# 📝 React To-Do Dashboard with JWT Authentication

A modern, persistent To-Do application built with React and Tailwind CSS. This project demonstrates advanced frontend security concepts, including JSON Web Token (JWT) session management, protected routing, and local data persistence.

## ✨ Key Features

* **🔐 JWT Authentication:** Features a simulated backend login that generates a JWT, decodes user payloads, and actively monitors token expiration (`exp`) in real-time.
* **🛡️ Protected Routes:** Utilizes React Router to guard the dashboard. Unauthenticated users are bounced to the login page, while currently logged-in users are automatically redirected away from the login screen.
* **💾 Data Persistence:** Uses lazy-loaded React state and `useEffect` hooks to securely save tasks and active session tokens inside the browser's `localStorage`.
* **✨ Modern UI:** Styled exclusively with Tailwind CSS, featuring glassmorphism cards, dynamic gradient headers, and interactive hover states.

## 🛠️ Tech Stack

* **Framework:** React (via Vite)
* **Styling:** Tailwind CSS (v3)
* **Routing:** React Router v6
* **Utilities:** `jwt-decode`

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/todo-auth-app.git](https://github.com/yourusername/todo-auth-app.git)
   ```

2. **Navigate into the project directory:**
   ```bash
   cd todo-auth-app
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

### 🧪 How to Test

Because this project uses a simulated frontend authentication system for demonstration purposes, you must use the following hardcoded credentials to log in:

* **Email:** `user@test.com`
* **Password:** `myReactTestPass99!`

#### Things to try:
1. Add some tasks and hit refresh. Notice how they persist via `localStorage`.
2. Copy the URL (http://localhost:5173/), open an Incognito window, and paste it. Notice how the Bouncer instantly kicks you to `/login`.
