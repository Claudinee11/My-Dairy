import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class Model {
  constructor(table) {
    this.table = table;

    const config = {
      connectionString: process.env.DATABASE_URL

    };

    this.pool = new Pool(config);

    this.pool.on('connect', () => {
      console.log('connected to the Database');
    });

  }



  async select(columns, clause, values) {
    try {
      let query;
      if (clause) {
        query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
      } else {
        query = `SELECT ${columns} FROM ${this.table}`;
      }
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }


  async insert(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    try {

      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      console.log(err)
    }
  }


  async update(columns, clause, values) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }


  async delete(clause, values) {
    const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Model;