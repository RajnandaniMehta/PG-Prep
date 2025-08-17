import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddQuestion() {
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
      const { data } = await axios.get("/api/chapters", { withCredentials: true });
      setAllChapters(data.allChapters);
    };
    fetchChapters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("redirectTo", window.location.pathname);
    const { data } = await axios.post(
      "/api/questions",
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
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          Add a New Question
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Select Chapter */}
          <div>
            <label htmlFor="chapters" className="block mb-2 font-medium text-gray-700">
              Choose Chapter
            </label>
            <select
              id="chapters"
              name="chapterId"
              value={formData.chapterId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            <label htmlFor="question" className="block mb-2 font-medium text-gray-700">
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Write your question here"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formData.options.map((option, index) => (
              <div key={option.num}>
                <label htmlFor={option.num} className="block mb-1 font-medium text-gray-700">
                  Option {option.num}
                </label>
                <input
                  id={option.num}
                  type="text"
                  placeholder={`Option ${option.num}`}
                  value={option.content}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            ))}
          </div>

          {/* Answer */}
          <div>
            <label htmlFor="answer" className="block mb-2 font-medium text-gray-700">
              Correct Answer (A/B/C/D)
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="e.g., A"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Explanation */}
          <div>
            <label htmlFor="explanation" className="block mb-2 font-medium text-gray-700">
              Explanation (Optional)
            </label>
            <textarea
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              placeholder="Provide explanation if necessary..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-sky-600 text-white px-8 py-3 rounded-xl 
                         hover:bg-sky-700 transition duration-200 shadow font-semibold"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
