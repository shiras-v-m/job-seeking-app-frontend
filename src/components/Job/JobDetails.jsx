import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main'
import axios from 'axios'

const JobDetails = () => {
  const {id}=useParams()
  const [job,setJob]=useState({})
  const navigateTo=useNavigate()

  const {isAuthorized,user}=useContext(Context)

  if(!isAuthorized){
    navigateTo("/login")
  }
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/v1/job/${id}`,{withCredentials:true}).then(res =>{
      try{
        setJob(res.data.job)
      }
      catch(error){
        console.log(error.response.data.message);
      }
    })
  },[])
  return (
    <>
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>Title: <span>{job.title}</span></p>
          <p>category: <span>{job.category}</span></p>
          <p>country: <span>{job.country}</span></p>
          <p>City: <span>{job.city}</span></p>
          <p>Location: <span>{job.location}</span></p>
          <p>Description: <span>{job.description}</span></p>
          <p>Job Posted On : <span>{job.jobPostedOn}</span></p>

          <p>
            {
              user && user.role ==="Employer" ? <></> : <Link to={`/application/${job._id}`}>Apply Now</Link>
            }
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default JobDetails