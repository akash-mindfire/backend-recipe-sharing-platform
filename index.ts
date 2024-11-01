import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http, { request } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./src/services/initDB";
import { IUser } from "./src/schema/user.schema";
import { loadConfig } from "./src/helper/config";
import authRoutes from "./src/routes/auth.route";
import recipeRoutes from "./src/routes/recipe.route";
import categoryRoutes from "./src/routes/category.routes";

loadConfig();

declare global {
  namespace Express {
    interface Request {
      user?: IUser | undefined;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();
const server = http.createServer(app);

const router = express.Router();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(morgan("dev"));

// Initialize routes
const initApp = async (): Promise<void> => {
  await initDB(); // Ensure the database connection is initialized

  app.use("/api", router);
  app.use("/uploads", express.static("uploads"));
  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "Recipe app is ready to launch" });
  });

  // Mount routes
  router.use("/auth", authRoutes);
  router.use("/recipelist", recipeRoutes);
  router.use("/category", categoryRoutes);
  // router.use("/review",reviewRoutes);

  //   app.use(errorHandler);

  server.listen(port, () =>
    console.log(`Express server is listening at http://localhost:${port} 🚀`)
  );
};

initApp();
