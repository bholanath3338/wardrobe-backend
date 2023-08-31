const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const ResponseHelper = require("../helpers/responseHelper");
const UserModel = require("../models/userModel");
const AuthValidator = require("../validators/authValidator");
const { CustomError } = require("../helpers/exceptionHelper");

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  try {
    await AuthValidator.validateAuth(req.body);
    let email = req.body.email;
    let password = req.body.password;

    let user = await UserModel.findOne({ email: email });
    if (!user) throw new CustomError("Invalid email or password", 400);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new CustomError("Invalid email or password", 400);

    return ResponseHelper.successResponse(
      { token: user.generateAuthToken() },
      res
    );
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = authRouter;
