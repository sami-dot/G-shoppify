const User = require("../model/user.model");
const jsonwebtoken = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");
const {
    verifyPassword,
    hashPassword,
    generateToken,
} = require("../utils/authUtils");
const ApiResponse = require("../utils/ApiResponse");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        throw new ApiError(400, "Invalid Credential.");
    }

    const validPassword = verifyPassword(password, foundUser.password);
    if (!validPassword) {
        throw new ApiError(403, "Invalid Credentials.");
    }
    foundUser.password = undefined;
    foundUser.__v = undefined;

    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
    };
    const token = generateToken(payload);

    res.status(200).json(
        new ApiResponse(
            200,
            { user: foundUser._doc, token },
            "Successfully logged In"
        )
    );
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }
    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("newUser 🧑:", newUser);
    res.status(200).send(new ApiResponse(200, {}, "Successfully registered"));
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.loggedInUser = async (req, res) => {
    res.status(200).json(new ApiResponse(200, { user: req.user._doc }));
};
