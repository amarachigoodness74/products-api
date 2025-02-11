import { connect } from "mongoose";
import { config } from "dotenv";

config();
const MONGO_DB_URI = process.env.DB_URL || "";
const TEST_MONGO_DB_URI = process.env.TEST_DB_URL || "";

// connection to db
export const connectToDB = async () => {
  try {
    const db = await connect(
      process.env.NODE_ENV === "test" ? TEST_MONGO_DB_URI : MONGO_DB_URI
    );
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectToDB;
