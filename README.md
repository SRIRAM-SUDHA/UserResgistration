# User Registration and Address Storage API

This is a simple backend API built using Node.js and SQLite. The API allows users to register with their name and store multiple addresses. It implements a one-to-many relationship between users and their addresses, using a relational database.

## Features

- **User Registration**: Stores a user's name and their associated address information.
- **Address Storage**: Allows storing multiple address details like pincode, city, state, and country for each user.
- **View All Users and Addresses**: Retrieve all users and their associated addresses.

## Technology Stack

- **Node.js**: Server-side JavaScript runtime
- **SQLite**: Lightweight, file-based relational database
- **Express**: Web framework for Node.js

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [SQLite3](https://www.sqlite.org/download.html)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SRIRAM-SUDHA/UserResgistration.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the project:

   ```bash
   node app.js
   ```

5. The server will start at `http://localhost:3000`.

## API Endpoints

### 1. Register a User and Address

- **URL**: `/register`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "address": "123 Main St, Apartment 4B",
    "pincode": 123456,
    "city": "New York",
    "state": "New York",
    "country": "USA"
  }
  ```

- **Response**:

  - Status: `201 Created`
  - Body: `"Added User Data Successfully"`

- **Error Handling**:
  - Status: `400 Bad Request` if any required fields are missing.
  - Status: `500 Internal Server Error` for any server-related issues.

### 2. Retrieve All Users and Their Addresses

- **URL**: `/register`
- **Method**: `GET`
- **Response**:
  - Status: `200 OK`
  - Example Response:
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "address": "123 Main St, Apartment 4B",
        "pincode": 123456,
        "city": "New York",
        "state": "New York",
        "country": "USA"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "address": "456 Oak Avenue, Suite 101",
        "pincode": 789012,
        "city": "Los Angeles",
        "state": "California",
        "country": "USA"
      }
    ]
    ```
  - If no data is available: `"No Data"`

## Database Structure

- **User Table**:

  - `id` (Primary Key, Auto Increment)
  - `name` (String, Not Null)

- **Address Table**:
  - `id` (Primary Key, Auto Increment)
  - `userId` (Foreign Key referencing `user.id`)
  - `address` (Text)
  - `pincode` (Integer)
  - `city` (String)
  - `state` (String)
  - `country` (String)

## Error Handling

- **400 Bad Request**: Returned when required fields are missing from the request.
- **500 Internal Server Error**: Returned when there is a server or database-related error.

## Example Requests

### **Register a User**

```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "address": "123 Main St, Apartment 4B",
  "pincode": 123456,
  "city": "New York",
  "state": "New York",
  "country": "USA"
}'
```
