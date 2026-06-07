const mongoose = require("mongoose");

module.exports = function connectToMongoDB(uri) {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
