import axios from 'axios';
import React, { useState } from 'react';

function AddPost() {
  const alltags = ['Anatomy','Anesthesia','Study Circle','PG 2025',"Medicine",'Micro-Biology','Bio-chemistry','Surgery'];
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState('');

  const handleTag = (e) => {
    const value = e.target.value;
    if (value && !tags.includes(value)) setTags(prev => [...prev, value]);
    e.target.value = '';
  };

  const removeTag = (tag) => setTags(prev => prev.filter(item => item !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/posts', { post, tags }, { 
        withCredentials: true,
        headers: { "Content-Type" : "application/json" }
      });
      console.log(data);
      alert("Post created successfully!");
      setPost('');
      setTags([]);
    } catch (err) {
      console.error(err);
      alert("Error creating post.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">
          Share Your Knowledge
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <div key={tag} className="bg-sky-200 text-sky-900 px-4 py-1 rounded-full flex items-center gap-2 text-sm shadow-sm hover:scale-105 transition-transform">
                <span>{tag}</span>
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600 font-bold transition">×</button>
              </div>
            ))}
          </div>

          {/* Tag Select */}
          <select
            onChange={handleTag}
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-inner bg-white"
          >
            <option value="">-- Choose tag --</option>
            {alltags.filter(tag => !tags.includes(tag)).map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* Post Textarea */}
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Write something valuable for your peers..."
            className="border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-inner min-h-[150px] resize-none text-gray-700 placeholder-gray-400 font-medium"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
