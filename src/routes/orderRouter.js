const express = require("express");
const { CustomError } = require("../helpers/exceptionHelper");
const ResponseHelper = require("../helpers/responseHelper");
const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const OrderValidator = require("../validators/orderValidator");
const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    await OrderValidator.validateOrder(req.body);
    const cart = await CartModel.find({ userId: req.userPayload._id }).populate(
      "productId"
    );
    //check if cart empty then throw error
    if (!cart) throw CustomError("Cart is empty !!");
    let total = 0;
    cart.forEach((element) => {
      let unitPrice = element.productId.productPrice;
      let quantity = element.quantity;
      let discount = element.productId.productDiscountValue;
      let discountType = element.productId.productDiscountType;
      //if else condition
      if (discountType === 1) {
        price = quantity * unitPrice * (1 - discount * 0.01);
      } else if (discountType === 0) {
        price = quantity * (unitPrice - discount);
      } else {
        price = unitPrice * quantity;
      }
      total += price;
    });

    total = +((total * 113) / 100).toFixed(2);
    let orderData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      district: req.body.district,
      zipCode: req.body.zipCode,
      cartData: JSON.stringify(cart),
      total: total,
      userId: req.userPayload._id,
    };

    const order = new OrderModel(orderData);
    await order.save();

    await CartModel.remove({ userId: req.userPayload._id });
    return ResponseHelper.successResponse(order, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    return ResponseHelper.successResponse(order, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = orderRouter;
