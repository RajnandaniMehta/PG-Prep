import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {User} from './models/user.js';
import wrapAsync from "./utils/wrapAsync.js";
import ExpressError from "./utils/ExpressError.js";
import subjectRouter from "./routes/subjects.js";
import chapterRouter from "./routes/chapters.js";
import questionRouter from "./routes/questions.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import { Post } from './models/post.js';
import cors from "cors";
import "dotenv/config"
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors({
  origin: ["https://pg-prep-frontend.onrender.com", "http://localhost:5173"],
  credentials: true
}));


const MONGO_URL=process.env.ATLASDB_URL;
const ADMIN_CODE=process.env.ADMINPANEL_CODE;
const sessionOptions={
    secret:process.env.MY_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Render pe true hoga
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
main().then(()=>{
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL,{dbName:"PGPrep"});
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/api/",wrapAsync((req,res)=>{
    return res.json({
        success:true,
        message:"Home get"
    });
}))

app.use("/api/subjects",subjectRouter);
app.use("/api/chapters",chapterRouter);
app.use("/api/questions",questionRouter);
app.use("/api/users",userRouter);
app.use("/api/posts",postRouter);

app.post("/api/admin",wrapAsync(async(req,res)=>{
    const {code}=req.body;
    if(code!==ADMIN_CODE){
         return res.status(401).json({ message: "Invalid Admin Code" });
    }
    const token=jwt.sign(
        {role:"admin"},
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    );
    return res.status(200).cookie("adminToken",token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    }).json({
        success:true,
        message:"Admin logged in, see profile",
    });
    
}))

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// })
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Internal server error"}=err;
    res.status(statusCode).send(message);
})
app.listen(8000,()=>{
    console.log("server is running");
})
