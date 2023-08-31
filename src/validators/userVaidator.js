const Joi = require("joi");

class UserValidator {
  static async validateUser(userData) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(5).max(20).required(),
        address: Joi.string().min(5).max(2000).required(),
        postalCode: Joi.string().length(6).required(),
        city: Joi.string().min(2).max(20).required(),
        country: Joi.string().min(2).max(20).required(),
        is_admin: Joi.boolean(),
      });

      return schema.validateAsync(userData);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = UserValidator;
