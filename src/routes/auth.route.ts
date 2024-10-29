import express from "express";
import expressAsyncHandler from "express-async-handler";
import { catchError, validate } from "../middleware/validation";
import {
  createUser,
  loginUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/register",
  validate("users:create"),
  catchError,
  expressAsyncHandler(createUser)
);

router.post(
  "/login",
  validate("users:login"),
  catchError,
  expressAsyncHandler(loginUser)
);

export default router;