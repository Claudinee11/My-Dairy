import Joi from 'joi';

 const signinValidator= (req, res, next) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(5).max(30).required()
    };
    const result = Joi.validate(req.body, schema);
  
    if (result.error) {
      return res.status(400).json(
        {
          status: 400,
          error: result.error.details[0].message
        },
      );
    }
    next();
  };

  export default signinValidator;