const { default: mongoose } = require("mongoose");
const Product = require("../model/product.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const getAllProducts = async (req, res) => {
    const products = await Product.find({
        $or: [{ ownerId: null }, { ownerId: req.user._id }],
    });
    res.status(200).json(
        new ApiResponse(200, { products }, "successfully fetched products")
    );
};

const createProduct = async (req, res) => {
    const { name, description, image, category } = req.body;
    if (!name || !category) {
        throw new ApiError(400, "Please provide all required fields");
    }
    const productExist = await Product.findOne({ name });
    if (productExist) {
        console.log(productExist);

        throw new ApiError(400, "Product already exists");
    }
    const createdProduct = await Product.create({
        name,
        description,
        image,
        category,
        ownerId: req.user._id,
    });

    res.status(201).json(
        new ApiResponse(
            201,
            { product: createdProduct },
            "Successfully created Product"
        )
    );
};

const getAllByCategory = async (req, res) => {
    const products = await Product.aggregate([
        { $match: { $or: [{ ownerId: null }, { ownerId: req.user._id }] } },
        {
            $group: {
                _id: "$category",
                categoryName: { $first: "$category" },
                products: {
                    $push: "$$ROOT",
                },
            },
        },
        {
            $unwind: "$products", // Unwind the products array
        },
        {
            $sort: { "products.createdAt": 1 }, // Sort by createdAt field in ascending order
        },
        {
            $group: {
                _id: "$_id",
                categoryName: { $first: "$categoryName" },
                products: { $push: "$products" }, // Push the sorted products back into the array
            },
        },
        {
            $project: {
                _id: 0,
                categoryName: 1,
                products: 1,
            },
        },
    ]);
    res.json({ products });
    res.status(200).json(
        new ApiResponse(
            200,
            { products },
            "successfully fetched products by category"
        )
    );
};

const getProductById = async (req, res) => {
    const { prodId } = req.params;
    const product = await Product.findOne({ _id: prodId });
    res.status(200).json(new ApiResponse(200, { product }));
};

const deleteProductById = async (req, res) => {
    const { id: prodId } = req.params;
    const existingProduct = await Product.findById(prodId);
    if (!existingProduct) {
        throw new ApiError(404, "Product doesn't exist");
    }
    const isOwner =
        existingProduct.ownerId.toString() === req.user._id.toString();
    if (!isOwner) {
        throw new ApiError(400, "You are Owner of the product");
    }
    await Product.deleteOne({ _id: existingProduct._id });

    res.status(200).json(
        new ApiResponse(200, {}, "Successfully Deleted Product")
    );
};

const mongooseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
module.exports = {
    getAllProducts,
    createProduct,
    getAllByCategory,
    getProductById,
    deleteProductById,
};
