import psql from "../database/db.js";

let connection = psql();

const getCategories = async (req, res) => {
    try {
        const categories = await connection.query("SELECT * FROM categories");
        res.status(200).send(categories.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const postCategories = async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) {
            return res.sendStatus(422);
        }

        const categories = await connection.query("SELECT * FROM categories");
        const verifyName = categories.rows.filter(p => p.name === name);

        if (verifyName[0]) {
            return res.status(422).send("Nome ja existente");
        }
        await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
}

export { getCategories, postCategories };