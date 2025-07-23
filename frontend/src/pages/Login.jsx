import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Login() {
  const navigate =useNavigate();
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const location=useLocation();
    const handleSubmit=async(e)=>{
        
        try {
            e.preventDefault();
        const {data}=await axios.post("/api/users/login",{username,password},
            { withCredentials: true, headers: {"Content-Type" : "application/json"}}
        )
        if(data.success){
            const redirectPath = sessionStorage.getItem("redirectTo") || "/qbank";
            sessionStorage.removeItem("redirectTo");
            console.log(redirectPath);
            navigate(redirectPath);
        }else{
            navigate('/login')
        }
        } catch (error) {
            navigate('/login')
        }
        
    }

  return (
    <div className='pt-24'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Enter Username' required/>
            <input type="text" name="password" id="password" value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter Password' required/>
            <button className='mx-4'>Login</button>
            <Link to='/signup' className='text-blue-600'>
                New User?signup
            </Link>
        </form>
    </div>
  )
}


export default Login