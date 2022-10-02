import express from "express";
import cors from 'cors';
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRouter.js";
import customerRouter from "./routes/customerRoutes.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customerRouter);
app.use(rentalsRouter);

app.listen(4000, () => console.log("Ouvindo porta 4000 :D"));