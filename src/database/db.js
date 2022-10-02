import pg from 'pg';


const { Pool } = pg;

export default function psql(){

    try{

    const conn = new Pool({
        user: 'postgres',
        password: '200enzo',
        host: 'localhost',
        port: '5432',
        database: 'boardcamp'
    });

    return conn;

    }catch (err){

        console.log(err);
        return err;
    }
}
