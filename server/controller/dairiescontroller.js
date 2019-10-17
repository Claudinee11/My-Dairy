import moment from 'moment';
//  import { pool } from '../services/db';
import Model from '../models/connect';




class getDiary {
  static entryModel() {
    return new Model('entries');
  }
  
  // static getallEntry(req, res) {
  //   pool.connect((err, client, done) => {
  //     const query = 'SELECT * FROM entries;';
  //     client.query(query, (error, result) => {
  //       done();
  //       if (error) {
  //         res.status(400).json({ error });
  //       }
  //       if (result.rows < '1') {
  //         res.status(404).send({
  //           status: 404,
  //           message: ' Entry  not found',
  //         });
  //       } else {
  //         res.status(200).send({
  //           status: 200,
  //           message: 'diary retrieved successfully',
  //           entries: result.rows,
  //         });
  //       }
  //     });
  //   });

  // };

  // static getspefiedEntry(req, res) {

  //   const { id } = req.params;

  //   pool.connect((err, client, done) => {
  //     const values = [id];
  //     if (isNaN(id)) {
  //       return res.status(400).json({
  //         status: 400,
  //         error: 'entry id should be a number'
  //       });
  //     }
  //     const query = 'SELECT * FROM entries WHERE id = $1;';
  //     client.query(query, values, (error, result) => {
  //       done();

  //       if (result.rows < '1') {
  //         return res.status(404).send({
  //           status: 404,
  //           message: ' entry not found',
  //         });
  //       } else {
  //         return res.status(200).send({
  //           status: 200,
  //           message: 'Entry Succsesful retrieved',
  //           entries: result.rows,
  //         });
  //       }
  //     });
  //   });

  // }

  static async addEntry(req, res) {
    try {

      const {
        title,
        description
      } = req.body

      const date = moment().format('LL');

      const columns = 'title, date, description';
      const values = `'${title}', '${date}', '${description}'`;

      const addnewEntry = await getDiary.entryModel().insert(columns, values);
      

      return res.status(201).json({
        status: 201,
        message: 'entry added successfully',
        data: addnewEntry
      });

    } catch (err) {
      return res.status(500).json({
        status: 500,
        err: err.message
      })
    }
  }


  static async modifyEntry(req, res) {
    const { id } = req.params;
    const {
      title,
      description
    } = req.body
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Entry id should be a number'
      })
    }
    const date = moment().format('LL');
    const entry = await getDiary.entryModel().select('*', 'id=$1', [id]);
    if (!entry.length) {
      return res.status(404).json({
        status: 404,
        error: 'entry does not exist'
      });
    }
    const columns = 'title=$1, description=$2';
    const clause = 'id=$3';
    const values = [title, description, id];

    const modifyEntry = await getDiary.entryModel().update(columns, clause, values);
    return res.status(200).json({
      status: 200,
      message: 'entry modified successfully',
      data: modifyEntry
    })
  }

  static async deleteEntry(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'entry should be a number'
      })
    }

    const entry = await getDiary.entryModel().select('*', 'id=$1', [id]);
    if (!entry.length) {
      return res.status(404).json({
        status: 404,
        error: 'entry does not exist'
      });
    }


    const deletEntry = await getDiary.entryModel().delete('id=$1', [id]);
    return res.status(200).json({
      status: 200,
      message: 'entry deleted successfully',
      data: deletEntry
    })

  }
};

export default getDiary;




