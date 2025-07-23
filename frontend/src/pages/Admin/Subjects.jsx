import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Subjects() {
    const [subjects,setSubjects]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchSubjects=async()=>{
          try {
            sessionStorage.setItem("redirectToPath",window.location.pathname);
             const res= await axios.get('/api/subjects',{withCredentials:true}); 
             if(res.data.success)
          setSubjects(res.data.subjects);   
        else{
          navigate('/admin');
        }
          } catch (error) {
            navigate('/admin');
          }
           
        }
        fetchSubjects();
    },[])
    const handleEdit=(subjectId)=>{
        navigate(`/adminHome/subjects/edit/${subjectId}`);
    }
    const handleDelete=async(subjectId)=>{
        const {data}=await axios.delete(`/api/subjects/${subjectId}`);
        if(data.success){
          setSubjects(prev => prev.filter(subject => subject._id !== subjectId));
        }
    }
  return (
    <div >
        <div className="min-h-screen bg-[#f8f9fa] px-6 py-12">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Subjects</h1>
       <Link to={'/adminHome/subjects/new'}>Add new +</Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((item) => (
            <div key={item._id}>
                <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-200 p-6 cursor-pointer"
              onClick={() => navigate(`/adminHome/subjects/show/${item._id}`)}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {item.subjectName}
              </h2>
              <p className="text-sm text-gray-500">
                View all questions from this subject →
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

    </div>
  )
}

export default Subjects