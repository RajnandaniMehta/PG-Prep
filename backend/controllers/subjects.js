import { Chapter } from "../models/chapter.js";
import { Question } from "../models/question.js";
import { Subject } from "../models/subject.js";

//Get subjects
export const getAllSubjects=async (req,res)=>{
    const subjects= await Subject.find({});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
        subjects
    });
}

//Add new subject
export const newSubject=async (req,res)=>{
    const {subjectName}=req.body;
    const sub=await Subject.create({subjectName});
    return res.json({
        success:"true",
        message:"Subject added successfully",
    });
}

// Get specific subject
export const getSubject=async(req,res)=>{
    const {subjectId}=req.params;
    const sub=await Subject.findById(subjectId);
    return res.json({
        success:true,
        message:"fetched",
        sub
    })
}

//Edit subject
export const updateSubject=async(req,res)=>{
    const {subjectName}=req.body;
    const {subjectId}=req.params;
    const sub=await Subject.findByIdAndUpdate(subjectId,{subjectName});
    return res.json({
        success:true,
        message:"fetched",
    })
}

//Delete subject
export const deleteSubject=async(req,res)=>{
    const {subjectId}=req.params;
    const chapters=await Chapter.find({subjectId});
    const chapterIds=chapters.map(ch=>ch._id);
   await Question.deleteMany({chapterId:{$in :chapterIds}});
   await Chapter.deleteMany({subjectId});
   await Subject.findByIdAndDelete(subjectId);
    return res.json({
        success:true,
        message:"deleted successfully",
    })
}

const subjectController={
    getAllSubjects,
    newSubject,
    getSubject,
    updateSubject,
    deleteSubject
}

export default subjectController;