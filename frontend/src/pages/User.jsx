import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userId}=useParams();
    const [user,setUser]=useState([]);
    useEffect(()=>{
        const fetchUser=async ()=>{
            const {data}=await axios.get(`/api/users/${userId}`,{withCredentials:true});
            setUser(data.user);
        }
        fetchUser();
    },[])
  return (
    <div className='pt-24'>
        <h1>Welcome to your pg preparation journey,{user.username}</h1>
    </div>
  )
}

export default User