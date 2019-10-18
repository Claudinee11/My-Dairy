import { Pool } from 'pg';

const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('error', (error) => {
  console.log(error);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
   id SERIAL NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);
 
DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE entries(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  date TIMESTAMP,  
  description VARCHAR(255) NOT NULL
  );

`);
export default createTables;

