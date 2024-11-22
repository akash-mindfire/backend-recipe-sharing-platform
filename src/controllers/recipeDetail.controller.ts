import fs from "fs";
import { Request, Response } from "express";
import Recipe from "../schema/recipe.schema";
import { createResponse } from "../helper/response";

export const getRecipeDetailById = async (req: Request, res: Response) => {
    let { id } = req.params;
    console.log(id, "id");
    const recipes = await Recipe.find({ _id: id }); // Fetch all recipes
    const data = {
      recipes: recipes,
    };
    res.json(createResponse(data, "Fetched all recipes successfully"));
  };