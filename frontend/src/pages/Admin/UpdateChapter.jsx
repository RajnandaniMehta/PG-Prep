import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBook, FaEdit } from 'react-icons/fa';

function UpdateChapter() {
  const { chapterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    chapterName: "",
    subjectId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapter = async () => {
      const { data } = await axios.get(`/api/chapters/${chapterId}`);
      setFormData(data.chap);
    };
    fetchChapter();
  }, [chapterId]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get('/api/subjects');
      setSubjects(res.data.subjects);
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectToPath", window.location.pathname);
    const { data } = await axios.post(
      `/api/chapters/${chapterId}`,
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
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-xl sm:max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
        
        {/* Header */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaEdit className="text-sky-600 text-lg sm:text-xl" /> 
          Update Chapter
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* Select Subject */}
          <div>
            <label
              htmlFor="subjects"
              className="block mb-2 text-sm sm:text-base font-medium text-gray-700"
            >
              <FaBook className="inline-block mr-2 text-sky-600" />
              Choose Subject
            </label>
            <select
              id="subjects"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
              required
            >
              <option value="" disabled>
                Select a subject
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
              className="block mb-2 text-sm sm:text-base font-medium text-gray-700"
            >
              Chapter Name
            </label>
            <input
              type="text"
              id="chapterName"
              name="chapterName"
              value={formData.chapterName}
              onChange={handleChange}
              required
              placeholder="Enter chapter name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2.5 sm:py-3 rounded-xl 
                       hover:bg-sky-700 transition font-semibold shadow-md text-sm sm:text-base"
          >
            Update Chapter
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateChapter;
