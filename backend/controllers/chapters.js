import { Chapter } from "../models/chapter.js";
import { Question } from "../models/question.js";

//Get All chapters
export const getAllChapters=async (req,res)=>{
    const allChapters= await Chapter.find({});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
        allChapters
    });
}

//Add new chapter
export const newChapter=async (req,res)=>{
    const {formData}=req.body;
    const chap=await Chapter.create(formData);
    return res.json({
        success:"true",
        message:"Subject added successfully",
    });
}

//Get specific chapter
export const getChapter=async(req,res)=>{
    const {chapterId}=req.params;
    const chap=await Chapter.findById(chapterId);
    // console.log(chap);
    return res.json({
        success:true,
        message:"fetched",
        chap
    })
}

//Edit chapter
export const updateChapter=async(req,res)=>{
    const {formData}=req.body;
    const {chapterId}=req.params;
    const chap=await Chapter.findByIdAndUpdate(chapterId,formData);
    // console.log(chap);
    return res.json({
        success:true,
        message:"fetched",
    })
}

//Delete chapter
export const deleteChapter=async(req,res)=>{
    const {chapterId}=req.params;
    await Question.deleteMany({ chapterId: chapterId });
   await Chapter.findByIdAndDelete(chapterId);
    return res.json({
        success:true,
        message:"deleted successfully",
    })
}

export const getChapSubjectWise=async (req,res)=>{
    const {subjectId}=req.params;
    const chapters=await Chapter.find({subjectId})
     return res.json({
        success:true,
        message:"chapter fetched successfully",
        chapters
    })
}
const chapterController={
    getAllChapters,
    newChapter,
    getChapter,
    updateChapter,
    deleteChapter,
    getChapSubjectWise
}

export default chapterController;