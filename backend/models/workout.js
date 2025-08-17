import mongoose from "mongoose";

const workoutSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    selected:String,
    isBookmark:{
        type:Boolean,
        default:false
    },
    timeSpent:Number
})

export const Workout=new mongoose.model("Workout",workoutSchema);