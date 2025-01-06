import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import sellerRouter from "./routes/seller.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";
import connectToDB from "./config/dbConfig";

config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 6000;

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ message: "Welcome to Products API" });
});

app.use("/api/sellers", sellerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

export default app;
