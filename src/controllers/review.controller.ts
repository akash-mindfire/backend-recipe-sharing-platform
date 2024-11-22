import { Request, Response } from "express";
import Category from "../schema/category.schema";
import { createResponse } from "../helper/response";
import Recipe from "../schema/recipe.schema";

export const addReview = async (req: Request, res: Response) => {
  try {
    const { recipe_Id, _id, review_message, rating, userName, image } =
      req.body; // Extract recipeId from the body
    console.log(req.body);
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
export const editReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { recipe_Id, _id, review_message, rating, userName, image } =
      req.body;
    console.log("req.body", req.body);

    // Find the recipe by recipe_id and update the specific review in the reviews array
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipe_Id, "reviews._id": _id }, // Match the recipe by recipe_id and review by _id
      {
        $set: {
          "reviews.$.review_message": review_message,
          "reviews.$.rating": rating,
          "reviews.$.userName": userName,
          "reviews.$.image": image,
          "reviews.$.updatedAt": new Date(), // Automatically set the updated time
        },
      },
      { new: true } // Return the updated recipe
    );

    if (!recipe) {
      res
        .status(404)
        .json({ success: false, message: "Review or recipe not found" });
      return; // Exit early after sending a response
    }

    res
      .status(200)
      .json({ success: true, message: "Review updated successfully", recipe });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update review" });
  }
};
