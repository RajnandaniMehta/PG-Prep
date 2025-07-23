import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddSubject() {
  const navigate=useNavigate();
    const [subjectName,setSubjectName]=useState();
        const handleSubmitSubject =async(e)=>{
          e.preventDefault();
          sessionStorage.setItem("redirectTo",window.location.pathname);
          const {data}=await axios.post('/api/subjects',{subjectName},{ withCredentials: true, headers: {"Content-Type" : "application/json"}});
         if(data.success){
          setSubjectName('');
          navigate('/adminHome/subjects');
         }else{
          navigate('/admin');
         }
        }
  return (
    <div>
         <form onSubmit={handleSubmitSubject}>
                <input type="text" name="subjectName" id="subjectName" 
                placeholder='Subject Name'
                onChange={(e)=>{setSubjectName(e.target.value)}} 
                required/>
                <button >submit</button>
              </form>
    </div>
  )
}

export default AddSubject