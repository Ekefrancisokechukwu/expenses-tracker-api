# Expense Tracker API

A simple API that allows users to sign up, log in, and manage their expenses. Users can create, read, update, and delete their expenses, as well as filter them by date ranges.

## Table of Contents

-[Authentication](#authentication) -[Endpoints](#endpoints)

- [Sign Up](#sign-up)
- [Login](#login)
- [Get Expenses](#get-expenses)
- [Add Expense](#add-expense)
- [Update Expense](#update-expense)
- [Delete Expense](#delete-expense)
- [Filters](#filters)
- [Error Codes](#error-codes)

## BaseURL
-[baseURL](https://expenses-tracker-api-pwme.onrender.com/api/v1/)

## Authentication

This API uses JWT for authentication. You need to pass the token in the `Authorization` header for protected routes.

**Example:**

To get a token, you need to sign up and log in.

### Sign Up

`POST {{url}}/auth/register`

Registers a new user.

**Request Body:**

`````json
{"name":"john doe","email":"doe2@gmail.com","password":"test"}


```json
{
    "message": "User registered successfully",
    "user": {
        "name": "john doe",
        "email": "doe2@gmail.com",
        "_id": "66eea7c1b099d13961ca0a8a",
    }
}

 **Login**

````md
### Login

`POST {{url}}/auth/login`

Logs in a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "doe@example.com",
  "password": "test"
}
`````

````

```json
{
    "user": {
        "email": "doe1@gmail.com",
        "name": "john doe",
        "id": "66ec91d9d0b90a284cadcf5e"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZTFAZ21haWwuY29tIiwibmFtZSI6ImpvaG4gZG9lIiwiaWQiOiI2NmVjOTFkOWQwYjkwYTI4NGNhZGNmNWUiLCJpYXQiOjE3MjY5MTE1MjcsImV4cCI6MTcyNjk5NzkyN30.02EBDG7VqcNa5v35AMrQJSoSYm_ruGfOxrnZSwCrsw4"
}


- **Get Expenses**

```md
### Get Expenses

`GET /expenses`

Fetch all expenses for the authenticated user. Supports filtering by date range.

**Headers:**
````

**Response:**

```json
{
  "expenses": [
    {
      "_id": "66ee943ac3c13fcc997420b8",
      "title": "New Shoes",
      "description": "Running shoes for daily exercise",
      "amount": 129.5,
      "category": "clothing",
      "userId": "66ec91d9d0b90a284cadcf5e",
      "date": "2024-09-21T09:39:06.766Z",
      "__v": 0
    },
    {
      "_id": "66ee9b18eb83656c76b8e374",
      "title": "New Shoes",
      "description": "Running shoes for daily exercise",
      "amount": 129.5,
      "category": "clothing",
      "userId": "66ec91d9d0b90a284cadcf5e",
      "date": "2024-09-21T10:08:24.099Z",
      "__v": 0
    }
  ],
  "count": 2
}
```

- **Add Expense**

```md
### Add Expense

`POST /expenses`

Adds a new expense for the authenticated user.

**Headers:**
```

**Request Body:**

```json
{
  "title": "New Laptop",
  "category": "Electronics",
  "amount": 1200,
  "description": "Bought a new laptop for work"
}
```

````json
{
    "message": "Expense added successfully",
    "expense": {
        "title": "New Shoes",
        "description": "Running shoes for daily exercise",
        "amount": 129.5,
        "category": "clothing",
        "userId": "66ec91d9d0b90a284cadcf5e",
        "_id": "66eea6d8b81cbf151d1049a2",
        "date": "2024-09-21T10:58:32.227Z",
        "__v": 0
    }
}

- **Update Expense**

```md
### Update Expense

`PATCH /expenses/:id`

Updates an existing expense.

**Headers:**
````

**Request Body:**

```json
{
  "title": "Vitamins",
  "description": "Monthly supply of multivitamins",
  "amount": 50.99,
  "category": "health"
}
```

**Response:**

````json
{
    "message": "Expense updated successfully",
    "expense": {
        "_id": "66ee9b18eb83656c76b8e374",
        "title": "Vitamins",
        "description": "Monthly supply of multivitamins",
        "amount": 50.99,
        "category": "health",
        "userId": "66ec91d9d0b90a284cadcf5e",
        "date": "2024-09-21T10:08:24.099Z",
        "__v": 0
    }
}

- **Delete Expense**

```md
### Delete Expense

`DELETE /expenses/:id`

Deletes an existing expense.

**Headers:**
````

**Response:**

```json
{
  "message": "Expense deleted successfully"
}
```

### 5. **Filters**

```md
### Filters

You can filter expenses by time range using query parameters. For example:

- **Past week:** `/expenses?filterType=pastWeek`
- **Past month:** `/expenses?filterType=pastMonth`
- **Last 3 months:** `/expenses?filterType=last3Months`
- **Custom range:** `/expenses?filterType=custom&start=2023-06-01&end=2023-06-30`
```
