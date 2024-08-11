import { useEffect, useState } from 'react';
import io from "socket.io-client";
import './App.css';

const socket = io.connect("http://192.168.0.120:4500");

function App() {
  const [msg, setmsg] = useState("");
  const [received_msg, setreceived_msg] = useState([]);
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      alert("Joined room " + room);
    }
  };

  const sendMsg = () => {
    socket.emit("send_message", { room, msg });
    setmsg("");
    alert("Message sent");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Message received", data);
      setreceived_msg((prevMessages) => [...prevMessages, data.message]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <>
      <input type="text" placeholder='Enter room number' value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <input type="text" placeholder='Enter message' value={msg} onChange={(e) => setmsg(e.target.value)} />
      <button onClick={sendMsg}>Send</button>
      {received_msg.map((item, index) => (
        <p key={index}>{item} <span>{index}</span></p>
      ))}
    </>
  );
}

export default App;
