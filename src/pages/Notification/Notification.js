import React, { useEffect, useState } from 'react'
import HeaderTab from '../../components/HeaderTab/HeaderTab'
import './notification.scss'
import { useWebSocket } from '../../contexts/websocket';
import { useAuth } from '../../contexts/auth';

const Notification = () => {
    const [activePage ,setActivePage]= useState();
    const HeaderTabText=["Notification" , "Profile" , "General Settings"];
    const { send, eventEmitter } = useWebSocket();
    const { user } = useAuth();
    useEffect(() => {
        // Listen for 'notifications' messages
        eventEmitter.on('notifications', (data) => {
            console.log('Notifications:', data.notification);
        });

        // Send a message to the server to request notification data
        send({ type: 'send_notifications', usrid: user ? user.transid : 0 });

        // Cleanup on unmount
        return () => {
            eventEmitter.off('notifications');
        };
    }, [send, eventEmitter]);
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
