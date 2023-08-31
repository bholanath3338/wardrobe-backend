const Joi = require("joi");
const { CustomError } = require("../helpers/exceptionHelper");

class ProductValidator {
  static async validateProduct(productData) {
    try {
      const schema = Joi.object({
        productName: Joi.string().min(3).max(100).required(),
        productPrice: Joi.number().required(),
        productRating: Joi.number().required(),
        productImage: Joi.any()
          .meta({ swaggerType: "file" })
          .optional()
          .allow("")
          .description("image file"),
        productDiscountType: Joi.number().required(),
        productDiscountValue: Joi.number().required(),
        productBrandId: Joi.string().required(),
        productDescription: Joi.string().min(3).max(1000).required(),
        productIsReturn: Joi.boolean(),
        productReturnDays: Joi.number(),
        productPaymentOption: Joi.array().required(),
        productCategoryId: Joi.string().required(),
        productSimilar: Joi.array(),
        productMoreDetails: Joi.array().required(),
        productSize: Joi.array().required(),
      });

      return schema.validateAsync(productData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }

  static async validateGetProduct(getProducts) {
    try {
      const schema = Joi.object({
        product_ids: Joi.array(),
        category_id: Joi.string(),
        search: Joi.string(),
      });

      return schema.validateAsync(getProducts);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = ProductValidator;
