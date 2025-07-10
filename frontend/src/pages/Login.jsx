import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate =useNavigate();
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
        const {data}=await axios.post("/api/login",{username,password},
            { withCredentials: true, headers: {"Content-Type" : "application/json"}}
        )
        if(data.success){
            navigate(`/${data.userId}`);
        }else{
            navigate('/')
        }
        } catch (error) {
            navigate('/')
        }
        
    }

  return (
    <div className='pt-24'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Enter Username'/>
            <input type="text" name="password" id="password" value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter Password'/>
            <button className='mx-4'>Login</button>
            <Link to='/signup' className='text-blue-600'>
                New User?signup
            </Link>
        </form>
    </div>
  )
}


export default Login