import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddChapter() {
  const api = import.meta.env.VITE_API_URL;
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    chapterName: "",
    subjectId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(`${api}/subjects`);
      setSubjects(res.data.subjects);
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectTo", window.location.pathname);
    const { data } = await axios.post(
      `${api}/chapters`,
      { formData },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      setFormData({
        chapterName: "",
        subjectId: "",
      });
      navigate("/adminHome/chapters");
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Chapter
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Subject Dropdown */}
          <div>
            <label
              htmlFor="subjects"
              className="block mb-2 font-medium text-gray-700"
            >
              Select Subject
            </label>
            <select
              id="subjects"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="" disabled>
                Choose a subject
              </option>
              {subjects.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Name */}
          <div>
            <label
              htmlFor="chapterName"
              className="block mb-2 font-medium text-gray-700"
            >
              Chapter Name
            </label>
            <input
              type="text"
              id="chapterName"
              name="chapterName"
              placeholder="Enter chapter name"
              value={formData.chapterName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-sky-600 text-white px-6 py-3 rounded-xl 
                         hover:bg-sky-700 transition duration-200 shadow font-semibold"
            >
              Submit Chapter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChapter;
