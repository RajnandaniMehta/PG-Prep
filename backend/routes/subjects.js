import express from 'express';
import subjectController from '../controllers/subjects.js';
import { isAdmin, isLoggedIn, validateSubject } from '../middleware.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();
router.get("",wrapAsync(subjectController.getAllSubjects));
router.post("",validateSubject,isAdmin,wrapAsync(subjectController.newSubject));
router.get("/:subjectId",wrapAsync(subjectController.getSubject));
router.post("/:subjectId",validateSubject,isAdmin,wrapAsync(subjectController.updateSubject));
router.delete("/:subjectId",isAdmin,wrapAsync(subjectController.deleteSubject));
export default router;