const os = require('os');

// Get system information
console.log("Operating System:", os.type());
console.log("Platform:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2), "GB");
console.log("Free Memory:", (os.freemem() / (1024 * 1024 * 1024)).toFixed(2), "GB");
console.log("Cores:", os.cpus().length);