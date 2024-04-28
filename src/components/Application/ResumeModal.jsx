import React from 'react'

const ResumeModal = ({imageUrl,onClose}) => {
  return (
    <div>
      <div className="resume-modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <img src={imageUrl} alt="resume" />
        </div>
      </div>
    </div>
  )
}

export default ResumeModal