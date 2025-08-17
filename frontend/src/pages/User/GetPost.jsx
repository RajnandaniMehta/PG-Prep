import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function GetPost() {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const [isComment, setIsComment] = useState(null);
  const [isAll, setIsAll] = useState(true);
  const [isMyPost, setIsMypost] = useState(false);
  const [myPost, setMyPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchpost = async () => {
      const { data } = await axios.get("/api/posts", { withCredentials: true });
      setPosts(data.posts);
    };
    fetchpost();
  }, []);

  useEffect(() => {
    const fetchpost = async () => {
      const { data } = await axios.get("/api/posts/mine", { withCredentials: true });
      setMyPost(data.posts);
    };
    fetchpost();
  }, []);

  const toggle = (postId) => setIsComment(prev => (prev === postId ? null : postId));

  const renderPosts = (list) =>
    list.map(item => (
      <div
        key={item._id}
        className="bg-gradient-to-r from-white via-gray-50 to-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-2xl transition duration-300"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800 text-lg">{item.author.username}</h2>
          <span className="text-gray-500 text-sm">
            {new Date(item.createdAt).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{item.post}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">👍 {item.likes} Likes</span>
          <button
            onClick={() => toggle(item._id)}
            className="text-sky-600 font-semibold hover:underline transition"
          >
            💬 Comment
          </button>
        </div>
        {isComment === item._id && (
          <div className="mt-4 border-t border-gray-200 pt-3">
            {item.comments.length > 0 ? (
              item.comments.map(com => (
                <div
                  key={com._id}
                  className="bg-gray-50 p-3 rounded-xl mb-2 shadow-sm hover:bg-gray-100 transition"
                >
                  <p className="text-gray-700">{com.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No comments yet. Be the first to comment!</p>
            )}
          </div>
        )}
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative mr-4">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
  <button
    className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
      isAll
        ? 'bg-sky-600 text-white' 
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
    }`}
    onClick={() => { setIsAll(true); setIsMypost(false); }}
  >
    All Posts
  </button>
  <button
    className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
      isMyPost
        ? 'bg-sky-600 text-white' // 👈 yahan bhi hata diya
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
    }`}
    onClick={() => { setIsAll(false); setIsMypost(true); }}
  >
    My Posts
  </button>
</div>


      {/* Posts */}
      <div className="max-w-3xl mx-auto">
        {isAll && renderPosts(posts)}
        {isMyPost && renderPosts(myPost)}
      </div>

      {/* Fixed Create Post Button (Floating Action Button) */}
      <button
        onClick={() => navigate(`/user/${userId}/post`)}
        className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-700 text-white font-bold p-3 rounded-xl shadow-2xl text-lg transition transform hover:scale-110 flex items-center justify-center z-50"
      >
        + Create Post
      </button>
    </div>
  );
}

export default GetPost;
