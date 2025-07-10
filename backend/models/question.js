import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:[{
        num:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    }],
    answer:{
        type:String,
        required:true
    },
    explanation:{
        type:String,
    },
    chapterId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Chapter"
    }
})
export const Question=mongoose.model("Question",questionSchema);