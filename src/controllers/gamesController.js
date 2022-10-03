import psql from "../database/db.js";
import joi from 'joi'

let connection = psql();

const getGames = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id WHERE games.name LIKE $1`, [`${name}%`]);
            return res.status(200).send(games.rows);
        }
        const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id');
        res.status(200).send(games.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const postGame = async (req, res) => {

    try {

        const gameSchema = joi.object({
            name: joi.string().required(),
            stockTotal: joi.number().min(1).required(),
            pricePerDay: joi.number().min(1).required(),
            image: joi.string().uri().required(),
            categoryId: joi.number().required()
        });
        const ppd= Number(req.body.pricePerDay);
        const sotk= Number(req.body.stockTotal);
        const validation = gameSchema.validate({...req.body, pricePerDay:ppd , stockTotal:sotk});

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
        res.sendStatus(500);
    }
}


export { getGames, postGame };