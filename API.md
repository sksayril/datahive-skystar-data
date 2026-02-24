# Public API Documentation

This document provides comprehensive documentation for the public API endpoints.

## Table of Contents
- [Base URL](#base-url)
- [Public Endpoints](#public-endpoints)
  - [Store Loan Data](#1-store-loan-data)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)

---

## Base URL

```
http://localhost:3000
```

---

## Public Endpoints

### 1. Store Loan Data

Store loan data with flexible structure. This endpoint accepts any data type and structure for the loan data field.

**Endpoint:** `POST /loan-data`

**Authentication:** Not required (Public endpoint)

**Content-Type:** `application/json`

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
| name | String | Yes | Name of the loan applicant or identifier |
| loanData | Any | Yes | Loan data in any format (object, array, string, number, boolean, or nested structure) |

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

**400 Bad Request - Missing Name:**
```json
{
  "success": false,
  "message": "Name is required."
}
```

**400 Bad Request - Missing Loan Data:**
```json
{
  "success": false,
  "message": "Loan data is required."
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

## Request/Response Examples

### Example 1: Simple Object Structure

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "loanData": {
      "amount": 50000,
      "interestRate": 5.5,
      "duration": 12,
      "status": "pending"
    }
  }'
```

**Response:**
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

---

### Example 2: Array Structure

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "loanData": [
      {
        "loanId": "L001",
        "amount": 30000,
        "type": "personal"
      },
      {
        "loanId": "L002",
        "amount": 20000,
        "type": "business"
      }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "loanData": [
      {
        "loanId": "L001",
        "amount": 30000,
        "type": "personal"
      },
      {
        "loanId": "L002",
        "amount": 20000,
        "type": "business"
      }
    ],
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### Example 3: Nested Complex Structure

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Johnson",
    "loanData": {
      "personalInfo": {
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob@example.com",
        "phone": "+1234567890"
      },
      "loanDetails": {
        "principal": 75000,
        "interestRate": 6.25,
        "termMonths": 24,
        "monthlyPayment": 3325.50
      },
      "documents": [
        {
          "type": "identity",
          "status": "verified"
        },
        {
          "type": "income",
          "status": "pending"
        }
      ],
      "status": "under_review",
      "submittedAt": "2024-01-15T10:00:00.000Z"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Bob Johnson",
    "loanData": {
      "personalInfo": {
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob@example.com",
        "phone": "+1234567890"
      },
      "loanDetails": {
        "principal": 75000,
        "interestRate": 6.25,
        "termMonths": 24,
        "monthlyPayment": 3325.50
      },
      "documents": [
        {
          "type": "identity",
          "status": "verified"
        },
        {
          "type": "income",
          "status": "pending"
        }
      ],
      "status": "under_review",
      "submittedAt": "2024-01-15T10:00:00.000Z"
    },
    "createdAt": "2024-01-15T10:40:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

---

### Example 4: Simple String Value

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Williams",
    "loanData": "Loan application submitted for review"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Alice Williams",
    "loanData": "Loan application submitted for review",
    "createdAt": "2024-01-15T10:45:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
```

---

### Example 5: Number Value

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie Brown",
    "loanData": 100000
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Charlie Brown",
    "loanData": 100000,
    "createdAt": "2024-01-15T10:50:00.000Z",
    "updatedAt": "2024-01-15T10:50:00.000Z"
  }
}
```

---

### Example 6: Boolean Value

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "David Miller",
    "loanData": true
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Loan data stored successfully.",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "name": "David Miller",
    "loanData": true,
    "createdAt": "2024-01-15T10:55:00.000Z",
    "updatedAt": "2024-01-15T10:55:00.000Z"
  }
}
```

---

## Error Handling

### Missing Required Fields

**Request (Missing Name):**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "loanData": {
      "amount": 50000
    }
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name is required."
}
```

**Request (Missing Loan Data):**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Loan data is required."
}
```

---

### Invalid JSON Format

**Request:**
```bash
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "loanData": {
      "amount": 50000
    }
  }'  # Missing closing brace
```

**Response (400 Bad Request):**
```json
{
  "error": "Unexpected token } in JSON at position X"
}
```

---

## Using JavaScript (Fetch API)

### Example 1: Basic Request

```javascript
fetch('http://localhost:3000/loan-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    loanData: {
      amount: 50000,
      interestRate: 5.5,
      duration: 12,
      status: 'pending'
    }
  })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
```

### Example 2: With Error Handling

```javascript
async function storeLoanData(name, loanData) {
  try {
    const response = await fetch('http://localhost:3000/loan-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        loanData: loanData
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('Loan data stored:', result.data);
      return result.data;
    } else {
      console.error('Error:', result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}

// Usage
storeLoanData('John Doe', {
  amount: 50000,
  interestRate: 5.5,
  duration: 12
});
```

---

## Using Python (requests library)

### Example

```python
import requests
import json

url = "http://localhost:3000/loan-data"

payload = {
    "name": "John Doe",
    "loanData": {
        "amount": 50000,
        "interestRate": 5.5,
        "duration": 12,
        "status": "pending"
    }
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 201:
    data = response.json()
    print("Success:", data)
    print("Loan ID:", data["data"]["_id"])
else:
    print("Error:", response.json())
```

---

## Using Postman

### Setup

1. **Method:** POST
2. **URL:** `http://localhost:3000/loan-data`
3. **Headers:**
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body:** Select "raw" and "JSON", then enter:
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

### Expected Response

- **Status:** 201 Created
- **Body:**
  ```json
  {
    "success": true,
    "message": "Loan data stored successfully.",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "loanData": { ... },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

---

## Using Axios (JavaScript)

### Example

```javascript
const axios = require('axios');

async function storeLoanData() {
  try {
    const response = await axios.post('http://localhost:3000/loan-data', {
      name: 'John Doe',
      loanData: {
        amount: 50000,
        interestRate: 5.5,
        duration: 12,
        status: 'pending'
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      console.error('Error:', error.response.data);
    } else {
      // Network error
      console.error('Network error:', error.message);
    }
  }
}

storeLoanData();
```

---

## Important Notes

1. **Flexible Data Structure:** The `loanData` field accepts any valid JSON data type:
   - Objects: `{ "key": "value" }`
   - Arrays: `[1, 2, 3]` or `[{ "item": "value" }]`
   - Strings: `"text"`
   - Numbers: `123` or `45.67`
   - Booleans: `true` or `false`
   - Null: `null`
   - Nested combinations of the above

2. **No Schema Validation:** The API does not validate the structure of `loanData`. Any valid JSON will be accepted and stored.

3. **Name Field:** The `name` field is required and must be a string. It serves as an identifier for the loan data entry.

4. **Automatic Timestamps:** Each entry automatically receives `createdAt` and `updatedAt` timestamps.

5. **Unique IDs:** Each entry receives a unique `_id` (MongoDB ObjectId) that can be used to retrieve the data later.

---

## Testing the API

### Quick Test with cURL

```bash
# Test with simple object
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","loanData":{"amount":10000}}'

# Test with array
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User 2","loanData":[1,2,3]}'

# Test with string
curl -X POST http://localhost:3000/loan-data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User 3","loanData":"Simple text"}'
```

---

## Support

For issues or questions about the API, please refer to the main project documentation or contact the development team.

---

**Last Updated:** January 2024
