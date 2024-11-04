import mongoose from "mongoose";
import { type BaseSchema } from "./index";

const Schema = mongoose.Schema;

export interface ICart {
  _id: string;
  cart: [string];
}

const CartSchema = new Schema<ICart>(
  {
    _id: { type: String, required: true },
    cart: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("cart", CartSchema);
