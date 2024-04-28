import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ResumeModal from './ResumeModal'


const MyAppllications = () => {

  const [applications, setApplications] = useState([])
  const [resumeImageUrl, setResumeImageUrl] = useState(" ")
  const { user, isAuthorized } = useContext(Context)
  const [modalOpen, setModalOpen] = useState("")

  const navigateTo = useNavigate()
  useEffect(() => {

    try {
      if (user && user.role === "Employer") {
        axios.get("http://localhost:4000/api/v1/application/employer/getall", { withCredentials: true }).then(res => {
          setApplications(res.data.applications)
        })
      }
      else {
        axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", { withCredentials: true }).then(res => {
          setApplications(res.data.applications)
        })
      }
    }
    catch (error) {
      toast.error(error.response.data.message)
    }
  }, [isAuthorized])


  if (!isAuthorized) {
    navigateTo("/login")
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModalOpen(true)

  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <section className="my_applications page">
        {
          user && user.role === "Job Seeker" ? (
            <div className="container">
            <h1>My Applications</h1>
            {applications.length <= 0 ? (
              <>
                {" "}
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
          ) : (
            <div className="container">
              <h3>Applications from Job Seekers</h3>
              {applications.map((element) => {
                return <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal} />
              })}
            </div>
          )
        }


        {
          modalOpen && (
            <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal}/>
          )
        }
      </section>
    </>
  )
}

export default MyAppllications


const JobSeekerCard = ({element,deleteApplication,openModal})=>{
  return (
    <>
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name : {element.name}</span></p>
        <p><span>Email : {element.email}</span></p>
        <p><span>Phone : {element.phone}</span></p>
        <p><span>Address : {element.address}</span></p>
        <p><span>Cover Letter : {element.coverLetter}</span></p>
      </div>

      <div className="resume">
        <img src={element.resume.url} alt="resume" onClick={()=>{openModal(element.resume.url)}} />
      </div>
      <div className="btn_area">
        <button onClick={()=>{deleteApplication(element._id)}}>Delete Application</button>
      </div>
    </div>
    </>
  )
}

const EmployerCard = ({element,deleteApplication,openModal})=>{
  return ( <>
 <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name : {element.name}</span></p>
        <p><span>Email : {element.email}</span></p>
        <p><span>Phone : {element.phone}</span></p>
        <p><span>Address : {element.address}</span></p>
        <p><span>Cover Letter : {element.coverLetter}</span></p>
      </div>

      <div className="resume">
        <img src={element.resume.url} alt="resume" onClick={()=>{openModal(element.resume.url)}} />
      </div>
     
    </div>
  </>)
}