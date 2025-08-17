import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware.js';
import wrapAsync from '../utils/wrapAsync.js';
import questionController from '../controllers/questions.js';
const router=express.Router();
router.get("",wrapAsync(questionController.getAllQuestions));
router.post("",isAdmin,wrapAsync(questionController.newQuestion));
router.get("/:questionId",wrapAsync(questionController.getQuestion));
router.post("/:questionId",isAdmin,wrapAsync(questionController.updateQuestion));
router.delete("/:questionId",isAdmin,wrapAsync(questionController.deleteQuestion));
router.get("/all/:chapterId",isLoggedIn,wrapAsync(questionController.getQChapterWise));
router.get("/admin/:chapterId",isAdmin,wrapAsync(questionController.getQChapterWise));


export default router;