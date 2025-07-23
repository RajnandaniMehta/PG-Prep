import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateQuestion() {
    const {questionId}=useParams();
    const navigate=useNavigate();
    const [allChapters,setAllChapters]=useState([]);
    const [formData,setFormData]=useState({
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
    })
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index].content = value;
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions
    }));
  };
    useEffect(()=>{
        const fetchChapters=async()=>{
        const {data}=await axios.get("/api/allChapters");
        setAllChapters(data.allChapters);
    }
    fetchChapters();
    },[])
    useEffect(()=>{
        const fetchq=async()=>{
        const {data}=await axios.get(`/api/questions/${questionId}`);
        // console.log(data);
        setFormData(data.q);
    }
    fetchq();
    },[])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      sessionStorage.setItem("redirectToPath",window.location.pathname);
      const {data}=await axios.post(`/api/questions/${questionId}`,{formData},
        { withCredentials: true, headers: {"Content-Type" : "application/json"}});
      if(data.success){
        setFormData({
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
    })
        navigate("/adminHome/questions")
      }else{
        navigate('/admin');
      }
    }

  return (
    <div>
        <h1 className="text-2xl font-bold text-center text-gray-600 mb-8">
          Please Fill this Form for adding question!!!</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
 <label htmlFor="chapters" className="block mb-2 font-medium text-gray-700">Choose chapter the questions belongs to : </label>
            <select id='chapters' 
            onChange={handleChange}
             name="chapterId" 
             value={formData.chapterId}
             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
             >
              <option value="" disabled>Select a chapter</option>
                {allChapters.map((item)=>(
                    <option key={item.chapterName} value={item._id} >
                        {item.chapterName}
                    </option>
                ))}
            </select>
            </div>
           <div>
            <label htmlFor="question"
            className="block mb-2 font-medium text-gray-700">Provide Question : </label>
<input type="text" name="question" id="question" 
            value={formData.question} 
            onChange={handleChange}
            placeholder='Write your question here'
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required/>
           </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formData.options.map((option, index) => (
            <div key={option.num}>
                <label htmlFor={option.num} className="block mb-1 font-medium text-gray-700">Option {option.num} : </label>
                 <input
                 id={option.num}
            key={option.num}
            type="text"
            placeholder={`Option ${option.num}`}
            value={option.content}
            onChange={(e) => handleOptionChange(index, e.target.value)
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

            </div>
         
        ))}
        </div>
        <div>
            <label htmlFor="answer" className="block mb-2 font-medium text-gray-700">Correct Answer (A/B/C/D): </label>
<input type="text" name="answer" id="answer" 
            value={formData.answer} 
            onChange={handleChange}
            placeholder='e.g., A'
           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required/>
        </div>
            <div>
                <label htmlFor="explanation" className="block mb-2 font-medium text-gray-700">Write Explanation (Optional) : </label>
 <textarea type="text" name="explanation"
             id="explanation"
             value={formData.explanation}
             onChange={handleChange}
             placeholder='Do you want to provide explanation?'
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              rows={4}/>
            </div>
           

        <div className="text-center">
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition duration-200 shadow"
            >
              Submit Question
            </button>
          </div>
        </form>
    </div>
  )
}

export default UpdateQuestion