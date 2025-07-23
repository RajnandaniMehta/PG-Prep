import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Admin() {
    const [code, setCode]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {data}=await axios.post("/api/admin",{code},{ withCredentials: true, headers: {"Content-Type" : "application/json"}});
        if(data.success){
            const redirectPath = sessionStorage.getItem("redirectToPath") || "/adminHome";
            sessionStorage.removeItem("redirectToPath");
            console.log(redirectPath);
            navigate(redirectPath);
        }else{
            navigate("/admin");
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
<h1  className="text-2xl font-bold text-center text-gray-800 mb-6"> 🔐 Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
            type="text" 
            name="code" 
            id="code" 
            placeholder='Enter the ACCESS CODE' 
            onChange={(e)=>setCode(e.target.value)}
            value={code}
             className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
             required/>
            <button 
           className="w-full bg-sky-600 text-white py-3 rounded-md font-semibold hover:bg-sky-700 transition duration-200"
             type='submit'>submit</button>
        </form>
        </div>
        
    </div>
  )
}

export default Admin