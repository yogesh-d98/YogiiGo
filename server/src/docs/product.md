
---

## 📄 `docs/product.md`

```markdown
# Product API Documentation

## Base URL
`/api/v1/product`

---

## Endpoints

### Create Product
**POST** `/api/v1/product`

**Request Body**
```json
{
  "name": "Coca Cola 1L",
  "description": "Chilled soft drink bottle",
  "price": 60,
  "stock": 100,
  "categoryId": "64f2c567a1b2c4d56789efgh",
  "storeId": "64f2c1e8a1b2c4d56789abcd",
  "images": [
    "https://res.cloudinary.com/demo/image/upload/v1693456789/cocacola.jpg"
  ]
}
Response

{
  "success": true,
  "message": "Product created",
  "data": {
    "_id": "64f2c789a1b2c4d56789ijkl",
    "name": "Coca Cola 1L",
    "price": 60
  }
}

Get All Products

GET /api/v1/product

Get Product by ID

GET /api/v1/product/:id

Update Product

PUT /api/v1/product/:id

Request Body

{
  "name": "Lays Classic Salted",
  "description": "Crispy potato chips",
  "price": 20,
  "stock": 150
}

Delete Product

DELETE /api/v1/product/:id

Data Model
{
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: ObjectId;
  storeId: ObjectId;
  images?: string[];
}