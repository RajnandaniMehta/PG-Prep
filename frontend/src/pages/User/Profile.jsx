import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const api = import.meta.env.VITE_API_URL;
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    bio: "",
    phone: "",
    college: "",
    targetYear: "",
    domainInterest: "",
    neetRank: "",
    extra: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${api}/users/${userId}`, { withCredentials: true });
      setUser(data.user);
      setFormData({
        bio: data.user.bio || "",
        phone: data.user.phone || "",
        college: data.user.college || "",
        targetYear: data.user.targetYear || "",
        domainInterest: data.user.domainInterest || "",
        neetRank: data.user.neetRank || "",
        extra: data.user.extra || "",
      });
    };
    fetchUser();
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${api}/users/${userId}`, formData, { withCredentials: true });
      setUser(data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="pr-4">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, <span className="text-sky-600">{user.username}</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Update your profile and track your PG preparation progress.
        </p>

        {/* Editable Profile Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Add your bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Write something about yourself..."
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="College / University"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Target PG Year</label>
            <input
              type="text"
              name="targetYear"
              value={formData.targetYear}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter target PG year"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">NEET Rank</label>
            <input
              type="number"
              name="neetRank"
              value={formData.neetRank}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter your NEET rank"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700">Domain Interest</label>
            <input
              type="text"
              name="domainInterest"
              value={formData.domainInterest}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Your area of interest"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700">Extra / Achievements / Hobbies</label>
            <textarea
              name="extra"
              value={formData.extra}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Add achievements, certificates, hobbies, or notes"
            />
          </div>

          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Stats Section */}
        {user.solved !== undefined && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-sky-700">Questions Solved</h2>
              <p className="text-3xl font-bold text-sky-900">{user.solved}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-green-700">Correct Answers</h2>
              <p className="text-3xl font-bold text-green-900">{user.correct}</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold text-purple-700">Accuracy</h2>
              <p className="text-3xl font-bold text-purple-900">
                {user.solved ? `${Math.round((user.correct / user.solved) * 100)}%` : "0%"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
