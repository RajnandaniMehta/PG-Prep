import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function QBankChapter() {
    const {subjectId,userId}=useParams();
    const [chapters,setChapters]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
            const fetchChapters=async ()=>{
              try {
                sessionStorage.setItem("redirectTo",window.location.pathname);
              const {data}=await axios.get(`/api/chapters/sub/${subjectId}`,{withCredentials:true});
                if(data.success)
              setChapters(data.chapters);
            else{
              navigate('/login');
            }
              } catch (error) {
                navigate('/login')
              }
              
            }
            fetchChapters();
    },[])
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 mr-4">
        <div className="max-w-6xl mx-auto">
        <h1  className="text-4xl font-bold text-sky-800 mb-12 text-center">Choose Chapter : </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chapters.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-200 p-6 cursor-pointer"
              onClick={() => {navigate(`/user/${userId}/qbank/${item.subjectId}/${item._id}`)}}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {item.chapterName}
              </h2>
              <p className="text-sm text-gray-500">
                View all questions from this chapter →
              </p>
            </div>
          ))}
        </div>
        </div>
        
    </div>
  )
}

export default QBankChapter