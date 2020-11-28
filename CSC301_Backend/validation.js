const joi = require('joi');

//Register Validation
const registerValidation = (data) => {
    const UserSchema = joi.object({
        email: joi
            .string()
            .email()
            .lowercase()
            .required(),
        firstname: joi
            .string()
            .required(),
        lastname: joi
            .string()
            .required(),
        password: joi
            .string()
            .strict()
            .required()
            .max(1024)
            .min(6)
    });

    return UserSchema.validate(data)
}

//Validation for login
const loginValidation = (data) => {
    const UserSchema = joi.object({
        email: joi
            .string()
            .email()
            .lowercase()
            .required(),
        password: joi
            .string()
            .strict()
            .required()
            .max(1024)
            .min(6)
    });

    return UserSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
