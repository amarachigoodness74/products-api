import mongoose, { Schema } from "mongoose";
import ICategory from "../types/category.type";

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
