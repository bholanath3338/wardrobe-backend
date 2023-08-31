
const jwt = require('jsonwebtoken');
const express = require("express");
const bcrypt = require("bcryptjs");
const { CustomError } = require("../helpers/exceptionHelper");
const ResponseHelper = require("../helpers/responseHelper");
const UserModel = require("../models/userModel");
const UserValidator = require("../validators/userVaidator");

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    await UserValidator.validateUser(req.body);

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let address = req.body.address;
    let postalCode = req.body.postalCode;
    let city = req.body.city;
    let country = req.body.country;
    let is_admin = req.body.is_admin;

    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      address: address,
      postalCode: postalCode,
      city: city,
      country: country,
      is_admin: is_admin,
    };

    //Checking whether the email exists in database or not
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      throw new CustomError("Email already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new UserModel(userData);
    await user.save();

    return ResponseHelper.successResponse({ token: user.generateAuthToken() }, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = userRouter;
