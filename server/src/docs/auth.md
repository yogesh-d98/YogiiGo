# **📄 `server/docs/auth.md`**

```markdown
# Auth Module Documentation - YogiiGo

## Signup

**Endpoint:** POST `/api/v1/auth/signup`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin | customer | delivery"
}


Response Example:

{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "result": {
    "id": "64a9f3e4f5...",
    "name": "Yogesh Dhanabalan",
    "email": "yogesh@example.com",
    "role": "customer"
  }
}

Login

Endpoint: POST /api/v1/auth/login

Request Body:

{
  "email": "string",
  "password": "string"
}


Response Example:

{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "result": {
    "user": {
      "id": "64a9f3e4f5...",
      "name": "Yogesh Dhanabalan",
      "email": "yogesh@example.com",
      "role": "customer"
    },
    "accessToken": "<jwt_token>",
    "refreshToken": "<jwt_refresh_token>"
  }
}

Middleware
authenticate

Verifies JWT from Authorization header (Bearer <token>)

Attaches req.user containing id and role

Returns 401 if token is missing or invalid

authorize(...roles)

Checks if req.user.role matches allowed roles for the route

Returns 403 if unauthorized

Test Route (for JWT + RBAC)

Endpoint: GET /api/v1/test/protected

Headers:

Authorization: Bearer <accessToken>


Response Example (Admin Access):

{
  "success": true,
  "message": "JWT and role middleware working fine!",
  "user": {
    "id": "64a9f3e4f5...",
    "role": "admin"
  }
}