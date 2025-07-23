import { chapterSchema, questionSchema, subjectSchema } from "./schema.js";
import ExpressError from "./utils/ExpressError.js";
export const validateSubject=(req,res,next)=>{
    let {error}=subjectSchema.validate(req.body);
    if(error){
     let errMsg=error.details.map((el) => el.message).join(",");
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
export const validateChapter=(req,res,next)=>{
    let {error}=chapterSchema.validate(req.body);
    if(error){
     let errMsg=error.details.map((el) => el.message).join(",");
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
export const validateQuestion=(req,res,next)=>{
    console.log(req.body);
    const {formData}=req.body;
    let {error}=questionSchema.validate(formData);
    if(error){
     let errMsg=error.details.map((el) => el.message).join(",");
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

export const isLoggedIn=(req,res,next)=>{
    req.session.redirectUrl=req.originalUrl;
    if(req.isAuthenticated && req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        return next();
    }
    return res.status(401).json({
    success:false,
    message:"you must be logged in"
   })
}
export const saveRedirctUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

export const isAdmin=(req,res,next)=>{
    if(!req.session || !req.session.isAdmin ){
        return res.json({
            success:false,
            message:"ACCESS DENIED"
        })
    }
    next();
}