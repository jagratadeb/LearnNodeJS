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
