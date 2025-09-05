server/README.md
# YogiiGo Server

Backend for YogiiGo Delivery App (MERN-stack TypeScript)

---

## **Project Structure**



server/
│
├─ src/
│ ├─ config/ # DB & environment configurations
│ ├─ middlewares/ # JWT, role-based, error handlers
│ ├─ modules/ # Feature modules (auth, product, store, etc.)
│ ├─ routes/ # API routes
│ ├─ utils/ # Helpers (response formatting, etc.)
│ ├─ sockets/ # Socket.io implementation (future)
│ └─ app.ts # Express app setup
│
├─ package.json
├─ tsconfig.json
└─ .env # Environment variables


---

## **Environment Variables (.env)**

```bash
PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH_SECRET=<your_refresh_secret>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

Installation & Running
# Install dependencies
npm install

# Start server with nodemon
npm run dev

# Or build and run
npm run build
npm start

Available Endpoints (so far)
Auth

POST /api/v1/auth/signup → Create user

POST /api/v1/auth/login → Login user, return JWT

Test

GET /api/v1/test/protected → Protected route (JWT + role-based access test)


---

