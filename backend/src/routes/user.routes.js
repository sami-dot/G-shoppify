const express = require("express");
const router = express.Router();
const {
    loggedInUser,
    loginUser,
    registerUser,
} = require("../controller/user.controller");

const { checkAuth } = require("../middleware/checkAuth");

const {
    userLoginValidator,
    userRegisterValidator,
} = require("../validators/user.validators");
const { validate } = require("../validators/validate");

const { body } = require("express-validator");

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/me").get(checkAuth, loggedInUser);

module.exports = router;
