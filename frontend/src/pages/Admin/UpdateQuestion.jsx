import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaQuestionCircle, FaListOl, FaCheckCircle } from 'react-icons/fa';

function UpdateQuestion() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [allChapters, setAllChapters] = useState([]);
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index].content = value;
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions
    }));
  };

  useEffect(() => {
    const fetchChapters = async () => {
      const { data } = await axios.get("/api/chapters");
      setAllChapters(data.allChapters);
    };
    fetchChapters();
  }, []);

  useEffect(() => {
    const fetchq = async () => {
      const { data } = await axios.get(`/api/questions/${questionId}`);
      setFormData(data.q);
    };
    fetchq();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectToPath", window.location.pathname);
    const { data } = await axios.post(
      `/api/questions/${questionId}`,
      { formData },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    if (data.success) {
      setFormData({
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
      navigate("/adminHome/questions");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto bg-white shadow-md rounded-2xl border border-gray-100 p-6 sm:p-8">
        
        {/* Header */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 flex items-center justify-center gap-2">
          <FaQuestionCircle className="text-sky-600 text-lg sm:text-xl" />
          Update Question
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* Chapter Selection */}
          <div>
            <label htmlFor="chapters" className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Choose Chapter
            </label>
            <select
              id="chapters"
              name="chapterId"
              value={formData.chapterId}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
              required
            >
              <option value="" disabled>Select a chapter</option>
              {allChapters.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.chapterName}
                </option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label htmlFor="question" className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Write your question here"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
              required
            />
          </div>

          {/* Options */}
          <div>
            <label className="mb-2 text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
              <FaListOl className="text-sky-600" /> Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {formData.options.map((option, index) => (
                <div key={option.num}>
                  <label htmlFor={option.num} className="block mb-1 text-sm sm:text-base font-medium text-gray-600">
                    Option {option.num}
                  </label>
                  <input
                    id={option.num}
                    type="text"
                    placeholder={`Option ${option.num}`}
                    value={option.content}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label htmlFor="answer" className="mb-2 text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
              <FaCheckCircle className="text-green-600" /> Correct Answer (A/B/C/D)
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="e.g., A"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm sm:text-base"
              required
            />
          </div>

          {/* Explanation */}
          <div>
            <label htmlFor="explanation" className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
              Explanation (Optional)
            </label>
            <textarea
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              placeholder="Do you want to provide explanation?"
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm sm:text-base"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-sky-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl 
                         hover:bg-sky-700 transition shadow font-semibold text-sm sm:text-base"
            >
              Update Question
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl 
                         hover:bg-gray-300 transition shadow font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateQuestion;
