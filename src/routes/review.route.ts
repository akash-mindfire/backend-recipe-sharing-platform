import express from "express";
import expressAsyncHandler from "express-async-handler";
import { validate } from "../middleware/validation";
import { addReview } from "../controllers/review.controller";

const router = express.Router();

router.post(
  "/addreview",
  validate("recipe:review"),
  //catchError,
  expressAsyncHandler(addReview)
);

export default router;
