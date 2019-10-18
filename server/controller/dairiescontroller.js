import moment from 'moment';
import userId from '../helpers/userId';
import Model from '../models/connect';




class getDiary {
  static entryModel() {
    return new Model('entries');
  }

  static async getallEntry(req, res) {
    const { title, description } = req.body
    const diaries = userId(req, req.header('token'));
    const getEntry = await getDiary.entryModel().select('*', 'id=$1', [diaries]);

    if (!getEntry.length) {
      return res.status(404).json({ status: 404, error: "Diries are not available" });
    }
    return res.status(200).json({
      status: 200,
      message: 'entry retrieved successfully',
      data: getEntry
    });
  }

  static async getspecificEntry(req, res) {
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
    const diaries = userId(req, req.header('token'));
    const diary = await getDiary.entryModel().select('*', 'id=$1', [diaries]);
    if (!diary.length) {
      return res.status(404).json({
        status: 404,
        error: 'entry does not exist'
      });
    }
    
    return res.status(200).json({
      status: 200,
      message: 'entry retrieved successfully',
      data: diary
    })
  };

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




