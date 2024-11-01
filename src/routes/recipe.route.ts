import express from "express";
import expressAsyncHandler from "express-async-handler";
import { catchError, validate } from "../middleware/validation";
import { createRecipe, getRecipes } from "../controllers/recipe.controller";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post(
  "/createrecipe",
  validate("recipe:create"),
  upload.single("image"),
  //catchError,
  expressAsyncHandler(createRecipe)
);
router.get("/getrecipe", expressAsyncHandler(getRecipes));

export default router;
