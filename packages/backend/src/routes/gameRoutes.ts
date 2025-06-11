import express from "express";
import { GameProvider } from "../gameProvider";

export function registerGameRoutes(
    app: express.Application,
    gameProvider: GameProvider
){
    app.get("/api/games", async (req, res)=>{
        gameProvider
            .getAllGames()
            .then((games) => {
                res.status(200).send(games);
            })
    });
}