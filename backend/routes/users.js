import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import userController from '../controllers/users.js';
import { isLoggedIn, saveRedirctUrl } from '../middleware.js';

const router =express.Router();

router.post("/signup",wrapAsync(userController.signup));
router.post("/login",saveRedirctUrl,userController.login);
router.get("/status",userController.status);
router.get("/logout",userController.logout);
router.post("/workout",isLoggedIn,wrapAsync(userController.newWorkout));
router.get('/progress',isLoggedIn,wrapAsync(userController.getProgress));
router.post('/dailygoal',isLoggedIn,wrapAsync(userController.dailyGoal));
router.get('/dailyprogress',isLoggedIn,wrapAsync(userController.dailyProgress));
router.get("/:userId",isLoggedIn,wrapAsync(userController.userHome));


export default router;