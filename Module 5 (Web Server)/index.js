const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("./Module 5 (Web Server)/log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("home page");
        break;
      case "/about":
        const name = myUrl.query.name;
        const uid = myUrl.query.uid;
        res.end(`Hi ${name}\n your uid is ${uid}`);
        break;
      default:
        res.end("404 Not Found!");
    }
  });
});

server.listen(8000, () => {
  console.log("Server started!");
});
