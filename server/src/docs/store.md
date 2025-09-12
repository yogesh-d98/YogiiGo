
---

## 📄 docs/store.md

```markdown
# 🏪 Store API Documentation

The Store API allows public users to **browse stores** and authenticated merchants/admins to **create and manage stores**.

---

## 🔐 Authentication
- `GET /stores` and `GET /stores/:id` → Public  
- `POST /stores`, `PATCH /stores/:id`, `DELETE /stores/:id` → JWT required with role **merchant** or **admin**

Headers:

---

## 📌 Endpoints

### 1. List Nearby Stores
Get stores around a location or all open stores if no location provided.

**Endpoint**
GET /stores**Response**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Stores fetched",
  "result": [
    {
      "_id": "650f2d12a1c34",
      "name": "Fresh Mart",
      "address": "123 Main Street",
      "avatarUrl": "https://res.cloudinary.com/demo/store.png",
      "geo": { "type": "Point", "coordinates": [77.5946, 12.9716] },
      "isOpen": true
    }
  ]
}
2. Get Store by ID
Fetch single store details.

Endpoint

bash
Copy code
GET /stores/:id
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Store fetched",
  "result": {
    "_id": "650f2d12a1c34",
    "name": "Fresh Mart",
    "address": "123 Main Street",
    "phone": "9876543210",
    "avatarUrl": "https://res.cloudinary.com/demo/store.png",
    "isOpen": true,
    "geo": { "type": "Point", "coordinates": [77.5946, 12.9716] }
  }
}
3. Create Store
Create a new store (merchant/admin only).

Endpoint

bash
Copy code
POST /stores
Request Body (multipart/form-data)

Field	Type	Required	Description
name	string	✅	Store name
address	string	❌	Store address
phone	string	❌	Phone number
isOpen	boolean	❌	Open/closed
geo[lat]	number	❌	Latitude
geo[lng]	number	❌	Longitude
avatarUrl	file (image)	❌	Store image

Response

json
Copy code
{
  "success": true,
  "statusCode": 201,
  "message": "Store created",
  "result": {
    "_id": "650f2d12a1c34",
    "name": "Fresh Mart",
    "address": "123 Main Street",
    "phone": "9876543210",
    "isOpen": true,
    "geo": { "type": "Point", "coordinates": [77.5946, 12.9716] },
    "avatarUrl": "https://res.cloudinary.com/demo/store.png",
    "ownerId": "64f3e23c9a12"
  }
}
4. Update Store
Update store details (merchant/admin only).

Endpoint

bash
Copy code
PATCH /stores/:id
Request Body

json
Copy code
{
  "name": "Fresh Mart - Updated",
  "address": "456 Market Road",
  "isOpen": false,
  "geo": { "lat": 12.9716, "lng": 77.5946 },
  "avatarUrl": "https://res.cloudinary.com/demo/new.png"
}
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Store updated",
  "result": {
    "_id": "650f2d12a1c34",
    "name": "Fresh Mart - Updated",
    "address": "456 Market Road",
    "isOpen": false
  }
}
5. Delete Store
Delete a store (merchant/admin only).

Endpoint

bash
Copy code
DELETE /stores/:id
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Store removed",
  "result": {
    "_id": "650f2d12a1c34",
    "name": "Fresh Mart"
  }
}
⚠️ Error Responses
Status	Message	Reason
400	Validation error	Invalid input
401	Unauthorized	Missing/invalid token
403	Forbidden	User not allowed
404	Store not found	Invalid store ID
500	Internal Server Error	Unexpected error