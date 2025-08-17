import React from "react";
import { 
  FaBook, 
  FaTasks, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaCheckCircle 
} from "react-icons/fa";

function Adminhome() {
  return (
    <div className="p-6 md:p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-sky-800 to-sky-600 text-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back, Admin</h1>
        <p className="text-base md:text-lg">
          You are building <span className="font-semibold">PG Prep</span> – a powerful platform that helps 
          students prepare better by practicing subject-wise and chapter-wise questions.
        </p>
        <p className="mt-2 text-sm md:text-base text-blue-100">
          Currently, PG Prep is standing out with <span className="font-bold">1200+ students</span> registered 
          and <span className="font-bold">500+ practice questions</span> available. 
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-8 md:mt-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          What you can do as Admin
        </h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Manage Subjects */}
          <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition">
            <FaBook className="text-blue-600 text-2xl md:text-3xl" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Manage Subjects</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Add, update, and delete subjects for different exams and semesters.
              </p>
            </div>
          </div>

          {/* Manage Chapters */}
          <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition">
            <FaTasks className="text-green-600 text-2xl md:text-3xl" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Manage Chapters</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Organize subjects into chapters to make learning structured.
              </p>
            </div>
          </div>

          {/* Manage Questions */}
          <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition">
            <FaChalkboardTeacher className="text-purple-600 text-2xl md:text-3xl" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Manage Questions</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Add, update and delete questions with multiple choice options.
              </p>
            </div>
          </div>

          {/* Student Overview */}
          <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition">
            <FaUsers className="text-pink-600 text-2xl md:text-3xl" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Student Overview</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Track how many students have joined and are actively learning.
              </p>
            </div>
          </div>

          {/* Platform Progress */}
          <div className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition">
            <FaCheckCircle className="text-teal-600 text-2xl md:text-3xl" />
            <div>
              <h3 className="font-bold text-base md:text-lg">Platform Progress</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Monitor the growth of the platform with real-time updates.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Adminhome;
