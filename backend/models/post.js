import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    likes:{
        type:Number,
        default:0,
        min:0
    },
    tags:[{
        type:String,
        trim:true
    }],
    comments:[{
        comment:String,
        comCreatedAt:{
        type:Date,
        default:Date.now()
    }
    }]
})

export const Post=mongoose.model("Post",postSchema);