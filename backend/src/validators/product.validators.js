const { body } = require("express-validator");

const createProductValidator = () => {
    return [
        body("name").trim().notEmpty().withMessage("Name is Required"),
        (req, res, next) => {
            if (req.body.image && req.body.image.length > 1) {
                body("image").isURL().withMessage("Invalid image url")(
                    req,
                    res,
                    next
                );
            } else {
                next();
            }
        },

        //body("image").optional().isURL().withMessage("Invalid image url"),

        body("description")
            .optional()
            .isLength({ max: 500 })
            .withMessage("Description should not be more than 500 characters"),
        body("category").trim().notEmpty().withMessage("Category is Required"),
    ];
};

module.exports = {
    createProductValidator,
};
