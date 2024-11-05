import express from "express";
import expressAsyncHandler from "express-async-handler";
// import { catchError, validate } from "../middleware/validation";
import {
  createCategory,
  getCategory,
} from "../controllers/category.controller";
const router = express.Router();

router.post(
  "/createCategory",
  //validate("users:create"),
  //catchError,
  expressAsyncHandler(createCategory)
);

router.get(
  "/getCategory",
  //   validate("users:login"),
  //   catchError,
  expressAsyncHandler(getCategory)
);

export default router;
