
---

## 📄 docs/order.md

```markdown
# 📦 Order API Documentation

The Order API allows authenticated users to **place orders**, view their order history, and for merchants/admins to **update order status**.

---

## 🔐 Authentication
All endpoints require JWT authentication.  
Include the token in the `Authorization` header:


---

## 📌 Endpoints

### 1. Place Order
Place an order using the user’s cart.

**Endpoint**
POST /orders


**Request Body**
```json
{
  "address": "123 Main Street, NY",
  "phone": "9876543210",
  "paymentMethod": "COD"
}


Response

{
  "success": true,
  "statusCode": 201,
  "message": "Order placed",
  "result": {
    "_id": "650f1d3a1b456",
    "userId": "64f2c23c5b9c",
    "items": [
      {
        "productId": "64f3c67c9a21",
        "qty": 2,
        "price": 499,
        "name": "Wireless Mouse",
        "imageUrl": "https://example.com/mouse.jpg"
      }
    ],
    "total": 998,
    "address": "123 Main Street, NY",
    "phone": "9876543210",
    "status": "created",
    "paymentMethod": "COD",
    "paymentStatus": "pending",
    "createdAt": "2025-09-12T12:00:00Z"
  }
}

2. Get My Orders

Fetch all orders of the authenticated user.

Endpoint

GET /orders/me


Response

{
  "success": true,
  "statusCode": 200,
  "message": "Orders fetched",
  "result": [
    {
      "_id": "650f1d3a1b456",
      "total": 998,
      "status": "created",
      "address": "123 Main Street, NY",
      "paymentStatus": "pending",
      "createdAt": "2025-09-12T12:00:00Z"
    }
  ]
}

3. Get Single Order

Fetch an order by ID.

Endpoint

GET /orders/:id


Response

{
  "success": true,
  "statusCode": 200,
  "message": "Order fetched",
  "result": {
    "_id": "650f1d3a1b456",
    "userId": "64f2c23c5b9c",
    "items": [...],
    "total": 998,
    "status": "created",
    "paymentMethod": "COD",
    "paymentStatus": "pending",
    "createdAt": "2025-09-12T12:00:00Z"
  }
}

4. Update Order Status

Update order status (merchant/admin/delivery only).

Endpoint

PATCH /orders/:id/status


Request Body

{
  "status": "out_for_delivery"
}


Response

{
  "success": true,
  "statusCode": 200,
  "message": "Order status updated",
  "result": {
    "_id": "650f1d3a1b456",
    "status": "out_for_delivery",
    "updatedAt": "2025-09-12T12:30:00Z"
  }
}

📑 Order Status Values

created

accepted

preparing

out_for_delivery

delivered

cancelled

📑 Payment Status Values

pending

paid

failed

⚠️ Error Responses
Status	Message	Reason
400	Cart is empty	Trying to place order with empty cart
401	Unauthorized	Missing/invalid token
404	Order not found	Invalid order ID
500	Internal Server Error	Unexpected error