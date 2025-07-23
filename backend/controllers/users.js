import { User } from "../models/user.js";
import passport from 'passport';
export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({email,username});
    const reguser=await User.register(newUser,password);
    const userId=String(reguser._id);
    return res.json({
        success:true,
        message:"registered successfully",
        userId
    })
}

export const login=(req, res, next) => {
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
      const redirectUrl=res.locals.redirectUrl || "/qBanks";
      console.log(redirectUrl);
      return res.json({
        success: true,
        message: "User logged in successfully",
        userId,
        redirectUrl
      });
    });
  })(req, res, next);
}

export const status=(req,res)=>{
    if(req.isAuthenticated()){
        return res.json({
            loggedIn:true,
            user:req.user
        })
    }
    return res.json({
            loggedIn:false
        })
}

export const logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.session.destroy(err => {
      if (err) return res.status(500).json({
        success:false,
        message:"failed to destroy"
      });
      res.clearCookie('connect.sid'); 
      res.status(200).json({
        success:true,
        message:"succeffully destroyed"
      });
    });
    })
}

export const userHome=async(req,res)=>{
    let { userId }=req.params;
    const user=await User.findById(userId);
    console.log(user)
    return res.json({
        success:true,
        message:"user found",
        user
    })
}

const userController={
    signup,
    login,
    status,
    logout,
    userHome
}

export default userController;