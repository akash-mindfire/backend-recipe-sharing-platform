import express from "express";
import expressAsyncHandler from "express-async-handler";
import { catchError, validate } from "../middleware/validation";
import { getRecipeDetailById } from "../controllers/recipeDetail.controller";

const router = express.Router();

router.get("/:id", expressAsyncHandler(getRecipeDetailById));

export default router;
