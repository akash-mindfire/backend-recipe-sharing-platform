import mongoose from "mongoose";
import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { userLogin, createUser } from "../helper/validations/user";
import { createRecipe } from "../helper/validations/recipe";

export const validate = (validationName: string): any[] => {
  switch (validationName) {
    case "users:create": {
      return [createUser];
    }
    case "users:login": {
      return [userLogin];
    }
    case "recipe:create": {
      return [createRecipe];
    }
    default:
      return [];
  }
};

export const validateIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw createHttpError(400, `Invalid ${paramName}`);
    }
    next();
  };
};

export const catchError = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const isError = errors.isEmpty();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isError) {
      const data = { errors: errors.array() };
      throw createHttpError(400, {
        message: "Validation error!",
        data,
      });
    } else {
      next();
    }
  }
);
