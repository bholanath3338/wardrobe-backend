class ResponseHelper {
  static successResponse(data, res) {
    res.send({
      status: true,
      data: data,
    });
  }

  static errorResponse(err, res) {
    console.log(err);
    res.status(err.code ?? 500).send({
      status: false,
      err:
        err.name == "CustomValidationError"
          ? err.message
          : "Something went wrong",
    });
  }
}

module.exports = ResponseHelper;
