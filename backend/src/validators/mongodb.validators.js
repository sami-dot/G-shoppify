const { param } = require("express-validator");

const mongoIdValidator = (idName) => {
    return [
        param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
    ];
};

module.exports = {
    mongoIdValidator,
};
