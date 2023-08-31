const Joi = require("joi");

class AuthValidator {
  static async validateAuth(getUser) {
    try{
      const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(6).required(),
      });
      return schema.validateAsync(getUser);
    } catch(error){
      throw new CustomError(error.message, 400);
    }
  }
}

module.exports = AuthValidator;
