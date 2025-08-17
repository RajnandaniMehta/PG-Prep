import express from 'express';
import postController from '../controllers/posts.js';
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn } from '../middleware.js';
const router=express.Router();

router.get("",isLoggedIn,postController.getAllPosts);
router.post("",isLoggedIn,wrapAsync(postController.newPost));
router.get("/mine",isLoggedIn,wrapAsync(postController.userPost));
export default router;