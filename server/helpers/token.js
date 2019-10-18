import jwt from 'jsonwebtoken';


 const validateToken=(id) => {

    const getIt=jwt.sign({
        Id:id,

    },
     process.env.secretkey);
    return getIt;
}

export default validateToken;