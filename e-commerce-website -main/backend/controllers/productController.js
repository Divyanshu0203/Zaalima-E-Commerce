const Product = require("./../models/productModel");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });
const cloudinary = require("./../utils/cloudinary");

const backend_url = process.env.BACKEND_URL;

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Create product with Cloudinary image
exports.createProduct = async (req, res, next) => {
  try {
  
    console.log("Received file:", req.file);
    console.log("REQ.FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path);
    
    const products = await Product.find({});
    const length = products.length;
    let id = 1;
    if (length > 0) id = products[length - 1].id + 1;

    const { name, category, new_price, old_price } = req.body;

    const product = await Product.create({
      id,
      name,
      image: result.secure_url,
      category,
      new_price,
      old_price,
    });

    res.status(200).json(product);
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Delete product and image from Cloudinary
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Try deleting by MongoDB _id first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove image from Cloudinary if available
    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


// Get latest 8 products
exports.getNewCollections = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(-8);
    res.status(200).json(newCollection);
  } catch (err) {
    next(err);
  }
};

// Get 4 popular women's products
exports.getPopularInWomen = async (req, res, next) => {
  try {
    const products = await Product.find({ category: "women" });
    const popularInWomen = products.slice(0, 4);
    res.status(200).json(popularInWomen);
  } catch (err) {
    next(err);
  }
};

// ✅ Get product by ID (custom ID or MongoDB _id)
exports.getProductById = async (req, res, next) => {
  const param = req.params.id;
  console.log("Fetching product by ID:", param);

  try {
    let product;

    // Try MongoDB _id
    if (/^[0-9a-fA-F]{24}$/.test(param)) {
      product = await Product.findById(param);
    }

    // Fallback to custom numeric id
    if (!product) {
      const numericId = parseInt(param);
      if (!isNaN(numericId)) {
        product = await Product.findOne({ id: numericId });
      }
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Get all products in a specific category
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category.toLowerCase();
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
