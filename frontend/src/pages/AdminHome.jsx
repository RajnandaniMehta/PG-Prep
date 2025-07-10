import { useState } from 'react'
import { AddQuestion } from '../components';

function AdminHome() {
    const [isclick,setIsClick]=useState(false);
  return (
    <div className="pt-24 min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛠️ Admin Dashboard</h1>
        <div className="text-center">
 <button onClick={()=>{setIsClick(true)}}
 className="bg-green-700 hover:bg-green-800 text-white font-semibold px-3 py-3 rounded-lg shadow transition duration-200 m-2">
  ➕ Add Question
  </button>
   <button onClick={()=>{setIsClick(false)}}
 className="bg-red-700 hover:bg-red-800 text-white font-semibold px-3 py-3 rounded-lg shadow transition duration-200">
  Cancel task
  </button>
        </div>
        {isclick && (
          <div className="mt-8 border-t pt-8">
            <AddQuestion />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminHome