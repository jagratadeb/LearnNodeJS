const fs = require("fs");

// Sync write: blocks execution until the file is written.
fs.writeFileSync("./Module 3 (File System)/createdFile.txt","This is from writeFileSync");

// Async write: non-blocking; callback runs after write completes.
fs.writeFile("./Module 3 (File System)/createdFile.txt","This is from writeFile",(err) => {});

// Sync read: blocks execution and returns data immediately.
const contact = fs.readFileSync("./Module 3 (File System)/contacts.txt","utf-8");
console.log(contact);

// Async read: non-blocking; result is available inside callback.
fs.readFile("./Module 3 (File System)/contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Result:", result);
  }
});


// Sync append: blocks execution until data is appended.
const date = new Date();
let dateMonthYear = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
fs.appendFileSync("./Module 3 (File System)/DateFile.txt", `${dateMonthYear}\n`);


// Sync copy: blocks execution until file is copied.
fs.cpSync('./Module 3 (File System)/DateFile.txt', './Module 3 (File System)/copiedDateFile.txt');

// Sync delete: blocks execution until file is deleted.
fs.writeFileSync("./Module 3 (File System)/delete.txt","This is a file to be deleted");
fs.unlinkSync("./Module 3 (File System)/delete.txt");


// Sync stat: blocks execution and returns file stats immediately.
console.log(fs.statSync("./Module 3 (File System)/contacts.txt"));

// Sync methods return values directly.
// Async methods do not return data immediately; they provide it via callback/Promise later.
