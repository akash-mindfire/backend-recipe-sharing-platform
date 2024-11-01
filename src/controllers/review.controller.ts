import { Request, Response } from "express";
import Category from "../schema/category.schema";
import { createResponse } from "../helper/response";

export const createReview = async (req: Request, res: Response) => {
  let reviewData = req.body;
  
//   const category = new Category(reviewData);
//   await category.save();
//   const { category_name, image, _id } = category;
//   const responseCategory = { category_name, image, _id };
//   res.send(
//     createResponse(
//       responseCategory,
//       `New category ${req.body.category_name} created`
//     )
//   );
};

export const getCategory = async (req: Request, res: Response) => {
  const recipes = await Category.find(); // Fetch all recipes
  res.json(createResponse(recipes, "Fetched all recipes successfully"));
};
