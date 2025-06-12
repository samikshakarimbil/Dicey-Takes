import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes.js";
import { connectMongo } from "./connectMongo";
import { GameProvider } from "./gameProvider";
import { registerGameRoutes } from "./routes/gameRoutes";
import { registerAuthRoutes } from "./routes/authRoutes.js";
import { CredentialsProvider } from "./CredentialsProvider";
import type { IAuthTokenPayload } from "./routes/authRoutes";
import jwt from "jsonwebtoken";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

const mongoClient = connectMongo();
const app = express();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const JWT_SECRET = process.env.JWT_SECRET;

app.locals.JWT_SECRET = JWT_SECRET;

app.use(express.static(STATIC_DIR));
app.use(express.json());

declare module "express-serve-static-core" {
    interface Request {
      user?: IAuthTokenPayload;
    }
  }
  
  export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      res.status(401).end();
    } else {
      jwt.verify(token, req.app.locals.JWT_SECRET as string, (error, decoded) => {
        if (decoded) {
          req.user = decoded as IAuthTokenPayload;
          next();
        } else {
          res.status(403).end();
        }
      });
    }
  }
  
app.use("/api/*", verifyAuthToken);

const gp = new GameProvider(mongoClient);
const cp = new CredentialsProvider(mongoClient);
registerGameRoutes(app, gp);
registerAuthRoutes(app, cp);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get(Object.values(ValidRoutes), (req, res) => {
    res.sendFile("index.html", { root: STATIC_DIR });
  });

app.get("/", (req: Request, res: Response) => {
    res.send("Backend");
});

app.get("/reviews", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({ message: "Review saved!" });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
