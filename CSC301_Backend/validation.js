const joi = require('joi');

//Register Validation
const registerValidation = (data) => {
    console.log(data);
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
            .min(6),
        birthday: joi
            .date()
            .required(),
        phone: joi
            .number(),
        gender: joi
            .string(),
        sexual_orientation: joi
            .string()
            .required(),
        treatments: joi
            .array()
            .required(),
        cancer_types: joi
            .array()
            .required(),
        medications: joi
            .array()
            .required(),
        location: joi
           .object()
           .keys({
            city: joi.string(),
            region: joi.string(),
            country: joi.string(),
            latitude: joi.number(),
            longitude: joi.number()
            }) 
            .required(),    
        is_mentor: joi
            .boolean()
            .required(),
        is_mentee: joi
            .boolean()
            .required(),
        is_partner: joi
            .boolean()
            .required(),
        interests: joi
            .array(),
        bio : joi
            .string()
            .required(),
        likes: joi
            .array(),
        liked_by: joi
            .array(),
        matched: joi
            .array(),
        passed: joi
            .array(),
        profileImage: joi
            .string()
            .required()
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
