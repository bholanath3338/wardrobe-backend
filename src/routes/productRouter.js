const express = require("express");
const productModel = require("../models/productModel");
const ProductValidator = require("../validators/productValidator");
const ResponseHelper = require("../helpers/responseHelper");
const multer = require("multer");
const util = require("util");
const auth = require("../middlewares/authMiddleware");
const CategoryModel = require("../models/categoryModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("productImage", 4);
var uploadFilesMiddleware = util.promisify(upload);

const productRouter = express.Router();

productRouter.post("/", auth, uploadFilesMiddleware, async (req, res) => {
  try {
    req.body.productMoreDetails = JSON.parse(req.body.productMoreDetails);
    await ProductValidator.validateProduct(req.body);

    const images = req.files.map((file) => {
      return `uploads/product/${file.filename}`;
    });
    let productData = {
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productRating: req.body.productRating,
      productImage: images,
      productDiscountType: req.body.productDiscountType,
      productDiscountValue: req.body.productDiscountValue,
      productBrandId: req.body.productBrandId,
      productDescription: req.body.productDescription,
      productIsReturn: req.body.productIsReturn ?? true,
      productReturnDays: req.body.productReturnDays ?? 30,
      productPaymentOption: req.body.productPaymentOption,
      productCategoryId: req.body.productCategoryId,
      productSimilar: req.body.productSimilar,
      productMoreDetails: req.body.productMoreDetails,
      productSize: req.body.productSize,
    };

    const product = new productModel(productData);
    await product.save();

    return ResponseHelper.successResponse(product, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

productRouter.get("/", async (req, res) => {
  try {
    await ProductValidator.validateGetProduct(req.query);
    const where = {};

    if (req.query.product_ids) {
      where._id = req.query.product_ids;
    }

    if (req.query.category_id) {
      where.productCategoryId = [req.query.category_id];

      let childCategories = await CategoryModel.find({
        categoryParentId: req.query.category_id,
      });
      if (childCategories) {
        childCategories.forEach((childCategory) => {
          where.productCategoryId.push(childCategory._id);
        });
      }
    }

    if (req.query.search) {
      where.productName = { $regex: req.query.search };
    }

    const products = await productModel
      .find(where)
      .populate("productBrandId")
      .populate("productCategoryId");

    return ResponseHelper.successResponse(products, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("productBrandId");
    return ResponseHelper.successResponse(product, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = productRouter;
