const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  categoryDescription: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 2000,
  },
  categoryImage: {
    // data: Buffer,
    // contentType: String,
    type: String,
    required: true,
  },
  categoryParentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: false,
  },
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
