import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import userController from '../controllers/users.js';
import { saveRedirctUrl } from '../middleware.js';

const router =express.Router();

router.post("/signup",wrapAsync(userController.signup));
router.post("/login",saveRedirctUrl,userController.login);
router.get("/status",userController.status);
router.get("/logout",userController.status);
router.get("/:userId",wrapAsync(userController.userHome));




export default router;