import { Request, Response } from "express";
import Category from "../schema/category.schema";
import { createResponse } from "../helper/response";
import Recipe from "../schema/recipe.schema";
export const addReview = async (req: Request, res: Response) => {
  try {
    const { recipe_Id, _id, review_message, rating, userName, image } =
      req.body; // Extract recipeId from the body

    const newReview = {
      _id,
      review_message,
      rating,
      recipe_Id,
      userName,
      image,
    };
    // Use recipeId from the request body to find the recipe and add the review
    const recipe = await Recipe.findByIdAndUpdate(
      recipe_Id, // Here, we use recipeId from req.body
      { $push: { reviews: newReview } },
      { new: true }
    );

    if (!recipe) {
      res.status(404).json({ success: false, message: "Recipe not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Review added successfully", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add review" });
  }
};
