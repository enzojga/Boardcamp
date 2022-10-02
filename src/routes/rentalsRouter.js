import express from 'express';
import {getRentals, postRentals} from '../controllers/rentalsController.js';

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals",postRentals);

export default rentalsRouter;