import { Question } from "../models/question.js";

export const getAllQuestions=async (req,res)=>{
    const questions= await Question.find({});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
       questions
    });
}

export const newQuestion=async (req,res)=>{
    const {formData}=req.body;
   await Question.create(formData);
    return res.json({
        success:true,
        message:"added question"
    })
}

export const getQuestion=async(req,res)=>{
    const {questionId}=req.params;
    const q=await Question.findById(questionId);
    console.log(q);
    return res.json({
        success:true,
        message:"fetched",
        q
    })
}

export const updateQuestion=async(req,res)=>{
    const {formData}=req.body;
    const {questionId}=req.params;
    const q=await Question.findByIdAndUpdate(questionId,formData);
    return res.json({
        success:true,
        message:"updated",
    })
}

export const deleteQuestion=async(req,res)=>{
    const {questionId}=req.params;
   await Question.findByIdAndDelete(questionId);
    return res.json({
        success:true,
        message:"deleted successfully",
    })
}

export const getQChapterWise=async (req,res)=>{
    const {chapterId}=req.params;
    const questions= await Question.find({chapterId});
    return res.json({
        success:"true",
        message:"Subject fetched successfully",
       questions
    });
}
const questionController={
    getAllQuestions,
    newQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getQChapterWise
}

export default questionController;