# Module 5 - Web Server Notes

## Overview
This module creates a basic HTTP server using Node.js and handles routing, query parameters, and request logging.

## Modules Used
- http: Creates the server and handles requests/responses.
- fs: Appends request logs to a file.
- url: Parses URL path and query parameters.

## Server Flow in index.js

### 1. Create Server
- http.createServer((req, res) => { ... }) sets up request handler.

### 2. Ignore Favicon Noise
- Requests to /favicon.ico are ended early to avoid unnecessary log entries.

### 3. Log Each Request
- A log message is built with timestamp and requested URL.
- fs.appendFile writes log line to log.txt asynchronously.

### 4. Parse URL
- url.parse(req.url, true) returns:
  - pathname: route path
  - query: query object (for example name and uid)

### 5. Route Handling
- / -> responds with home page
- /about?name=...&uid=... -> returns personalized response
- Any other path -> 404 Not Found

### 6. Listen on Port
- server.listen(8000) starts server on port 8000.

## Code Examples

### Minimal HTTP Server
```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from server");
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
```

Explanation:
- `createServer` receives each request and sends a response.
- `listen` binds the server to a port so browser/client can connect.

### Route with Query Parameters
```js
const url = require("url");

const parsed = url.parse("/about?name=Karan&uid=101", true);
console.log(parsed.pathname);   // /about
console.log(parsed.query.name); // Karan
console.log(parsed.query.uid);  // 101
```

Explanation:
- `url.parse(..., true)` converts query string into an object.
- Useful for dynamic responses like `/about?name=...`.

### Async Request Logging
```js
const fs = require("fs");

const logLine = `${Date.now()}: /about request\n`;
fs.appendFile("log.txt", logLine, (err) => {
  if (err) {
    console.error("Log write failed:", err.message);
  }
});
```

Explanation:
- `appendFile` writes logs without blocking the server.
- Error handling prevents silent logging failures.

## Run Commands
From Module 5 folder:
- npm install
- npm start

## Example Requests
- http://localhost:8000/
- http://localhost:8000/about?name=Karan&uid=101
- http://localhost:8000/unknown

## Improvements You Can Add Next
- Set status codes (200, 404).
- Handle file write errors in appendFile callback.
- Return HTML or JSON responses.
- Replace url.parse with URL class for modern style.
