import { Request, Response } from "express";
import Category from "../models/category.model";
import generateLinks from "../utils";
import Product from "../models/product.model";

// GET: Fetch all categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await Category.find().lean();
    // HATEOAS can be skipped here because of performance but this is for Demo purposes
    const categoriesWithLinks: any = categories.map((category) => {
      const links = {
        ...generateLinks("sellers", category._id as string),
        products: { href: `/products?category=${category._id}` },
      };

      return {
        ...category,
        _links: links,
      };
    });

    return res.status(200).json({ categories: categoriesWithLinks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching categories", error });
  }
};

// GET: Fetch a single category by ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category = await Category.findById(req.params.id).lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const links = {
      ...generateLinks("categories", category._id as string),
      products: { href: `/products?category=${category._id}` },
    };

    return res.status(200).json({ category: { ...category, _links: links } });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching category", error });
  }
};

// POST: Create a new category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description } = req.body;

  if (!name || description == null) {
    return res
      .status(400)
      .json({ message: "Name, and description are required" });
  }

  try {
    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};

// PUT: Update an existing category by ID
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Error updating category", error });
  }
};

// DELETE: Remove a category by ID
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
