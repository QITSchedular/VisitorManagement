import React, { useState } from 'react'
import HeaderTab from '../../components/HeaderTab/HeaderTab'
import './notification.scss'

const Notification = () => {
    const [activePage ,setActivePage]= useState();
    const HeaderTabText=["Notification" , "Profile" , "General Settings"];

  return (
    <div className='notification'>
    <HeaderTab HeaderTabText={HeaderTabText} HeaderText={activePage} setActivePage={setActivePage}/>
    <div className='content-block dx-card'>
        <div className='header-container'>
            <span>Notification</span>
        </div>
    </div>
    </div>
  )
}

export default Notification
