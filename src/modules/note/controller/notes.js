import noteModel from '../../../../DB/model/Note.model.js'
import userModel from '../../../../DB/model/User.model.js';
import { asyncHandler } from '../../../utils/errorHandling.js';



export const addPro =asyncHandler(
async(req,res,next)=>{
    const{title , description}=req.body
    console.log({title , description});
    const result = await noteModel.create({title , description, createdBy:req.user._id})
    result.status = 'In progress'
    result.save()
    return res.json({message : "Done",result})
})

export const updatePro =asyncHandler(
async(req,res,next)=>{
    const {id} = req.params
    const {title} = req.body
    console.log(title);
    const user = await userModel.findById(req.user._id)
    if(!user){
        return next(new Error("In-Valid User Id"))         
    }
    const note = await noteModel.findOneAndUpdate({_id : id , createdBy : req.user._id },{title,status : 'Confirmed'},{new : true})

    return note ?  res.json({message : "Done",note})
                :next(new Error("In-Valid Note"))

})

export const updateAllPro =asyncHandler(
    async(req,res,next)=>{

        const user = await userModel.findById(req.user._id)
        if(!user){
            return next(new Error("In-Valid User Id"))         
        }
        const note = await noteModel.updateMany({createdBy : req.user._id },{status:'Confirmed'},{new : true})
    
        return note ?  res.json({message : "Done",note})
                    :next(new Error("In-Valid Note"))
    
})

export const deletePro = asyncHandler(
async(req,res,next)=>{
    const {id} = req.params

    const user = await userModel.findById(req.user._id)
    if(!user){
        return next(new Error("In-Valid User Id"))           
    }
    const note = await noteModel.findOneAndDelete({_id : id,createdBy : req.user._id})

    return note ?  res.json({message : "Done",note})
                :next(new Error("In-Valid Note"))


})

export const getnotes =asyncHandler(
async (req,res,next)=>{
    
    const note = await noteModel.find({}).populate([{
        path : 'createdBy',
        select : 'name , email , status'
    }])
    
    return note ? res.json({message : "Done",note}) :
    next(new Error("Not Register Account"))
})

export const getnotesByName =asyncHandler(
async (req,res,next)=>{
    const title = req.params.title
    const note = await noteModel.find({title:title})
    return  res.json({message : "Done",note})   
})

export const deleteAllPro = asyncHandler(
    async(req,res,next)=>{
        
    
        const user = await userModel.findById(req.user._id)
        if(!user){
            return next(new Error("In-Valid User Id"))           
        }
        const note = await noteModel.deleteMany({createdBy : req.user._id})
    
        return note ?  res.json({message : "Done",note})
                    :next(new Error("In-Valid Note"))
    
    
})