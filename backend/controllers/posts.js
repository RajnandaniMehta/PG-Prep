import { Post } from "../models/post.js";

export const getAllPosts=async(req,res)=>{
    const posts=await Post.find({}).populate('author');
    return res.json({
        success:true,
        message:"Posts fetched",
        posts
    })
}
export const newPost=async(req,res)=>{
    const {post,tags}=req.body;
    const userId = req.user._id;
    const newP=await Post.create({author:userId,post:post,tags:tags});
    return res.json({
        success:true
    })
}

export const userPost=async(req,res)=>{
const userId=req.user._id;
const posts=await Post.find({author:userId}).populate('author');
    return res.json({
    success:true,
    posts
    })
}
const postController={
    getAllPosts,
    newPost,
    userPost
}
export default postController;