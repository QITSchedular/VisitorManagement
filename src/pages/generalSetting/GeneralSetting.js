import React, { useState } from 'react'
import './generalsetting.scss'
import HeaderTab from '../../components/HeaderTab/HeaderTab'

const GeneralSetting = () => {
    const [activePage ,setActivePage]= useState();
    const HeaderTabText=["Notification" , "Profile" , "General Settings"];
    const setActiveHeader = ()=>{
      
    }
  return (
    <div className='GeneralSetting'>
       <HeaderTab HeaderTabText={HeaderTabText} HeaderText={activePage} setActivePage={setActivePage}/>
    <div className='content-block dx-card'>
        <div className='header-container'>
            <span>General Settings</span>
        </div>
    </div>
    </div>
  )
}

export default GeneralSetting
