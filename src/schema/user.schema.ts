import mongoose from "mongoose";
import { type BaseSchema } from "./index";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

const Schema = mongoose.Schema;

export interface IUser extends BaseSchema {   
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.USER },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", UserSchema);
