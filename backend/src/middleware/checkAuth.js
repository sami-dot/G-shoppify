const express = require("express");
const User = require("../model/user.model");
const jsonwebtoken = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    // console.log("token:", token.substring(0, 5), "...");
    if (!token) {
        next(new ApiError(401, "Unauthorized."));
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const { _id } = decoded;
        const user = await User.findById(_id);
        user.password = undefined;
        user.__v = undefined;
        req.user = user;
        next();
    } catch (error) {
        console.log("ERROR", error.message);
        next(new ApiError(401, error?.message || "Unauthorized."));
    }
};
