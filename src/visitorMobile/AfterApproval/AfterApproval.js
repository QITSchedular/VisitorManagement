import React from 'react'
import success from '../../assets/images/success.gif'
import './afterApproval.scss'
const AfterApproval = () => {
  return (
    <div className='AfterApproval'>
      <div className='center-conatier'>
        <div className='text'>
            <span>Sent for Approval</span>
        </div>
        <div className='gif'>
            <img src={success} alt='success'/>
        </div>
      </div>
    </div>
  )
}

export default AfterApproval
