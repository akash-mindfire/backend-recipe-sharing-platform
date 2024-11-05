import mongoose, { Document, Schema } from "mongoose";

// Define interface for recipe items
export interface RecipeItem extends Document {
  _id: string; // Assuming string for ObjectId
  image: string;
  title: string;
  rating: number;
}

// Define the schema for recipe items
const RecipeItemSchema = new Schema<RecipeItem>({
  _id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
});

// Export the models
export const Homepage = mongoose.model<RecipeItem>(
  "homepage",
  RecipeItemSchema,
  "homepage"
);
export const MostViewed = mongoose.model<RecipeItem>(
  "mostviewed",
  RecipeItemSchema,
  "mostviewed"
);
export const CuratedCollection = mongoose.model<RecipeItem>(
  "curratedcollection",
  RecipeItemSchema,"curratedcollection"
);
export const Trending = mongoose.model<RecipeItem>(
  "trending",
  RecipeItemSchema,"trending"
);
