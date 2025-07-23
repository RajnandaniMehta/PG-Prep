import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ShowQuestion() {
    const {questionId}=useParams();
    const navigate=useNavigate();
     const [question, setQuestion] = useState({
        question:"",
        options:[ 
            { num: 'A', content: '' },
            { num: 'B', content: '' },
            { num: 'C', content: '' },
            { num: 'D', content: '' }
         ],
        answer:"",
        explanation:"",
        chapterId:"",
     });
    useEffect(()=>{
        const fetchQ=async()=>{
            
            try {
                sessionStorage.setItem("redirectToPath",window.location.pathname);
                const {data}=await axios.get(`/api/questions/${questionId}`,{withCredentials:true});
                if(data.success)
            setQuestion(data.q);
        else navigate('/admin');
            } catch (error) {
                navigate('/admin');
            }
            
        }
        fetchQ();
    },[])
  return (
    <div>
        <h1>Your Question</h1>
<p className="text-lg font-medium text-gray-800 mb-4">
               {question.question}
            </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {question.options.map((option) => {
                                return (
                                    <li key={option.num}>
                                    ({option.num}){option.content}
                                    </li>
                                );
                            }
                            )}
                        </ul>
            <p>Correct Answer : <b>{question.answer}</b></p>
            <p><b>Explanation : </b>{question.explanation || "No explanation provided."}</p>
    </div>
  )
}

export default ShowQuestion