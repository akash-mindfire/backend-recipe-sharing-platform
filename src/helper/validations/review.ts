import { body, check, checkExact } from "express-validator";
import { Direction, Ingredient } from "../../schema/recipe.schema"; // Adjust the import path as necessary

// Validation for reviewing a recipe
export const reviewRecipe = checkExact([
  body("recipe_id")
    .exists({ checkFalsy: true })
    .withMessage("Recipe Id is required")
    .isString()
    .withMessage("Recipe Id must be a string")
    .isLength({ min: 2 })
    .withMessage("Recipe Id must be at least 2 characters long"),

  body("review_message")
    .exists({ checkFalsy: true })
    .withMessage("Review message is required"),

  body("user_id")
    .exists({ checkFalsy: true })
    .withMessage("User must logged in"),

  body("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please give rating.")
    .isInt({ gt: 0 })
    .withMessage("Rating must be a positive integer"),
]);
