import psql from "../database/db.js";
import joi from 'joi'

let connection = psql();

const getGames = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            console.log(name);
            const games = await connection.query("SELECT * FROM games WHERE name LIKE '%" + name + "%'", [name]);
            return res.status(200).send(games.rows);
        }
        const games = await connection.query("SELECT * FROM games");
        res.status(200).send(games.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const postGame = async (req, res) => {

    try {

        const gameSchema = joi.object({
            name: joi.string().required(),
            stockTotal: joi.number().required(),
            pricePerDay: joi.number().required(),
            image: joi.string().uri().required(),
            categoryId: joi.number().required()
        });

        const validation = gameSchema.validate(req.body);

        if (validation.error) {
            return res.sendStatus(422);
        }

        const { name, image, stockTotal, categoryId, pricePerDay } = req.body;


        const categories = await connection.query("SELECT * FROM categories");
        const verifyId = categories.rows.filter(p => p.id === categoryId);
        const games = await connection.query("SELECT * FROM games");
        const verifyName = games.rows.filter(p => p.name === name);

        if (!verifyId[0]) {
            return res.status(400).send("ID inexistente");
        }
        if (verifyName[0]) {
            return res.status(409).send(" Jogo ja existente");
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
}


export { getGames, postGame };