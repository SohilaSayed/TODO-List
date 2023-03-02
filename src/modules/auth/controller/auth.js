
import userModel from '../../../../DB/model/User.model.js'
import { asyncHandler } from '../../../utils/errorHandling.js';
import { destroyToken, generateToken, verifyToken } from '../../../utils/GenerateToken.js';
import { compare, hash } from '../../../utils/HashAndCompare.js';


export const signUp =asyncHandler (
async(req,res,next)=>{

    const {name,email,password,age,cPassword}=req.body
    console.log({name,email,password,age,cPassword});

    const checkUser =  await userModel.findOne({email})
    if(checkUser){
        return next(new Error('Email Exist' , {cause:409}))
    }
    const hashPassword = hash({
        plainText :password
    })
    const user =  await userModel.create({name,email,password:hashPassword,age})
    return res.status(201).json({message : "Done",user : user._id})
})

export const login =asyncHandler(
async(req,res,next)=>{

    const {email,password}=req.body
    console.log({email,password});
    const checkUser =  await userModel.findOne({email})
    if(!checkUser){
        res.status(409) 
        return next(new Error('Email not Exist' , {cause:404}))
    }

    const matchPassword = compare({
        plainText :password,
        hashValue : checkUser.password
    })
    if(!matchPassword){
        return next(new Error('In-valid Password' , {cause:400}))

    }

    const token = generateToken({
        payload : {id : checkUser._id , name :checkUser.name,email:checkUser.email , isLoggedIn : true },
        expiresIn :60*60
    })
    checkUser.status = 'online'
    checkUser.save()
    return res.status(201).json({message : "Done",token})
})

export const logout =asyncHandler(
    async(req,res,next)=>{

        const user = await userModel.findOneAndUpdate({status : 'offline'},{new : true})

        return res.status(201).json({message : "logout",user})
    })