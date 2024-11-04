import { addCart, getCart } from "../controllers/cart.controller";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.post("/addCart", expressAsyncHandler(addCart));
router.get("/getCart/:id", expressAsyncHandler(getCart));
export default router;
