# HATEOAS Products API

A RESTful API built with **Express.js** that implements **HATEOAS (Hypermedia as the Engine of Application State)** principles. The API manages products, sellers, and categories, providing navigable links to related resources.

## Features

- CRUD operations for Products, Sellers, and Categories.
- Hypermedia-driven responses for seamless client navigation.
- Relationships between Products, Sellers, and Categories.
- Well-structured and scalable codebase.

## API Endpoints

### Products

#### **GET /products OR /products?seller=sellerID OR /products?category=categoryID**

Retrieve a list of all products or filter by query parameters.

- **Response:**
  ```json
  [
    {
      "_id": "677c305f981b9892df00879c",
      "name": "Wireless Keyboard",
      "quantity": 50,
      "price": 25.99,
      "seller": "677c0ead981b9892df0085ad",
      "category": "677c0d7f80a5403f7c5c4dc3"
    }
  ]
  ```

#### **GET /products/:id**

Retrieve a single product

- **Response:**
  ```json
  {
    "product": {
      "product": {
        "_id": "677c305f981b9892df00879c",
        "name": "Wireless Keyboard",
        "quantity": 50,
        "price": 25.99,
        "seller": {
          "name": "TechStore",
          "href": "/sellers/677c0ead981b9892df0085ad"
        },
        "category": {
          "name": "Electronics",
          "href": "/categories/677c0d7f80a5403f7c5c4dc3"
        }
      },
      "_links": {
        "self": {
          "href": "/products/677c305f981b9892df00879c"
        },
        "collection": {
          "href": "/products"
        },
        "update": {
          "href": "/products/677c305f981b9892df00879c",
          "method": "PUT"
        },
        "delete": {
          "href": "/products/677c305f981b9892df00879c",
          "method": "DELETE"
        },
        "category": {
          "href": "/categories/677c0d7f80a5403f7c5c4dc3"
        },
        "seller": {
          "href": "/sellers/677c0ead981b9892df0085ad"
        }
      }
    }
  }
  ```

### Sellers

#### **GET /sellers**

Retrieve a list of sellers

- **Response:**
  ```json
  [
    {
      "_id": "677c0ead981b9892df0085ad",
      "name": "TechStore",
      "email": "contact@techstore.com",
      "phone": "1234567890",
      "location": "123 Tech Street",
      "_links": {
        "self": {
          "href": "/sellers/677c0ead981b9892df0085ad"
        },
        "collection": {
          "href": "/sellers"
        },
        "update": {
          "href": "/sellers/677c0ead981b9892df0085ad",
          "method": "PUT"
        },
        "delete": {
          "href": "/sellers/677c0ead981b9892df0085ad",
          "method": "DELETE"
        },
        "products": {
          "href": "/products?seller=677c0ead981b9892df0085ad"
        }
      }
    },
    ...
  ]
  ```

#### **GET /sellers/:id**

Retrieve a single seller

- **Response:**
  ```json
  {
    "seller": {
      "_id": "677c0ead981b9892df0085ad",
      "name": "TechStore",
      "email": "contact@techstore.com",
      "phone": "1234567890",
      "location": "123 Tech Street",
      "_links": {
        "self": {
          "href": "/sellers/677c0ead981b9892df0085ad"
        },
        "collection": {
          "href": "/sellers"
        },
        "update": {
          "href": "/sellers/677c0ead981b9892df0085ad",
          "method": "PUT"
        },
        "delete": {
          "href": "/sellers/677c0ead981b9892df0085ad",
          "method": "DELETE"
        },
        "products": [
          {
            "name": "Wireless Keyboard",
            "price": 25.99,
            "quantity": 50,
            "href": "/products?seller=677c0ead981b9892df0085ad"
          },
          {
            "name": "Smartphone Stand",
            "price": 9.99,
            "quantity": 200,
            "href": "/products?seller=677c0ead981b9892df0085ad"
          }
        ]
      }
    }
  }
  ```

### Categories

#### **GET /categories**

Retrieve a list of categories

- **Response:**
  ```json
  [
    {
      "_id": "677c0d7f80a5403f7c5c4dc3",
      "name": "Electronics",
      "description": "Devices, gadgets, and tech products.",
      "_links": {
        "self": {
          "href": "/sellers/677c0d7f80a5403f7c5c4dc3"
        },
        "collection": {
          "href": "/sellers"
        },
        "update": {
          "href": "/sellers/677c0d7f80a5403f7c5c4dc3",
          "method": "PUT"
        },
        "delete": {
          "href": "/sellers/677c0d7f80a5403f7c5c4dc3",
          "method": "DELETE"
        },
        "products": {
          "href": "/products?category=677c0d7f80a5403f7c5c4dc3"
        }
      }
    },
    ...
  ]
  ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amarachigoodness74/products-api.git
   cd products-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/hateoas_api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Backend framework.
- **MongoDB**: Database for managing products, sellers, and categories.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

## Folder Structure

```
src/
├── config/
│   ├── dbConfig.ts
├── models/
│   ├── product.model.ts
│   ├── seller.model.ts
│   └── category.model.ts
├── routes/
│   ├── product.route.ts
│   ├── seller.routes.ts
│   └── category.routes.ts
├── controllers/
│   ├── product.controller.ts
│   ├── seller.controller.ts
│   └── category.controller.ts
├── types/
│   ├── product.type.ts
│   ├── seller.type.ts
│   └── category.type.ts
├── utils.ts
└── server.ts
```

## Future Enhancements

- Implement pagination for large datasets.
- Integrate caching for improved performance.

## License

This project is licensed under the [MIT License](LICENSE).
