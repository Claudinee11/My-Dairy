import Joi from 'joi';

const signUpValidator = (req, res, next) => {
    const schema = {
        firstname: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(80).required(),
        lastname: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(80).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(5).max(30).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).json({
             status: 400, 
             error: `${result.error.details[0].message}`
             });
    }
    next();
}
export default signUpValidator;   