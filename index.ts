import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./src/services/initDB";
import { IUser } from "./src/schema/user.schema";
import { loadConfig } from "./src/helper/config";
import authRoutes from "./src/routes/auth.route";

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

// Initialize routes
const initApp = async (): Promise<void> => {
  await initDB(); // Ensure the database connection is initialized

  app.use("/api", router);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "Recipe app is ready to launch" });
  });

  // Mount routes
  router.use("/auth", authRoutes);

  //   app.use(errorHandler);

  server.listen(port, () =>
    console.log(`Express server is listening at http://localhost:${port} 🚀`)
  );
};

initApp();