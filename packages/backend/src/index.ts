import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./connectMongo";
import { registerGameRoutes } from "./routes/gameRoutes";
import { GameProvider } from "./gameProvider";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

const mongoClient = connectMongo();
const app = express();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const JWT_SECRET = process.env.JWT_SECRET;

app.locals.JWT_SECRET = JWT_SECRET;

app.use(express.static(STATIC_DIR));
app.use(express.json());

const gp = new GameProvider(mongoClient);
registerGameRoutes(app, gp);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
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
