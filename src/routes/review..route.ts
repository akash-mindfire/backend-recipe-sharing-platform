import express from "express";
import expressAsyncHandler from "express-async-handler";
// import { catchError, validate } from "../middleware/validation";
import {
  createCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.post(
  "/createreview",
  //validate("users:create"),
  //catchError,
  expressAsyncHandler(createCategory)
);

export default router;
