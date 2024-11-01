import { body, check, checkExact } from "express-validator";
import { Direction, Ingredient } from "../../schema/recipe.schema"; // Adjust the import path as necessary

// Validation for creating a recipe
export const createRecipe = checkExact([
  body("recipe_title")
    .exists({ checkFalsy: true })
    .withMessage("Recipe title is required")
    .isString()
    .withMessage("Recipe title must be a string")
    .isLength({ min: 2 })
    .withMessage("Recipe title must be at least 2 characters long"),

  body("recipe_desc")
    .exists({ checkFalsy: true })
    .withMessage("Recipe description is required")
    .isString()
    .withMessage("Recipe description must be a string")
    .isLength({ min: 10 })
    .withMessage("Recipe description must be at least 10 characters long"),

  body("activeTime")
    .exists({ checkFalsy: true })
    .withMessage("Active time is required")
    .isString()
    .withMessage("Active time must be a string"),

  body("totalTime")
    .exists({ checkFalsy: true })
    .withMessage("Total time is required")
    .isString()
    .withMessage("Total time must be a string"),

  body("servings")
    .exists({ checkFalsy: true })
    .withMessage("Servings are required")
    .isInt({ gt: 0 })
    .withMessage("Servings must be a positive integer"),

  body("ingredients")
    .exists({ checkFalsy: true })
    .withMessage("Ingredients are required")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be a non-empty array")
    .custom((value) => {
      value.forEach((ingredient: Ingredient) => {
        if (typeof ingredient.desc !== "string" || ingredient.desc.length < 1) {
          throw new Error("Each ingredient must have a valid description");
        }
      });
      return true;
    }),

  body("directions")
    .exists({ checkFalsy: true })
    .withMessage("Directions are required")
    .isArray({ min: 1 })
    .withMessage("Directions must be a non-empty array")
    .custom((value) => {
      value.forEach((direction: Direction) => {
        if (typeof direction.desc !== "string" || direction.desc.length < 1) {
          throw new Error("Each direction must have a valid description");
        }
      });
      return true;
    }),

  body("rating")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Rating must be an integer between 0 and 5"),

  body("createdBy")
    .exists({ checkFalsy: true })
    .withMessage("Login is required")
    .isString()
    .withMessage("User Name not found"),

  body("createrUser_Id")
    .exists({ checkFalsy: true })
    .withMessage("Login is required")
    .isString()
    .withMessage("User Name not found"),

  body("reviews")
    .optional()
    .isArray()
    .withMessage("Reviews must be an array")
    .custom((value) => {
      value.forEach((review: any) => {
        if (
          typeof review.userName !== "string" ||
          typeof review.rating !== "number" ||
          typeof review.review_message !== "string" ||
          !(review.date instanceof Date) || // This will work now
          typeof review.image !== "string"
        ) {
          throw new Error("Each review must have valid fields");
        }
      });
      return true;
    }),
]);
