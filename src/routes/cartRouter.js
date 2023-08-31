const express = require("express");
const { CustomError } = require("../helpers/exceptionHelper");
const ResponseHelper = require("../helpers/responseHelper");
const CartModel = require("../models/cartModel");
const CartValidator = require("../validators/cartValidator");
const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
  try {
    await CartValidator.validateCart(req.body);
    let cartData = {
      userId: req.userPayload._id,
      productId: req.body.productId,
      productSize: req.body.productSize,
      quantity: req.body.quantity,
    };
    const cart = new CartModel(cartData);
    await cart.save();
    return ResponseHelper.successResponse(cart, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const where = { userId: req.userPayload._id };

    if (req.body.product_id) {
      where.productId = req.body.product_id;
    }

    const cart = await CartModel.find(where).populate("productId");
    return ResponseHelper.successResponse(cart, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

cartRouter.put("/:id", async (req, res) => {
  try {
    await CartValidator.validateCart(req.body);
    const cart = await CartModel.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity,
      },
      { new: true }
    );
    await cart.save();
    return ResponseHelper.successResponse(cart, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    await CartModel.findByIdAndRemove(req.params.id);
    return ResponseHelper.successResponse(
      "Product deleted successfully !!",
      res
    );
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = cartRouter;
