import mongoose, { Document, Schema } from "mongoose";
import { type BaseSchema } from "./index"; // Adjust import as necessary

export interface Ingredient {
  _id: number; // You might want to consider using ObjectId or a different unique identifier
  desc: string;
}

export interface Direction {
  _id: number; // Similar consideration as for ingredients
  desc: string;
}

export interface Review {
  _id: number; // Consider using ObjectId if you plan to reference users
  userName: string;
  rating: number;
  review_message: string;
  image: string; // URL or path to the user's profile image
}

export interface IRecipe extends BaseSchema {
  recipe_title: string;
  recipe_desc: string;
  activeTime: string;
  totalTime: string;
  servings: number;
  categoryId: string;
  ingredients: Ingredient[];
  directions: Direction[];
  rating: number;
  image: string;
  reviews: Review[];
  createdBy: string;
  createrUser_Id: string;
}

// Define sub-schemas for ingredients, directions, and reviews
const IngredientSchema = new Schema<Ingredient>({
  _id: { type: Number, required: true },
  desc: { type: String, required: true },
});

const DirectionSchema = new Schema<Direction>({
  _id: { type: Number, required: true },
  desc: { type: String, required: true },
});

const ReviewSchema = new Schema<Review>({
  _id: { type: Number, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review_message: { type: String, required: true },
  image: { type: String, required: true }, // Optional if reviews can have no image
});

// Main recipe schema
const RecipeSchema = new Schema<IRecipe>(
  {
    recipe_title: { type: String, required: true },
    recipe_desc: { type: String, required: true },
    activeTime: { type: String, required: true },
    categoryId: { type: String, required: true },
    totalTime: { type: String, required: true },
    servings: { type: Number, required: true },
    ingredients: { type: [IngredientSchema], required: true },
    directions: { type: [DirectionSchema], required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
    reviews: { type: [ReviewSchema], required: true },
    createdBy: { type: String, required: true },
    createrUser_Id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRecipe>("recipe", RecipeSchema);
