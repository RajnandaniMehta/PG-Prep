import express from 'express';
import mongoose from 'mongoose';
import { Subject } from './models/subject.js';
import {Chapter} from './models/chapter.js';
import {Question} from './models/question.js';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {User} from './models/user.js';
const app=express();
const MONGO_URL="mongodb://127.0.0.1:27017/PGprep";
const ADMIN_CODE="PG_PREP";
const seesionOptions={
    secret:"mySecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(express.json());
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.use(session(seesionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/api/",(req,res)=>{
    return res.json({
        success:true,
        message:"Home get"
    });
})

app.get("/api/subjects",async (req,res)=>{
    const subjects= await Subject.find({});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
        subjects
    });
});
app.get("/api/allChapters",async (req,res)=>{
    const allChapters= await Chapter.find({});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
        allChapters
    });
})
app.post("/api/admin",(req,res)=>{
    const {code}=req.body;
    console.log(code);
    if(code===ADMIN_CODE){
    return res.json({
        success:true,
        message:"You are correct admin"
    })
    }
    return res.json({
        success:false,
        message:"Unauthorized Access"
    })
    
})
app.post("/api/addq",async (req,res)=>{
    const {formData}=req.body;
    console.log(formData.explanation);
    const q=await Question.create(formData);
    console.log(q);
    return res.json({
        success:true,
        message:"added question"
    })
})

app.post("/api/signup",async(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({email,username});
    const reguser=await User.register(newUser,password);
    const userId=String(reguser._id);
    return res.json({
        success:true,
        message:"registered successfully",
        userId
    })
})

app.get("/api/:subjectId",async (req,res)=>{
    const {subjectId}=req.params;
    const chapters=await Chapter.find({subjectId})
     return res.json({
        success:true,
        message:"chapter fetched successfully",
        chapters
    })
})
app.get("/api/:subjectId/:chapterId", async(req,res)=>{
    const {chapterId}=req.params;
    const questions=await Question.find({chapterId});
    return res.json({
        success:true,
        message:"Questions fetched",
        questions
    })
})
app.get("/api/u/id/:userId",async(req,res)=>{
    let { userId }=req.params;
    const user=await User.findById(userId);
    console.log(user)
    return res.json({
        success:true,
        message:"user found",
        user
    })
})
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    req.login(user, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Login failed" });
      }

      const userId = String(user._id);
      return res.json({
        success: true,
        message: "User logged in successfully",
        userId
      });
    });
  })(req, res, next);
});

app.get("/api/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        return res.redirect("/api/");
    })
})

app.listen(8000,()=>{
    console.log("server is running");
})