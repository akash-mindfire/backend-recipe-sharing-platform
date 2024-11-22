import { addFavourite, getFavourite } from "../controllers/favourite.controller";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.post("/addFavourite", expressAsyncHandler(addFavourite));
router.get("/getFavourite/:id", expressAsyncHandler(getFavourite));
export default router;
