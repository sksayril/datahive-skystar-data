# Admin API Documentation

This document provides comprehensive documentation for the Admin Authentication APIs including signup, login, and profile management endpoints.

## Frontend Access

A complete React + Tailwind CSS frontend is available at:
- **URL:** `http://localhost:3000/admin-portal`
- **Features:** Login, Signup, and Admin Dashboard
- **Technology:** React (CDN), Tailwind CSS, React Router

## Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Admin Signup](#1-admin-signup)
  - [Admin Login](#2-admin-login)
  - [Get Admin Profile](#3-get-admin-profile)
  - [Get All Loan Data](#4-get-all-loan-data)
  - [Get Single Loan Data](#5-get-single-loan-data)
- [Public API Endpoints](#public-api-endpoints)
  - [Store Loan Data](#1-store-loan-data)
- [Error Responses](#error-responses)
- [Request/Response Examples](#requestresponse-examples)

---

## Overview

The Admin API provides secure authentication and profile management for admin users. All passwords are hashed using bcrypt, and JWT tokens are used for authentication.

**Key Features:**
- Secure password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (admin, superadmin)
- Account activation status management
- Comprehensive error handling

---

## Base URL

```
http://localhost:3000/admin
```

---

## Authentication

Most endpoints require authentication using a JWT token. Include the token in the request headers:

**Header Format:**
```
Authorization: Bearer <your-jwt-token>
```

**Alternative Header:**
```
x-access-token: <your-jwt-token>
```

---

## API Endpoints

### 1. Admin Signup

Create a new admin account.

**Endpoint:** `POST /admin/signup`

**Authentication:** Not required

**Request Body:**
```json
{
  "Email": "admin@example.com",
  "Password": "SecurePassword123!",
  "Name": "Admin User",
  "Role": "admin"
}
```

**Request Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Email | String | Yes | Admin email address (will be converted to lowercase) |
| Password | String | Yes | Admin password (will be hashed) |
| Name | String | Yes | Admin full name |
| Role | String | No | Admin role (default: "admin", options: "admin", "superadmin") |

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Admin created successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "Admin User",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**400 Bad Request - Missing Required Fields:**
```json
{
  "success": false,
  "message": "Email, Password, and Name are required fields."
}
```

**409 Conflict - Admin Already Exists:**
```json
{
  "success": false,
  "message": "Admin with this email already exists."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error during admin signup.",
  "error": "Error details..."
}
```

---

### 2. Admin Login

Authenticate an admin user and receive a JWT token.

**Endpoint:** `POST /admin/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "Email": "admin@example.com",
  "Password": "SecurePassword123!"
}
```

**Request Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Email | String | Yes | Admin email address |
| Password | String | Yes | Admin password |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "Admin User",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**400 Bad Request - Missing Required Fields:**
```json
{
  "success": false,
  "message": "Email and Password are required fields."
}
```

**401 Unauthorized - Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

**403 Forbidden - Inactive Account:**
```json
{
  "success": false,
  "message": "Admin account is inactive. Please contact administrator."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error during admin login.",
  "error": "Error details..."
}
```

---

### 3. Get Admin Profile

Retrieve the authenticated admin's profile information.

**Endpoint:** `GET /admin/profile`

**Authentication:** Required (JWT Token)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Admin profile retrieved successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "Admin User",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**401 Unauthorized - No Token:**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid or expired token.",
  "error": "jwt malformed"
}
```

**401 Unauthorized - Inactive Account:**
```json
{
  "success": false,
  "message": "Invalid token or admin account is inactive."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error.",
  "error": "Error details..."
}
```

---

## Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Technical error details (optional)"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication failed)
- `403` - Forbidden (account inactive)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Request/Response Examples

### Example 1: Complete Admin Signup Flow

**Step 1: Signup Request**
```bash
curl -X POST http://localhost:3000/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "SecurePassword123!",
    "Name": "John Admin",
    "Role": "admin"
  }'
```

**Step 1: Signup Response**
```json
{
  "success": true,
  "message": "Admin created successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "John Admin",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjE4MDAsImV4cCI6MTcwNTQwODIwMH0.xyz123..."
}
```

---

### Example 2: Admin Login Flow

**Step 1: Login Request**
```bash
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "SecurePassword123!"
  }'
```

**Step 1: Login Response**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "John Admin",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjE4MDAsImV4cCI6MTcwNTQwODIwMH0.xyz123..."
}
```

**Step 2: Get Profile Request (Using Token)**
```bash
curl -X GET http://localhost:3000/admin/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDUzMjE4MDAsImV4cCI6MTcwNTQwODIwMH0.xyz123..."
```

**Step 2: Get Profile Response**
```json
{
  "success": true,
  "message": "Admin profile retrieved successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "Email": "admin@example.com",
    "Name": "John Admin",
    "Role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Example 3: Error Handling

**Invalid Login Credentials:**
```bash
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com",
    "Password": "WrongPassword"
  }'
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

**Missing Required Fields:**
```bash
curl -X POST http://localhost:3000/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "admin@example.com"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Email, Password, and Name are required fields."
}
```

**Unauthorized Access (No Token):**
```bash
curl -X GET http://localhost:3000/admin/profile
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

---

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```env
DATABASE_URL=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
```

**Important:** Change the `JWT_SECRET` to a strong, random string in production!

---

## Security Notes

1. **Password Security:** All passwords are hashed using bcrypt with 10 salt rounds before storage.
2. **JWT Tokens:** Tokens expire after 24 hours. Store tokens securely on the client side.
3. **HTTPS:** Always use HTTPS in production to protect tokens and credentials in transit.
4. **Token Storage:** Never store JWT tokens in localStorage if your app is vulnerable to XSS attacks. Consider httpOnly cookies for better security.
5. **Secret Key:** Use a strong, random JWT secret key in production environments.

---

## Testing with Postman

### Collection Setup

1. **Admin Signup**
   - Method: `POST`
   - URL: `http://localhost:3000/admin/signup`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "Email": "admin@example.com",
       "Password": "SecurePassword123!",
       "Name": "Admin User",
       "Role": "admin"
     }
     ```

2. **Admin Login**
   - Method: `POST`
   - URL: `http://localhost:3000/admin/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "Email": "admin@example.com",
       "Password": "SecurePassword123!"
     }
     ```

3. **Get Profile**
   - Method: `GET`
   - URL: `http://localhost:3000/admin/profile`
   - Headers: 
     - `Authorization: Bearer <token-from-login-response>`
     - `Content-Type: application/json`

---

## Public API Endpoints

### 1. Store Loan Data

Store loan data with flexible structure (accepts any data type).

**Endpoint:** `POST /loan-data`

**Authentication:** Not required (Public endpoint)

**Request Body:**
```json
{
  "name": "John Doe",
  "loanData": {
    "amount": 50000,
    "interestRate": 5.5,
    "duration": 12,
    "status": "pending"
  }
}
```

**Request Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Name of the loan applicant |
| loanData | Any | Yes | Loan data in any format (object, array, string, number, etc.) |

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "loanData": {
      "amount": 50000,
      "interestRate": 5.5,
      "duration": 12,
      "status": "pending"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Missing Required Fields:**
```json
{
  "success": false,
  "message": "Name is required."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error while storing loan data.",
  "error": "Error details..."
}
```

---

## Admin API Endpoints (Continued)

### 4. Get All Loan Data

Retrieve all loan data entries with pagination and search.

**Endpoint:** `GET /admin/loan-data`

**Authentication:** Required (JWT Token)

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | Number | No | 1 | Page number for pagination |
| limit | Number | No | 10 | Number of items per page |
| name | String | No | - | Search by name (case-insensitive) |

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Loan data retrieved successfully.",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "loanData": {
        "amount": 50000,
        "interestRate": 5.5,
        "duration": 12,
        "status": "pending"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error while retrieving loan data.",
  "error": "Error details..."
}
```

---

### 5. Get Single Loan Data

Retrieve a single loan data entry by ID.

**Endpoint:** `GET /admin/loan-data/:id`

**Authentication:** Required (JWT Token)

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | String | Yes | Loan data entry ID |

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Loan data retrieved successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "loanData": {
      "amount": 50000,
      "interestRate": 5.5,
      "duration": 12,
      "status": "pending"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found:**
```json
{
  "success": false,
  "message": "Loan data not found."
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

---

## Loan Data Model

The loan data model uses a flexible schema that accepts any data structure:

- **name**: String (required) - Name of the loan applicant
- **loanData**: Mixed Type (required) - Can be any data type:
  - Object: `{ "amount": 50000, "status": "pending" }`
  - Array: `[1, 2, 3]` or `[{ "item": "value" }]`
  - String: `"loan information"`
  - Number: `50000`
  - Boolean: `true`
  - Or any combination/nested structure

**Example Request Bodies:**

**Object:**
```json
{
  "name": "John Doe",
  "loanData": {
    "amount": 50000,
    "interestRate": 5.5,
    "details": {
      "type": "personal",
      "collateral": true
    }
  }
}
```

**Array:**
```json
{
  "name": "Jane Smith",
  "loanData": [
    { "loanId": "L001", "amount": 30000 },
    { "loanId": "L002", "amount": 20000 }
  ]
}
```

**Simple Value:**
```json
{
  "name": "Bob Johnson",
  "loanData": "Loan application pending review"
}
```

---

## Support

For issues or questions, please contact the development team or refer to the main project README.

---

**Last Updated:** January 2024
