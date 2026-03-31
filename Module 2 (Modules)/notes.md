# 📘Note 2
## Modules
### 🔹 What are Modules?

In Node.js, a **module** is simply a file that contains reusable code.
Each file in Node.js is treated as a separate module.

Modules help you:

* Organize code into smaller parts
* Improve readability
* Reuse functions across files
* Maintain clean architecture

---

### 🔹 Types of Modules

1. **Built-in Modules** (come with Node.js)
2. **Custom Modules** (your own files)
3. **Third-party Modules** (installed via npm)

---

### 🔹 Exporting a Single Function

If you want to export **one function only**, you can directly assign it to `module.exports`.

Example:

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

### Importing it:

```js
// app.js
const add = require('./math');

console.log(add(2, 3)); // 5
```

👉 Here, `module.exports = add;` means:

* The entire module exports only the `add` function
* When imported, you directly get the function

---

### 🔹 Exporting Multiple Functions (Object Notation)

If you want to export **multiple functions**, use an object.

Example:

```js
// math.js
function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

module.exports = {
  subtract,
  multiply,
  divide,
};
```

### Importing it:

```js
// app.js
const math = require('./math');

console.log(math.subtract(5, 2)); // 3
console.log(math.multiply(3, 4)); // 12
console.log(math.divide(10, 2));  // 5
```

👉 Here:

* You export an object containing multiple functions
* Access them using `math.functionName`

---

### 🔹 Example of Built-in Modules

Node.js provides many built-in modules like:

* `fs` → File System
* `http` → Create servers
* `path` → Work with file paths
* `os` → System information

Example using `fs` module:

```js
const fs = require('fs');

// Write to a file
fs.writeFileSync('example.txt', 'Hello, Node.js!');

// Read from file
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);
```

---

### 🔹 Key Points

* Every file is a module in Node.js
* Use `module.exports` to share code
* Use `require()` to import modules
* Export:

  * Single → direct assignment
  * Multiple → object notation

---

### 🚀 Summary

| Export Type     | Syntax                          | Use Case           |
| --------------- | ------------------------------- | ------------------ |
| Single Function | `module.exports = add;`         | One main function  |
| Multiple        | `module.exports = { a, b, c };` | Multiple utilities |

---

