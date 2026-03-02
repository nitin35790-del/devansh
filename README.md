# ShopVerse - MERN E-Commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js), featuring JWT authentication, bcrypt password hashing, and a beautiful modern dark-themed UI.

## Features

- **User Authentication** - Register, login, profile management (JWT + bcrypt)
- **Product Catalog** - Browse, search, and filter by category
- **Product Reviews** - Rate and review products
- **Shopping Cart** - Add, remove, update quantities (persisted in localStorage)
- **Checkout** - Shipping address form with order placement
- **Order History** - View all past orders with status tracking
- **Responsive Design** - Mobile-friendly UI with dark theme
- **Admin Support** - Admin routes for product/order management

## Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | React 19 + Vite, React Router, Axios      |
| Backend    | Node.js, Express.js                       |
| Database   | MongoDB + Mongoose                        |
| Auth       | JSON Web Tokens (JWT) + bcryptjs          |
| Styling    | Custom CSS (no framework)                 |
| Icons      | react-icons                               |
| Toasts     | react-hot-toast                           |

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally on `mongodb://localhost:27017` (or update `.env`)

## Getting Started

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Edit `backend/.env` with your settings:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- **Admin user**: `admin@example.com` / `admin123`
- **Regular user**: `john@example.com` / `john123`
- **12 sample products** across 6 categories

### 4. Start the Application

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
cd frontend
npm run dev
```

- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:5173

## API Endpoints

### Auth
| Method | Endpoint           | Description       | Auth     |
|--------|--------------------|--------------------|----------|
| POST   | /api/auth/register | Register user      | Public   |
| POST   | /api/auth/login    | Login user         | Public   |
| GET    | /api/auth/profile  | Get profile        | Private  |
| PUT    | /api/auth/profile  | Update profile     | Private  |

### Products
| Method | Endpoint                  | Description       | Auth     |
|--------|---------------------------|--------------------|----------|
| GET    | /api/products             | Get all products   | Public   |
| GET    | /api/products/:id         | Get single product | Public   |
| POST   | /api/products             | Create product     | Admin    |
| PUT    | /api/products/:id         | Update product     | Admin    |
| DELETE | /api/products/:id         | Delete product     | Admin    |
| POST   | /api/products/:id/reviews | Add review         | Private  |

### Orders
| Method | Endpoint              | Description        | Auth     |
|--------|-----------------------|--------------------|----------|
| POST   | /api/orders           | Create order       | Private  |
| GET    | /api/orders/myorders  | Get my orders      | Private  |
| GET    | /api/orders/:id       | Get order by ID    | Private  |
| GET    | /api/orders           | Get all orders     | Admin    |
| PUT    | /api/orders/:id       | Update order status| Admin    |

## Project Structure

```
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route handlers
│   ├── middleware/auth.js     # JWT auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── seed.js               # Database seeder
│   ├── server.js             # Express app entry
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context providers
│   │   ├── pages/            # Page components
│   │   ├── api.js            # Axios instance
│   │   ├── App.jsx           # App routes
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   └── index.html
└── README.md
```
# devansh
