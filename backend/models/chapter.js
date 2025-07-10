import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
    chapterName:{
        type:String,
        required:true
    },
    subjectId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Subject"
    }
})
export const Chapter=mongoose.model("Chapter",chapterSchema);