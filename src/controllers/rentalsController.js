import psql from "../database/db.js";
import dayjs from 'dayjs';

let connection = psql();

const getRentals = async (req, res) => {
    try {
        const customers = await connection.query("SELECT * FROM rentals");
        res.status(200).send(customers.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const postRentals = async (req, res) => {
    try{

        const {customerId, gameId, daysRented } = req.body;
        if(!customerId || !gameId || !daysRented){
            return res.sendStatus(422);
        }
        const game = await connection.query('SELECT * FROM games WHERE id = $1',[gameId]);
        console.log(game.rows);
        const date = dayjs().format('YYYY-MM-D');
        const originalPrice = game.rows[0].pricePerDay * daysRented;
        res.sendStatus(201);
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee") VALUES ($1,$2,$3,$4,null,$5,null)',
            [customerId, gameId, date, daysRented, originalPrice ]);
    }catch (err){

    }
}

export {getRentals, postRentals};