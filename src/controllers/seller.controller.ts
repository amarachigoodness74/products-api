import { Request, Response } from "express";
import Seller from "../models/seller.model";
import generateLinks from "../utils";
import Product from "../models/product.model";
import Category from "../models/category.model";

// GET: Fetch all sellers
export const getSellers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const sellers = await Seller.find().lean();
    const sellerWithLinks: any = sellers.map((seller) => {
      // HATEOAS can be skipped here because of performance but this is for Demo purposes
      const links = {
        ...generateLinks("sellers", seller._id as string),
        products: { href: `/products?seller=${seller._id}` },
      };

      return {
        ...seller,
        _links: links,
      };
    });

    return res.status(200).json({ sellers: sellerWithLinks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching sellers", error });
  }
};

// GET: Fetch a single seller by ID
export const getSellerById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const seller = await Seller.findById(req.params.id).lean();
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const products = await Product.find({
      seller: seller._id,
    }).lean();

    let sellerProducts;

    if (products && products.length > 0) {
      sellerProducts = products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          href: `/products?seller=${seller._id}`,
        };
      });
    }

    const links = {
      ...generateLinks("sellers", seller._id as string),
      products: sellerProducts,
    };

    return res.status(200).json({ seller: { ...seller, _links: links } });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching seller", error });
  }
};

// POST: Create a new seller
export const createSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, phone, location } = req.body;

  if (!name || email == null || location == null) {
    return res
      .status(400)
      .json({ message: "Name, email, and location are required" });
  }

  try {
    const newSeller = new Seller({
      name,
      email,
      phone,
      location,
    });

    const savedSeller = await newSeller.save();
    return res.status(201).json(savedSeller);
  } catch (error) {
    return res.status(500).json({ message: "Error creating seller", error });
  }
};

// PUT: Update an existing seller by ID
export const updateSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, phone, location } = req.body;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, location },
      { new: true, runValidators: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json(updatedSeller);
  } catch (error) {
    return res.status(500).json({ message: "Error updating seller", error });
  }
};

// DELETE: Remove a seller by ID
export const deleteSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);

    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting seller", error });
  }
};
