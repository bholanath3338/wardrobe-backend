const express = require("express");
const { CustomError } = require("../helpers/exceptionHelper");
const ResponseHelper = require("../helpers/responseHelper");
const CategoryModel = require("../models/categoryModel");
const CategoryValidator = require("../validators/categoryValidator");
const multer = require("multer");
const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

// categoryRouter.post("/", upload.single('categoryImage'), async (req, res) => {
categoryRouter.post("/", async (req, res) => {
  try {
    await CategoryValidator.validateCategory(req.body);
    let categoryData = {
      categoryName: req.body.categoryName,
      categoryImage: `uploads/category/${req.body.categoryName}`,
      categoryDescription: req.body.categoryDescription,
      categoryParentId: req.body.categoryParentId,
    };

    const category = new CategoryModel(categoryData);
    await category.save();
    return ResponseHelper.successResponse(category, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return ResponseHelper.successResponse(categories, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

categoryRouter.get("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    return ResponseHelper.successResponse(category, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = categoryRouter;
