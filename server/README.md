server/README.md
# YogiiGo Server

Backend for YogiiGo Delivery App (MERN-stack TypeScript)

---

## **Project Structure**



YogiiGo/
├─ client/
├─ server/
│  ├─ src/
│  │  ├─ common/
│  │  │  ├─ cache.ts
│  │  │  └─ response.ts
│  │  ├─ config/
│  │  │  ├─ cloudinary.ts
│  │  │  ├─ mongo.ts
│  │  │  └─ redis.ts
│  │  ├─ docs/
│  │  │  ├─ auth.md
│  │  │  ├─ cart.md
│  │  │  ├─ category.md
│  │  │  ├─ order.md
│  │  │  ├─ product.md
│  │  │  └─ store.md
│  │  ├─ middlewares/
│  │  │  ├─ upload.middleware.ts
│  │  │  └─ validate.middleware.ts
│  │  ├─ modules/
│  │  │  ├─ auth/
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.middleware.ts
│  │  │  │  ├─ auth.model.ts
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  ├─ auth.service.ts
│  │  │  │  ├─ auth.validation.ts
│  │  │  │  └─ role.middleware.ts
│  │  │  ├─ cart/
│  │  │  │  ├─ cart.controller.ts
│  │  │  │  ├─ cart.model.ts
│  │  │  │  ├─ cart.routes.ts
│  │  │  │  ├─ cart.service.ts
│  │  │  │  └─ cart.validation.ts
│  │  │  ├─ category/
│  │  │  │  ├─ category.controller.ts
│  │  │  │  ├─ category.model.ts
│  │  │  │  ├─ category.routes.ts
│  │  │  │  ├─ category.service.ts
│  │  │  │  └─ category.validation.ts
│  │  │  ├─ order/
│  │  │  │  ├─ order.controller.ts
│  │  │  │  ├─ order.model.ts
│  │  │  │  ├─ order.routes.ts
│  │  │  │  ├─ order.service.ts
│  │  │  │  └─ order.validation.ts
│  │  │  ├─ product/
│  │  │  │  ├─ product.controller.ts
│  │  │  │  ├─ product.model.ts
│  │  │  │  ├─ product.routes.ts
│  │  │  │  ├─ product.service.ts
│  │  │  │  └─ product.validation.ts
│  │  │  └─ store/
│  │  │     ├─ store.controller.ts
│  │  │     ├─ store.model.ts
│  │  │     ├─ store.routes.ts
│  │  │     ├─ store.service.ts
│  │  │     └─ store.validation.ts
│  │  ├─ routes/
│  │  │  ├─ index.ts
│  │  │  └─ test.routes.ts
│  │  ├─ sockets/
│  │  │  └─ index.ts
│  │  ├─ tests/
│  │  ├─ utils/
│  │  │  └─ response.ts
│  │  ├─ app.ts
│  │  └─ server.ts
│  ├─ .env
│  ├─ .gitignore
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  └─ tsconfig.json
└─ README.md



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

# Products & Categories Module

This module manages product categories and products linked to stores.

## Endpoints

### Categories
- `POST /api/v1/category` → Create a category
- `GET /api/v1/category` → Get all categories
- `GET /api/v1/category/:id` → Get category by ID
- `PUT /api/v1/category/:id` → Update category
- `DELETE /api/v1/category/:id` → Delete category

### Products
- `POST /api/v1/product` → Create a product
- `GET /api/v1/product` → Get all products
- `GET /api/v1/product/:id` → Get product by ID
- `PUT /api/v1/product/:id` → Update product
- `DELETE /api/v1/product/:id` → Delete product

## Data Models

### Category
```ts
{
  name: string;
  description?: string;
  storeId: ObjectId;
}

##Store
| Method | Endpoint      | Description        | Auth | Roles Required   |
| ------ | ------------- | ------------------ | ---- | ---------------- |
| GET    | `/stores`     | List nearby stores | ❌    | Public           |
| GET    | `/stores/:id` | Get single store   | ❌    | Public           |
| POST   | `/stores`     | Create new store   | ✅    | Merchant / Admin |
| PATCH  | `/stores/:id` | Update store       | ✅    | Merchant / Admin |
| DELETE | `/stores/:id` | Remove store       | ✅    | Merchant / Admin |


##cart
| Method | Endpoint     | Description                 | Auth Required |
| ------ | ------------ | --------------------------- | ------------- |
| GET    | `/cart`      | Get current user cart       | ✅             |
| POST   | `/cart/item` | Add item to cart            | ✅             |
| PATCH  | `/cart/item` | Update item quantity/remove | ✅             |
| DELETE | `/cart`      | Clear cart                  | ✅             |


##Product
| Method | Endpoint             | Description                 | Auth | Roles Required              |
| ------ | -------------------- | --------------------------- | ---- | --------------------------- |
| POST   | `/orders`            | Place an order              | ✅    | User                        |
| GET    | `/orders/me`         | Get logged-in user's orders | ✅    | User                        |
| GET    | `/orders/:id`        | Get single order by ID      | ✅    | User                        |
| PATCH  | `/orders/:id/status` | Update order status         | ✅    | Merchant / Admin / Delivery |

---

