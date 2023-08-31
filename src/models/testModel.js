const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const TestModel = mongoose.model("Test", TestSchema);

module.exports = TestModel;
