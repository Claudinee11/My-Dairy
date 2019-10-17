import jwt from 'jsonwebtoken';
import Model from '../models/connect';


const model = new Model('users');

class Authentication {
    static async verifyUsers(req, res, next) {
      const token = req.header('token');
      if (!token) {
        return res.status(400).json({
            status:400,
            error:'token required'

        })
      }
      try {
        const decode =jwt.verify(token, process.env.secretkey)

        const users = await model.select('*', 'id=$1', [decode.Id]);
        if (!users.length) {
          return res.status(400).json({
              status:400,
              error:'You are not a user'
          });
        }
  
        next();
      } catch (err) {
        return res.status(500).json({
            status:500,
            error:err
        });
      }
    }
  }
  
  
  export default Authentication;