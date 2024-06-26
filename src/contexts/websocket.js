// import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// import EventEmitter from 'eventemitter3';
// import { getUser } from '../api/auth';
// import { useAuth } from './auth';
// import { useRecoilState } from 'recoil';
// import { notificationAtom } from './atom';

// // Create WebSocket context
// const WebSocketContext = createContext(null);

// export const useWebSocket = () => {
//     return useContext(WebSocketContext);
// };


// export const WebSocketProvider = ({ children }) => {
//     const { user } = useAuth();
//     // console.log("Users : ",user.transid);
//     const ws = useRef(null);
//     const eventEmitter = useRef(new EventEmitter());
//     const getConnectWebsocket = async ()=>{
       
//         if (user) {
//           console.log("here : ");
//           ws.current = new WebSocket(process.env.REACT_APP_WSS_URL+`?user=${user ? user.transid : 0}&cmp=${user ? user.cmpid : 0}`);

//           // Connection opened
//           ws.current.onopen = () => {
//               console.log('WebSocket is open now.');
//           };
  
//           // Listen for messages
//           ws.current.onmessage = (event) => {
//               const data = JSON.parse(event.data);
//               eventEmitter.current.emit(data.type, data);
//           };
  
//           // Connection closed
//           ws.current.onclose = () => {
//               console.log('WebSocket is closed now.');
//           };
  
//           // Cleanup on unmount
//           return () => {
//               ws.current.close();
//           };
//         }
//     }

//     const [notificationData,setNotificationData] = useState([]);

//     const [notificationAtomState,setNotificationAtomState] = useRecoilState(notificationAtom);


  

//     useEffect(() => {
//         console.log("Hey user got ..!!")
//         getConnectWebsocket();
//         // Establish WebSocket connection
//         // ws.current = new WebSocket(url);

//         // // Connection opened
//         // ws.current.onopen = () => {
//         //     console.log('WebSocket is open now.');
//         // };

//         // // Listen for messages
//         // ws.current.onmessage = (event) => {
//         //     const data = JSON.parse(event.data);
//         //     eventEmitter.current.emit(data.type, data);
//         // };

//         // // Connection closed
//         // ws.current.onclose = () => {
//         //     console.log('WebSocket is closed now.');
//         // };

//         // // Cleanup on unmount
//         // return () => {
//         //     ws.current.close();
//         // };
//     }, [user]);

//     const send = (message) => {
//         if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//             ws.current.send(JSON.stringify(message));
//         }
//     };


//     useEffect(() => {
//         console.log("++++++++++++++++");
//         eventEmitter.current.on('notifications', (data) => {
//             setNotificationData(data.notification);
//             setNotificationAtomState(data.notification);
//             console.log("notificationData : ",data.notification.length);
//             // setNotificationCnt(data.notification.length);
//         });
//         eventEmitter.current.on("notification", (data) => {
//             setNotificationData((prevData) => {
//                 const isDuplicate = prevData.some(
//                   (item) => item.transid === data.notification.transid
//                 );
//                 if (!isDuplicate) {
//                   return [data.notification, ...prevData];
//                 }
//                 return prevData;
//               });
              
//           });
//         send({ type: 'send_notifications', usrid: user ? user.transid : 0 });
        
//         return () => {
//             eventEmitter.current.off('notifications');
//         };
//     }, [user]);
  

//     return (
//         <WebSocketContext.Provider value={{ send, eventEmitter: eventEmitter.current }}>
//             {children}
//         </WebSocketContext.Provider>
//     );
// };
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import EventEmitter from 'eventemitter3';
import { useAuth } from './auth';
import { useRecoilState } from 'recoil';
import { notificationAtom } from './atom';

// Create WebSocket context
const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const { user } = useAuth();
    const ws = useRef(null);
    const eventEmitter = useRef(new EventEmitter());
    const [notificationData, setNotificationData] = useState([]);
    const [notificationAtomState, setNotificationAtomState] = useRecoilState(notificationAtom);

    const getConnectWebsocket = async () => {
        if (user) {
            console.log("Connecting WebSocket...");

            ws.current = new WebSocket(`${process.env.REACT_APP_WSS_URL}?user=${user.transid}&cmp=${user.cmpid}`);

            ws.current.onopen = () => {
                console.log('WebSocket is open now.');
                send({ type: 'send_notifications', usrid: user.transid });
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                eventEmitter.current.emit(data.type, data);
            };

            ws.current.onclose = () => {
                console.log('WebSocket is closed now.');
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return () => {
                if (ws.current) {
                    ws.current.close();
                }
            };
        }
    };

    const send = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Unable to send message.');
        }
    };

    useEffect(() => {
        getConnectWebsocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [user]);

    useEffect(() => {
        const handleNotifications = (data) => {
            setNotificationData(data.notification);
            setNotificationAtomState(data.notification);
            console.log("Received notifications:", data.notification.length);
        };

        const handleNotification = (data) => {
            setNotificationData((prevData) => {
                const isDuplicate = prevData.some(item => item.transid === data.notification.transid);
                if (!isDuplicate) {
                    return [data.notification, ...prevData];
                }
                return prevData;
            });
        };

        eventEmitter.current.on('notifications', handleNotifications);
        eventEmitter.current.on('notification', handleNotification);

        return () => {
            eventEmitter.current.off('notifications', handleNotifications);
            eventEmitter.current.off('notification', handleNotification);
        };
    }, [user]);

    return (
        <WebSocketContext.Provider value={{ send, eventEmitter: eventEmitter.current }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
