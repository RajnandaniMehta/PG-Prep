import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';
const goalSchema =new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    targetHours:Number
})
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    workoutId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workout'
    }],
    dailyGoals:[goalSchema],
    streak:Number,
    lastActive:Number
})
userSchema.plugin(passportLocalMongoose);
export const User=mongoose.model("User",userSchema);