import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Route,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import QBank from './pages/QBank.jsx'
import Admin from './pages/Admin.jsx'
import AdminHome from './pages/AdminHome.jsx'
import Signup from './pages/Signup.jsx'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />
      <Route path='/qbank/*' element={<QBank/>} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/adminHome' element={<AdminHome/>}/>
      <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      <Route path='/:userId' element={<User/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}/>
  </StrictMode>,
)
