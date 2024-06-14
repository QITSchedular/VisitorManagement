import React, { createContext, useContext, useEffect, useRef } from 'react';
import EventEmitter from 'eventemitter3';
import { getUser } from '../api/auth';
import { useAuth } from './auth';

// Create WebSocket context
const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};


export const WebSocketProvider = ({ children }) => {
    const { user } = useAuth();
    // console.log("Users : ",user.transid);
    const ws = useRef(null);
    const eventEmitter = useRef(new EventEmitter());
    const getConnectWebsocket = async ()=>{
       
        if (user) {
          console.log("here : ");
          ws.current = new WebSocket(process.env.REACT_APP_WSS_URL+`?user=${user ? user.transid : 0}&cmp=${user ? user.cmpid : 0}`);

          // Connection opened
          ws.current.onopen = () => {
              console.log('WebSocket is open now.');
          };
  
          // Listen for messages
          ws.current.onmessage = (event) => {
              const data = JSON.parse(event.data);
              eventEmitter.current.emit(data.type, data);
          };
  
          // Connection closed
          ws.current.onclose = () => {
              console.log('WebSocket is closed now.');
          };
  
          // Cleanup on unmount
          return () => {
              ws.current.close();
          };
        }
    }
    useEffect(() => {
        console.log("Hey user got ..!!")
        getConnectWebsocket();
        // Establish WebSocket connection
        // ws.current = new WebSocket(url);

        // // Connection opened
        // ws.current.onopen = () => {
        //     console.log('WebSocket is open now.');
        // };

        // // Listen for messages
        // ws.current.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     eventEmitter.current.emit(data.type, data);
        // };

        // // Connection closed
        // ws.current.onclose = () => {
        //     console.log('WebSocket is closed now.');
        // };

        // // Cleanup on unmount
        // return () => {
        //     ws.current.close();
        // };
    }, [user]);

    const send = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ send, eventEmitter: eventEmitter.current }}>
            {children}
        </WebSocketContext.Provider>
    );
};
