import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import productRouter from "./routes/product.route";
import connectToDB from "./config/dbConfig";

config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 6000;

app.use(express.json());

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ message: "Welcome to Products API" });
});

app.use("/api/products", productRouter);

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

export default app;
