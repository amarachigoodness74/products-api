import { Request, Response } from "express";
import Product from "../models/product.model";
import Category from "../models/category.model";
import Seller from "../models/seller.model";
import generateLinks from "../utils";

// GET: Fetch all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let products;
  try {
    const queryKeys = Object.keys(req.query)[0];

    if (queryKeys && req.query[queryKeys]) {
      products = await Product.find({
        [`${queryKeys}`]: req.query[queryKeys],
      }).lean();
    } else {
      products = await Product.find().lean();
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
};

// GET: Fetch a single product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const category = await Category.findById(product.category).lean();
    const seller = await Seller.findById(product.seller).lean();

    const links: any = {
      ...generateLinks("products", product._id as string),
    };

    let categoryList;
    let sellerList;

    // Add category link if category exists
    if (category) {
      categoryList = {
        name: category.name,
        href: `/categories/${category._id}`,
      };
      links.category = {
        href: `/categories/${category._id}`,
      };
    }

    // Add seller links if sellersexists
    if (seller) {
      sellerList = {
        name: seller.name,
        href: `/sellers/${seller._id}`,
      };
      links.seller = {
        href: `/sellers/${seller._id}`,
      };
    }

    return res.status(200).json({
      product: {
        product: { ...product, category: categoryList, seller: sellerList },
        _links: links,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product", error });
  }
};

// POST: Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, quantity, price, seller, category } = req.body;

  if (!name || quantity == null || price == null) {
    return res
      .status(400)
      .json({ message: "Name, quantity, and price are required" });
  }

  try {
    const newProduct = new Product({
      name,
      quantity,
      price,
      seller,
      category,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error creating product", error });
  }
};

// PUT: Update an existing product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, quantity, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error updating product", error });
  }
};

// DELETE: Remove a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product", error });
  }
};
