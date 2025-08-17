import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { data, useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaClock, FaBolt } from "react-icons/fa";

function UserHome() {
  const { userId } = useParams();
  const [overall, setOverall] = useState({
    total: 0,
    attempted: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0,
  });
  const [daily, setDaily] = useState({
    total: 0,
    attempted: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0,
  });
  const [isDaily, setIsDaily] = useState(false);
  const [isGoal, setIsGoal] = useState(false);
  const [targetHours, setTargetHours] = useState(1);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currStreak, setCurrStreak] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get('/api/users/progress', { withCredentials: true });
      setOverall(data.progress);
      setTargetHours(data.targetHours);
      // console.log(data);
    }
    fetchDetails();
  }, [userId]);
  useEffect(() => {
    const dailyProgress = async () => {
      const { data } = await axios.get('/api/users/dailyprogress', { withCredentials: true });
      setDaily(data.progress);
      setCurrStreak(data.currStreak);
      setMaxStreak(data.maxStreak);
      setTimeSpent(data.timeSpent);
    }
    dailyProgress();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(targetHours);
    const { data } = await axios.post("/api/users/dailygoal", { targetHours }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
    console.log(data);
    alert(data.message);
    setTargetHours(data.targetHours);

    setIsGoal(false);
  }

  return (
    <div className='bg-gray-50 min-h-screen p-4'>
      {/* Top */}

     <div className="relative flex flex-wrap items-center justify-between gap-6 p-8 bg-gradient-to-r from-sky-900 to-sky-600 rounded-2xl shadow-xl">
  <div>
    <h1 className="text-3xl font-bold text-white">Welcome back</h1>
    <p className="text-sky-100 mt-2">
      Keep pushing forward! You're building your success one question at a time.
    </p>
  </div>

  {/* Solved Circle */}
  <div className="bg-white px-6 py-4 rounded-xl shadow-md text-center">
    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
      Solved
    </h2>
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-300"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={
            2 * Math.PI * 40 * (1 - overall.attempted / overall.total || 0)
          }
          className="text-sky-500 transition-all duration-700 ease-in-out"
        />
      </svg>
      <span className="absolute text-lg font-bold text-sky-700">
        {overall.attempted}/{overall.total}
      </span>
    </div>
  </div>

  {/* Accuracy Circle */}
  <div className="bg-white px-6 py-4 rounded-xl shadow-md text-center">
    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
      Accuracy
    </h2>
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-300"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={
            2 * Math.PI * 40 * (1 - overall.accuracy / 100 || 0)
          }
          className="text-sky-500 transition-all duration-700 ease-in-out"
        />
      </svg>
      <span className="absolute text-lg font-bold text-sky-700">
        {overall.accuracy}%
      </span>
    </div>
  </div>
</div>

           {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8 mt-6">
        {[
          {
            icon: <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2"/>,
            color: "green",
            value: overall.correct,
            label: "Correct Answers",
          },
          {
            icon: <FaTimesCircle  className="text-red-500 text-3xl mx-auto mb-2"/>,
            color: "red",
            value: overall.incorrect,
            label: "Incorrect Answers",
          },
          {
            icon: <FaClock  className="text-sky-500 text-3xl mx-auto mb-2"/>,
            color: "sky",
            value: `${timeSpent} hrs`,
            label: "Time Spent",
          },
          {
            icon: <FaBolt className="text-yellow-500 text-3xl mx-auto mb-2"/>,
            color: "yellow",
            value: `${currStreak} 🔥`,
            label: "Current Streak",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-lg shadow-lg p-5 text-center border-t-4 border-${card.color}-500 transform hover:scale-105 hover:shadow-xl transition-all duration-300`}
          >
            <div className={`text-${card.color}-500 text-4xl mx-auto mb-2`}>
              {card.icon}
            </div>
            <h2 className="text-2xl font-bold">{card.value}</h2>
            <p className="text-gray-600">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Goal Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-sky-500">
        {!isGoal ? (
          <button
            onClick={() => setIsGoal(true)}
            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2 rounded-md shadow-md"
          >
            🎯 Set Goal: {targetHours} hr(s)
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="goal" className="block font-semibold text-gray-700">
              Target Hours: {targetHours}
            </label>
            <input
              type="range"
              min={1}
              max={12}
              id="goal"
              name="goal"
              onChange={(e) => setTargetHours(e.target.value)}
              value={targetHours}
              className="w-full accent-sky-500"
            />
            <div className="space-x-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md shadow"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsGoal(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Daily Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 mb-4">
        {!isDaily ? (
          <button
            onClick={() => setIsDaily(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md shadow-md"
          >
            📅 See Today Progress
          </button>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p>✅ Solved: {daily.attempted}/{daily.total}</p>
            <p>✔ Correct: {daily.correct}</p>
            <p>❌ Incorrect: {daily.incorrect}</p>
            <p>🎯 Accuracy: {daily.accuracy}%</p>
            <p>⏱ Time spent: {timeSpent} hrs</p>
            <button
              onClick={() => setIsDaily(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow mt-3"
            >
              Close
            </button>
          </div>
        )}
      </div>

      
    </div>
  );
}
export default UserHome;