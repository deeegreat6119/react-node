import React, { useRef, useEffect, useState  } from 'react';
import { io } from 'socket.io-client'
// import { normalizePath } from 'vite';
const socket = io('http://localhost:3000/')

const Chat = () => {
    const messageRef = useRef("")
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket.on('send_Message', (message) => {
            setMessages((messages) => [...messages, message])
        })

        // socket.on('group_message', ({message, group}) =>{
        //     setMessages((messages) => [...messages, `${group}: ${message}`])
        // })

        socket.emit("JOIN_SOCKET", {_id: "3637gdj4674dhljda"})
    }, [])
    const sendMessage = (group = null) => {
        // e.preventDefault()
        const message = messageRef.current.value
        if (message) {
            // emit message to server
            // socket.emit('send_Message', message)
            socket.emit('send_Message', {message, _id: "3637gdj4674dthljda"})
            setMessages((messages) => [...messages, message])
            messageRef.current.value = ''
        }
        if(group){
            socket.emit('Group_Message', {message, group, _id: "3637gdj4674dthljda"})

            setMessages((messages) => [...messages, `${group}: ${message}`])
            messageRef.current.value = ''
        }
    }
    
  return (
    <div className="chat-container">
  <div className="messages-container">
    {messages.map((message, index) => (
      <div 
        key={`message-${index}`} 
        className={`message ${index % 2 === 0 ? 'sent' : 'received'}`}
      >
        {message}
      </div>
    ))}
  </div>
  <div className="input-container">
    <input 
      type="text" 
      ref={messageRef} 
      className="message-input" 
      placeholder="Type a message..."
    />
    <button onClick={sendMessage} className="send-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </button>
  </div>
</div>
  )
}

export default Chat