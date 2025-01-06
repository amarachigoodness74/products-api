import { Document, ObjectId } from "mongoose";

interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
  seller: ObjectId;
  category: ObjectId;
}

export default IProduct;
