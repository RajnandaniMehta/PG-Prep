import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import QBank from './pages/QBank.jsx'
import Admin from './pages/Admin.jsx'
import AdminHome from './pages/AdminHome.jsx'
import Signup from './pages/Signup.jsx'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
import Subjects from './pages/Admin/Subjects.jsx'
import Chapters from './pages/Admin/Chapters.jsx'
import Questions from './pages/Admin/Questions.jsx'
import { AddChapter, AddQuestion, AddSubject } from './components/index.js'
import UpdateSubject from './pages/Admin/UpdateSubject.jsx'
import UpdateChapter from './pages/Admin/UpdateChapter.jsx'
import ShowChapter from './pages/Admin/ShowChapter.jsx'
import ShowQuestion from './pages/Admin/ShowQuestion.jsx'
import UpdateQuestion from './pages/Admin/UpdateQuestion.jsx'
import ShowAllQ from './pages/Admin/ShowAllQ.jsx'
import Profile from './pages/User/Profile.jsx'
import GetPost from './pages/User/GetPost.jsx'
import AddPost from './pages/User/AddPost.jsx'
import UserHome from './pages/User/UserHome.jsx'
import Adminhome from './pages/Admin/Adminhome.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      {/* <Route path='/qbank/*' element={<QBank />} /> */}
      <Route path='/admin' element={<Admin />} />
      <Route path="/adminHome" element={<AdminHome />}>
        <Route path='home' element={<Adminhome/>}/>
        <Route path="subjects">
          <Route index element={<Subjects />} />
          <Route path="new" element={<AddSubject />} />
          <Route path="show/:subjectId" element={<ShowChapter />} /> 
          <Route path="edit/:subjectId" element={<UpdateSubject />} />
        </Route>
        <Route path="chapters">
          <Route index element={<Chapters />} />
          <Route path="new" element={<AddChapter />} />
          <Route path="show/:chapterId" element={<ShowAllQ />} /> 
          <Route path="edit/:chapterId" element={<UpdateChapter />} />
        </Route>
        <Route path="questions">
          <Route index element={<Questions />} />
          <Route path="new" element={<AddQuestion />} />
          <Route path="show/:questionId" element={<ShowQuestion />} /> 
          <Route path="edit/:questionId" element={<UpdateQuestion />} />
        </Route>
      </Route>
      <Route path="/user/:userId" element={<User />}>
          <Route index element={<UserHome/>}/>
         <Route path="posts" element={<GetPost />} />
         <Route path="profile" element={<Profile />} />
         <Route path='post' element={<AddPost/>}/>
         <Route path='qbank/*' element={<QBank />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
