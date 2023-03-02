import jwt from 'jsonwebtoken';
import userModel from '../DB/model/User.model.js';



export const auth = async (req,res,next)=>{
    try {
        const {authorization}=req.headers;
        console.log({authorization});


        if(!authorization?.startsWith("Bearer ")){
            return res.json({message:"In-valid bearer key"})
        }
        const token =authorization.split("Bearer ")[1];
        console.log({token});

        if(!token){
            return res.json({message:"Token is Required"})
        }

        const decoded = jwt.verify(token ,process.env.SIGNATURE)
        console.log(decoded);

        if(!decoded.id || !decoded.isLoggedIn){
            return res.json({message:"In-valid token payload"})
        }
        const authUser = await userModel.findById(decoded.id).select("name email")
        if(!authUser){
            return res.json({message:"Not Registerd Account"})
        }
        req.user = authUser

        return next()
    } catch (error) {
        return res.json({message:"Catch Error",error})
    }
    
}