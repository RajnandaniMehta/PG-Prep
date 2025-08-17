import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddSubject() {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState('');

  const handleSubmitSubject = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectTo", window.location.pathname);

    const { data } = await axios.post(
      `${api}/subjects`,
      { subjectName },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    if (data.success) {
      setSubjectName('');
      navigate('/adminHome/subjects');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add New Subject
        </h2>

        <form onSubmit={handleSubmitSubject} className="space-y-5">
          <div>
            <label
              htmlFor="subjectName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject Name
            </label>
            <input
              type="text"
              name="subjectName"
              id="subjectName"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;
