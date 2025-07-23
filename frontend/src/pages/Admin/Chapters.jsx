import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Chapters() {
    const [allChapters,setAllChapters]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
            const fetchChapters=async()=>{
            try {
            sessionStorage.setItem("redirectToPath",window.location.pathname);
            const {data}=await axios.get("/api/chapters");
            if(data.success)
            setAllChapters(data.allChapters);
            else navigate('/admin')
            } catch (error) {
            navigate('/admin');
          }
           
        }
        fetchChapters();
        },[])
         const handleEdit=(chapterId)=>{
                navigate(`/adminHome/chapters/edit/${chapterId}`);
            }
            const handleDelete=async(chapterId)=>{
                const {data}=await axios.delete(`/api/chapters/${chapterId}`);
                if(data.success){
                  setAllChapters(prev => prev.filter(chapter => chapter._id !== chapterId));
                }
            }
  return (
    <div className="min-h-screen bg-[#f8f9fa] px-6 py-12">
        <div className="max-w-6xl mx-auto">
        <h1  className="text-4xl font-bold text-gray-800 mb-12 text-center">Chapters </h1>
        <Link to={'/adminHome/chapters/new'}>Add new +</Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allChapters.map((item) => (
            <div key={item._id}>
<div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-200 p-6 cursor-pointer"
              onClick={() => {navigate(`/adminHome/chapters/show/${item._id}`)}}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {item.chapterName}
              </h2>
              <p className="text-sm text-gray-500">
                View all questions from this chapter →
              </p>
            </div>
            <div>
                <button 
                className='mx-4'
                onClick={()=>handleEdit(`${item._id}`)}>edit</button>
                <button onClick={()=>handleDelete(`${item._id}`)}>delete</button>
              
            </div>
              
            </div>
            
          ))}
        </div>
        </div>
        
    </div>
  )
}

export default Chapters