const Joi = require("joi");

class CategoryValidator {
  static async validateCategory(categoryData) {
    try {
      const schema = Joi.object({
        categoryName: Joi.string().min(3).max(20).required(),
        categoryImage: Joi.string(),
        categoryDescription: Joi.string().min(3).max(2000).required(),
        categoryParentId: Joi.string(),
      });

      return schema.validateAsync(categoryData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = CategoryValidator;
