# 🚀 Learn Node.js

<img src="https://wakatime.com/badge/user/bb00c0fe-44b9-40c6-b043-77019e433b47/project/6b95c512-d1c1-4fa6-94b8-9001d2753750.svg"/>

<p align="center">
  <img width="180" src="./assets/nodejs.png"/>
</p>

<p align="center">
  <b>Personal learning journal: Node.js, Express, Requestly, JWT, Socket.IO, REST, NGINX, MongoDB</b>
</p>

---
## Key Technologies Covered
| Express.js | Requestly |  JWT | Socket.IO | REST API | NGINX | MongoDB |
|---|---|---|---|---|---|---|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50" alt="Express.js logo"/> | <img src="https://requestly.com/wp-content/uploads//2025/05/RQ-Logo.svg" alt="Requestly logo"/> | <img src="https://jwt.io/img/pic_logo.svg" width="56" alt="JWT logo"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" width="50" alt="Socket.IO logo"/> | <img src="./assets/rest-api-logo.svg" width="56" alt="REST API logo"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="56" alt="NGINX logo"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" alt="MongoDb logo"/>

### Brief Explanation
- `Express.js`: A minimal Node.js framework for building APIs and web servers with clean routing and middleware.
- `Requestly`: A tool for testing and debugging APIs by intercepting and modifying HTTP requests/responses.
- `JWT (JSON Web Token)`: A secure token format used for authentication and passing signed user/session data.
- `Socket.IO`: A real-time communication library for features like chat, live updates, and notifications.
- `REST API`: A standard way to design HTTP APIs around resources and methods like GET, POST, PUT, PATCH, and DELETE.
- `NGINX`: A fast web server and reverse proxy used for load balancing, SSL handling, and serving backend apps in production.
- `MongoDB`: A NoSQL document database commonly used with Node.js for flexible data storage.

---

## 📖 Overview

This repository documents my personal learning journey through Node.js and backend development. It gathers notes, runnable examples, and small projects I built while exploring topics from core Node behavior to building REST APIs with Express.

The content is written primarily for my own reference — concise notes, runnable examples, and practical experiments I can revisit later.

---

## 🎯 Learning Path

### Module 1: Introduction to Node.js
📚 **[Module 1 (Intro)](./Module%201%20%28Intro%29/)**

Foundational concepts to get you started:
- ✅ What is Node.js and why use it?
- ✅ JavaScript engines and runtime environments
- ✅ Setting up your first Node.js project
- ✅ Running JavaScript outside the browser

**Files:**
- [notes.md](./Module%201%20%28Intro%29/notes.md) - Core Node.js concepts
- `hello.js` - First Node.js program
- `package.json` - Project dependencies

---

### Module 2: Working with Modules
📚 **[Module 2 (Modules)](./Module%202%20%28Modules%29/)**

Learn how to structure code with Node.js modules:
- ✅ CommonJS module system (`require` / `module.exports`)
- ✅ Creating reusable modules
- ✅ Importing and exporting functions
- ✅ Calculator module example with custom math operations

**Files:**
- [notes.md](./Module%202%20%28Modules%29/notes.md) - Module system deep-dive
- `add.js` - Basic arithmetic module
- `calculator.js` - Advanced calculator example
- `math.js` - Custom math operations

---

### Module 3: File System Operations
📚 **[Module 3 (File System)](./Module%203%20%28File%20System%29/)**

Master file I/O operations in Node.js:
- ✅ Reading files (`fs.readFile`, `fs.readFileSync`)
- ✅ Writing files and creating new files
- ✅ Copying and manipulating file data
- ✅ Asynchronous vs. synchronous file operations

**Files:**
- [notes.md](./Module%203%20%28File%20System%29/notes.md) - Module notes and summary
- `file.js` - File system operations examples
- `contacts.txt` - Sample data file
- `DateFile.txt`, `createdFile.txt` - Generated during execution

---

### Module 4: How Node.js Works
📚 **[Module 4 (Working of NodeJs)](./Module%204%20%28Working%20%20of%20NodeJs%29/)**

Deep dive into Node.js architecture and event-driven model:
- ✅ Event Queue and Event Loop mechanism
- ✅ Blocking vs. Non-Blocking operations
- ✅ Thread Pool and libuv
- ✅ Ensuring server responsiveness
- ✅ Asynchronous patterns (callbacks, Promises, async/await)

**Files:**
- [notes.md](./Module%204%20%28Working%20%20of%20NodeJs%29/notes.md) - Complete flow diagram and detailed explanations
- `systemInfo.js` - System information retrieval

---

### Module 5: Web Server
📚 **[Module 5 (Web Server)](./Module%205%20%28Web%20Server%29/)**

Build a basic HTTP server with routing and request logging:
- ✅ Creating server with `http.createServer`
- ✅ Handling route paths and query parameters
- ✅ Logging request details to a file
- ✅ Returning route-based responses

**Files:**
- [notes.md](./Module%205%20%28Web%20Server%29/notes.md) - Module notes and summary
- `index.js` - HTTP server and routing logic
- `log.txt` - Request logs

---

### Module 6: HTTP Methods
📚 **[Module 6 (HTTP Methods)](./Module%206%20%28HTTP%20Methods%29/)**

Learn how different HTTP methods map to CRUD-style API actions:
- ✅ GET for reading data
- ✅ POST for creating data
- ✅ PUT for full replacement
- ✅ PATCH for partial updates
- ✅ DELETE for removing data

**Files:**
- [notes.md](./Module%206%20%28HTTP%20Methods%29/notes.md) - Method explanations and request examples
- `index.js` - HTTP methods server example
- `log.txt` - Request logs

---

### Module 7: Express.js
📚 **[Module 7 (Express JS)](./Module%207%20%28Express%20JS%29/)**

Express examples and small apps used while learning routing and middleware.

- App setup with `express`
- Basic routes and `req.query` usage
- Run the examples inside the module folder

**Setup commands:**
```powershell
cd "Module 7 (Express JS)"
npm install
```

---

### Module 8: Requestly & REST API (Express)
📚 **[Module 8 (Requestly)](./Module%208%20%28Requestly%29/)**

Practical REST API built with Express and a JSON file as simple storage — used for testing with Requestly.

**Endpoints:**
- GET `/api/users` — return all users
- GET `/api/users/:id` — return one user
- POST `/api/users` — add a user (writes to `MOCK_DATA.json`)
- PATCH `/api/users/:id` — partial update (merges fields)
- DELETE `/api/users/:id` — remove a user

**Files:**
- `index.js` — Express server and endpoints
- `MOCK_DATA.json` — sample data file
- `package.json`
 - `MOCK_DATA.json` — sample data file (generated with [Mockaroo](https://www.mockaroo.com))

---

### Module 9: Middleware
📚 **[Module 9 (Middleware)](./Module%209%20%28Middleware%29/)**

Deep dive into Express middleware patterns and building robust REST APIs with proper error handling.

- ✅ Custom middleware functions (logging, console output)
- ✅ Middleware execution order and `next()` flow
- ✅ Complete CRUD REST API with all HTTP methods
- ✅ Error handling for missing IDs (404 responses)
- ✅ File write error handling (500 responses)
- ✅ Request logging to file with timestamps
- ✅ URL-encoded request body parsing
- ✅ Validating and checking for resource existence

**Endpoints:**
- GET `/api/users` — return all users
- GET `/api/users/:id` — return one user (404 if not found)
- POST `/api/users` — add a user with auto-increment ID
- PATCH `/api/users/:id` — partial update using object spread (404 if not found)
- DELETE `/api/users/:id` — remove a user (404 if not found)

**Files:**
- `index.js` — Express server with middleware and REST endpoints
- `MOCK_DATA.json` — sample user data
- `package.json` — Express dependency
- `notes.md` — Detailed middleware explanations
- `log.txt` — Request log file (auto-generated)

---

## 🧠 Key Concepts Covered

| Concept | Status | Details |
|---------|--------|---------|
| **Node.js Basics** | ✅ | Runtime, V8 engine, `node` CLI, package.json basics |
| **Modules & Exports** | ✅ | CommonJS (`require`, `module.exports`), structuring code into files |
| **File System (`fs`)** | ✅ | `readFile`/`writeFile`, sync vs async, append, copy, delete, `fs.stat` |
| **Event Loop & libuv** | ✅ | Event queue, callback processing, thread pool for background I/O |
| **Asynchronous Programming** | ✅ | Callbacks, Promises, `async`/`await`, error handling patterns |
| **Promises & Async/Await** | ✅ | Converting callbacks to Promises, `try/catch` with async functions |
| **HTTP Server (raw)** | ✅ | `http.createServer`, routing by URL, query parsing, request logging |
| **HTTP Methods & REST** | ✅ | GET, POST, PUT, PATCH, DELETE mapped to CRUD semantics |
| **Express.js** | ✅ | `express()` app, route handlers, `req.query`, middleware basics |
| **Middleware** | ✅ | Custom middleware, `next()` flow, execution order, logging, error handling |
| **File-backed persistence** | ✅ | Simple JSON storage pattern (`MOCK_DATA.json`) used for exercises |
| **Requestly** | ✅ | API testing workflow: requests, bodies, params, and inspecting responses |
| **CRUD patterns** | ✅ | Create, read, update (merge vs replace), delete, response conventions |
| **Merging updates** | ✅ | Object spread (`{ ...old, ...updates }`) for shallow merges in PATCH handlers |
| **Security & Auth (concepts)** | ⏳ | JWT-based flows, token handling — planned/partially explored in notes |
| **Databases (concepts)** | ⏳ | MongoDB integration patterns (conceptual notes, next steps) |
| **Realtime (concepts)** | ⏳ | Socket.IO idea and use-cases (chat, notifications) |
| **Deployment (concepts)** | ⏳ | NGINX as reverse proxy / load balancer (notes for future work) |


---

## 🚀 Quick Start

Essential downloads:

- Node.js: https://nodejs.org/
- Requestly: https://requestly.io/downloads/

Minimal steps to run the examples locally:

1. Open a terminal and go to the repo root.
2. Run individual scripts with `node`, for example:

```powershell
node "Module 1 (Intro)\hello.js"
```

3. To run the Requestly REST API (Module 8):

```powershell
cd "Module 8 (Requestly)"
npm install
npm start
```

Then use Requestly or curl to call the endpoints on `http://localhost:8000`.

---

<!-- repository structure removed as requested -->

## 💡 Learning Tips

1. **Read the `.md` files first** - They contain detailed explanations and flow diagrams
2. **Run the code examples** - Execute each module to see it in action
3. **Experiment** - Modify the code and observe the results
4. **Understand the Event Loop** - Module 4 is crucial for understanding Node.js
5. **Practice async patterns** - Use async/await instead of callbacks for cleaner code

---

## 🔑 Core Learnings

### Why Node.js?
- ✅ Non-blocking I/O model for high scalability
- ✅ Single-threaded event loop handles thousands of concurrent connections
- ✅ JavaScript on both frontend and backend
- ✅ Fast execution with V8 engine

---

## ⚠️ Important Notes

- 🚫 **Public contributions** are not accepted yet - this is a personal learning repository
- 📝 Code examples may not follow production best practices
- 🔒 Always use proper error handling and validation in production code
- 🛡️ See `.gitignore` for sensitive files that won't be committed

---

## 🤝 Contributing

This is a **personal learning repository**. If you have suggestions or find errors, feel free to:
- 📧 Report issues
- 💬 Provide feedback
- 🐛 Suggest improvements

---

## 📚 Additional Resources

- [Official Node.js Documentation](https://nodejs.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [libuv - The Event Loop Library](http://docs.libuv.org/)

---

## 📄 License

This repository is open source and free to use for learning purposes.

---

<p align="center">
  <b>Happy Learning! 🚀</b>
  <br/>
  ⭐ If you find this helpful, consider starring the repository!
</p>
