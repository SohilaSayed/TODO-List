import {Schema , model,Types} from "mongoose"

const noteSchema = new Schema ({
    title : {
        type:String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    createdBy:{
        type: Types.ObjectId,
        ref:'User',
        required:true
    },
    status :{
        type:String,
        enum : ['Open','In progress' , 'Confirmed'],
        default : 'Open'
    }
},{
    timestamps : true
})

const noteModel = model('Note',noteSchema)

export default noteModel

