import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBook, FaPenFancy } from "react-icons/fa";
function UserSidebar() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();

  const sideItems = [
    { name: "Home", slug: "", icon: <FaHome /> },
    { name: "Profile", slug: "profile", icon: <FaUser /> },
    { name: "Qbanks", slug: "qbank", icon: <FaBook /> },
    { name: "Posts", slug: "posts", icon: <FaPenFancy /> },
  ];

  return (
    <div className="fixed w-56 h-full bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-md flex flex-col p-2">

      <ul className="flex-grow py-4 space-y-1">
        {sideItems.map((item) => {
          const isActive =
            location.pathname === `/user/${userId}/${item.slug}` ||
            (item.slug === "" && location.pathname === `/user/${userId}`);

          return (
            <li key={item.name}>
              <button
                onClick={() => navigate(`/user/${userId}/${item.slug}`)}
                className={`relative flex items-center gap-3 w-full text-left px-5 py-2 rounded-md transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-sky-500 text-white font-semibold shadow-sm"
                      : "hover:bg-sky-100 hover:text-sky-700"
                  }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-sky-600 rounded-tr-md rounded-br-md"></span>
                )}

                {/* Icon */}
                <span
                  className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-sky-600"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span>{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserSidebar; 