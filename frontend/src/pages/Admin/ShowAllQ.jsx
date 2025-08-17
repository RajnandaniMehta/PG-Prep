import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function ShowAllQ() {
  const api = import.meta.env.VITE_API_URL;
  const { chapterId } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQ = async () => {
      try {
        sessionStorage.setItem("redirectToPath", window.location.pathname);
        const { data } = await axios.get(`${api}/questions/admin/${chapterId}`,{withCredentials:true});
        if (data.success) setQuestions(data.questions);
        else navigate('/admin');
      } catch (error) {
        navigate('/admin');
      }
    };
    fetchQ();
  }, [chapterId, navigate]);

  const handleView = (questionId) => {
    navigate(`/adminHome/questions/show/${questionId}`);
  };

  const handleEdit = (questionId) => {
    navigate(`/adminHome/questions/edit/${questionId}`);
  };

  const handleDelete = async (questionId) => {
    const { data } = await axios.delete(`${api}/questions/${questionId}`,{withCredentials:true});
    if (data.success) {
      setQuestions(prev => prev.filter(q => q._id !== questionId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            📝 Questions
          </h1>
          <Link
            to="/adminHome/questions/new"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow hover:shadow-lg hover:scale-105 transition text-sm sm:text-base"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {questions.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:border-sky-400 transition transform hover:-translate-y-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between"
            >
              {/* Question text */}
              <p className="text-gray-800 font-medium text-sm sm:text-base md:text-lg line-clamp-3 mb-4">
                {item.question}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-1 sm:gap-2">
                <button
                  onClick={() => handleView(item._id)}
                  className="p-1.5 sm:p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition"
                  title="View"
                >
                  <FaEye className="text-sm sm:text-base" />
                </button>
                <button
                  onClick={() => handleEdit(item._id)}
                  className="p-1.5 sm:p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                  title="Edit"
                >
                  <FaEdit className="text-sm sm:text-base" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 sm:p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  title="Delete"
                >
                  <FaTrash className="text-sm sm:text-base" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {questions.length === 0 && (
          <div className="text-center mt-16 text-gray-500 text-base sm:text-lg">
            No questions found.  
            <Link to="/adminHome/questions/new" className="text-sky-600 hover:underline ml-1">
              Add a new question
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default ShowAllQ;
