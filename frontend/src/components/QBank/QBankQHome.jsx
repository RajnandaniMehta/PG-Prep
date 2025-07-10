import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function QBankQHome() {
    const navigate=useNavigate();
    const {subjectId,chapterId}=useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="bg-white shadow-md rounded-xl p-10 text-center max-w-xl w-full">
<h1 className="text-3xl font-bold text-gray-800 mb-4">🚀 Boost Your Prep with Practice!</h1>
<p className="text-gray-600 text-lg mb-6">
          "Success in PG entrance exams comes one MCQ at a time. Let's go!"
        </p>
        <button 
        className="bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md"
        onClick={()=>{navigate(`/qbank/${subjectId}/${chapterId}/practice`)}}>Start Practising →</button>
      </div>
        
    </div>
  )
}

export default QBankQHome