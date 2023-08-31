const mongoose = require("mongoose");

class Model {
  constructor() {
    mongoose
      .connect(`mongodb://${process.env.DBHOST}/wardrove`)
      .then(() => console.log("Connected to mongo DB"))
      .catch((err) => console.log("mongo error", err));
  }
}

module.exports = Model;
