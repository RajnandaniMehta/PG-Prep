import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSubject() {
 const [subjectName,setSubjectName]=useState('');
 const {subjectId}=useParams();
 const navigate=useNavigate();
 useEffect(()=>{
    const fetch=async()=>{
        const {data}=await axios.get(`/api/subjects/${subjectId}`);
        if(data.success){
            setSubjectName(data.sub.subjectName);
        }
    }
    fetch();
    
 },[])
const handleSubmitSubject =async(e)=>{
    e.preventDefault();
    sessionStorage.setItem("redirectToPath",window.location.pathname);
    const {data}=await axios.post(`/api/subjects/${subjectId}`,{subjectName},{ withCredentials: true, headers: {"Content-Type" : "application/json"}});
    if(data.success){
        navigate('/adminHome/subjects');
    }
}
  return (
    <div>
         <form >
                <input type="text" name="subjectName" id="subjectName" 
               value={subjectName}
                onChange={(e)=>{setSubjectName(e.target.value)}} required/>
                <button onClick={handleSubmitSubject}>Submit</button>
              </form>
    </div>
  )
}

export default UpdateSubject