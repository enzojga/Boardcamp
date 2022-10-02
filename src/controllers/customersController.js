import psql from "../database/db.js";

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

const postCustomer = async (req, res) => {

    try {
        const { name, phone, cpf, birthday } = req.body;
        if (!name || !phone || !cpf || !birthday) {
            return res.sendStatus(422);
        }

        const custoemrs = await connection.query("SELECT * FROM customers");
        const verifyName = custoemrs.rows.filter(p => p.cpf === cpf);

        if (verifyName[0]) {
            return res.status(422).send("CPF ja cadastrado");
        }

        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
         [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(422);
    }
};

const updateCustomer = async (req, res) =>{

    try{
        const { id } = req.params;
         
    }catch(err){
        console.log(err);
    }
}


export { getCustomers, postCustomer };