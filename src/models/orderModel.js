const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
      },
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      cartData: {
        type: String,
      },
      total: {
        type: Number,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
    
})

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;