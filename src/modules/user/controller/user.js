import userModel from "../../../../DB/model/User.model.js"
import { asyncHandler } from "../../../utils/errorHandling.js";



export const getUsers =asyncHandler(
async (req,res,next)=>{

    console.log({User : req.user});
    const user = await userModel.findById(req.user._id)
    return user ? res.json({message : "Done",user}) :
    next(new Error ("Not Registered Account"))
})

export const updateUser =asyncHandler(
async (req,res,next)=>{
    const {age} = req.body
    console.log(age);
    const user = await userModel.findOneAndUpdate(req.user._id,{age},{new : true})
    return user ?  res.json({message : "Updated",user})
                :next(new Error ("In-Valid Account"))

})

export const deleteUser = asyncHandler(
async (req,res,next)=>{
    const user = await userModel.findOneAndDelete(req.user._id).select("userName , email")
    return user ?  res.json({message : "Deleted",user})
                :next(new Error ("In-Valid Account"))

})