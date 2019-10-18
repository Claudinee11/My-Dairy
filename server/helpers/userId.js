import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();

const userId = (req, token) => {
    const userToken = req.header('token')

    const decoded = jwt.verify(token, process.env.secretkey);
    return decoded.Id;

}
export default userId;


