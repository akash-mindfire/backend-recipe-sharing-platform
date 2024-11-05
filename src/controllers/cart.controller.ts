import { Request, Response } from "express";
import Recipe from "../schema/recipe.schema";
import { createResponse } from "../helper/response";
import User, { IUser } from "../schema/user.schema";

export const addCart = async (req: Request, res: Response): Promise<void> => {
  let { recipe_id, userId } = req.body;
  try {
    const user: any = await User.findById(userId);
    // if (!user) return res.status(404).json({ message: 'User not found' });
    const isFavorite = user.favourite.includes(recipe_id);
    if (isFavorite) {
      // Remove from favorites
      user.favourite = user.favourite.filter(
        (fav: string) => fav.toString() !== recipe_id
      );
    } else {
      // Add to favorites
      user.favourite.push(recipe_id);
    }
    await user.save();
    res.send(createResponse("Recipe is successfully added to your favourite"));
    //res.status(200).json({ message: 'Favorites updated', favorites: user.favourite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  let { id } = req.params;
  try {
    const user: any = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const recipes = await Recipe.find({ _id: { $in: user.favourite } });
    res.status(200).json({
      success: true,
      message: "Fetched cart recipes successfully",
      recipes: recipes, // Full recipe details
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
