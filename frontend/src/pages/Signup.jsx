import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate =useNavigate();
    const [username, setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {data}=await axios.post("/api/users/signup",{username,email,password},
            { withCredentials: true, headers: {"Content-Type" : "application/json"}}
        )
        if(data.success){
            navigate(`/${data.userId}`);
        }
    }

  return (
    <div className='pt-24'>
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Enter Username' required/>
            <input type="email" name="email" id="email" value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter Email' required/>
            <input type="text" name="password" id="password" value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter Password' required/>
            <button>signup</button>
            <Link to='/login' className='text-blue-600'>
                Already user?Login
            </Link>
        </form>
    </div>
  )
}

export default Signup