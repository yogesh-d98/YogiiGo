---

## 📄 docs/cart.md

```markdown
# 🛒 Cart API Documentation

The Cart API allows authenticated users to manage their shopping cart.

---

## 🔐 Authentication
All endpoints require JWT authentication.  
Include the token in the `Authorization` header:

Authorization: Bearer <token>

yaml
Copy code

---

## 📌 Endpoints

### 1. Get Cart
Retrieve the current user’s cart.

**Endpoint**
GET /cart

pgsql
Copy code

**Response**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cart fetched",
  "result": {
    "items": [
      {
        "productId": "64f2c23c5b9c",
        "qty": 2,
        "price": 499,
        "name": "Wireless Mouse",
        "imageUrl": "https://example.com/mouse.jpg"
      }
    ]
  }
}
2. Add Item
Add a new item or increase quantity in the cart.

Endpoint

bash
Copy code
POST /cart/item
Request Body

json
Copy code
{
  "productId": "64f2c23c5b9c",
  "qty": 2
}
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Cart updated",
  "result": {
    "userId": "64f1d3a1b456",
    "items": [
      {
        "productId": "64f2c23c5b9c",
        "qty": 2,
        "price": 499,
        "name": "Wireless Mouse",
        "imageUrl": "https://example.com/mouse.jpg"
      }
    ]
  }
}
3. Update Item
Update the quantity of an item in the cart.
If qty = 0, the item will be removed.

Endpoint

bash
Copy code
PATCH /cart/item
Request Body

json
Copy code
{
  "productId": "64f2c23c5b9c",
  "qty": 0
}
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Cart updated",
  "result": {
    "userId": "64f1d3a1b456",
    "items": []
  }
}
4. Clear Cart
Remove all items from the user’s cart.

Endpoint

bash
Copy code
DELETE /cart
Response

json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Cart cleared"
}
📑 Validation Rules
Add Item

productId → required string

qty → integer ≥ 1 (default = 1)

Update Item

productId → required string

qty → integer ≥ 0 (0 = remove item)

⚠️ Error Responses
Status	Message	Reason
401	Unauthorized	Missing or invalid token
404	Product not found	ProductId not in DB
500	Internal Server Err	Server-side error