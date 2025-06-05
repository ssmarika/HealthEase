
# HealthEase

**HealthEase** is a web-based application that allows clients to conveniently book pathological lab tests from the comfort of their homes. Designed especially with elderly and ill patients in mind, HealthEase simplifies access to lab diagnostics while enabling administrators to manage tests, bookings, and results efficiently.

---

## 🚀 Tech Stack

- **Frontend**: Next.js (React-based)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local filesystem (planned to migrate to cloud)

---

## 🌟 Features

### 👤 Client
- Register and log in
- Book single or multiple lab tests
- View uploaded test results in PDF format

### 🛠️ Admin
- Add new lab tests
- Edit existing test details
- Approve and update test booking status
- Upload test results in PDF format
- Delete tests

---

## 🔐 Authentication

- JWT-based authentication system
- Role-based access (admin/client) to restrict functionality accordingly

---


## 🛠️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server port
DB_PORT=8080

# MongoDB connection
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_HOST=your_mongodb_host
DB_NAME=your_database_name
DB_OPTIONS=retryWrites=true&w=majority&appName=your_app_name

# JWT authentication
ACCESS_TOKEN_SECRET_KEY=your_secret_key
ACCESS_TOKEN_EXPIRES_IN=1d

