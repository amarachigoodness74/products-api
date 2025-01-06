import { Document } from "mongoose";

interface ISeller extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export default ISeller;
