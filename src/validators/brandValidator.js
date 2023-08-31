const Joi = require("joi");

class BrandValidator {
  static async validateBrand(brandData) {
    try {
      const schema = Joi.object({
        brandName: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(3).max(400).required(),
      });

      return schema.validateAsync(brandData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = BrandValidator;
