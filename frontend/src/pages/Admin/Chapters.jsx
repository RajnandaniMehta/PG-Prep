import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Chapters() {
  const api = import.meta.env.VITE_API_URL;
  const [allChapters, setAllChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        sessionStorage.setItem("redirectToPath", window.location.pathname);
        const { data } = await axios.get(`${api}/chapters`, { withCredentials: true });
        if (data.success) setAllChapters(data.allChapters);
        else navigate('/admin');
      } catch (error) {
        navigate('/admin');
      }
    };
    fetchChapters();
  }, []);

  const handleEdit = (chapterId) => {
    navigate(`/adminHome/chapters/edit/${chapterId}`);
  };

  const handleDelete = async (chapterId) => {
    const { data } = await axios.delete(`${api}/chapters/${chapterId}`,{withCredentials:true});
    if (data.success) {
      setAllChapters(prev => prev.filter(chapter => chapter._id !== chapterId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            📖 Chapters
          </h1>
          <Link
            to="/adminHome/chapters/new"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition text-sm sm:text-base"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {allChapters.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-gray-300 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Chapter Card */}
              <div
                className="p-4 sm:p-5 md:p-6 cursor-pointer"
                onClick={() => navigate(`/adminHome/chapters/show/${item._id}`)}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
                  {item.chapterName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  View all questions from this chapter →
                </p>
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
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
        {allChapters.length === 0 && (
          <div className="text-center mt-16 text-gray-500 text-base sm:text-lg">
            No chapters found.  
            <Link to="/adminHome/chapters/new" className="text-sky-600 hover:underline ml-1">
              Add a new chapter
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Chapters;
