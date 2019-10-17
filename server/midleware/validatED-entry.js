import Joi from 'joi';

const validateEntry = (req, res, next) => {
    const entries = {
        title: Joi.string().required(),
        description: Joi.string().required(),
    };
    const result = Joi.validate(req.body, entries);
    if (result.error) {
        return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    next();
};
export default validateEntry;