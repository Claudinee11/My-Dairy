import dotenv from 'dotenv';
// import lodash from 'lodash';
import Model from '../models/connect';
import validateToken from '../helpers/token';


dotenv.config();
class UsersDiary {
    static model() {
        return new Model('users');
    }

    static async signupDiary(req, res) {
        try {
            const userDiary = await UsersDiary.model().select('*', 'email=$1', [req.body.email]);
            if (userDiary.length) {
                return res.status(409).send({
                    status: 409,
                    message: 'email exist',
                });
            }
            const userColms = 'first_name, last_name,email,password';
            const userValues = `'${req.body.firstname}','${req.body.lastname}', '${req.body.email}','${req.body.password}'`;
            const enterUser = await UsersDiary.model().insert(userColms, userValues);
            
            const token = validateToken(enterUser[0].id);
            const data = {
                token,
                
            }
            return res.status(201).send({
                status: 201,
                message: 'the user created successfully',
                data
            });
        }
        catch (error) {
            console.log('something', error);
            return res.status(500).send({
                status: 500,
                err: 'an error occured',
            });

        }

    }

    static async signinDiary(req, res) {
        try {
            const usersDiary = await UsersDiary.model().select('*', 'email=$1', [req.body.email]);
             if (!usersDiary.length) {
               return res.status(401).send({ status: 401, error: 'encorrect password or email' });
            }
             else if (usersDiary[0].password === req.body.password) {
                 const token = validateToken(usersDiary[0].id);
                 const data = {
                     token,
                     
                 }
               return res.status(201).json({ status: 201, message: 'signin successfully', data});
 
             }
         }
         catch (error) {
             console.log('something', error);
             return res.status(500).send({
                 status: 500,
                 err: 'error occurred',
             });
 
         }
 
 
     };
}

export default { UsersDiary };