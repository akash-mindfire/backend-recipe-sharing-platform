import { body, check, checkExact } from "express-validator";
import User from "../../schema/user.schema";
import createHttpError from "http-errors";

export const userLogin = checkExact([
  body("email")
    .exists({ values: "falsy" })
    .notEmpty()
    .bail()
    .withMessage("Email is required")
    .isEmail()
    .bail()
    .withMessage("Enter valid email"),
  body("password")
    .exists({ values: "falsy" })
    .notEmpty()
    .bail()
    .withMessage("Password is required"),
]);

export const password = check("password")
  .exists({ values: "falsy" })
  .bail()
  .withMessage("Password is required")
  .notEmpty()
  .bail()
  .withMessage("Password is required")
  .isStrongPassword({
    minLength: 7,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .bail()
  .withMessage(
    "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
  );

export const createUser = checkExact([
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .exists()
    .notEmpty()
    .bail()
    .withMessage("Email is required")
    .isEmail()
    .bail()
    .withMessage("Enter valid email")
    .custom(async (value: string, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw createHttpError(409, {
          message: "Email already registered",
        });
      }
      return true;
    }),
  password,
  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
    .isIn(["USER", "ADMIN"])
    .withMessage('Role must be one of "USER" or "ADMIN"'),
]);
