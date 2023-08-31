const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000,
  },
  postalCode: {
    type: String,
    required: true,
    length: 6,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      time: Date(),
      _id: this._id,
      email: this.email,
      is_admin: this.is_admin,
      firstName: this.firstName,
    },
    process.env.JWT_SECRET_KEY
  );
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
