# Stock & Order Management System

## Overview

A web-based platform allowing users to browse products, manage their cart, and place orders without payment integration.

## Core Features

### 1. Product Catalog

- Display products with details:
  - Product code
  - Name/Description
  - Unit type
  - Product image
- Search functionality
  - Filter by product name/code
  - Real-time search results

### 2. Shopping Cart

- Add products to cart
- Specify quantity
- View cart contents
- Modify quantities in cart
- Remove items from cart

### 3. Order Management

- Place orders from cart
- View order history
- Order status tracking
- No payment integration required

## Technical Specifications

### Frontend (React.js)

- Components:
  - ProductList
  - ProductSearch
  - Cart
  - OrderHistory
  - ProductDetail
- State Management: Context API
- UI Framework: Tailwindcss
- Routing: React Router

### Backend (Django)

- Models:
  ```python
  - Product (code, name, unit_type, image)
  - Cart (user, created_at)
  - CartItem (cart, product, quantity)
  - Order (user, created_at, status)
  - OrderItem (order, product, quantity)
  ```
- REST API endpoints for:
  - Product listing/search
  - Cart operations
  - Order management

### Database

- PostgreSQL

## API Endpoints

```
GET /api/products/
GET /api/products/search/
GET /api/cart/
POST /api/cart/add/
PUT /api/cart/update/
DELETE /api/cart/remove/
POST /api/orders/create/
GET /api/orders/history/
```

## Non-Functional Requirements

- Responsive design (mobile-first)
- Load time < 2 seconds
- Support for modern browsers
- Error handling and validation
- Input sanitization
