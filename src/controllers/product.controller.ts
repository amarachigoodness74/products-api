import { Request, Response } from "express";
import Product from "../models/product.model";

// GET: Fetch all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await Product.find();
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product", error });
  }
};

// POST: Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, quantity, price } = req.body;

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
