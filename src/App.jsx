import React from 'react'
import './App.css'
import { useEffect ,useContext} from 'react'
import { Context } from './main'
 import Login from './components/Auth/Login'
 import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJobs from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyAppllications'
import NotFound from './components/NotFound/NotFound'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import {  Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

export default function App() {

  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context)
  useEffect(()=>{
    const fetchUser= async ()=>{
      try{
        const response=await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials:true})
        setUser(response.data.user)
        setIsAuthorized(true)
      }
      catch(error){
        setIsAuthorized(false)
        console.log(error.response.data.message);
      }
    }
    fetchUser()
    console.log("Is authorized :",isAuthorized);
  },[isAuthorized])
 
  // if(isAuthorized){
  //   return <Navigate to='/'></Navigate>
  // }
  return (
    <>
          <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/job/getall' element={<Jobs/>}/>
        <Route path='/job/:id' element={<JobDetails/>}/>
        <Route path='/job/post' element={<PostJobs/>}/>
        <Route path='/job/me' element={<MyJobs/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        <Route path='/application/me' element={<MyApplications/>}/>
        <Route path='*' element={<NotFound/>}/>
      
      </Routes>
    <Footer/>
    <Toaster />
    
    </BrowserRouter>
    </>
  )
}
