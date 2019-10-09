import joi from 'joi';

const validateEntry = {
    validate(diary) {
        const entries = {
            title: joi.string().required(),
            description: joi.string().required(),
        };
        return joi.validate(diary, entries);
    },
};
export default validateEntry;
