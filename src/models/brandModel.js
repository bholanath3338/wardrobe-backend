const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
});

const BrandModel = mongoose.model("brand", BrandSchema);

module.exports = BrandModel;
