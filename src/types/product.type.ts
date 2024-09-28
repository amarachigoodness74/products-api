import { Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
}

export default IProduct;
