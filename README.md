

# Role-Based Blogging Platform
👉 [https://write-flow.netlify.app/](https://write-flow.netlify.app)
> ⚠️ Please wait a few seconds after opening — the backend and frontend may experience a cold start delay.

## Admin Credentials

- **Email:** `kshitijyadav2003@gmail.com`  
- **Password:** `123456`
## Description

A blogging platform with Role-Based Access Control (RBAC) where:

-   **Users** can _only read_ blogs.
    
-   **Admins** can create, update, and delete blogs.
    

Secure authentication with JWT ensures proper access control. The platform features a clean UI and scalable backend.

**Key Features:**

-   Role-based permissions: User (read-only), Admin (full CRUD)
    
-   JWT authentication and protected routes
    
-   Blog pagination for efficient browsing
    
-   Responsive UI with role-specific content rendering
    

## Tech Stack

-   **Frontend:** React.js
    
-   **Backend:** Node.js + Express.js
    
-   **Database:** PostgreSQL
    
-   **Authentication:** JWT
    
-   **Email:** Nodemailer (for OTP/email verification)
        
## Folder Structure
```
rbac/
├─ backend/
│  ├─ prisma/
│  ├─ src/
│  │  ├─ controller/
│  │  ├─ lib/
│  │  ├─ middleware/
│  │  ├─ routes/
│  │  ├─ utils/
|
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ pages/
│  │  │  ├─ admin/
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .env
└─ README.md
```
## Setup & Installation

### Steps

1.  Clone the repository:
	```
     git clone https://github.com/kshitij-y/rbac.git 
	 cd rbac
	```
    
2.  Install dependencies:
    
    ```
    cd backend
    npm install
    ```
3.  Configure environment variables (`.env`):
    ```
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    SMTP_USER=your_email@example.com
    SMTP_PASS=your_email_password
    REDIS_URL=your_redis_url
    feurl="http://localhost:5173"
    ```
    
4.  Start backend server:
	 ```
	 npx prisma migrate dev --name init
	 npx prisma generate
	 npm run dev
	```
5.  Frontend :
	 ```
	 cd frontend
	 npm install
	```
6. Configure environment variables (`.env`):
    ```
    VITE_API_URL="http://localhost:3000"
    ```
7. Start frontend server:
	```
	npm run dev
	```
    
9.  Open [http://localhost:5173](http://localhost:5173)