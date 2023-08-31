const express = require("express");
const ResponseHelper = require("../helpers/responseHelper");

const testRouter = express.Router();

testRouter.get("/mul/:num", async (req, res) => {
  try {
    let num = req.params.num;
    let data = {
      mulnum: num * 2,
    };
    console.log(req.userPayload);
    return ResponseHelper.successResponse(data, res);
  } catch (error) {
    return ResponseHelper.errorResponse(error, res);
  }
});

module.exports = testRouter;
