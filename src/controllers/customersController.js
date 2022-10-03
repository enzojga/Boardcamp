import psql from "../database/db.js";
import joi from 'joi'

let connection = psql();

const getCustomers = async (req, res) => {
    try {
        const customers = await connection.query("SELECT * FROM customers");
        res.status(200).send(customers.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.sendStatus(422);
        }
        const customer = await connection.query("SELECT * FROM customers WHERE id = $1", [id]);
        if (!customer.rows[0]) {
            return res.sendStatus(404);
        }
        res.send(customer.rows[0]);

    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
}

const postCustomer = async (req, res) => {

    try {
        const customerSchema = joi.object({
            name: joi.string().required(),
            cpf: joi.string().length(11).required(),
            phone: joi.string().min(10).max(11).required(),
            birthday: joi.string().isoDate().required(),
        });
        const validation = customerSchema.validate(req.body);

        if (validation.error) {
            return res.sendStatus(422);
        }

        const { name, phone, cpf, birthday } = req.body;

        const custoemrs = await connection.query("SELECT * FROM customers WHERE cpf=$1", [cpf]);

        if (custoemrs.rows[0]) {
            return res.status(409).send("CPF ja cadastrado");
        }

        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
            [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const updateCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        const customerSchema = joi.object({
            name: joi.string().required(),
            cpf: joi.string().length(11).required(),
            phone: joi.string().min(10).max(11).required(),
            birthday: joi.string().isoDate().required(),
        });
        const validation = customerSchema.validate(req.body);

        if (validation.error) {
            return res.sendStatus(422);
        }

        const { name, phone, cpf, birthday } = req.body;

        const custoemrs = await connection.query("SELECT * FROM customers WHERE cpf=$1", [cpf]);

        if (custoemrs.rows[0]) {
            return res.status(409).send("CPF ja cadastrado");
        }

        await connection.query('UPDATE customers SET name =$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5',
            [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}


export { getCustomers, postCustomer, getCustomerById, updateCustomer };