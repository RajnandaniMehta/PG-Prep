import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  const footerItem=[
    {
      title:'About us'
    },
     {
      title:'Contact us'
    },
     {
      title:'Privacy and Policy'
    }
  ]
  return (
    <footer className="bg-gray-700 text-white py-6">
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
      <ul className="flex space-x-6 mb-4 sm:mb-0">
        {footerItem.map((item)=>(
        <li key={item.title} className='px-2 py-2'>
          <Link
          className="hover:underline text-gray-300 hover:text-white transition">
            {item.title}
          </Link>
        </li>
        )
        )}
      </ul>
      <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} PG Prep. All rights reserved.
        </p>
    </div>
    </footer>
    
  )
}

export default Footer