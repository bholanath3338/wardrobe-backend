const express = require("express");
const { CustomError } = require("../helpers/exceptionHelper");
const ResponseHelper = require("../helpers/responseHelper");
const BrandModel = require("../models/brandModel");
const BrandValidator = require("../validators/brandValidator");

const brandRouter = express.Router();

brandRouter.post("/", async (req, res) => {
  try {
    await BrandValidator.validateBrand(req.body);
    let brandData = {
      brandName: req.body.brandName,
      description: req.body.description,
    };

    const brand = new BrandModel(brandData);
    await brand.save();
    return ResponseHelper.successResponse(brand, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

brandRouter.get("/", async (req, res) => {
  try {
    const brands = await BrandModel.find();
    return ResponseHelper.successResponse(brands, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = brandRouter;
