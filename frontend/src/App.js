import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// our socket variable
const socket = io("http://localhost:5000");

function App() {
  //taking a name from user
  const [userName, setUserName] = useState("");
  const [activeChat, setActiveChat] = useState(false);

  //for messages 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")

  //for getting data from backend with the helo of io.emit on backend
  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message])
    })
    // console.log(messages)
  }, [messages, socket])

  //function for handle submit
  const handleSubmit = (e) => {
    e.preventDefault()

    //my object for new messages
    const messageData = {
      message: newMessage,
      user: userName,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    // console.log(messageData)

    //send message to backend with the help of socket.emite variable , send-message is a type created by you n yr data 
    if (!newMessage == "") {
      socket.emit("send-message", messageData)
    } else {
      alert("message can't be empty")
    }
    setNewMessage(" ");
  }
  return (
    <>
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        {activeChat ? (
          <div className="main-div">
            <h1 className="text-center font-bold mb-2 uppercase">Do Chat</h1>
            <div className="messages main">
              <div className="all-sms-screen  scroll-smooth md:scroll-auto  overflow-y-auto w-[80vh] border-2	 h-[80vh] md:h-[60vh]">
                {
                  messages.map((mess, i) => {
                    return (
                      <div className={`flex rounded-md shadow-md my-5 w-fit ${userName === mess.user && "ml-auto"}`} key={i}>
                        <div className="bg-green-400 flex justify-center items-center rounded-l-md p-2">
                          <h1 className="text-2xl bolt">{mess.user.charAt(0).toUpperCase()}</h1>
                        </div>
                        <div className="px-2">
                          <span >{mess.user}</span>
                          <h1 className="font-bold ">{mess.message}</h1>
                          <h1 className="text-xs text-right">{mess.time}</h1>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <form className="mt-2" onSubmit={handleSubmit}>
                <input className="border-2 p-2 rounded-md mr-2 w-[70vh]" value={newMessage} type="text" name="" id="" onChange={(e) => setNewMessage(e.target.value)} />
                <button className="p-2 bg-green-400 rounded-md pl-3 " type="submit">send</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-screen w-screen flex justify-center items-center gap-1">
            <input className="p-3 rounded-md border-2" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter name" />
            <button className="p-3 rounded-md bg-green-400" onClick={(e) => setActiveChat(!userName == " " && true)}>Start Chat</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
