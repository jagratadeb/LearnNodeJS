const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Request received\n`;
  fs.appendFile("./Module 5 (Web Server)/log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("home page");
        break;
      case "/about":
        res.end("I am an SDE\nJagrata Deb");
        break;
      default:
        res.end("404 Not Found!");
    }
  });
});

server.listen(8000, () => {
  console.log("Server started!");
});
