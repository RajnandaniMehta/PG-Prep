import express from 'express';
import chapterController from '../controllers/chapters.js';
import { isAdmin, isLoggedIn, validateChapter } from '../middleware.js';
import wrapAsync from '../utils/wrapAsync.js';

const router=express.Router();
router.get("",wrapAsync(chapterController.getAllChapters));
router.post("",validateChapter,isAdmin,wrapAsync(chapterController.newChapter));
router.get("/:chapterId",wrapAsync(chapterController.getChapter));
router.post("/:chapterId",isAdmin,wrapAsync(chapterController.updateChapter));
router.delete("/:chapterId",isAdmin,wrapAsync(chapterController.deleteChapter));
router.get('/sub/:subjectId',wrapAsync(chapterController.getChapSubjectWise));

export default router;