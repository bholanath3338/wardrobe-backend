const jwt = require('jsonwebtoken');
const ResponseHelper = require("../helpers/responseHelper");
const { CustomError } = require("../helpers/exceptionHelper");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            throw new CustomError("Token not provided", 401);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userPayload = decoded;
            next();
        } catch (error) {
            throw new CustomError("Invalid token", 400);
        }
    } catch (error) {
        return ResponseHelper.errorResponse(error, res);
    }
}

module.exports = auth;