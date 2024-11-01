import { Request, Response } from "express";
import Category from "../schema/category.schema";
import { createResponse } from "../helper/response";

export const createCategory = async (req: Request, res: Response) => {
  let categoryData = req.body;
  const category = new Category(categoryData);
  await category.save();
  const { category_name, image, _id } = category;
  const responseCategory = { category_name, image, _id };
  res.send(
    createResponse(
      responseCategory,
      `New category ${req.body.category_name} created`
    )
  );
};

export const getCategory = async (req: Request, res: Response) => {
  const recipes = await Category.find(); // Fetch all recipes
  res.json(createResponse(recipes, "Fetched all recipes successfully"));
};
