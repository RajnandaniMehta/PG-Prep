import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Questions() {
  const [questions, setQuestions] = useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchQ=async()=>{
      try {
            sessionStorage.setItem("redirectToPath",window.location.pathname);
        const {data}=await axios.get('/api/questions',{withCredentials:true});
        if(data.success)
       setQuestions(data.questions);
        else navigate('/admin')
            } catch (error) {
            navigate('/admin');
          }
    }
    fetchQ();
  },[])
  const handleView=async(questionId)=>{
    navigate(`/adminHome/questions/show/${questionId}`);
  }
  const handleEdit=async(questionId)=>{
    navigate(`/adminHome/questions/edit/${questionId}`);
  }
  const handleDelete=async(questionId)=>{
    const {data}=await axios.delete(`/api/questions/${questionId}`);
    console.log(data);
    if(data.success){
                  setQuestions(prev => prev.filter(question => question._id !== questionId));
                }
  }
  return (
    <div>
      <h1>Questions</h1>
      <Link to={"/adminHome/questions/new"}>Add new + </Link>
      <ul>
        {questions.map(item=>(
          <li key={item._id}>
            <p>{item.question}</p>
            <button className="bg-sky-600 text-white px-2 py-2 rounded-md hover:bg-sky-700 transition mx-2"
            onClick={()=>handleView(item._id)}>view</button>
            <button className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 transition mx-1"
            onClick={()=>handleEdit(item._id)}>edit</button>
            <button className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-700 transition mx-2"
            onClick={()=>handleDelete(item._id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Questions