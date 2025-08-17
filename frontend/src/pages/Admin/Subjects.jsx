import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        sessionStorage.setItem("redirectToPath", window.location.pathname);
        const res = await axios.get('/api/subjects', { withCredentials: true });
        if (res.data.success) {
          setSubjects(res.data.subjects);
        } else {
          navigate('/admin');
        }
      } catch (error) {
        navigate('/admin');
      }
    };
    fetchSubjects();
  }, []);

  const handleEdit = (subjectId) => {
    navigate(`/adminHome/subjects/edit/${subjectId}`);
  };

  const handleDelete = async (subjectId) => {
    const { data } = await axios.delete(`/api/subjects/${subjectId}`);
    if (data.success) {
      setSubjects(prev => prev.filter(subject => subject._id !== subjectId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Subjects
          </h1>
          <Link
            to="/adminHome/subjects/new"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-700 text-white 
                       px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg shadow-md 
                       hover:shadow-lg hover:scale-105 transition text-sm sm:text-base"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {subjects.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-md border border-gray-100 
                         hover:border-gray-300 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Subject Card */}
              <div
                className="p-4 sm:p-6 cursor-pointer"
                onClick={() => navigate(`/adminHome/subjects/show/${item._id}`)}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {item.subjectName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  View all questions from this subject →
                </p>
              </div>

              {/* Actions */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
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
        {subjects.length === 0 && (
          <div className="text-center mt-16 sm:mt-20 text-gray-500 text-base sm:text-lg">
            No subjects found.  
            <Link to="/adminHome/subjects/new" className="text-sky-600 hover:underline ml-1 sm:ml-2">
              Add a new subject
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Subjects;
