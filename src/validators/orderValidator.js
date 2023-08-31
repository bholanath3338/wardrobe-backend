const Joi = require("joi");

class OrderValidator {
  static async validateOrder(orderData) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string(),
        addressLine1: Joi.string(),
        addressLine2: Joi.string(),
        city: Joi.string(),
        district: Joi.string(),
        zipCode: Joi.string(),
        cartData: Joi.string(),
        total: Joi.number(),
        userId: Joi.string(),
      });

      return schema.validateAsync(orderData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = OrderValidator;
