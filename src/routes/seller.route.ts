import express from "express";
import {
  createSeller,
  deleteSeller,
  getSellerById,
  getSellers,
  updateSeller,
} from "../controllers/seller.controller";

const router = express.Router();

router.get("/", getSellers);

router.get("/:id", getSellerById);

router.post("/", createSeller);

router.put("/:id", updateSeller);

router.delete("/:id", deleteSeller);

export default router;
