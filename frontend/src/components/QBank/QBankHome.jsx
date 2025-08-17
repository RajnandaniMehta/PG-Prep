import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
function QBankHome() {
  const api = import.meta.env.VITE_API_URL;
    const navigate=useNavigate();
    const {userId}=useParams();
    const [subjects,setSubjects]=useState([]);
    useEffect(()=>{
        const fetchSubjects=async()=>{
          try {
            sessionStorage.setItem("redirectTo",window.location.pathname);
            const {data}= await axios.get(`${api}/subjects`,{ withCredentials: true });
            if(data.success)
            setSubjects(data.subjects);
            else {
              navigate("/login");}

          } catch (error) {
           navigate("/login");
          }
            
        }
        fetchSubjects();
    },[]);
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 mr-4">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Choose Subject to Begin: </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-200 p-6 cursor-pointer"
              onClick={() => navigate(`/user/${userId}/qbank/${item._id}`)}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {item.subjectName}
              </h2>
              <p className="text-sm text-gray-400">
                View all questions from this subject →
              </p>
            </div>
          ))}
        </div>
        </div>
        
    </div>
  )
}

export default QBankHome