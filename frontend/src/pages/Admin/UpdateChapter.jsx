import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateChapter() {
    const {chapterId}=useParams();
    // console.log(chapterId);
    const [subjects,setSubjects]=useState([]);
     const [formData,setFormData]=useState({
             chapterName:"",
             subjectId:"",
         })
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchSubjects=async()=>{
            const {data}= await axios.get(`/api/chapters/${chapterId}`);
            // console.log(data.chap);
            setFormData(data.chap)
        }
        fetchSubjects();
    },[])
    useEffect(()=>{
        const fetchSubjects=async()=>{
            const res= await axios.get('/api/subjects');
            setSubjects(res.data.subjects);
        }
        fetchSubjects();
    },[]);
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      sessionStorage.setItem("redirectToPath",window.location.pathname);
      const {data}=await axios.post(`/api/chapters/${chapterId}`,{formData},{ withCredentials: true, headers: {"Content-Type" : "application/json"}});
      if(data.success){
        setFormData({
        chapterName:"",
        subjectId:"",
    })
        navigate("/adminHome/chapters")
      }else{
        navigate('/admin');
      }
    }
  return (
     <div>Update Chapter
        <form onSubmit={handleSubmit}>
            <div>
 <label htmlFor="subjects" className="block mb-2 font-medium text-gray-700">Choose subject the chapter belongs to : </label>
            <select id='subjects' 
            onChange={handleChange}
             name="subjectId" 
             value={formData.subjectId}
             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
             >
              <option value="" disabled>Select a subject</option>
                {subjects.map((item)=>(
                    <option key={item.subjectName} value={item._id} >
                        {item.subjectName}
                    </option>
                ))}
            </select>
            </div>
                <input type="text" name="chapterName" id="chapterName" 
                value={formData.chapterName}
                onChange={handleChange} required/>
                <button>submit</button>
                
              </form>
    </div>
  )
}

export default UpdateChapter