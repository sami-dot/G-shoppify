const { body } = require("express-validator");

const createCartValidator = () => {
    return [
        body("cartName")
            .trim()
            .notEmpty()
            .withMessage("Cart Name is Required")
            .isLength({ max: 40 })
            .withMessage("Cart Name too long"),
        body("items").isLength({ min: 1 }).withMessage("Cart Item is Empty"),
    ];
};

module.exports = {
    createCartValidator,
};
