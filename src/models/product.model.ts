import mongoose, { Schema } from "mongoose";
import IProduct from "../types/product.type";

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
