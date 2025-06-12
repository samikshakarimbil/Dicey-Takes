import express from "express";
import { GameProvider } from "../gameProvider";
// import { authenticateToken } from "../shared/Middleware";

export function registerGameRoutes(
  app: express.Application,
  gameProvider: GameProvider
) {
  app.get("/api/games", async (req, res) => {
    gameProvider.getAllGames().then((games) => {
      res.status(200).send(games);
    });
  });

  app.post("/api/:gameName/review", async (req, res) => {
    const { gameName } = req.params;
    const { rating, text } = req.body;
    const user = req.user?.username;
  
    if (!rating || !text || typeof user !== "string" || !gameName) {
      res.status(400).send({ error: "Invalid", message: "Missing required fields" });
      return;
    }
  
    const review = {
      game: gameName,
      rating,
      text,
      user: user
    };
  
    const success = await gameProvider.addReview(review);
    if (success) {
      res.status(200).send({ message: "Review added" });
    } else {
      res.status(500).send({ error: "Failed to add review" });
    }
  });

  app.get("/api/:gameName/reviews", express.json(), async (req, res) => {
    const { gameName } = req.params;
    try {
      const reviews = await gameProvider.getReviewsForGame(gameName);
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).send({ error: "Could not fetch reviews" });
    }
  });

  app.get("/api/reviews/me", express.json(), async (req, res) => {
      console.log("sufferng");
  });
  
}
