import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateSubject() {
  const [subjectName, setSubjectName] = useState('');
  const { subjectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/api/subjects/${subjectId}`);
      if (data.success) {
        setSubjectName(data.sub.subjectName);
      }
    };
    fetch();
  }, [subjectId]);

  const handleSubmitSubject = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectToPath", window.location.pathname);
    const { data } = await axios.post(
      `/api/subjects/${subjectId}`,
      { subjectName },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      navigate('/adminHome/subjects');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <form 
        onSubmit={handleSubmitSubject}
        className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Update Subject
        </h2>

        {/* Input */}
        <input
          type="text"
          name="subjectName"
          id="subjectName"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-sky-500 mb-5 
                     text-gray-700 placeholder-gray-400"
          placeholder="Enter subject name"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-sky-600 text-white py-3 rounded-xl 
                       hover:bg-sky-700 transition duration-200 font-semibold shadow"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl 
                       hover:bg-gray-300 transition duration-200 font-medium shadow"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSubject;
