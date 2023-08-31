const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productRating: {
    type: Number,
    required: true,
  },
  productImage: {
    // data: Buffer,
    // contentType: String,
    type: [String],
    required: true,
  },
  productDiscountType: {
    type: Number,
    required: true,
  },
  productDiscountValue: {
    type: Number,
    required: true,
  },
  productBrandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  productIsReturn: {
    type: Boolean,
    required: true,
  },
  productReturnDays: {
    type: Number,
    required: true,
  },
  productPaymentOption: {
    type: [String],
    required: true,
  },
  productCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  productSimilar: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  productMoreDetails: {
    type: JSON,
    required: true,
  },
  productSize: {
    type: [String],
    required: true,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
