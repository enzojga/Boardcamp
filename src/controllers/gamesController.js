import psql from "../database/db.js";

let connection = psql();

const getGames = async (req, res) => {
    try {
        const games = await connection.query("SELECT * FROM games");
        res.status(200).send(games.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const postGame = async (req, res) => {

    try {
        const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
        if (!name || !image || !stockTotal || !categoryId || !pricePerDay) {
            return res.sendStatus(422);
        }

        const categories = await connection.query("SELECT * FROM categories");
        const verifyId = categories.rows.filter(p => p.id === categoryId);
        const games = await connection.query("SELECT * FROM games");
        const verifyName = games.rows.filter(p => p.name === name);


        if (verifyName[0] || !verifyId[0]) {
            return res.status(422).send("ID inexistente ou Jogo ja existente");
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
}


export { getGames, postGame };