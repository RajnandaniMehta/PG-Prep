import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle, FaLightbulb } from 'react-icons/fa';

function ShowQuestion() {
  const api = import.meta.env.VITE_API_URL;
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    question: "",
    options: [
      { num: 'A', content: '' },
      { num: 'B', content: '' },
      { num: 'C', content: '' },
      { num: 'D', content: '' }
    ],
    answer: "",
    explanation: "",
    chapterId: "",
  });

  useEffect(() => {
    const fetchQ = async () => {
      try {
        sessionStorage.setItem("redirectToPath", window.location.pathname);
        const { data } = await axios.get(`${api}/questions/${questionId}`, { withCredentials: true });
        if (data.success) setQuestion(data.q);
        else navigate('/admin');
      } catch (error) {
        navigate('/admin');
      }
    };
    fetchQ();
  }, [questionId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100">

        {/* Question Text */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          📝 Your Question
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-4 sm:mb-6 leading-relaxed">
          {question.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {question.options.map((option) => (
            <div
              key={option.num}
              className={`p-3 sm:p-4 rounded-xl border text-sm sm:text-base md:text-lg font-medium transition 
                ${question.answer === option.num
                  ? "bg-green-50 border-green-400 text-green-700"
                  : "bg-gray-50 border-gray-200 hover:border-sky-400 hover:shadow"}`}
            >
              <span className="font-bold mr-2">({option.num})</span>
              {option.content || "—"}
            </div>
          ))}
        </div>

        {/* Correct Answer */}
        <div className="flex items-center gap-2 text-green-600 font-semibold mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
          <FaCheckCircle className="text-lg sm:text-xl md:text-2xl" />
          Correct Answer: <span className="ml-1">{question.answer}</span>
        </div>

        {/* Explanation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 flex items-start gap-2 sm:gap-3">
          <FaLightbulb className="text-yellow-500 text-xl sm:text-2xl md:text-3xl mt-0.5 sm:mt-1" />
          <div>
            <h2 className="font-semibold text-yellow-700 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
              Explanation
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              {question.explanation || "No explanation provided."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShowQuestion;
