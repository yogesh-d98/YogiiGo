docs/category.md
# Category API Documentation

## Base URL
`/api/v1/category`

---

## Endpoints

### Create Category
**POST** `/api/v1/category`

**Request Body**
```json
{
  "name": "Beverages",
  "description": "Soft drinks, juices, and bottled water",
  "storeId": "64f2c1e8a1b2c4d56789abcd"
}


Response

{
  "success": true,
  "message": "Category created",
  "data": {
    "_id": "64f2c567a1b2c4d56789efgh",
    "name": "Beverages",
    "storeId": "64f2c1e8a1b2c4d56789abcd"
  }
}

Get All Categories

GET /api/v1/category

Get Category by ID

GET /api/v1/category/:id

Update Category

PUT /api/v1/category/:id

Request Body

{
  "name": "Snacks",
  "description": "Chips, biscuits, chocolates"
}

Delete Category

DELETE /api/v1/category/:id

Data Model
{
  name: string;
  description?: string;
  storeId: ObjectId;
}