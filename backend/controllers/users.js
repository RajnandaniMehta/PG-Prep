import { User } from "../models/user.js";
import passport from 'passport';
import { Workout } from "../models/workout.js";
import { Question } from "../models/question.js";
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

  //   req.login(user, async (err) => {
  //     if (err) {
  //       return res.status(500).json({ success: false, message: "Login failed" });
  //     }

  //     const userId = String(user._id);
  //     const redirectUrl=res.locals.redirectUrl || "/qBanks";
  //     // console.log(redirectUrl);
  //     return res.json({
  //       success: true,
  //       message: "User logged in successfully",
  //       userId,
  //       redirectUrl
  //     });
  //   }
  // );
  req.login(user, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "Login failed" });

    req.session.save((err) => {
        if (err) return next(err);

        const userId = String(user._id);
        const redirectUrl = res.locals.redirectUrl || "/qBanks";

        return res.json({
            success: true,
            message: "User logged in successfully",
            userId,
            redirectUrl
        });
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
    return res.json({
        success:true,
        message:"user found",
        user
    })
}
//workout
export const newWorkout=async(req,res)=>{
 const userId = req.user?._id;
//  console.log(userId);
  const user=await User.findById(userId).populate('workoutId');
    const {workout}=req.body;
    // console.log(workout);
    const qId=workout.questionId;
    // console.log(qId);
    const isWt=await Workout.findOne({questionId:qId});
    // console.log(isWt);
    if(isWt){
        await Workout.findByIdAndUpdate(isWt._id,workout);
    }else{
       const wt=await Workout.create(workout);
        user.workoutId.push(wt._id);
        // console.log(wt,wt._id);
        await user.save();
    }
   
    return res.json({
      success:true,
      message:"saved"
    })
}

export const getProgress=async (req,res)=>{
  console.log("Hello");
  const userId=req.user?._id;
  const total=await Question.countDocuments();
  const user=await User.findById(userId).populate({
      path: 'workoutId',
      populate: {
        path: 'questionId',
        model: 'Question'
      }
    });
  const attempted=user.workoutId.length;
  let correct=0;
  let incorrect=0;
  user.workoutId.map(wt=>{
    if(wt.selected=== wt.questionId.answer){
      correct++;
    }else{
      incorrect++;
    }
  })
  const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
  const todayStr = new Date().toDateString();
   let existingGoal = user.dailyGoals.find(goal => {
      return new Date(goal.date).toDateString() === todayStr;
    });
    let targetHours=1;
    if(existingGoal){
      targetHours=existingGoal.targetHours
    }
    const progress={total,
    attempted,
    correct,
    incorrect,
    accuracy:accuracy.toFixed(2)}
  return res.json({
    success: true,
    progress,
    targetHours,
    message: "Progress fetched successfully"
  });
}

export const dailyGoal=async(req,res)=>{
  const {targetHours}=req.body;
  const userId=req.user?._id;
  const user=await User.findById(userId);
  const todayStr = new Date().toDateString();
   let existingGoal = user.dailyGoals.find(goal => {
      return new Date(goal.date).toDateString() === todayStr;
    });
    if(existingGoal){
       existingGoal.targetHours = targetHours;
    }else{
      user.dailyGoals.push({
    targetHours:targetHours,
    date:new Date()
  })
 }  
 await user.save();
 return res.json({
  success:true,
  message: existingGoal ? "Goal updated" : "Goal set",
 })
}


export const dailyProgress=async(req,res)=>{
    const userId=req.user?._id;
    const user=await User.findById(userId).populate({
      path: 'workoutId',
      populate: {
        path: 'questionId',
        model: 'Question'
      }
    });
    const total=await Question.countDocuments();
    const todayStr = new Date().toDateString();
    const todaysWorkouts = user.workoutId.filter(wt =>
      new Date(wt.date).toDateString() === todayStr
    );
    const attempted=todaysWorkouts.length;
    let correct=0;
    let incorrect=0;
    let timeSpent=0;
    todaysWorkouts.map(wt=>{
    if(wt.selected=== wt.questionId.answer){
      correct++;
    }else{
      incorrect++;
    }
    timeSpent+= wt.timeSpent || 0
  });
  timeSpent=timeSpent/(60*60);
  const todayGoal = user.dailyGoals.find(goal =>
    new Date(goal.date).toDateString() === todayStr
  );
  if (todayGoal && timeSpent >= todayGoal.targetHours) {
    user.lastActive = (user.lastActive || 0) + 1;
    user.streak = Math.max(user.streak || 0, user.lastActive);
    await user.save();
  } else {
    user.lastActive = 0;
    await user.save();
  }
  let maxStreak=user.streak || 0;
  let currStreak=user.lastActive || 0;
  const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
  const progress={total,
    attempted,
    correct,
    incorrect,
    accuracy:accuracy.toFixed(2)}
  return res.json({
    progress,
    timeSpent:timeSpent.toFixed(2),
    maxStreak,
    currStreak,
    success:true
  })
}
const userController={
    signup,
    login,
    status,
    logout,
    userHome,
    newWorkout,
    getProgress,
    dailyGoal,
    dailyProgress
}

export default userController;