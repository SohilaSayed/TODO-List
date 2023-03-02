import joi from 'joi'


export const signUpSchema = 
{
    body : joi.object({
    name:joi.string().required(),
    email : joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    cPassword:joi.string().valid(joi.ref("password")).required(),
    age:joi.number()
    }).required()
    
}

export const loginSchema = {
    body : joi.object({
        email : joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    }).required()
}