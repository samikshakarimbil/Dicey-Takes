import express from "express";
import { GameProvider } from "../gameProvider";

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
    const { rating, text, user } = req.body;
  
    if (!rating || !text || !user) {
      res.status(400).send({ error: "Invalid", message: "Missing required fields" });
    }
  
    const review = {
      game: gameName,
      rating,
      text,
      user,
    };
  
    const success = await gameProvider.addReview(review);
    if (success) {
      res.status(200).send({ message: "Review added" });
    } else {
      res.status(500).send({ error: "Failed to add review" });
    }
  });

  app.get("/api/:gameName/reviews", async (req, res) => {
    const { gameName } = req.params;
  
    try {
      const reviews = await gameProvider.getReviewsForGame(gameName);
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).send({ error: "Could not fetch reviews" });
    }
  });
  
  
}
