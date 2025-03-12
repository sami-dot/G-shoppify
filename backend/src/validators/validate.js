const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    // 422: Unprocessable Entity
    throw new ApiError(422, "Received data is not valid", extractedErrors);
};

module.exports = {
    validate,
};
