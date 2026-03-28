# 🚀 Learn Node.js

<img src="https://wakatime.com/badge/user/bb00c0fe-44b9-40c6-b043-77019e433b47/project/6b95c512-d1c1-4fa6-94b8-9001d2753750.svg"/>

<p align="center">
  <img width="180" src="./assets/nodejs.png"/>
</p>

<p align="center">
  <b>A structured, hands-on guide to mastering Node.js and backend development</b>
</p>

---

## 📖 Overview

A comprehensive learning repository documenting the journey from **Node.js fundamentals to advanced backend concepts**. Each module includes detailed explanations, practical code examples, and hands-on exercises.

**Perfect for anyone looking to:**
- Understand how Node.js works under the hood
- Build scalable backend applications
- Master asynchronous JavaScript patterns
- Learn real-world server architecture

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
- `nodejs.md` - Core Node.js concepts
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
- `modules.md` - Module system deep-dive
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
- `working.md` - Complete flow diagram and detailed explanations
- `test.js` - Event loop demonstrations
- `systemInfo.js` - System information retrieval

---

## 🧠 Key Concepts Covered

| Concept | Status | Details |
|---------|--------|---------|
| **Node.js Basics** | ✅ | Runtime, engines, setup |
| **Modules & Exports** | ✅ | CommonJS, require, exports |
| **File System (fs)** | ✅ | Read, write, async operations |
| **Event Loop** | ✅ | Non-blocking I/O, thread pool |
| **Asynchronous Programming** | ✅ | Callbacks, event-driven architecture |
| **Promises & Async/Await** | ✅ | Modern async patterns |
| **HTTP Server** | 🔄 | Coming next |
| **Express.js** | ⏳ | Advanced routing framework |
| **REST APIs** | ⏳ | API design patterns |
| **Database Integration** | ⏳ | MongoDB, SQL connections |
| **Authentication** | ⏳ | JWT, sessions, security |

---

## 🚀 Quick Start

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- Basic JavaScript knowledge
- A code editor (VS Code recommended)

### Running Examples

```bash
# Navigate to the repository
cd LearnNodeJS

# Run a specific module
node "Module 1 (Intro)/hello.js"
node "Module 2 (Modules)/calculator.js"
node "Module 3 (File System)/file.js"
node "Module 4 (Working  of NodeJs)/test.js"
```

### Viewing Markdown Documentation

Each module includes `.md` files with detailed explanations:
```bash
# Open in your editor or GitHub to view formatted documentation
```

---

## 📁 Repository Structure

```
LearnNodeJS/
├── Module 1 (Intro)/              # Node.js fundamentals
│   ├── nodejs.md
│   ├── hello.js
│   └── package.json
├── Module 2 (Modules)/            # Module system
│   ├── modules.md
│   ├── calculator.js
│   ├── math.js
│   └── add.js
├── Module 3 (File System)/        # File I/O operations
│   ├── file.js
│   └── *.txt (sample files)
├── Module 4 (Working  of NodeJs)/ # Architecture & event loop
│   ├── working.md                 # Detailed flow diagrams
│   ├── test.js
│   └── systemInfo.js
├── assets/                        # Images and resources
├── README.md                      # This file
└── .gitignore                     # Git ignore rules
```

---

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

### Non-Blocking Architecture
The heart of Node.js is understanding the **event-driven, non-blocking model**:
```
Request → Event Queue → Event Loop → Process → Return Result
```

For detailed explanation, see [Module 4: How Node.js Works](./Module%204%20%28Working%20%20of%20NodeJs%29/working.md)

---

## ⚠️ Important Notes

- 🚫 **Public contributions** are not accepted yet - this is a personal learning repository
- 📝 Code examples may not follow production best practices
- 🔒 Always use proper error handling and validation in production code
- 🛡️ See `.gitignore` for sensitive files that won't be committed

---

## 📈 Learning Progress

| Module | Completion | Topics |
|--------|------------|---------|
| Module 1 | ✅ 100% | Node.js intro, setup |
| Module 2 | ✅ 100% | Modules, require, exports |
| Module 3 | ✅ 100% | File system operations |
| Module 4 | ✅ 100% | Event loop, architecture |
| HTTP & Servers | 🔄 In Progress | Coming next |

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
