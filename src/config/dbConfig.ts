import { connect } from "mongoose";
import { config } from "dotenv";

config();
const MONGO_DB_URI = process.env.DB_URL || "";

// connection to db
export const connectToDB = async () => {
  try {
    const db = await connect(MONGO_DB_URI);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectToDB;
