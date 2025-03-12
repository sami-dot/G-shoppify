const express = require("express");
const {
    createCart,
    getCartHistory,
    getSingleCartHistory,
    getTopProduct,
    getTopCategory,
    getStatistics,
} = require("../controller/carts.controller");

const { checkAuth } = require("../middleware/checkAuth");
const { mongoIdValidator } = require("../validators/mongodb.validators");
const { createCartValidator } = require("../validators/cart.validators");
const { validate } = require("../validators/validate");
const router = express.Router();

//======auth is required=============//
router.use(checkAuth);
//====routes=========//
router.route("/").get(getCartHistory);

router.route("/").post(createCartValidator(), validate, createCart);

router.route("/topproduct").get(getTopProduct);

router.route("/topcategory").get(getTopCategory);

router.route("/statistics").get(getStatistics);

router
    .route("/:id")
    .get(mongoIdValidator("id"), validate, getSingleCartHistory);

// export
module.exports = router;
