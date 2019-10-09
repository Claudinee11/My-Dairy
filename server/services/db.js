import {Pool} from 'pg';

const dotenv = require('dotenv');

dotenv.config();
const config = {
  connectionString: process.env.DATABASE_URL

};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
    const mydiaryTable = `CREATE TABLE IF NOT EXISTS
    entries(
          id SERIAL PRIMARY KEY,
          title VARCHAR(50) NOT NULL,
          date VARCHAR(30) NOT NULL,
          description VARCHAR(255) NOT NULL
          
        )`;
        const entriesTable = `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
          first_name VARCHAR(40) NOT NULL,
          last_name VARCHAR(40) NOT NULL,
          email VARCHAR(30) NOT NULL,
        password VARCHAR(25) NOT NULL
        )`;
    pool.query(mydiaryTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });

      pool.query(entriesTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
  
  
  module.exports = {createTables, pool };
    
  
  
  require('make-runnable');
