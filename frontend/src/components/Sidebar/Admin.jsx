import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaBook, FaListAlt, FaQuestionCircle } from 'react-icons/fa'

function Admin() {
  const navigate = useNavigate()
  const sideItems = [
    { name: 'Home', slug: 'home', icon: <FaHome /> },
    { name: 'All Subjects', slug: 'subjects', icon: <FaBook /> },
    { name: 'All Chapters', slug: 'chapters', icon: <FaListAlt /> },
    { name: 'All Questions', slug: 'questions', icon: <FaQuestionCircle /> },
  ]

  return (
    <div className="fixed top-20 left-0 h-screen w-56 bg-white shadow-md border-r border-gray-200 flex flex-col">
      <ul className="mt-4 flex-1 space-y-1">
        {sideItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => navigate(`/adminHome/${item.slug}`)}
              className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-sky-100 hover:text-sky-600 rounded-md transition-all duration-200"
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin
