import mongoose from "mongoose";
import { type BaseSchema } from "./index";

const Schema = mongoose.Schema;

export interface ICategory extends BaseSchema {
  category_name: string;
  image: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    category_name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("category", CategorySchema);
