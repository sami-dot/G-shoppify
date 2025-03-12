const express = require("express");
const { mongoIdValidator } = require("../validators/mongodb.validators");
const { createProductValidator } = require("../validators/product.validators");

const { validate } = require("../validators/validate");
const {
    getAllProducts,
    createProduct,
    getAllByCategory,
    getProductById,
    deleteProductById,
} = require("../controller/products.controller");

const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

router.use(checkAuth);

router
    .route("/")
    .get(getAllProducts)
    .post(createProductValidator(), validate, createProduct);

router.route("/category").get(getAllByCategory);

router
    .route("/:id")
    .get(mongoIdValidator("id"), validate, getProductById)
    .delete(mongoIdValidator("id"), validate, deleteProductById);
module.exports = router;
