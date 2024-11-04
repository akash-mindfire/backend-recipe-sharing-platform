import { Request, Response } from "express";
import Recipe from "../schema/recipe.schema";
import { createResponse } from "../helper/response";
import { IRecipe } from "../schema/recipe.schema";
import fs from "fs";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME || "dsjohbtbs",
  api_key: process.env.CLOUD_API_KEY || "422712123516439",
  api_secret: process.env.CLOUD_API_SECRET || "bUAWopzCkc6jJHYE_GKjDsP-GuA",
});

export const createRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let {
      recipe_title,
      recipe_desc,
      activeTime,
      totalTime,
      servings,
      ingredients,
      categoryId,
      directions,
      rating,
      createdBy,
      createrUser_Id,
    } = req.body;
    ingredients = JSON.parse(ingredients);
    directions = JSON.parse(directions);
    const file = req.file as Express.Multer.File;
    const result = await cloudinary.v2.uploader.upload(file?.path, {
      resource_type: "auto",
    });
    fs.unlinkSync(file?.path);
    const image = result.secure_url;
    console.log("req.body", req.body);

    const newRecipe = new Recipe({
      recipe_title,
      recipe_desc,
      activeTime,
      totalTime,
      servings,
      categoryId,
      ingredients,
      directions,
      rating,
      createrUser_Id,
      createdBy,
      image, // Store the image path in the database
      reviews: [], // Initialize reviews as an empty array
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now you can safely access error.message
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      // Fallback for non-Error types
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
      });
    }
  }
};
export const getRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes
    res.json(createResponse(recipes, "Fetched all recipes successfully"));
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recipes" });
  }
};
export const getSearchRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    let data = await Recipe.find({
      $or: [
        { recipe_title: { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.json(createResponse(data, "Fetched all recipes successfully"));
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recipes" });
  }
};
