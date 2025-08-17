import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function QBankQHome() {
  const navigate = useNavigate();
  const { subjectId, chapterId, userId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl text-center max-w-lg w-full p-8 md:p-12 transform transition-transform hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          🚀 Boost Your Prep with Practice!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          "Success in PG entrance exams comes one MCQ at a time. Let's go!"
        </p>
        <button
          className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => {
            navigate(
              `/user/${userId}/qbank/${subjectId}/${chapterId}/practice`
            );
          }}
        >
          Start Practising →
        </button>
      </div>
    </div>
  );
}

export default QBankQHome;
