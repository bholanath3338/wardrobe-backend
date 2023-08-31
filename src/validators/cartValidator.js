const Joi = require("joi");

class CartValidator {
  static async validateCart(cartData) {
    try {
      const schema = Joi.object({
        productId: Joi.string(),
        productSize: Joi.string(),
        quantity: Joi.number().required(),
      });

      return schema.validateAsync(cartData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = CartValidator;
