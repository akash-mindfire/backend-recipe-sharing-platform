import { getAllHomepageData } from "../controllers/home.controller";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.get("/getHomeData", expressAsyncHandler(getAllHomepageData));
export default router;
