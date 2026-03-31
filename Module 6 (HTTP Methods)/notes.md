# Module 6 - HTTP Methods Notes

## Overview
This module explains common HTTP methods used to perform CRUD operations in APIs:
- GET: Read data
- POST: Create data
- PUT: Replace full data
- PATCH: Update partial data
- DELETE: Remove data

## Why HTTP Methods Matter
- They define the intent of a request.
- They make APIs predictable and easier to maintain.
- They help clients and servers communicate using a standard pattern.

## Method-Wise Notes

### 1. GET
- Purpose: Fetch data from server.
- Request body: Usually not used.
- Idempotent: Yes (multiple same requests should not change state).
- Example: `GET /users`

Typical response:
- 200 OK with requested data
- 404 Not Found if resource does not exist

### 2. POST
- Purpose: Create new resource.
- Request body: Required (data to create).
- Idempotent: No (same request may create multiple records).
- Example: `POST /users`

Typical response:
- 201 Created with created resource
- 400 Bad Request for invalid input

### 3. PUT
- Purpose: Replace an entire existing resource.
- Request body: Full object is usually sent.
- Idempotent: Yes (same request repeatedly keeps same final state).
- Example: `PUT /users`

Typical response:
- 200 OK or 204 No Content on success
- 404 Not Found if resource does not exist

### 4. PATCH
- Purpose: Update part of a resource.
- Request body: Only changed fields.
- Idempotent: Can be, depending on implementation.
- Example: `PATCH /users`

Typical response:
- 200 OK with updated resource
- 400 Bad Request for invalid patch data

### 5. DELETE
- Purpose: Remove a resource.
- Request body: Usually not needed.
- Idempotent: Yes (deleting same resource again should not create new changes).
- Example: `DELETE /users`

Typical response:
- 200 OK or 204 No Content on success
- 404 Not Found if resource does not exist

## Code Example (Simple and Beginner-Friendly)

```js
const http = require("http");

const users = ["Aman", "Riya"];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url !== "/users") {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Route not found" }));
  }

  // For learning: same route, different behavior by HTTP method
  switch (req.method) {
    case "GET":
      return res.end(JSON.stringify({ method: "GET", data: users }));

    case "POST":
      users.push("New User");
      res.statusCode = 201;
      return res.end(JSON.stringify({ method: "POST", message: "User created", data: users }));

    case "PUT":
      users[0] = "Replaced User";
      return res.end(JSON.stringify({ method: "PUT", message: "User fully replaced", data: users }));

    case "PATCH":
      users[0] = "Updated Name";
      return res.end(JSON.stringify({ method: "PATCH", message: "User partially updated", data: users }));

    case "DELETE":
      users.pop();
      return res.end(JSON.stringify({ method: "DELETE", message: "User deleted", data: users }));

    default:
      res.statusCode = 405;
      return res.end(JSON.stringify({ message: "Method not allowed" }));
  }
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
```

## Example Requests
- GET `http://localhost:8000/users`
- POST `http://localhost:8000/users`
- PUT `http://localhost:8000/users`
- PATCH `http://localhost:8000/users`
- DELETE `http://localhost:8000/users`

## Quick Summary
- Use GET to read.
- Use POST to create.
- Use PUT for full update.
- Use PATCH for partial update.
- Use DELETE to remove.
