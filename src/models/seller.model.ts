import mongoose, { Schema } from "mongoose";
import ISeller from "../types/seller.type";

const SellerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Seller = mongoose.model<ISeller>("Seller", SellerSchema);

export default Seller;
