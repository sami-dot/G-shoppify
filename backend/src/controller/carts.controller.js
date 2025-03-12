const { default: mongoose } = require("mongoose");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const createCart = async (req, res) => {
    const { cartName, status, items } = req.body;
    if (!cartName) {
        throw new ApiError(400, "Cart Name is required");
    }
    if (items.length === 0) {
        throw new ApiError(400, "Cart is Empty");
    }

    const createdCart = await Cart.create({
        owner: req.user._id,
        name: cartName,
        status: status,
        items: items,
    });

    console.log(createdCart, "Created cart");

    res.status(201).json(
        new ApiResponse(201, { cart: createdCart }, "Successfully created cart")
    );
};

const getCartHistory = async (req, res) => {
    // const cartList = await Cart.find({ owner: req.user.id }).populate(
    //     "items.productId"
    // );

    const cartList = await Cart.find({ owner: req.user._id })
        .populate({
            path: "items.product",
            select: "name category",
        })
        .sort({ updatedAt: -1 })
        .select("-items._id");

    const groupedItems = cartList.reduce((acc, item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        if (!acc[month]) {
            acc[month] = [];
        }

        acc[month].push(item);

        return acc;
    }, {});

    // Convert the grouped items object into an array
    const groupedItemsArray = Object.entries(groupedItems).map(
        ([month, items]) => ({
            month,
            items,
        })
    );

    res.status(200).json(
        new ApiResponse(
            200,
            { cartHistory: groupedItemsArray },
            "Successfully fetched cartHistory"
        )
    );
};

const getSingleCartHistory = async (req, res) => {
    const cartId = new mongoose.Types.ObjectId(req.params.id);
    const ownerId = new mongoose.Types.ObjectId(req.user._id);

    const result = await Cart.aggregate([
        {
            $match: {
                _id: cartId,
                owner: ownerId,
            },
        },
        {
            $unwind: "$items",
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $set: {
                product: {
                    $first: "$product",
                },
            },
        },
        {
            $addFields: {
                "product.quantity": "$items.quantity",
            },
        },
        {
            $unset: "items",
        },
        {
            $group: {
                _id: {
                    category: "$product.category",
                    name: "$name",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                    status: "$status",
                },
                products: {
                    $push: "$product",
                },
            },
        },
        {
            $group: {
                _id: null,
                items: {
                    $push: "$$ROOT",
                },
            },
        },
        {
            $set: {
                info: {
                    $arrayElemAt: ["$items._id", 0],
                },
                items: {
                    $map: {
                        input: "$items",
                        as: "obj",
                        in: {
                            $mergeObjects: [
                                "$$obj",
                                {
                                    categoryName: "$$obj._id.category",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $unset: ["items._id", "_id"],
        },
    ]);
    // const singleCart = await Cart.findOne({ _id: cartId }).populate(
    //     "items.product"
    // );
    const payload = result[0];

    res.status(200).json(
        new ApiResponse(
            200,
            { cartDetail: payload },
            "Successfully fetched single cart"
        )
    );
};
const getTopProduct = async (req, res) => {
    const result = await Cart.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
        {
            $unwind: "$items",
        },
        {
            $sort: {
                "items.quantity": -1,
            },
        },
        {
            $project: {
                quantity: "$items.quantity",
                product_id: "$items.product",
                _id: 0,
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $set: {
                product: {
                    $first: "$product",
                },
                product_id: "$$REMOVE",
            },
        },
        {
            $group: {
                _id: null,
                products: {
                    $push: "$$ROOT",
                },
            },
        },
        {
            $set: {
                _id: "$REMOVE",
                products: {
                    $firstN: {
                        n: 3,
                        input: "$products",
                    },
                },
                total_quantity: {
                    $reduce: {
                        input: "$products",
                        initialValue: 0,
                        in: {
                            $add: ["$$this.quantity", "$$value"],
                        },
                    },
                },
            },
        },
    ]);
    const payload = result[0];

    res.status(200).json(
        new ApiResponse(
            200,
            { topProducts: payload },
            "Successfully fetched top products"
        )
    );
};
const getTopCategory = async (req, res) => {
    const result = await Cart.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
        {
            $unwind: "$items",
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $set: {
                product: {
                    $first: "$product",
                },
                quantity: "$items.quantity",
                category: {
                    $first: "$product.category",
                },
                items: "$$REMOVE",
            },
        },
        {
            $group: {
                _id: "$category",
                total_products: {
                    $sum: "$quantity",
                },
            },
        },
        {
            $sort: {
                total_products: -1,
            },
        },
        {
            $set: {
                category: "$_id",
                _id: "$$REMOVE",
            },
        },
        {
            $group: {
                _id: null,
                categories: {
                    $push: {
                        category: "$category",
                        total_products: "$total_products",
                    },
                },
            },
        },
        {
            $set: {
                _id: "$$REMOVE",
                categories: {
                    $firstN: {
                        n: 3,
                        input: "$categories",
                    },
                },
                total_product_in_all_categories: {
                    $reduce: {
                        input: "$categories",
                        initialValue: 0,
                        in: {
                            $add: ["$$value", "$$this.total_products"],
                        },
                    },
                },
            },
        },
    ]);
    const payload = result[0];

    res.status(200).json(
        new ApiResponse(
            200,
            { topCategories: payload },
            "Successfully fetched topcategories"
        )
    );
};
const getStatistics = async (req, res) => {};

module.exports = {
    createCart,
    getCartHistory,
    getSingleCartHistory,
    getTopProduct,
    getTopCategory,
    getStatistics,
};
