import express from 'express';
import { getGames, postGame} from '../controllers/gamesController.js';

const gamesRouter = express.Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGame);

export default gamesRouter;
